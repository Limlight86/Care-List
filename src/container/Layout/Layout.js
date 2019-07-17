import React, { Component } from "react";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let text = e.target.elements.groceryItem.value;
    let todo = {text: text, inCart : false}
    if (!text.trim()){
      e.target.elements.groceryItem.value = "";
      return;
    }
    this.setState({needToBuyList : [...this.state.needToBuyList, todo]});
    e.target.elements.groceryItem.value = "";
  };

  render() {
    const {needToBuyList, inCartList} = this.state
    return (
      <div className={styles.layout}>
        <h1>Care-List</h1>
        <ShoppingInput addToList={this.handleSubmit} />
        <ListsBody>
          <ShoppingList listName={"Need to Buy"} list={needToBuyList} />
          <ShoppingList listName={"In My Cart"} list={inCartList} />
        </ListsBody>
      </div>
    );
  }
}
export default Layout;
