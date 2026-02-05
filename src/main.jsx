import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// isLTR-left to right
const initialTranslateLTR=48*2;
const initialTranslateRTL=-36*2;
function setupIntersectionObserver(element,isLTR,speed){
  const IntersectionCallback = (entries) =>{
    const isIntersecting=entries[0].isIntersecting;
    if(isIntersecting){
      document.addEventListener('scroll',scrollHandler);
    }
    else{
      document.removeEventListener('scroll',scrollHandler);
    }
  };
  const intersectionObserver = new IntersectionObserver(IntersectionCallback);
    intersectionObserver.observe(element);
    function scrollHandler(){
      const translateX=(window.innerHeight-element.getBoundingClientRect().top)*speed;
      let totalTranslate=0;
      if(isLTR){
        totalTranslate=translateX+initialTranslateLTR;
      }else{
        totalTranslate=-(translateX+initialTranslateRTL);
      }
      element.style.transform=`translateX(${totalTranslate}px)`;
    }
}
const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const line3 = document.getElementById("line3");
const line4 = document.getElementById("line4");

setupIntersectionObserver(line1,true,0.15);
setupIntersectionObserver(line2,false,0.15);
setupIntersectionObserver(line3,true,0.15);
setupIntersectionObserver(line4,true,0.8);

const navDialog=document.getElementById('nav-dialog');
window.handleMenu = function () {
  navDialog.classList.toggle('hidden');
};

const dtElements=document.querySelectorAll('dt');
dtElements.forEach(element=>{
  element.addEventListener('click',()=>{
    const ddId=element.getAttribute('aria-controls');
    const ddElement=document.getElementById(ddId);
    const ddArrorIcon=element.querySelectorAll('i')[0];

    ddElement.classList.toggle('hidden');
    ddArrorIcon.classList.toggle('-rotate-180');
  })
})




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

