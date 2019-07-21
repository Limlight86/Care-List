import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";
import AuthContext from "../../context/auth-context";
import alphabetize from "../../util/Alphabetize";
import inputValidation from "../../util/InputValidation";

const axios = require("axios");

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  async componentDidMount() {
    const { data } = await axios.get(`/api`);
    const { needToBuyList, inCartList } = data;
    this.setState({ needToBuyList: alphabetize(needToBuyList), inCartList: alphabetize(inCartList) });
  }

  addGroceryList = async item => {
    await axios.post("/api", item);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { needToBuyList, inCartList } = this.state;
    const text = e.target.elements.groceryItem.value;
    const item = { text, inCart: false, id: uuidv4() };
    if (!inputValidation(e, this.state)){
      return
    }
    const added = { needToBuyList: alphabetize([...needToBuyList, item]),inCartList};
    this.setState(added);
    this.addGroceryList(added);
    e.target.elements.groceryItem.value = "";
  };

  handleSwap = id => {
    let { needToBuyList, inCartList } = this.state;
    const swapped = [...needToBuyList, ...inCartList].find(i => i.id === id);
    swapped.inCart = !swapped.inCart;
    if (swapped.inCart) {
      needToBuyList = needToBuyList.filter(i => i.id !== id);
      inCartList = alphabetize([...inCartList, swapped]);
    } else {
      inCartList = inCartList.filter(i => i.id !== id);
      needToBuyList = alphabetize([...needToBuyList, swapped]);
    };
    const added = { inCartList, needToBuyList };
    this.setState(added);
    this.addGroceryList(added);
  };

  handleDelete = id => {
    if(window.confirm("Delete this Item?")){
      let { needToBuyList, inCartList } = this.state;
      const deleted = [...needToBuyList, ...inCartList].find(i => i.id === id);
      if (deleted.inCart){
        inCartList = inCartList.filter(i => i.id !== deleted.id);
      } else {
        needToBuyList = needToBuyList.filter( i => i.id !== deleted.id);
      };
      const added = { inCartList, needToBuyList };
      this.setState(added);
      this.addGroceryList(added);
    }
  };

  render() {
    const { needToBuyList, inCartList } = this.state;
    return (
      <div className={styles.layout}>
        <h1>Care-List</h1>
        <ShoppingInput addToList={this.handleSubmit} />
        <AuthContext.Provider value={{ handleSwap: this.handleSwap, handleDelete : this.handleDelete }}>
          <ListsBody>
            <ShoppingList listName="Need to Buy" list={needToBuyList} />
            <ShoppingList listName="In My Cart" list={inCartList} />
          </ListsBody>
        </AuthContext.Provider>
        <h1>{this.state.express}</h1>
      </div>
    );
  }
}
export default Layout;
