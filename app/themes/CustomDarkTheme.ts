import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#edede9",
    text: "#000",
    primary: "#000",
    card: "#1c1c1e",
  },
};

export default CustomDarkTheme;
