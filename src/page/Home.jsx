import image1 from "../assets/images/01.jpg";
import image2 from "../assets/images/02.jpg";
import image3 from "../assets/images/03.jpg";
import image4 from "../assets/images/04.jpg";
import image5 from "../assets/images/05.jpg";
import image6 from "../assets/images/06.jpg";
import image7 from "../assets/images/07.jpg";
import image8 from "../assets/images/football.jpg";
import routine from "../assets/images/2nd Y 2nd sem. routine.png";
import InstallPWAButton from "../components/InstallPWAButton ";
import { Carousel, Card } from "flowbite-react";
import { Player } from "@lottiefiles/react-lottie-player";
import ScrollingAnimation from "../components/InfiniteScrollAnimation";
import CountdownTimer from "../components/CountdownTimer";

function Home() {
  return (
    <>
      <div className="h-56    md:w-5/6 mx-auto sm:h-64 md:h-[80vh] ">
        <Carousel>
          <img
            src={image1}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image2}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image3}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image4}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image8}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image6}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image5}
            className=" object-center object-contain "
            alt="..."
          />
          <img
            src={image7}
            className=" object-center object-contain "
            alt="..."
          />
        </Carousel>
      </div>

      <div className=" container text-center mx-auto">
        <InstallPWAButton />
      </div>

      {/* routine */}
      <div className="text-center md:w-3/5 mx-auto ">
        <h1 className="my-4 px-1 text-3xl font-semibold  underline">
          {" "}
          Class Routine 4th sem.
        </h1>
        <img className="w-full" src={routine} alt="" />
      </div>

      <h1 className=" capitalize w-1/2 mx-auto bg-gradient-to-r  from-[#9D50BB] to-[#6E48AA] text-white text-xl text-center py-2 mt-4 rounded-xl">
        {" "}
        about us
      </h1>

      <CountdownTimer eventresult="Ongoing Exam." event="4th semester final exams will start from 17/07/2025" targetDate={new Date("july 17, 2025 09:00:00")} /> 

      <Card className="max-w-[90%] text-white mx-auto my-10 bg-gradient-to-r  from-[#9D50BB] to-[#6E48AA]">
        <h5 className="text-2xl font-bold tracking-tight ">
          Jagannath university Udoyon-18
        </h5>
        <p className="font-normal">
          আসসালামু আলাইকুম। জগন্নাথ বিশ্ববিদ্যালয়,ইসলামের ইতিহাস ও সংস্কৃতি
          বিভাগের ১৮ তম ব্যাচের একটি ওয়েবসাইট। ওয়েবসাইটটি ১৮ তম ব্যাচের প্রয়োজনে
          তৈরি করা হয়েছে। ওয়েবসাইটে যে সব বিষয় থাকবে। ১.ব্যাচের প্রত্যেক সহপাঠীর
          ব্যাক্তিগত প্রোফাইল ২.পড়াশোনার বিভিন্ন বিষয়ের নোটস ফাইল আকারে থাকবে।
          ৩.নিয়মিত নোটিশ দেওয়া হবে। ৪.ডিপার্টমেন্ট ও ব্যাচের বিভিন্ন ইভেন্টের
          ফটো ও ভিডিও ফাইল আকারে থাকবে।
        </p>
      </Card>

      <ScrollingAnimation />

      <Player
        src="https://lottie.host/db331ee6-a947-43c4-addc-b79f2ffda203/Kf7xIksVZa.json"
        className="player "
        autoplay
        loop
      />

      <iframe
        className="  w-full md:w-4/6 text-justify px-2  h-96 mx-auto"
        src="https://www.youtube.com/embed/lIOLrZgZfAg? si=4nCEhAd3CQ0we6DK"
      ></iframe>
    </>
  );
}

export default Home;
