import React, { Component } from "react";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";

let i = 0;

const alphabetize = (arr) =>{
  arr.sort((a, b) => {
    if (!a.text || !a.text[0] || !a.text[0] || !b.text || !b.text[0] || !b.text[0]) {
      return 0;
    } else if (a.text[0].toLowerCase() < b.text[0].toLowerCase()) {
      return -1;
    } else if (a.text[0].toLowerCase() > b.text[0].toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  })
  return arr
}

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let { needToBuyList, inCartList } = this.state;
    let text = e.target.elements.groceryItem.value;
    let todo = { text, inCart: false, id: i };
    if (!text.trim()) {
      alert("Please specify an item to add.");
      e.target.elements.groceryItem.value = "";
      return;
    } else if (
      needToBuyList.filter(item => item.text === text).length||
      inCartList.filter(item => item.text === text).length
    ) {
      alert("Item is already in your list.");
      e.target.elements.groceryItem.value = "";
      return;
    }

    this.setState({
      needToBuyList: alphabetize([...this.state.needToBuyList, todo])
    });
    i++;
    e.target.elements.groceryItem.value = "";
  };

  handleSwap = id => {
    let { needToBuyList, inCartList } = this.state;
    let swappedItem;
    if (needToBuyList.filter(item => item.id === id).length) {
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
        needToBuyList: alphabetize([...this.state.needToBuyList, swappedItem[0]])
      });
    } else {
      needToBuyList = needToBuyList.filter(item => {
        return item.id !== id;
      });
      swappedItem[0].inCart = true;
      this.setState({
        needToBuyList,
        inCartList: alphabetize([...this.state.inCartList, swappedItem[0]])
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
            buttonText="Add to Cart"
          />
          <ShoppingList
            listName={"In My Cart"}
            list={inCartList}
            handleSwap={this.handleSwap}
            buttonText="Remove from Cart"
          />
        </ListsBody>
      </div>
    );
  }
}
export default Layout;
