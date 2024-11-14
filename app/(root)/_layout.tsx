import { Stack } from "expo-router";

import CustomDarkTheme from "../themes/CustomDarkTheme";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: CustomDarkTheme.colors.card },
        headerTintColor: CustomDarkTheme.colors.text,
        statusBarStyle: "dark",
        statusBarAnimation: "fade",
        statusBarTranslucent: true,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(root)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default Layout;
