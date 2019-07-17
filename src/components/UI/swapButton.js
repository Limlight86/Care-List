import React from "react";
import styles from "./swapButton.module.css";

const swapButton = props => {
  return(
    <button className={styles.swapButton} onClick={props.handleSwap}>{props.buttonText}</button>
  )
}

export default swapButton