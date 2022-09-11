import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import cx from "classnames";
import styles from "./SwipeContainer.module.scss";

const SwipeContainer = ({
  onSwipeLeft,
  onSwipeRight,
  canSwipeLeft,
  canSwipeRight,
  className: passedClassName,
  children,
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchDistance, setTouchDistance] = useState(0);
  const mainRef = useRef();
  const indicatorContainer = useRef();

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (Math.abs(touchDistance) > window.innerWidth * 0.3) {
      if (touchDistance > 0 && canSwipeLeft) {
        onSwipeLeft(true);
      } else if (touchDistance < 0 && canSwipeRight) {
        onSwipeRight(true);
      } else {
        toast.info("Can't go any further!");
      }
    }
    mainRef.current.style.transform = `translateX(0px)`;
  };

  const onTouchMove = (e) => {
    // the lower value prevents the screen from wobbling when
    // the user scrolls vertically on mobile
    // with some slight left/right movements
    if (
      Math.abs(touchDistance) > window.innerWidth * 0.05 &&
      Math.abs(touchDistance) < window.innerWidth * 0.25
    ) {
      mainRef.current.style.transform = `translateX(${
        e.touches[0].clientX - touchStart
      }px)`;
    }
    setTouchDistance(e.touches[0].clientX - touchStart);

    // increase indicator opacity based on percentage of screen swiped
    const percentage = Math.abs(touchDistance) / window.innerWidth;
    indicatorContainer.current.style.opacity = percentage;
  };

  return (
    <>
      <div
        ref={indicatorContainer}
        className={cx("container", styles.swipeIndicators)}
      >
        {canSwipeLeft ? (
          <i className="fas fa-arrow-left"></i>
        ) : (
          <i className="fa-solid fa-xmark"></i>
        )}
        {canSwipeRight ? (
          <i className="fas fa-arrow-right"></i>
        ) : (
          <i className="fa-solid fa-xmark"></i>
        )}
      </div>
      <div
        className={cx(styles.swipeContainer, passedClassName)}
        ref={mainRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        {children}
      </div>
    </>
  );
};

SwipeContainer.propTypes = {
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  canSwipeLeft: PropTypes.bool,
  canSwipeRight: PropTypes.bool,
};

SwipeContainer.defaultProps = {
  canSwipeLeft: true,
  canSwipeRight: true,
};

export default SwipeContainer;
