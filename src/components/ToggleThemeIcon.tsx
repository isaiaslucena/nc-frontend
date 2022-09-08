import { useContext, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { AppContext } from "../context/appContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setLocalStorageData } from "../utils/manageLocalStorage";

const ToggleThemeIcon = () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(AppContext);

  const themePaletteMode = theme.palette.mode;
  const isLightTheme = themePaletteMode === "light";
  const changeThemeNameTo = isLightTheme ? "dark" : "light";

  return (
    <>
      <IconButton
        sx={{ ml: 1 }}
        onClick={() => {
          setLocalStorageData(changeThemeNameTo);
          toggleColorMode()
        }}
        color="inherit"
        title={`Change to ${changeThemeNameTo} theme`}
      >
        {isLightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </>
  );
};

export default ToggleThemeIcon;
