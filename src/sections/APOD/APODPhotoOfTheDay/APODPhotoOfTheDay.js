import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  Fragment,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchApod, reset } from "../../../features/APOD/apodSlice";
import {
  DATE_FORMAT,
  STR_DAY,
  MEDIA_TYPE_VIDEO,
  OLDEST_AVAILABLE_DATE,
} from "../APOD.constants";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import dayjs from "dayjs";
import styles from "../APOD.module.scss";
import Datepicker from "../../../components/Datepicker/Datepicker";
import { Button } from "../../../components";
import { toast } from "react-toastify";
import cx from "classnames";

const photoswipeOptions = {
  wheelToZoom: true,
};

const APODPhotoOfTheDay = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDate, setSelectedDate] = React.useState(params.date);
  const dispatch = useDispatch();
  const mainRef = useRef();
  const indicatorContainer = useRef();
  const [touchStart, setTouchStart] = useState(0);
  const [touchDistance, setTouchDistance] = useState(0);
  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const { apod, isLoading } = useSelector((state) => state.apod);

  const isValidDate = (date) => {
    const dateObj = dayjs(date);
    return dateObj.isValid() && dateObj.isBefore(dayjs());
  };

  const onDatePickerChange = (e) => {
    const newDate = dayjs(e.target.value).format(DATE_FORMAT);
    setSelectedDate(newDate);
    navigate(`/apod/${newDate}`);
  };

  const nextDay = useMemo(() => {
    return dayjs(selectedDate).add(1, STR_DAY).format(DATE_FORMAT);
  }, [selectedDate]);

  const prevDay = useMemo(() => {
    return dayjs(selectedDate).subtract(1, STR_DAY).format(DATE_FORMAT);
  }, [selectedDate]);

  const fetchPotd = useCallback(async () => {
    dispatch(fetchApod(selectedDate));

    return () => {
      dispatch(reset());
      setImageDimensions({ width: 0, height: 0 });
    };
  }, [selectedDate, dispatch]);

  useEffect(() => {
    setSelectedDate(params.date);
  }, [params.date]);

  useEffect(() => {
    fetchPotd();
  }, [selectedDate, fetchPotd]);

  const onImgLoad = ({ target: img }) => {
    const { naturalHeight, naturalWidth } = img;
    setImageDimensions({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const renderMedia = () => {
    if (apod.media_type === MEDIA_TYPE_VIDEO) {
      return (
        <div className={styles.videoWrapper}>
          <div className={styles.embedContainer}>
            <iframe
              title={apod.title}
              src={apod.url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else {
      return (
        <Gallery options={photoswipeOptions}>
          <Item
            original={apod.hdurl || apod.url}
            thumbnail={apod.url}
            width={imageDimensions.width}
            height={imageDimensions.height}
          >
            {({ ref, open }) => (
              <img
                onLoad={onImgLoad}
                ref={ref}
                onClick={open}
                src={apod.url}
                alt={apod.title}
                className={styles.image}
              />
            )}
          </Item>
        </Gallery>
      );
    }
  };

  const onTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (Math.abs(touchDistance) > window.innerWidth * 0.3) {
      if (touchDistance > 0) {
        navigate(`/apod/${prevDay}`);
      } else {
        if (isValidDate(nextDay)) {
          navigate(`/apod/${nextDay}`);
        } else {
          toast.info("You are already viewing the latest photo!");
        }
      }
    }
    mainRef.current.style.transform = `translateX(0px)`;
  };

  const onTouchMove = (e) => {
    // the lower value prevents the screen from wobbling when
    // the user scrolls vertically on mobile
    // with some slight left/right movements
    if (
      Math.abs(touchDistance) > window.innerWidth * 0.02 &&
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    apod && (
      <Fragment>
        <div
          ref={indicatorContainer}
          className={cx("container", styles.swipeIndicators)}
        >
          <i className="fas fa-arrow-left"></i>
          {isValidDate(nextDay) ? (
            <i className="fas fa-arrow-right"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
        <main
          className={styles.apodMain}
          ref={mainRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          <div className={styles.apod}>
            <div className={styles.right}>
              {renderMedia()}
              {apod.copyright && <aside>{apod.copyright}</aside>}
            </div>

            <div className={styles.left}>
              <h2>{apod.title}</h2>
              <p className="mb-5">{apod.explanation}</p>

              <div className={styles["left-bottom"]}>
                <Datepicker
                  id="apod-datepicker"
                  value={dayjs(apod.date).format(DATE_FORMAT)}
                  onChange={onDatePickerChange}
                  min={OLDEST_AVAILABLE_DATE}
                  max={dayjs().format(DATE_FORMAT)}
                />
                <div className={styles["btn-group"]}>
                  <Button
                    large
                    rounded
                    type="secondary"
                    to={`/apod/${dayjs(selectedDate)
                      .subtract(1, STR_DAY)
                      .format(DATE_FORMAT)}`}
                    content={<i className="fas fa-chevron-left"></i>}
                  ></Button>

                  <Button
                    large
                    rounded
                    type="secondary"
                    to={`/apod/${dayjs(selectedDate)
                      .add(1, STR_DAY)
                      .format(DATE_FORMAT)}`}
                    content={<i className="fas fa-chevron-right"></i>}
                    disabled={!isValidDate(nextDay)}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    )
  );
};

export default APODPhotoOfTheDay;
