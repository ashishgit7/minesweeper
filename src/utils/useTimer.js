import { useState,useEffect } from 'react'


function useTimer ({start}){          
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let id;

    if (isRunning) {
      id = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  const pauseTime = () => {
    setIsRunning(false);
  };
  const resetTime = ()=>{
    setTime(0)
  }
  const resumeTime = () => {
    setIsRunning(true);
  };

  return [time, pauseTime, resumeTime,resetTime];

}

export default useTimer