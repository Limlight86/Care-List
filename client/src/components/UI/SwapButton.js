import React from "react";
import styles from "./SwapButton.module.css";
import AuthContext from '../../context/auth-context'

const swapButton = ({ buttonText, id }) => (
  <AuthContext.Consumer>
    {(context) =>
      <button className={styles.swapButton} onClick={() => context.handleSwap(id)}>
        {buttonText}
      </button>
    }
  </AuthContext.Consumer>
);

export default swapButton;
