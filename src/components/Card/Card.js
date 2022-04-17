import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import dayjs from "dayjs";

const Card = ({
  title,
  date,
  explanation,
  hdurl,
  url,
  copyright,
  media_type,
  thumbnail_url,
}) => {
  const limitWordsTo = (str, limit) => {
    return str.length > limit
      ? str.split(" ").slice(0, limit).join(" ") + "..."
      : str;
  };

  const renderMediaTypeIcon = () => {
    if (media_type === "video")
      return <i class="fa-solid fa-video" title={media_type}></i>;
    return <i class="fa-solid fa-image" title={media_type}></i>;
  };

  return (
    <Link to={`/apod/${date}`} className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={thumbnail_url || url || hdurl} alt={title} />
        {renderMediaTypeIcon()}
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
