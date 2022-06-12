// This is a slightly modified version of this brilliant
// GUI Challenge theme switcher by Adam Argyle:
// https://www.youtube.com/watch?v=kZiS1QStIWc

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./ThemeToggle.module.scss";
import cx from "classnames";
import {
  THEME_TYPE_DARK,
  THEME_TYPE_LIGHT,
  THEME_STORAGE_KEY,
} from "../component.constants";

const ThemeToggle = ({ className: passedClasses, ...props }) => {
  const onClick = () => {
    theme.value =
      theme.value === THEME_TYPE_LIGHT ? THEME_TYPE_DARK : THEME_TYPE_LIGHT;

    setPreference();
  };

  const getColorPreference = () => {
    if (localStorage.getItem(THEME_STORAGE_KEY))
      return localStorage.getItem(THEME_STORAGE_KEY);
    else
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? THEME_TYPE_DARK
        : THEME_TYPE_LIGHT;
  };

  const setPreference = () => {
    localStorage.setItem(THEME_STORAGE_KEY, theme.value);
    reflectPreference();
  };

  const reflectPreference = () => {
    document.firstElementChild.setAttribute("data-theme", theme.value);

    document
      .querySelector("#theme-toggle")
      ?.setAttribute("aria-label", theme.value);
  };

  const theme = {
    value: getColorPreference(),
  };

  // set early so no page flashes / CSS is made aware
  reflectPreference();

  // sync with system changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      theme.value = isDark ? THEME_TYPE_DARK : THEME_TYPE_LIGHT;
      setPreference();
    });

  return (
    <button
      {...props}
      className={cx(styles.themeToggle, passedClasses)}
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      onClick={onClick}
    >
      <svg
        className={styles.sunAndMoon}
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className={styles.moon} id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="25" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className="sun"
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className={styles.sunBeams} stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};

ThemeToggle.propTypes = {
  className: PropTypes.string,
};

export default ThemeToggle;
