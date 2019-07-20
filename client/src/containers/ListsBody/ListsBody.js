import React from "react";
import styles from "./ListsBody.module.css";

const listsBody = ({ children }) => (
  <div className={styles.listsBody}>{children}</div>
);

export default listsBody;
