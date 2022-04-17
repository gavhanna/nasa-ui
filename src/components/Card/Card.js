import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import dayjs from "dayjs";

const Card = ({ title, date, explanation, hdurl, url, copyright }) => {
  const limitCharactersTo = (str, limit) => {
    return str.length > limit ? str.substring(0, limit - 3) + "..." : str;
  };

  const limitWordsTo = (str, limit) => {
    return str.length > limit
      ? str.split(" ").slice(0, limit).join(" ") + "..."
      : str;
  };

  return (
    <Link to={`/apod/${date}`} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={url || hdurl} alt={title} />
      </div>
      <div className={styles.body}>
        <h5>{title}</h5>
        <p className={styles.subtitle}>
          {dayjs(date).format("MMMM D, YYYY")}{" "}
          {copyright && <span>&copy; {copyright}</span>}
        </p>
        <p>{limitWordsTo(explanation, 10)}</p>
      </div>
    </Link>
  );
};

export default Card;
