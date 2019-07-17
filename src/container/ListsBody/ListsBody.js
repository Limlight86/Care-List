import React from "react";
import styles from './ListsBody.module.css'

const listsBody = props => (
  <div className={styles.listsBody}>
    {props.children}
  </div>
)

export default listsBody
