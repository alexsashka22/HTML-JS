'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    const data = {};
    navigator.mediaDevices.getUserMedia(app.config)
      .then((stream) => {
        app.preview.srcObject = stream;
        let recorder = new MediaRecorder(stream);
        let chunks = [];
        recorder.addEventListener('dataavailable', event => chunks.push(event.data));
        recorder.addEventListener('stop', event => {const video = new Blob(chunks, { 'type' : recorder.mimeType });
        chunks = null;
        recorder = stream = null;
        app.preview.srcObject = null;
        data.video = video;
        createThumbnail(video)
          .then((res) => { data.frame = res; done(data); });
      });
      setTimeout(() => {
        app.mode = 'recording';
        recorder.start();
        setTimeout(() => {
          recorder.stop();
        }, app.limit);
      }, 1000);
    });
  });
}
