import React, { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import styles from "./APOD.module.scss";
import { Link } from "react-router-dom";
import DatePicker from "react-widgets/DatePicker";
import cx from "classnames";
import "react-widgets/styles.css";

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

  const onDatePickerChange = (date) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    console.log(newDate);
    setSelectedDate(newDate);
    navigate(`/apod/${newDate}`);
  };

  const fetchPotd = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${selectedDate}`
    );
    console.log("fetchPotd", selectedDate);
    setPhotoData(response.data);
    setLoading(false);
  }, [selectedDate]);

  // set selectedDate on route param change
  useEffect(() => {
    setSelectedDate(params.date);
  }, params.date);

  useEffect(() => {
    fetchPotd();
  }, [selectedDate]);

  const renderMedia = () => {
    if (photoData.media_type === "video") {
      return (
        <div className={styles.videoWrapper}>
          <div className={styles.embedContainer}>
            <iframe
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
            <div>
              <p>{photoData.explanation}</p>
            </div>

            <div className={styles["left-bottom"]}>
              <DatePicker
                dropUp
                max={dayjs().toDate()}
                onChange={onDatePickerChange}
                value={dayjs(photoData.date).toDate()}
              />
              <div className={styles["btn-group"]}>
                <Link
                  className={styles.btn}
                  to={`/apod/${dayjs(selectedDate)
                    .subtract(1, "day")
                    .format("YYYY-MM-DD")}`}
                >
                  <i className="fas fa-chevron-left"></i>
                </Link>

                <Link
                  to={`/apod/${dayjs(selectedDate)
                    .add(1, "day")
                    .format("YYYY-MM-DD")}`}
                  className={cx(
                    styles.btn,
                    !isValidDate(
                      dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD")
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
