import React, { Component } from "react";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";
import AuthContext from '../../context/auth-context'
import alphabetize from '../../misc/Alphabetize'

let i = 0;

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  handleSubmit = e => {
    e.preventDefault();
    const { needToBuyList, inCartList } = this.state;
    const text = e.target.elements.groceryItem.value;
    const todo = { text, inCart: false, id: i };
    if (!text.trim()) {
      alert("Please specify an item to add.");
      e.target.elements.groceryItem.value = "";
      return;
    } else if (
      needToBuyList.filter(item => item.text === text).length ||
      inCartList.filter(item => item.text === text).length
      ){
      alert("Item is already in your list.");
      e.target.elements.groceryItem.value = "";
      return;
    }

    this.setState({
      needToBuyList: alphabetize([...needToBuyList, todo])
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
        needToBuyList: alphabetize([...needToBuyList, swappedItem[0]])
      });
    } else {
      needToBuyList = needToBuyList.filter(item => {
        return item.id !== id;
      });
      swappedItem[0].inCart = true;
      this.setState({
        needToBuyList,
        inCartList: alphabetize([...inCartList, swappedItem[0]])
      });
    }
  };

  render() {
    const { needToBuyList, inCartList } = this.state;
    return (
      <div className={styles.layout}>
        <h1>Care-List</h1>
        <ShoppingInput addToList={this.handleSubmit} />
        <AuthContext.Provider value={ {handleSwap : this.handleSwap} }>
          <ListsBody>
            <ShoppingList
              listName="Need to Buy"
              list={needToBuyList}
            />
            <ShoppingList
              listName="In My Cart"
              list={inCartList}
            />
          </ListsBody>
        </AuthContext.Provider>
      </div>
    );
  }
}
export default Layout;
