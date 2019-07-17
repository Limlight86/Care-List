import React from "react";
import styles from "./swapButton.module.css";

const swapButton = ({ handleSwap, buttonText }) => (
  <button className={styles.swapButton} onClick={handleSwap}>
    {buttonText}
  </button>
);

export default swapButton;
