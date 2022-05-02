import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import { MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO } from "../component.constants";
import cx from "classnames";

const Card = ({
  title,
  subtitle,
  bodyText,
  linkTo,
  imgSrc,
  mediaType,
  limitDescriptionTo,
}) => {
  const limitWordsTo = (str, limit) => {
    return str.length > limit
      ? str.split(" ").slice(0, limit).join(" ") + "..."
      : str;
  };

  const renderMediaTypeIcon = () => {
    if (mediaType === MEDIA_TYPE_VIDEO)
      return <i className="fa-solid fa-video" title={mediaType}></i>;
    return <i className="fa-solid fa-image" title={mediaType}></i>;
  };

  const renderCardContent = () => (
    <React.Fragment>
      <div className={styles.imgContainer}>
        {imgSrc && <img src={imgSrc} alt={title} />}
        {mediaType && renderMediaTypeIcon()}
      </div>
      <div className={styles.body}>
        <h5>{title}</h5>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <p>{limitWordsTo(bodyText, limitDescriptionTo)}</p>
      </div>
    </React.Fragment>
  );

  return linkTo ? (
    <Link to={linkTo} className={cx(styles.card, styles.linkCard)}>
      {renderCardContent()}
    </Link>
  ) : (
    <div className={styles.card}>{renderCardContent()}</div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  bodyText: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  imgSrc: PropTypes.string,
  mediaType: PropTypes.oneOf([MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO]),
  limitDescriptionTo: PropTypes.number,
};

export default Card;
