import React, { Component } from "react";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";

let i = 0;

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let text = e.target.elements.groceryItem.value;
    let todo = { text: text, id: i };
    if (!text.trim()) {
      e.target.elements.groceryItem.value = "";
      return;
    }
    this.setState({ needToBuyList: [...this.state.needToBuyList, todo] });
    i++;
    e.target.elements.groceryItem.value = "";
  };

  handleSwap = id => {
    let { needToBuyList } = this.state;
    let swappedItem = needToBuyList.filter(item => {
      return item.id === id;
    });

    needToBuyList = needToBuyList.filter(item => {
      return item.id !== id;
    });
    this.setState({ needToBuyList, inCartList:[...this.state.inCartList, swappedItem[0]] });
  };

  render() {
    const { needToBuyList, inCartList } = this.state;
    return (
      <div className={styles.layout}>
        <h1>Care-List</h1>
        <ShoppingInput addToList={this.handleSubmit} />
        <ListsBody>
          <ShoppingList
            listName={"Need to Buy"}
            list={needToBuyList}
            handleSwap={this.handleSwap}
          />
          <ShoppingList
            listName={"In My Cart"}
            list={inCartList}
            handleSwap={this.handleSwap}
          />
        </ListsBody>
      </div>
    );
  }
}
export default Layout;
