const alphabetize = (arr) =>{
  arr.sort((a, b) => {
    if (!a.text || !b.text) {
      return 0;
    } else if (a.text.toLowerCase() < b.text.toLowerCase()) {
      return -1;
    } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  })
  return arr;
}

export default alphabetize