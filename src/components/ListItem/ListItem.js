import React from "react";
import PropTypes from "prop-types";
import styles from "./ListItem.module.css";
import SwapButton from "../UI/swapButton";

const listItem = ({ text, handleSwap, buttonText }) => (
  <div className={styles.listItem}>
    <span className={styles.text}>{text}</span>
    <span className={styles.swapButton}>
      <SwapButton handleSwap={handleSwap} buttonText={buttonText} />
    </span>
  </div>
);

listItem.propTypes = {
  text: PropTypes.string,
  handleSwap: PropTypes.func,
  buttonText: PropTypes.string
};

export default listItem;
