const persons = [
  {
    index: 0,
    fullName: 'johanna sandoval',
    position: 'SVP, Head of Product and Design',
    image: 'images/person-1.jpg',
  },
  {
    index: 1,
    fullName: 'molly dixon',
    position: 'Chief Revenue Officer',
    image: 'images/person-2.jpg',
  },
  {
    index: 2,
    fullName: 'alexis murray',
    position: 'Head of Commerce',
    image: 'images/person-3.jpg',
  },
  {
    index: 3,
    fullName: 'lennon sawyer',
    position: 'Cofounder and President',
    image: 'images/person-4.jpg',
  },
  {
    index: 4,
    fullName: 'jullianna walace',
    position: 'Head of Design',
    image: 'images/person-5.jpg',
  },
  {
    index: 5,
    fullName: 'maximo barton',
    position: 'Founder, President and CEO',
    image: 'images/person-6.jpg',
  },
  {
    index: 6,
    fullName: 'abram curtis',
    position: 'Head of Information',
    image: 'images/person-7.jpg',
  },
  {
    index: 7,
    fullName: 'hassan hering',
    position: 'Head of Degital Commerce Platform',
    image: 'images/person-8.jpg',
  },
  {
    index: 8,
    fullName: 'nick brown',
    position: 'President, Product and Business',
    image: 'images/person-9.jpg',
  },
  {
    index: 9,
    fullName: 'gary montgomery',
    position: 'President and Cofounder',
    image: 'images/person-10.jpg',
  },
];
const slidesContainer = document.querySelector('.slider');
const allSlidesEl = [];
let numOfSlidesToShow = 3;
let windowWidth;
const breakPoint = 768;
let interval;
let timeOut;
// ============================ EVENTS =============================
window.addEventListener('load', () => {
  QuieryScreenWidth();
  buildArrayOfSlides();
  buildHtml();
  const slides = document.querySelectorAll('.slide');
  const leftControl = document.querySelector('.left-btn');
  const rightControl = document.querySelector('.right-btn');
  const totalLength = document.querySelector('.total-length');
  slides.forEach((slide) => {
    slide.addEventListener('click', activateSlide);
  });
  leftControl.addEventListener('click', moveLeft);
  rightControl.addEventListener('click', moveRight);
  totalLength.textContent = allSlidesEl.length;
  updateCounter();
});
window.addEventListener('resize', reloadPage);
// ============================ FUNCTIONS =============================
function updateCounter() {
  const slides = document.querySelectorAll('.slide');
  const counter = document.querySelector('.counter');
  const middleSlide = slides[Math.floor(slides.length / 2)];
  const middleSlideDataIndex = middleSlide.dataset.index;
  counter.textContent = Number(middleSlideDataIndex) + 1;
}
function reloadPage() {
  const newWindowWidth = window.innerWidth;
  if (windowWidth <= breakPoint && newWindowWidth <= breakPoint) {
    return;
  }
  if (windowWidth > breakPoint && newWindowWidth > breakPoint) {
    return;
  }
  window.location.reload();
}
function QuieryScreenWidth() {
  windowWidth = window.innerWidth;
  if (windowWidth <= breakPoint) {
    numOfSlidesToShow = 3;
    slidesContainer.classList.add('sm-screen');
  } else {
    numOfSlidesToShow = 5;
    slidesContainer.classList.add('lg-screen');
  }
}
function buildArrayOfSlides() {
  persons.forEach((person) => {
    const { index, fullName, position, image } = person;
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.setAttribute('data-index', index);
    slide.innerHTML = `
    <a href='https://www.linkedin.com/' target="_blank" title="linkedin">
        <i class="fa-brands fa-linkedin-in icon" aria-hidden="true"></i>
    </a>
    <img src=${image} alt=${fullName} />
    <h2 class="full-name">${fullName}</h2>
    <h3 class="position">${position}</h3>
    `;
    allSlidesEl.push(slide);
  });
}
function buildHtml() {
  for (let i = 0; i < numOfSlidesToShow; i++) {
    const slide = allSlidesEl[i];
    slidesContainer.appendChild(slide);
  }
}
function activateSlide(e) {
  const slide = e.currentTarget;
  const slides = document.querySelectorAll('.slide');
  const index = [...slides].indexOf(slide);
  if (numOfSlidesToShow === 3) {
    switch (index) {
      case 0:
        moveLeft();
        break;
      case 1:
        break;
      case 2:
        moveRight();
        break;
    }
    return;
  }
  // for large screen
  switch (index) {
    case 0:
      moveLeft();
      setTimeout(moveLeft, 500);
      break;
    case 1:
      moveLeft();
      break;
    case 2:
      break;
    case 3:
      moveRight();
      break;
    case 4:
      moveLeft();
      setTimeout(moveRight, 500);
      break;
  }
}
function moveLeft(bool = true) {
  const lastSlide = slidesContainer.lastElementChild;
  const firstSlideDataIndex = slidesContainer.firstElementChild.dataset.index;
  let newIndex = Number(firstSlideDataIndex) - 1;
  if (newIndex < 0) {
    newIndex = allSlidesEl.length - 1;
  }
  const newFirstSlide = allSlidesEl[newIndex];
  newFirstSlide.addEventListener('click', activateSlide);
  newFirstSlide.classList.add('fade-in');
  slidesContainer.removeChild(lastSlide);
  slidesContainer.prepend(newFirstSlide);
  updateCounter();
  timeOutFn(bool);
}
function moveRight(bool = true) {
  const firstSlide = slidesContainer.firstElementChild;
  const lastSlideDataIndex = slidesContainer.lastElementChild.dataset.index;
  let newIndex = Number(lastSlideDataIndex) + 1;
  if (newIndex > allSlidesEl.length - 1) {
    newIndex = 0;
  }
  const newLastSlide = allSlidesEl[newIndex];
  newLastSlide.addEventListener('click', activateSlide);
  newLastSlide.classList.add('fade-in');
  slidesContainer.removeChild(firstSlide);
  slidesContainer.append(newLastSlide);
  updateCounter();
  timeOutFn(bool);
}

function intervalFn() {
  interval = setInterval(() => moveRight(false), 5000);
}
function timeOutFn(bool) {
  if (bool) {
    clearInterval(interval);
    clearTimeout(timeOut);
    timeOut = setTimeout(intervalFn, 5000);
  }
}
// start auto sliding
intervalFn();
