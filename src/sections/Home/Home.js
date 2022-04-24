import React from "react";
import { Link } from "react-router-dom";
import { DefaultLayout } from "../../layouts";
import styles from "./Home.module.scss";
import cx from "classnames";

const Home = () => {
  return (
    <DefaultLayout sectionRoutes={[]}>
      <section className={cx(styles.hero, "mb-7")}>
        <div>
          <h1>NASAui</h1>
          <p>
            A friendly user interface for exploring publically available NASA
            data, images and information.
          </p>
        </div>
        <img
          src="/assets/undraw_stars_re_6je7.svg"
          alt=""
          role="presentation"
        />
      </section>
      <hr />
      <main className={styles.home}>
        <section>
          <h2>Currently Available</h2>
          <ul className="fa-ul">
            <li>
              <span class="fa-li">
                <i class="fa-solid fa-sun"></i>
              </span>
              <Link to="/apod">Astronomy Picture of the Day</Link>
            </li>
          </ul>
        </section>
        <section>
          <h2>Coming Soon</h2>
          <ul className="fa-ul">
            <li>
              <span class="fa-li">
                <i class="fa-solid fa-moon"></i>
              </span>
              Near Earth Objects
            </li>
            <li>
              <span class="fa-li">
                <i class="fa-solid fa-moon"></i>
              </span>
              Exoplanet Database
            </li>
            <li>
              <span class="fa-li">
                <i class="fa-solid fa-moon"></i>
              </span>
              Mars Weather Service
            </li>
          </ul>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Home;
