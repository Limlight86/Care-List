import React, { Component } from "react";
import ShoppingList from "./components/ShoppingList/ShoppingList";
import ShoppingInput from './components/ShoppingInput/ShoppingInput'
import Layout from './container/Layout/Layout'
import ListsBody from "./container/Layout/ListsBody/ListsBody";

class App extends Component {
  render() {
    return (
      <Layout>
        <h1>Care-List</h1>
        <ShoppingInput />
        <ListsBody>
          <ShoppingList listName={"Grocery List"} />
          <ShoppingList listName={"Shopping Cart"} />
        </ListsBody>
      </Layout>
    );
  }
}

export default App;
