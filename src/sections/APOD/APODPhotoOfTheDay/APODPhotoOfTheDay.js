import React, { useCallback, useEffect, useMemo, Fragment } from "react";
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
import {
  Datepicker,
  SwipeContainer,
  Button,
  Spinner,
} from "../../../components";

const photoswipeOptions = {
  wheelToZoom: true,
};

const APODPhotoOfTheDay = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDate, setSelectedDate] = React.useState(params.date);
  const dispatch = useDispatch();
  const [imageDimensions, setImageDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  const { apod, isLoading } = useSelector((state) => state.apod);

  useEffect(() => {
    setSelectedDate(params.date);
  }, [params.date]);

  const fetchPotd = useCallback(async () => {
    dispatch(fetchApod(selectedDate));

    return () => {
      dispatch(reset());
      setImageDimensions({ width: 0, height: 0 });
    };
  }, [selectedDate, dispatch]);

  useEffect(() => {
    fetchPotd();
  }, [selectedDate, fetchPotd]);

  const isValidDate = (date) => {
    const dateObj = dayjs(date);
    return dateObj.isValid() && dateObj.isBefore(dayjs());
  };

  const onDatePickerChange = (newDate) => {
    setSelectedDate(newDate);
    navigate(`/apod/${newDate}`);
  };

  const nextDay = useMemo(() => {
    return dayjs(selectedDate).add(1, STR_DAY).format(DATE_FORMAT);
  }, [selectedDate]);

  const prevDay = useMemo(() => {
    return dayjs(selectedDate).subtract(1, STR_DAY).format(DATE_FORMAT);
  }, [selectedDate]);

  const canSwipeLeft = useMemo(() => isValidDate(prevDay), [prevDay]);
  const canSwipeRight = useMemo(() => isValidDate(nextDay), [nextDay]);

  const onImgLoad = ({ target: img }) => {
    const { naturalHeight, naturalWidth } = img;
    setImageDimensions({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const onSwipeRight = () => {
    navigate(`/apod/${nextDay}`);
  };

  const onSwipeLeft = () => {
    navigate(`/apod/${prevDay}`);
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    apod && (
      <Fragment>
        <SwipeContainer
          className={styles.apodMain}
          onSwipeRight={onSwipeRight}
          onSwipeLeft={onSwipeLeft}
          canSwipeLeft={canSwipeLeft}
          canSwipeRight={canSwipeRight}
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
        </SwipeContainer>
      </Fragment>
    )
  );
};

export default APODPhotoOfTheDay;
