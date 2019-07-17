import React from 'react';
import styles from './ShoppingList.module.css'
import ListItem from '../ListItem/ListItem'

const shoppingList = props => {
  return(
    <div className={styles.list}>
      <h3 className={styles.listTitle}>{props.listName}</h3>
      <ListItem text="This is a list item"/>
    </div>
  )
}

export default shoppingList