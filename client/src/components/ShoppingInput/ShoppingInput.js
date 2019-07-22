import React, { useState } from "react";
import styles from "./ShoppingInput.module.css";

const ShoppingInput = ({ addToList }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <form className={styles.shoppingInput} onSubmit={e => addToList(e, text, setText)}>
        <input
          className={styles.input}
          name="groceryItem"
          placeholder="specify item"
          autoComplete="off"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>
          Add to List
        </button>
      </form>
    </div>
  );
};

export default ShoppingInput;

