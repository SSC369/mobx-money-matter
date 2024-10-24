import React, { useContext } from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import themeStore from "../store/themeStore";
import { observer } from "mobx-react-lite";

const ToggleButton = observer(() => {
  const theme = themeStore.getTheme;

  const handleToggle = () => {
    themeStore.changeTheme("light");
  };

  const handleLightTheme = () => {
    themeStore.changeTheme("dark");
  };

  return (
    <div className="p-2 rounded-xl cursor-pointer text-2xl">
      {theme === "dark" ? (
        <MdSunny onClick={handleToggle} color="orange" />
      ) : (
        <RiMoonFill onClick={handleLightTheme} className="text-slate-400" />
      )}
    </div>
  );
});

export default ToggleButton;
