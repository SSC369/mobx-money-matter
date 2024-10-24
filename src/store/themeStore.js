import { action, autorun, makeAutoObservable, reaction } from "mobx";

class ThemeStore {
  theme = localStorage.getItem("theme") || "light";
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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

export default new ThemeStore();
