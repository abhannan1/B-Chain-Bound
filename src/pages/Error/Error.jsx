import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div className={styles.errorWrapper}>
      <h1 className={styles.errorHeading}>ERROR 404 - PAGE NOT FOUND</h1>
      <p className={styles.errorMsg}>
        Go back to{" "}
        <Link to="/">
          <button className={styles.homeLink}>Home</button>
        </Link>
      </p>
    </div>
  );
};

export default Error;
