import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchApod, reset } from "../../../features/APOD/apodSlice";
import {
  DATE_FORMAT,
  STR_DAY,
  MEDIA_TYPE_VIDEO,
  OLDEST_AVAILABLE_DATE,
} from "../APOD.constants";
import dayjs from "dayjs";
import styles from "../APOD.module.scss";
import Datepicker from "../../../components/Datepicker/Datepicker";
import { Button } from "../../../components";

const APODPhotoOfTheDay = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDate, setSelectedDate] = React.useState(params.date);
  const dispatch = useDispatch();

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

  const fetchPotd = useCallback(async () => {
    dispatch(fetchApod(selectedDate));

    return () => {
      dispatch(reset());
    };
  }, [selectedDate, dispatch]);

  useEffect(() => {
    setSelectedDate(params.date);
  }, [params.date]);

  useEffect(() => {
    fetchPotd();
  }, [selectedDate, fetchPotd]);

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
      return <img src={apod.url} alt={apod.title} className={styles.image} />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    apod && (
      <main>
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
                  to={`/apod/${dayjs(selectedDate)
                    .subtract(1, STR_DAY)
                    .format(DATE_FORMAT)}`}
                  content={<i className="fas fa-chevron-left"></i>}
                ></Button>

                <Button
                  large
                  rounded
                  to={`/apod/${dayjs(selectedDate)
                    .add(1, STR_DAY)
                    .format(DATE_FORMAT)}`}
                  content={<i className="fas fa-chevron-right"></i>}
                  disabled={
                    !isValidDate(
                      dayjs(selectedDate).add(1, STR_DAY).format(DATE_FORMAT)
                    )
                  }
                ></Button>
              </div>
              {/* <div className={styles["btn-group"]}>
                <Link
                  className={styles.btn}
                  to={`/apod/${dayjs(selectedDate)
                    .subtract(1, STR_DAY)
                    .format(DATE_FORMAT)}`}
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>

                <Link
                  to={`/apod/${dayjs(selectedDate)
                    .add(1, STR_DAY)
                    .format(DATE_FORMAT)}`}
                  className={cx(
                    styles.btn,
                    !isValidDate(
                      dayjs(selectedDate).add(1, STR_DAY).format(DATE_FORMAT)
                    )
                      ? styles.disabled
                      : null
                  )}
                >
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default APODPhotoOfTheDay;
