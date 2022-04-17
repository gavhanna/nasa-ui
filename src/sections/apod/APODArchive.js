import React, { useCallback, useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Card } from "../../components";
import styles from "./APOD.module.scss";
import cx from "classnames";

const ITEMS_PER_PAGE = 9;
const DATE_FORMAT = "YYYY-MM-DD";

export default function Archive() {
  const [archive, setArchive] = useState([]);
  const [endDate, setEndDate] = useState(dayjs().format(DATE_FORMAT));
  const [startDate, setStartDate] = useState(
    dayjs().subtract(ITEMS_PER_PAGE, "day").format(DATE_FORMAT)
  );
  const [loading, setLoading] = useState(true);

  const fetchArchiveData = useCallback(async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?thumbs=true&start_date=${startDate}&end_date=${endDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
    );
    setArchive([...archive, ...response.data.reverse()]);
    setLoading(false);
  }, [startDate, endDate]);

  useEffect(() => {
    fetchArchiveData();
  }, [startDate, endDate]);

  const onLoadMore = () => {
    const newEndDate = dayjs(startDate).subtract(1, "day").format(DATE_FORMAT);
    setEndDate(newEndDate);
    setStartDate(
      dayjs(newEndDate).subtract(ITEMS_PER_PAGE, "day").format(DATE_FORMAT)
    );
  };

  return (
    <React.Fragment>
      <p className="mb-3">
        Each day a different image or photograph of our fascinating universe is
        featured, along with a brief explanation written by a professional
        astronomer.
      </p>
      <main className={styles.archive}>
        {archive && archive.map((item, idx) => <Card key={idx} {...item} />)}
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
}
