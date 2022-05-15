import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import styles from "../APOD.module.scss";
import cx from "classnames";
import { DATE_FORMAT } from "../APOD.constants";
import { Card } from "../../../components";

const ITEMS_PER_PAGE = 9;

const APODArchive = () => {
  const [archive, setArchive] = useState([]);
  const [endDate, setEndDate] = useState(dayjs().format(DATE_FORMAT));
  const [startDate, setStartDate] = useState(
    dayjs().subtract(ITEMS_PER_PAGE, "day").format(DATE_FORMAT)
  );
  const [loading, setLoading] = useState(true);

  const fetchArchiveData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_ROOT}/getAPODArchive?start_date=${startDate}&end_date=${endDate}`
    );
    setArchive([...archive, ...response.data.reverse()]);
    setLoading(false);
  }, [startDate, endDate, archive]);

  useEffect(() => {
    fetchArchiveData();
    // eslint-disable-next-line
  }, [startDate, endDate]);

  const onLoadMore = () => {
    const newEndDate = dayjs(startDate).subtract(1, "day").format(DATE_FORMAT);
    setEndDate(newEndDate);
    setStartDate(
      dayjs(newEndDate).subtract(ITEMS_PER_PAGE, "day").format(DATE_FORMAT)
    );
  };

  const getCardSubtitle = (item) => (
    <React.Fragment>
      {dayjs(item.date).format("MMMM D, YYYY")}{" "}
      {item.copyright && <span>&copy; {item.copyright}</span>}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <h2>Archive</h2>
      <p className="mb-3">
        Each day a different image or photograph of our fascinating universe is
        featured, along with a brief explanation written by a professional
        astronomer.
      </p>
      <main className={styles.archive}>
        {archive &&
          archive.map((item, idx) => (
            <Card
              key={idx}
              bodyText={item.explanation}
              title={item.title}
              linkTo={`/apod/${item.date}`}
              imgSrc={item.thumbnail_url || item.url || item.hdurl}
              limitDescriptionTo={20}
              subtitle={getCardSubtitle(item)}
              mediaType={item.media_type}
            />
          ))}
      </main>
      <button
        className={cx(styles.loadMore, "mx-auto my-3")}
        onClick={onLoadMore}
        disabled={loading}
      >
        <i className={cx("fa-solid fa-rocket mr-2", loading && "shake")}></i>
        {loading ? "Loading..." : "Load More"}
      </button>
    </React.Fragment>
  );
};

export default APODArchive;
