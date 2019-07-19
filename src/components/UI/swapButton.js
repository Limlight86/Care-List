import React from "react";
import styles from "./swapButton.module.css";
import AuthContext from '../../context/auth-context'

const swapButton = ({ buttonText }) => (
  <AuthContext.Consumer>
    {(context) =>
      <button className={styles.swapButton} onClick={context.handleSwap}>
      {buttonText}
    </button>
    }
  </AuthContext.Consumer>
);

export default swapButton;
