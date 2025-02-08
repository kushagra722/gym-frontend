import React from "react";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Gym Subscription App</h1>
      <p>Track and manage your subscriptions effortlessly.</p>
      <button className={styles.ctaButton}>Get Started</button>
    </div>
  );
};

export default HomePage;
