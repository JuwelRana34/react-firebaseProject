// import  { useState, useEffect } from 'react';

// const CountdownTimer = () => {
//   const [seconds, setSeconds] = useState(100); // Set the initial countdown value here
//   const [countdownFinished, setCountdownFinished] = useState(false);

//   useEffect(() => {
//     if (seconds > 0) {
//       const interval = setInterval(() => {
//         setSeconds((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else {
//       setCountdownFinished(true);
//     }
//   }, [seconds]);

//   if (countdownFinished) {
//     return <div className="text-center text-2xl text-green-600">Countdown Finished!</div>;
//   }

//   return (
//     <div className="grid grid-flow-col gap-2 justify-center py-4 text-center auto-cols-max">
//       <div className="flex flex-col justify-center py-2 px-3 bg-neutral rounded-xl text-neutral-content">
//         <span className="countdown font-mono text-3xl">
//           <span style={{ "--value": 15 }}></span>
//         </span>
//         days
//       </div>
//       <div className="flex flex-col justify-center px-3 bg-neutral rounded-xl text-neutral-content">
//         <span className="countdown font-mono text-3xl">
//           <span style={{ "--value": 10 }}></span>
//         </span>
//         hours
//       </div>
//       <div className="flex flex-col px-3 justify-center bg-neutral rounded-xl text-neutral-content">
//         <span className="countdown font-mono text-3xl">
//           <span style={{ "--value": 24 }}></span>
//         </span>
//         min
//       </div>
//       <div className="flex flex-col justify-center px-3 bg-neutral rounded-xl text-neutral-content">
//         <span className="countdown font-mono text-3xl">
//           <span style={{ "--value": seconds }}></span>
//         </span>
//         sec
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;


import { useState, useEffect , useRef } from 'react';

// eslint-disable-next-line react/prop-types
const CountdownTimer = ({ targetDate, event }) => {

  const countdownRef = useRef(null);

  const timerdiv =()=>{
    countdownRef.current.classList.add('showresult')
    setTimeout(()=>{
     countdownRef.current.classList.add("hidden") 
    },86400)
  }



  const calculateTimeLeft = () => {
    const target = new Date(targetDate); // Ensure targetDate is a Date object
    const difference = target - new Date();
 
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [countdownFinished, setCountdownFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (!updatedTimeLeft) {
        setCountdownFinished(true);
        clearInterval(interval);
      } else {
        setTimeLeft(updatedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const formatTime = (time) => (time !== undefined && time < 10 ? `0${time}` : time);

  return (

    <div  ref={countdownRef} className="flex flex-col md:w-1/2 mx-auto md:rounded-lg items-center  justify-center p-2 my-4" >
      {countdownFinished ? ( <>
        <div className="text-center text-xl py-10  relative font-bold  transition-all duration-500 ">
          🎉 Happy Jagannath University day! 🎉
          {timerdiv()}
      </div>
     </> ) : (<>
      <h1 className=' font-bold text-2xl bg-gradient-to-r from-pink-50 to-pink-400 w-full px-2 my-2 text-center rounded-lg animate-pulse   md:text-3xl py-3'>{event}</h1>
        <div  className="grid grid-flow-col gap-2 text-center auto-cols-max transition-all duration-500 ease-in-out">
          
          <div  className="flex flex-col justify-center px-3 py-3 bg-neutral rounded-xl text-neutral-content">
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": formatTime(timeLeft?.days ?? 0) }}></span>
            </span>
            days
          </div>
          <div  className="flex flex-col justify-center px-3 py-3 bg-neutral rounded-xl text-neutral-content">
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": formatTime(timeLeft?.hours ?? 0) }}></span>
            </span>
            hours
          </div>
          <div  className="flex flex-col justify-center px-3 py-3 bg-neutral rounded-xl text-neutral-content">
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": formatTime(timeLeft?.minutes ?? 0) }}></span>
            </span>
            min
          </div>
          <div  className="flex flex-col justify-center px-3  py-3 bg-neutral rounded-xl text-neutral-content">
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": formatTime(timeLeft?.seconds ?? 0) }}></span>
            </span>
            sec
          </div>
        </div>
      </>)}
    </div>
  );
};

export default CountdownTimer;
