import React from "react";

export const useTouchSwipe = (ref) => {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchDistance, setTouchDistance] = React.useState(0);
  const [swipeDirection, setSwipeDirection] = React.useState("");

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const distanceMoved = currentX - touchStart;
    setTouchDistance(distanceMoved);
  };

  const onTouchEnd = (e) => {
    const distanceMoved = touchDistance;
    const swipeDirection = distanceMoved > 0 ? "right" : "left";
    setSwipeDirection(swipeDirection);
    setTouchStart(0);
    setTouchDistance(0);
  };

  React.useEffect(() => {
    console.log("useTouchSwipe", ref, swipeDirection);
    const mainRef = ref.current;
    mainRef.addEventListener("touchstart", onTouchStart);
    mainRef.addEventListener("touchmove", onTouchMove);
    mainRef.addEventListener("touchend", onTouchEnd);

    return () => {
      mainRef.removeEventListener("touchstart", onTouchStart);
      mainRef.removeEventListener("touchmove", onTouchMove);
      mainRef.removeEventListener("touchend", onTouchEnd);
    };
  }, [ref]);

  return {
    touchDistance,
    swipeDirection,
  };
};
