import { useEffect } from 'react';
import add from "../assets/scrolling/add.jpg"
import add1 from "../assets/scrolling/add1.jpg"
import add3 from "../assets/scrolling/add3.jpg"
import add4 from "../assets/scrolling/add4.jpg"
// ***********************************************************
import classtime from "../assets/scrolling/classtime.jpg"
import football from "../assets/scrolling/footaball.jpg"
import picnic from "../assets/scrolling/picnic.jpg"
import viva from "../assets/scrolling/viva.jpg"


const InfiniteScrollAnimation = () => {
const fast = [add ,add1 , add3 , add4]
const down = [classtime ,football , picnic , viva]

  useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller');

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute('data-animated', true);

        const scrollerInner = scroller.querySelector('.scroller__inner');
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-3xl text-blue-500  md:text-5xl font-bold pt-5">WE ARE!</h1>

      <div className="scroller" data-speed="fast">
        <ul className="tag-list scroller__inner">
            {fast.map((img,index)=>(
            <img key={index} src={img} alt='' className=" object-cover w-80 rounded-lg "/>
            ))}
         
          
        </ul>
      </div>

      <div className="scroller mt-4" data-direction="right" data-speed="slow">
        <div className="scroller__inner flex">
{down.map((img , index)=>(

<img key={index} src={img} alt="" className="m-2 rounded-lg shadow-md object-cover  h-60 w-full md:h-80 md:w-96" />
))}
          
        </div>
      </div>

     
    </div>
  );
};

export default InfiniteScrollAnimation;
