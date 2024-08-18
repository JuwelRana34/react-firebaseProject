import image1 from '../assets/images/01.jpg'
import image2 from '../assets/images/02.jpg'
import image3 from '../assets/images/03.jpg'
import image4 from '../assets/images/04.jpg'
import image5 from '../assets/images/05.jpg'
import image6 from '../assets/images/06.jpg'
import image7 from '../assets/images/07.jpg'
import { Carousel } from "flowbite-react";

function Home() {
  
  return (
    <div>
       <div className="h-56   md:w-5/6 mx-auto sm:h-64 md:h-[80vh] ">
      <Carousel>
        <img src={image1} className=' object-center object-contain '  alt="..." />
        <img src={image2} className=' object-center object-contain ' alt="..." />
        <img src={image3} className=' object-center object-contain ' alt="..." />
        <img src={image4} className=' object-center object-contain ' alt="..." />
        <img src={image5} className=' object-center object-contain ' alt="..." />
        <img src={image6} className=' object-center object-contain ' alt="..." />
        <img src={image7} className=' object-center object-contain ' alt="..." />
      </Carousel>
    </div>
      
    </div>
  )
}

export default Home