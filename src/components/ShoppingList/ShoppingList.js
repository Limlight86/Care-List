import React from "react";
import PropTypes from 'prop-types'
import styles from "./ShoppingList.module.css";
import ListItem from "../ListItem/ListItem";

const shoppingList = props => {
  return (
    <div className={styles.list}>
      <h3 className={styles.listTitle}>{props.listName}</h3>
      {props.list.map((item, i) => {
        return(
          <ListItem 
            text={item.text} 
            key={i}
            buttonText={props.buttonText}
            handleSwap={()=> props.handleSwap(item.id)}   
          />
        ) 
      })}
    </div>
  );
};

shoppingList.propTypes = {
  listName : PropTypes.string,
  list : PropTypes.array,
  text : PropTypes.string,
  key : PropTypes.number,
  buttonText : PropTypes.string,
  handleSwap : PropTypes.func
}

export default shoppingList;
