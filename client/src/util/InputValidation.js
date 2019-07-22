const inputValidation = (input, setInput, state) => {
  let text = input
  if (!text.trim()) {
    alert("Please specify an item to add.");
    setInput("");
    return false;
  } else if (
    state.needToBuyList.some(item => item.text.toLowerCase() === text.toLowerCase()) ||
    state.inCartList.some(item => item.text.toLowerCase() === text.toLowerCase())
  ) {
    alert("Item is already in your list.");
    setInput("");
    return false;
  } else {
    return true
  }

}
export default inputValidation