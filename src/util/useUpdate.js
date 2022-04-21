import { useEffect, useState } from "react";

const useUpdate = (time = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => setCount((prev) => prev + 1), time);
    return () => {
      clearInterval(handle);
    };
  }, [time]);
  return count;
};

export default useUpdate;
