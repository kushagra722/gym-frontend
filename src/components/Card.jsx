import React from "react";
import styles from "../styles/Card.module.css";

const Card = ({ name, status, expiry }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>Status: {status}</p>
      <p>Expiry: {expiry}</p>
    </div>
  );
};

export default Card;
