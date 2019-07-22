import React from "react";
import PropTypes from "prop-types";
import styles from "./ShoppingList.module.css";
import { ListItem } from '../../components';

const shoppingList = ({ listName, list}) => {
  let buttonText = listName === "Need to Buy" ? "Add to Cart" : "Remove from Cart"
  return(
    <div className={styles.list}>
    <h3 className={styles.listTitle}>{listName}</h3>
    {list.map(item => {
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
  ) 
};

shoppingList.propTypes = {
  listName: PropTypes.string,
  list: PropTypes.array,
  text: PropTypes.string,
  key: PropTypes.number,
  buttonText: PropTypes.string,
  id: PropTypes.number
};

export default shoppingList;
