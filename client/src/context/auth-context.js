import React from 'react';

const authContext = React.createContext({
  handleSwap : () => {},
  handleDelete : () => {}
});

export default authContext;