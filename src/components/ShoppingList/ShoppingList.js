import React from "react";
import PropTypes from "prop-types";
import styles from "./ShoppingList.module.css";
import ListItem from "../ListItem/ListItem";

const shoppingList = ({ listName, list, buttonText, handleSwap }) => (
  <div className={styles.list}>
    <h3 className={styles.listTitle}>{listName}</h3>
    {list.map((item, i) => {
      return (
        <ListItem
          text={item.text}
          key={i}
          buttonText={buttonText}
          handleSwap={() => handleSwap(item.id)}
        />
      );
    })}
  </div>
);

shoppingList.propTypes = {
  listName: PropTypes.string,
  list: PropTypes.array,
  text: PropTypes.string,
  key: PropTypes.number,
  buttonText: PropTypes.string,
  handleSwap: PropTypes.func
};

export default shoppingList;
