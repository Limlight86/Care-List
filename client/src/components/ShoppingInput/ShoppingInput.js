import React from "react";
import styles from "./ShoppingInput.module.css";

const shoppingInput = ({ addToList }) => (
  <div>
    <form className={styles.shoppingInput} onSubmit={addToList}>
      <input
        className={styles.input}
        name="groceryItem"
        placeholder="specify item"
        autoComplete="off"
      />
      <button type="submit" className={styles.addButton}>
        Add to List
      </button>
    </form>
  </div>
);

export default shoppingInput;
