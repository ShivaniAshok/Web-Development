const transactionFormElem = document.getElementById('transactionForm');

const addTransaction = (e) => {
  e.preventDefault();
};

transactionFormElem.addEventListener('submit', addTransaction);
