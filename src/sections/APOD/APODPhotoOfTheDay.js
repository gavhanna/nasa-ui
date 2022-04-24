import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./APOD.module.scss";
import { Link } from "react-router-dom";
import { DATE_FORMAT } from "./constants";
import cx from "classnames";

export default function PhotoOfTheDay() {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDate, setSelectedDate] = React.useState(params.date);
  const [photoData, setPhotoData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const isValidDate = (date) => {
    const dateObj = dayjs(date);
    return dateObj.isValid() && dateObj.isBefore(dayjs());
  };

  const onDatePickerChange = (e) => {
    const newDate = dayjs(e.target.value).format(DATE_FORMAT);
    console.log(newDate);
    setSelectedDate(newDate);
    navigate(`/apod/${newDate}`);
  };

  const fetchPotd = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_ROOT}/getAPOD?date=${selectedDate}`
    );
    setPhotoData(response.data);
    setLoading(false);
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(params.date);
  }, [params.date]);

  useEffect(() => {
    fetchPotd();
  }, [selectedDate, fetchPotd]);

  const renderMedia = () => {
    if (photoData.media_type === "video") {
      return (
        <div className={styles.videoWrapper}>
          <div className={styles.embedContainer}>
            <iframe
              title={photoData.title}
              src={photoData.url}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else {
      return (
        <img
          src={photoData.url}
          alt={photoData.title}
          className={styles.image}
        />
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    photoData && (
      <main>
        <div className={styles.apod}>
          <div className={styles.right}>
            {renderMedia()}
            {photoData.copyright && <aside>{photoData.copyright}</aside>}
          </div>

          <div className={styles.left}>
            <h2>{photoData.title}</h2>
            <p className="mb-5">{photoData.explanation}</p>

            <div className={styles["left-bottom"]}>
              <input
                type="date"
                id="datepicker"
                name="datepicker"
                value={dayjs(photoData.date).toDate()}
                onChange={onDatePickerChange}
                min="1995-06-16"
                max={dayjs().format(DATE_FORMAT)}
              ></input>
              <div className={styles["btn-group"]}>
                <Link
                  className={styles.btn}
                  to={`/apod/${dayjs(selectedDate)
                    .subtract(1, "day")
                    .format(DATE_FORMAT)}`}
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>

                <Link
                  to={`/apod/${dayjs(selectedDate)
                    .add(1, "day")
                    .format(DATE_FORMAT)}`}
                  className={cx(
                    styles.btn,
                    !isValidDate(
                      dayjs(selectedDate).add(1, "day").format(DATE_FORMAT)
                    )
                      ? styles.disabled
                      : null
                  )}
                >
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
}
