import { Stack } from "expo-router";

import CustomDarkTheme from "../themes/CustomDarkTheme";

/**
 * @description main `layout` to add different `screens` or `tabs` to show when conditionally rendered
 */
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
      <Stack.Screen name="find-rides" options={{ headerShown: false }} />
      <Stack.Screen name="confirm-ride" options={{ headerShown: false }} />
      <Stack.Screen name="book-ride" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
