import React, { Component } from "react";
import uuidv4 from "uuid/v4";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ShoppingInput from "../../components/ShoppingInput/ShoppingInput";
import ListsBody from "../ListsBody/ListsBody";
import styles from "./Layout.module.css";
import AuthContext from "../../context/auth-context";
import alphabetize from "../../misc/Alphabetize";

const axios = require('axios');

class Layout extends Component {
  state = {
    needToBuyList: [],
    inCartList: [],
  };

  async componentDidMount(){
    let { data } = await axios.get(`/api`);
    let {needToBuyList, inCartList} = data
    console.log(data)
    this.setState({ needToBuyList, inCartList });
  }

  addGroceryList = (item) =>{
    axios.post('/api', item)
    .then((res)=>{
      let {needToBuyList, inCartList} = res.data
      console.log(needToBuyList, inCartList, "<><><><>><><>")
      this.setState({needToBuyList, inCartList})
    }) 
  }

  handleSubmit = e => {
    e.preventDefault();
    const { needToBuyList, inCartList } = this.state;
    const text = e.target.elements.groceryItem.value;
    const item = { text, inCart: false, id: uuidv4() };
    if (!text.trim()) {
      alert("Please specify an item to add.");
      e.target.elements.groceryItem.value = "";
      return;
    } else if (
      needToBuyList.some(item => item.text.toLowerCase() === text.toLowerCase()) ||
      inCartList.some(item => item.text.toLowerCase() === text.toLowerCase())
    ) {
      alert("Item is already in your list.");
      e.target.elements.groceryItem.value = "";
      return;
    }
    this.setState({ needToBuyList: alphabetize([...needToBuyList, item])});
    this.addGroceryList(item)
    e.target.elements.groceryItem.value = "";
  };

  handleSwap = id => {
    let { needToBuyList, inCartList } = this.state;
    let swapped = [...needToBuyList, ...inCartList].find(i => i.id === id);
    swapped.inCart = !swapped.inCart;
    if (swapped.inCart) {
      needToBuyList = needToBuyList.filter(i => i.id !== id);
      inCartList = alphabetize([...inCartList, swapped]);
    } else {
      inCartList = inCartList.filter(i => i.id !== id);
      needToBuyList = alphabetize([...needToBuyList, swapped]);
    }
    console.log(swapped)
    this.addGroceryList(swapped)
    this.setState({ inCartList, needToBuyList });
  };

  render() {
    const { needToBuyList, inCartList } = this.state;
    return (
      <div className={styles.layout}>
        <h1>Care-List</h1>
        <ShoppingInput addToList={this.handleSubmit} />
        <AuthContext.Provider value={{ handleSwap: this.handleSwap }}>
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
