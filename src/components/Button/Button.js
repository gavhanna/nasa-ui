import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import cx from "classnames";
import { Link } from "react-router-dom";

const Button = ({
  content,
  icon,
  iconPositionEnd,
  large,
  to,
  disabled,
  rounded,
  ...props
}) => {
  const getIcon = useMemo(
    () => <i className={cx(icon, styles.icon)} />,
    [icon]
  );

  const classlist = useMemo(
    () =>
      cx(styles.btn, {
        [styles.large]: large,
        [styles.iconPositionEnd]: iconPositionEnd,
        [styles.rounded]: rounded,
      }),
    [large, iconPositionEnd, rounded]
  );

  const buttonContent = useMemo(
    () => (
      <>
        {icon && !iconPositionEnd && getIcon}
        <span>{content}</span>
        {icon && iconPositionEnd && getIcon}
      </>
    ),
    [content, icon, iconPositionEnd, getIcon]
  );

  return to ? (
    <Link
      to={!disabled && to}
      {...props}
      disabled={disabled}
      className={classlist}
    >
      {buttonContent}
    </Link>
  ) : (
    <button {...props} className={classlist} disabled={disabled}>
      {buttonContent}
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.string,
  iconPositionEnd: PropTypes.bool,
  large: PropTypes.bool,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  content: "",
  icon: "",
  iconPositionEnd: false,
  large: false,
  to: "",
  disabled: false,
  rounded: false,
};

export default Button;
