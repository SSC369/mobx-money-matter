import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { TransactionContext } from "../context/transactionContext";
import AddTransactionModal from "../components/AddTransactionModal";
import themeStore from "../store/themeStore";
import userStore from "../store/UserStore";

const Home = observer(() => {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionContext);
  // console.log(userStore.userContextData);

  const renderAddTransactionModal = () => {
    if (showAddTransactionModal) {
      return (
        <AddTransactionModal
          onClose={() => setShowAddTransactionModal(false)}
        />
      );
    }
    return <></>;
  };

  return (
    <div className={`relative ${themeStore.getTheme === "dark" ? "dark" : ""}`}>
      <Sidebar />
      <div className="md:ml-[200px] ">
        <Header />
        <Outlet />
      </div>
      {renderAddTransactionModal()}
    </div>
  );
});

export default Home;
