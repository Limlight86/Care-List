import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import { ShoppingInput, ShoppingList } from '../../components'
import { ListsBody } from '../../containers';
import styles from "./Layout.module.css";
import AuthContext from "../../context/auth-context";
import { alphabetize, inputValidation } from '../../util';

const axios = require("axios");

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: []
  };

  componentDidMount() {
    this.fetchLists()
  }

  fetchLists = async () => {
    const { data } = await axios.get(`/api`);
    const { needToBuyList, inCartList } = data;
    this.setState({ needToBuyList: alphabetize(needToBuyList), inCartList: alphabetize(inCartList) });
  }

  addGroceryList = async item => {
    await axios.post("/api", item);
  };

  handleSubmit = (e, input, setInput) => {
    e.preventDefault();
    const { needToBuyList, inCartList } = this.state;
    const text = input
    const item = { text, inCart: false, id: uuidv4() };
    if (!inputValidation(input, setInput, this.state)){
      return
    }
    const added = { needToBuyList: alphabetize([...needToBuyList, item]),inCartList};
    this.setState(added, () => this.addGroceryList(this.state));
    setInput("")
  };

  handleSwap = id => {
    const { needToBuyList, inCartList } = this.state;
    const swapped = [...needToBuyList, ...inCartList].find(i => i.id === id);
    const updatedItem = { ...swapped, inCart : !swapped.inCart};
    const [listToFilter, listToAppend] = swapped.inCart ? ['inCartList', 'needToBuyList'] : ['needToBuyList', 'inCartList'];
    const filteredList = this.state[listToFilter].filter(i => i.id !== id);
    const appendedList = alphabetize([...this.state[listToAppend], updatedItem]);
    const changed = { [listToFilter]: filteredList, [listToAppend]: appendedList };
    this.setState(changed, () => this.addGroceryList(this.state));
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
      const changed = { inCartList, needToBuyList };
      this.setState(changed, () => this.addGroceryList(this.state));
    };
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
      </div>
    );
  };
}

export default Layout;
