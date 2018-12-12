'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);
};

function createComment(comment) {
  const commentWrap = createElem('div', {class: 'comment-wrap'}, '');

  const photo = createElem('div', {class: 'photo', title: comment.author.name}, [
    createElem('div', {class: 'avatar' , style: `background-image: url(${comment.author.pic})`}, '')
  ]);

  const commentBlock = createElem('div', {class: 'comment-block'}, [
                        createElem('p', {class: 'comment-text'}, [
                          createElem('pre', '', comment.text)]),
                        createElem('div', {class: 'bottom-comment'}, [
                          createElem('div', {class: 'comment-date'}, `${new Date(comment.date).toLocaleString('ru-Ru')}`),
                          createElem('ul', {class: 'comment-actions'}, [
                            createElem('li', {class: 'complain'}, 'Пожаловаться'),
                            createElem('li', {class: 'reply'}, 'Ответить')
                          ])
                        ])
                      ]);

  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);

  return commentWrap;
};

function createElem(tagName, attributes, children) {
  const el = document.createElement(tagName);

  if (typeof attributes === 'object') { //если атрибуты явл объектом
    Object.keys(attributes).forEach(i => el.setAttribute(i, attributes[i]));
  }

  if (typeof children === 'string') { //если атрибуты явл строкой
    el.textContent = children;
  } else if (children instanceof Array) { //принадлежит ли ребёнок к классу Массив
    children.forEach(child => el.appendChild(child));
  };

  return el;
};

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
