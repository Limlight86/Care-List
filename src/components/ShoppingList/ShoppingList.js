import React from "react";
import styles from "./ShoppingList.module.css";
import ListItem from "../ListItem/ListItem";

const shoppingList = props => {
  return (
    <div className={styles.list}>
      <h3 className={styles.listTitle}>{props.listName}</h3>
      {props.list.map((item, i) => {
        console.log("------->" + item.id)
        return <ListItem text={item.text} handleSwap={()=> props.handleSwap(item.id)} key={i} />;
      })}
    </div>
  );
};

export default shoppingList;
