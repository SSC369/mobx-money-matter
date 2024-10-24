import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

import {
  API_ALL_TRANSACTIONS,
  API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
  INITIAL_ACTIVE_TAB,
  SUCCESS_OK,
  TRANSACTIONS_LIMIT,
  TRANSACTIONS_OFFSET,
} from "../constants";
import { TRANSACTION_HEADERS } from "../utils/headerUtils";
import userStore from "../store/UserStore";
import transactionStore from "../store/TransactionStore";

export const TransactionContext = createContext();

export const TransactionContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(INITIAL_ACTIVE_TAB);
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);
  const { userId } = userStore.userContextData;
  if (!userId) {
    return <></>;
  }

  const transactionsFetcher = async (url) => {
    try {
      const res = await axios({
        method: "get",
        baseURL: url,
        params: {
          limit: TRANSACTIONS_LIMIT,
          offset: TRANSACTIONS_OFFSET,
        },
        headers: TRANSACTION_HEADERS(userId),
      });
      if (res.status === SUCCESS_OK) {
        const { data } = res;
        const { transactions } = data;
        return transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
  } = useSWR(API_ALL_TRANSACTIONS, transactionsFetcher);

  useEffect(() => {
    if (!isTransactionsLoading) {
      transactionStore.setTransactions(transactions);
    }
  }, [isTransactionsLoading]);

  const totalDebitCreditTransactionsFetcher = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          ...TRANSACTION_HEADERS(userId),
        },
      });
      if (res.status === SUCCESS_OK) {
        const { data } = res;
        const { totals_credit_debit_transactions } = data;
        return totals_credit_debit_transactions;
      } else {
        toast.error("Responded with status" + res.status);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const {
    data: totalDebitCreditTransactionsData,
    isLoading: isTotalDebitCreditTransactionsLoading,
    error: totalDebitCreditTransactionsError,
  } = useSWR(
    API_TOTAL_DEBIT_CREDIT_TRANSACTIONS,
    totalDebitCreditTransactionsFetcher
  );

  useEffect(() => {
    if (!isTotalDebitCreditTransactionsLoading) {
      transactionStore.setTotalDebitCreditTransactionsData(
        totalDebitCreditTransactionsData
      );
    }
  }, [isTotalDebitCreditTransactionsLoading]);

  return (
    <TransactionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isTransactionsLoading,
        transactions,
        totalDebitCreditTransactionsData,
        isTotalDebitCreditTransactionsLoading,
        showEditTransactionModal,
        setShowEditTransactionModal,
        deleteTransactionId,
        setDeleteTransactionId,
        transactionsError,
        totalDebitCreditTransactionsError,
        showAddTransactionModal,
        setShowAddTransactionModal,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
