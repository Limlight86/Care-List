import React from "react";
import PropTypes from "prop-types";
import styles from "./ListItem.module.css";
import SwapButton from "../UI/swapButton";

const listItem = ({ text, buttonText, id }) => (
  <div className={styles.listItem}>
    <span className={styles.text}>{text}</span>
    <span className={styles.swapButton}>
      <SwapButton buttonText={buttonText} id={id} />
    </span>
  </div>
);

listItem.propTypes = {
  text: PropTypes.string,
  handleSwap: PropTypes.func,
  buttonText: PropTypes.string
};

export default listItem;
