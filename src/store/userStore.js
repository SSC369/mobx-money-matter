import { makeAutoObservable } from "mobx";
import { LOCALSTORAGE_KEY } from "../constants";
import { getDataFromLocalStorage } from "../utils/localStorageUtils";

class User {
  showMenu = false;
  userData = getDataFromLocalStorage(LOCALSTORAGE_KEY);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get UserContextData() {
    if (this.userData?.userId) {
      const { userId, admin } = this.userData;
      return { userId, isAdmin: admin, showMenu: this.showMenu };
    }
    return {};
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

const userStore = new User();
export default userStore;
