import React, { useCallback, useEffect, useState } from "react";
import { DATE_FORMAT } from "../APOD.constants";
import { Card } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchArchiveItems, reset } from "../../../features/APOD/apodSlice";
import dayjs from "dayjs";
import styles from "../APOD.module.scss";
import cx from "classnames";

const ITEMS_PER_PAGE = 9;

const APODArchive = () => {
  const [endDate, setEndDate] = useState(dayjs().format(DATE_FORMAT));
  const [startDate, setStartDate] = useState(
    dayjs().subtract(ITEMS_PER_PAGE, "day").format(DATE_FORMAT)
  );
  const dispatch = useDispatch();

  const { apodArchive, isLoading } = useSelector((state) => state.apod);

  const fetchArchiveData = useCallback(async () => {
    dispatch(fetchArchiveItems({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  useEffect(() => {
    fetchArchiveData();
    return () => {
      dispatch(reset());
    };
  }, [startDate, fetchArchiveData, dispatch]);

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
        {apodArchive &&
          apodArchive.map((item, idx) => (
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
        disabled={isLoading}
      >
        <i className={cx("fa-solid fa-rocket mr-2", isLoading && "shake")}></i>
        {isLoading ? "Loading..." : "Load More"}
      </button>
    </React.Fragment>
  );
};

export default APODArchive;
