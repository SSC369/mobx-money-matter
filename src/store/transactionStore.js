import { makeAutoObservable } from "mobx";
import { NUMBER_OF_TRANSACTIONS } from "../constants";

class Transaction {
  totalDebitCreditTransactionsData = [];
  transactions = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  get getTransactions() {
    return this.transactions;
  }
  get gettotalDebitCreditTransactionsData() {
    return this.gettotalDebitCreditTransactionsData;
  }
  setTransactions(data) {
    this.transactions = data;
  }
  setTotalDebitCreditTransactionsData(data) {
    this.totalDebitCreditTransactionsData = data;
  }

  addTransaction(transaction) {
    this.transactions = [...this.transactions, transaction];
    console.log(this.totalDebitCreditTransactionsData);
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          console.log(transaction);
          return {
            type: transaction.type,
            sum: data.sum + transaction.amount,
          };
        }
        return data;
      });

    console.log(this.totalDebitCreditTransactionsData);
  }

  deleteTransaction(data) {
    const { id } = data;
    const transaction = this.transactions.find((data) => data.id === id);
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === transaction.type) {
          return {
            type: data.type,
            sum: data.sum + transaction.amount,
          };
        }
        return data;
      });
  }

  updateTransaction(transaction) {
    const { id, type } = transaction;
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
    this.totalDebitCreditTransactionsData =
      this.totalDebitCreditTransactionsData.map((data) => {
        if (data.type === type) {
          return {
            type,
            sum: data.sum + transaction.amount - prevTransactionAmount,
          };
        }
        return data;
      });
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

const transactionStore = new Transaction();
export default transactionStore;
