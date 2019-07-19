import React from "react";
import PropTypes from "prop-types";
import styles from "./ShoppingList.module.css";
import ListItem from "../ListItem/ListItem";

const shoppingList = ({ listName, list, buttonText}) => (
  <div className={styles.list}>
    <h3 className={styles.listTitle}>{listName}</h3>
    {list.map((item) => {
      return (
        <ListItem
          text={item.text}
          key={item.id}
          buttonText={buttonText}
          id={item.id}
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
