const inputValidation = (e, state) => {
  let text = e.target.elements.groceryItem.value;
  if (!text.trim()) {
    alert("Please specify an item to add.");
    e.target.elements.groceryItem.value = "";
    return false;
  } else if (
    state.needToBuyList.some(item => item.text.toLowerCase() === text.toLowerCase()) ||
    state.inCartList.some(item => item.text.toLowerCase() === text.toLowerCase())
  ) {
    alert("Item is already in your list.");
    e.target.elements.groceryItem.value = "";
    return false;
  } else {
    return true
  }

}
export default inputValidation