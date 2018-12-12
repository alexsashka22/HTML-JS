'use strict';

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  };

  const el = document.createElement(node.name);

  if (node.props && typeof node.props === 'object') {
    Object.keys(node.props).forEach(i => el.setAttribute(i, node.props[i]));
  };

  if (node.childs instanceof Array) {
    node.childs.forEach(child => el.appendChild(createElement(child)));
  };

  return el;
};
