'use strict';

let movedPiece = null;

document.addEventListener('mousedown', start);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);

function start(evt) {
  if (evt.target.classList.contains('logo')) {
    movedPiece = evt.target;
  };
};

function drag(evt) {
  if (movedPiece) {
    evt.preventDefault();
    movedPiece.style.left = evt.pageX - movedPiece.offsetWidth / 2 + 'px';
    movedPiece.style.top = evt.pageY - movedPiece.offsetHeight / 2 + 'px';
    movedPiece.classList.add('moving');
  };
};

function drop(evt) {
  if (movedPiece) {
    movedPiece.style.visibility = 'hidden';
    const check = document
      .elementFromPoint(evt.clientX, evt.clientY)
      .closest('#trash_bin');
    movedPiece.style.visibility = 'visible';

    if (check) {
      movedPiece.style.display = 'none';
      movedPiece.classList.remove('moving');
      movedPiece = null;
    };
  };
};
