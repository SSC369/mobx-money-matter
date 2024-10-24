import { makeAutoObservable } from "mobx";

class Transaction {
  totalDebitCreditTransactionsData = [];
  transactions = [];

  // store data here and pass data from here to all components
  // 1) store data by moving it from context
  //2) remove all mutate functions from code
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get getTransactions() {
    return this.transactions;
  }
  get gettotalDebitCreditTransactionsData() {
    return this.gettotalDebitCreditTransactionsData;
  }

  setTransactions() {}

  setTotalDebitCreditTransactionsData() {}

  // delete transaction from transactions data
  deleteTransaction() {}

  //update a transaction from transactions data
  updateTransaction() {}
}

const transactionStore = new Transaction();
export default transactionStore;
