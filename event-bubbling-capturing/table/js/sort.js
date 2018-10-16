'use strict';

function handleTableClick(event) {
  let target = event.target.dataset;

  target.dir = +target.dir === 1 ? -1 : 1;
  
  event.currentTarget.dataset.sortBy = target.propName;

  sortTable(target.propName, +target.dir);
};
