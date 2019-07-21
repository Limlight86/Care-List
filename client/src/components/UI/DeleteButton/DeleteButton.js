import React from "react";
import styles from "./DeleteButton.module.css";
import AuthContext from '../../../context/auth-context'

const deleteButton = ({ id }) => (
  <AuthContext.Consumer>
    {(context) =>
      <button className={styles.deleteButton} onClick={() => context.handleDelete(id)}>
        X
      </button>
    }
  </AuthContext.Consumer>
);

export default deleteButton;
