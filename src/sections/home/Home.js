import React from "react";
import { DefaultLayout } from "../../layouts";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <DefaultLayout sectionRoutes={[]}>
      <section className={styles.hero}>
        <h1>NASAui</h1>
        <p>A friendly user interface for publically available NASA data!</p>
      </section>
    </DefaultLayout>
  );
};

export default Home;
