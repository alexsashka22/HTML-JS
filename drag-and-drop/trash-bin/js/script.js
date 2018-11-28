'use strict';

let movedPiece = null;

let ind = false;

document.addEventListener('mousedown', start);

function start(evt) {
    if (!evt.target.classList.contains('logo')) return;
    movedPiece = evt.target;
    movedPiece.classList.add('moving');
    ind = true;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', drop);
};

function drag(evt) {
    if (!ind) return;
    evt.preventDefault();
    movedPiece.style.left = evt.pageX - movedPiece.offsetWidth / 2 + 'px';
    movedPiece.style.top = evt.pageY - movedPiece.offsetHeight / 2 + 'px';
};

function drop(evt) {
    ind = false;
    movedPiece.classList.remove('moving');

    movedPiece.style.visibility = 'hidden';
    const check = document
        .elementFromPoint(evt.clientX, evt.clientY)
        .closest('#trash_bin');
    movedPiece.style.visibility = 'visible';

    if (check) {
        movedPiece.style.display = 'none';
        movedPiece = null;
    };
};
