'use strict'

const contents = document.querySelectorAll('.tabs-content > *'),
      nav = document.querySelector('.tabs-nav'),
      demoTab = nav.firstElementChild;

for (let content of contents) {
  let newTab = demoTab.cloneNode(true);
  demoTab.remove();

  const tab = newTab.firstElementChild;
  tab.classList.add(content.dataset.tabIcon);
  tab.textContent = content.dataset.tabTitle;
  content.classList.add('hidden');
  nav.appendChild(newTab);
};

function setActiveTab(evt) {
  for (let currentNav of nav.children) {
    currentNav.classList.remove('ui-tabs-active');
  };
    evt.currentTarget.classList.add('ui-tabs-active');
};

function setContent(e) {
   for (let content of contents) {
      content.getAttribute('data-tab-title') === e.target.textContent ? content.classList.remove('hidden') : content.classList.add('hidden');
  };
};

nav.firstElementChild.classList.add('ui-tabs-active');
contents[0].classList.remove('hidden');

for (let currentNav of nav.children) {
  currentNav.addEventListener('click', setActiveTab);
  currentNav.addEventListener('click', setContent);
};
