import React from "react";
import styles from './Layout.module.css'

const layout = props => (
  <div className={styles.layout}>
    {props.children}
  </div>
)

export default layout
