import React from "react";
import styles from "./ShoppingInput.module.css";

const shoppingInput = props => {
  return (
    <div>
      <form className={styles.shoppingInput}>
        <input className={styles.input} />
        <button className={styles.addButton}>Add to List</button>
      </form>
    </div>
  );
};

export default shoppingInput;
