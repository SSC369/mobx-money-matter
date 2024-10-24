import { action, autorun, makeAutoObservable, reaction } from "mobx";

class Theme {
  theme = localStorage.getItem("theme") || "light";
  constructor() {
    makeAutoObservable(
      this,
      {
        changeTheme: action,
      },
      { autoBind: true }
    );
    reaction(
      () => this.theme.slice(),
      (theme) => {
        localStorage.setItem("theme", theme);
      }
    );
  }

  changeTheme(mode) {
    this.theme = mode;
  }

  get getTheme() {
    return this.theme;
  }
}

const themeStore = new Theme();
export default themeStore;
