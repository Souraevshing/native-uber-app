import { Stack } from "expo-router";

/**
 * @description layout for `Auth` screens
 */
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="onboard-user" options={{ headerShown: false }} />

      <Stack.Screen name="sign-in" options={{ headerShown: false }} />

      <Stack.Screen name="sign-up" options={{ headerShown: false }} />

      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
