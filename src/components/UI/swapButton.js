import React from "react";
import styles from "./swapButton.module.css";

const swapButton = props => {
  return(
    <button className={styles.swapButton} onClick={props.handleSwap}>Add to Other List</button>
  )
}

export default swapButton