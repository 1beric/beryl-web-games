import { useState } from "react";

const useDraggableClick = ({ onClick }, maxMoveSqr = 25) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  return {
    onMouseDown: (event) =>
      setMouseCoords({ x: event.clientX, y: event.clientY }),
    onClick: (event) => {
      const distSqr =
        Math.pow(event.clientX - mouseCoords.x, 2) +
        Math.pow(event.clientY - mouseCoords.y, 2);
      if (distSqr <= maxMoveSqr) onClick(event);
    },
  };
};

export default useDraggableClick;
