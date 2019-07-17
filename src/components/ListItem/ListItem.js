import React from 'react';
import styles from './ListItem.module.css'
import SwapButton from '../UI/swapButton'

const listItem = props => {
  return(
    <div className={styles.listItem}>
      <span className={styles.text}>{props.text}</span>
      <span className={styles.swapButton}><SwapButton/></span>
    </div>
  )
}

export default listItem