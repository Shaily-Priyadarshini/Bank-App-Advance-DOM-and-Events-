'use strict';
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');
const btnOpenModal=document.querySelector('.nav__link--btn')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const links=document.querySelector('.nav__link')
const container=document.querySelector('.nav__links')
const nav=document.querySelector('.nav')
///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnOpenModal.addEventListener('click',function(e){
  e.preventDefault();
});
btnsOpenModal.forEach(btn=>btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Modern way to smooth scrolling (Button scolling)
btnScrollTo.addEventListener('click',function(e){
  section1.scrollIntoView({behavior:'smooth'});
})

//Event delegation to navigation for smooth scolling

container.addEventListener('click',function(e){
  e.preventDefault()
  //matching strategy
  if (e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
})
const tabs=document.querySelectorAll('.operations__tab')
const tabContainer=document.querySelector('.operations__tab-container')
const tabContent=document.querySelectorAll('.operations__content')

//Tabbed component
tabContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  //gaurd clause
  if(!clicked) return;

  //active tab
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  tabContent.forEach(c=>c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  //active content
  const num=clicked.getAttribute('data-tab')
  document.querySelector(`.operations__content--${num}`).classList.add('operations__content--active')
 })

//Passing arguments to event handlers
//Clicked on link, other should fade out!!(Menu fade animation)
const handleHover=function(e){
  if (e.target.classList.contains('nav__link')){
    const link=e.target;
    const sibling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=document.querySelector('img');
    sibling.forEach(s=>{if(s!=link) s.style.opacity=this});
    logo.style.opacity=this;
  }

}
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

//Intersection API
const headerCallback=function(entries){
  const [entry]=entries;
  if(!entry.isIntersecting)nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObv=new IntersectionObserver(headerCallback,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`

});
headerObv.observe(document.querySelector('.header'))


// Intersection Observer API
// const obsCallback=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry);
//   });
// }
// const obsObj={
//   root:null,
//   threshold:[0]
// };

// const observer=new IntersectionObserver(obsCallback,obsObj);
// observer.observe(document.querySelector('.header'))

//old way to smooth scolling
// btnScrollTo.addEventListener('click',function(e){
// //getting coordinates
// const s1coords=section1.getBoundingClientRect();

// window.scrollTo({
//   left:s1coords.left+window.pageXOffset,
//   top:s1coords.top+ window.pageYOffset,
//   behavior:'smooth'

// })});


//Event propagation
// const links=document.querySelector('.nav__link')
// const container=document.querySelector('.nav__links')
// const nav=document.querySelector('.nav')
// links.addEventListener('click',function(e){
//   console.log('LINKS' ,e.target, e.currentTarget)
// })
// container.addEventListener('click',function(e){
//   console.log('CONTAINER' ,e.target, e.currentTarget)
// })
// nav.addEventListener('click',function(e){
//   console.log('NAV' ,e.target, e.currentTarget)
// })

//DOM traversing
const h1=document.querySelector('h1');//NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
// console.log(h1.childNodes);
// console.log(h1.children)//HTMLCollection(3) [span.highlight, br, span.highlight]
// console.log(h1.firstChild)//#text
// console.log(h1.firstElementChild)//span.highlight
// const p=document.querySelector('.test')
// console.log(p.parentElement)
// console.log(p.parentNode)