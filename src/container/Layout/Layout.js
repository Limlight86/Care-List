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
    let todo = { text: text, inCart: false, id: i };
    if (!text.trim()) {
      e.target.elements.groceryItem.value = "";
      return;
    }
    this.setState({ needToBuyList: [...this.state.needToBuyList, todo] });
    i++;
    e.target.elements.groceryItem.value = "";
  };

  handleSwap = id => {
    let { needToBuyList, inCartList } = this.state;
    let swappedItem;
    if (needToBuyList.filter(item => item.id === id).length > 0) {
      swappedItem = needToBuyList.filter(item => {
        return item.id === id;
      });
    } else {
      swappedItem = inCartList.filter(item => {
        return item.id === id;
      });
    }
    if (swappedItem[0].inCart) {
      inCartList = inCartList.filter(item => {
        return item.id !== id;
      });
      swappedItem[0].inCart = false;
      this.setState({
        inCartList,
        needToBuyList: [...this.state.needToBuyList, swappedItem[0]]
      });
    } else {
      needToBuyList = needToBuyList.filter(item => {
        return item.id !== id;
      });
      swappedItem[0].inCart = true;
      this.setState({
        needToBuyList,
        inCartList: [...this.state.inCartList, swappedItem[0]]
      });
    }
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
