import { makeAutoObservable } from "mobx";
import { NUMBER_OF_TRANSACTIONS } from "../constants";

class TransactionStore {
  totalDebitCreditTransactionsData = [];
  transactions = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get getTransactions() {
    return this.transactions;
  }
  get gettotalDebitCreditTransactionsData() {
    return this.totalDebitCreditTransactionsData;
  }
  setTransactions(data) {
    this.transactions = data;
  }
  setTotalDebitCreditTransactionsData(data) {
    this.totalDebitCreditTransactionsData = data;
  }

  AddAmountTotalDebitCreditData(transaction, prev) {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          return {
            type: transaction.type,
            sum: data.sum + transaction.amount - prev,
          };
        }
        return data;
      });
  }

  removeAmountTotalDebitCreditData(transaction) {
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          console.log(transaction);
          return {
            type: transaction.type,
            sum: data.sum - transaction.amount,
          };
        }
        return data;
      });
  }

  addTransaction(transaction) {
    this.transactions = [...this.transactions, transaction];
    this.AddAmountTotalDebitCreditData(transaction, 0);
  }

  deleteTransaction(data) {
    const { id } = data;
    const transaction = this.transactions.find((data) => data.id === id);
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    this.removeAmountTotalDebitCreditData(transaction);
  }

  updateTransaction(transaction) {
    const { id } = transaction;
    let prevTransactionAmount;
    let filteredTransactions = this.transactions.filter((data) => {
      const { amount } = data;
      if (id !== data.id) {
        return data;
      }
      prevTransactionAmount = amount;
    });
    filteredTransactions = [...filteredTransactions, transaction];
    this.transactions = filteredTransactions;
    this.AddAmountTotalDebitCreditData(transaction, prevTransactionAmount);
  }

  get getLatestTransactions() {
    let latestTransactions = [];
    const transactions = this.transactions.slice();
    latestTransactions = transactions
      ?.sort((first, second) => new Date(second.date) - new Date(first.date))
      .slice(0, NUMBER_OF_TRANSACTIONS);
    return latestTransactions;
  }
}

export default new TransactionStore();
