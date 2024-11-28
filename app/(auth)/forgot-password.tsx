import { useSignIn, useUser } from "@clerk/clerk-expo";
import { Stack, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

/**
 * @description update password if by verifying code sent to email
 */
const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [successfulCreation, setSuccessfulCreation] = useState<boolean>(false);
  const { signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

  useEffect(() => {
    // If the user is already signed in, redirect to the home screen or desired route
    if (isSignedIn) {
      router.replace("/(root)/(tabs)/home"); // or any route you want to redirect to
    }
  }, [isSignedIn]);

  // Request a password reset code by email
  const handleResetCodeSent = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      Alert.alert(err.errors[0].longMessage);
    }
  };

  // Reset the password with the code and the new password
  const handleResetPassword = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      Alert.alert("Password reset successfully");

      // Set the user session active and redirect to sign-in
      await setActive!({ session: result.createdSessionId });
      router.replace("/sign-in");
    } catch (err: any) {
      console.error(err);
      Alert.alert(err.errors[0].longMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="johndoe@email.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />

          <Button
            onPress={handleResetCodeSent}
            title="Send Reset Email"
            color={"#6c47ff"}
          ></Button>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <OtpInput
              numberOfDigits={6}
              focusColor={"black"}
              focusStickBlinkingDuration={500}
              onTextChange={(code) => setCode(code)}
              textInputProps={{
                accessibilityLabel: "OTP",
              }}
              autoFocus={true}
            />
            <TextInput
              placeholder="New password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputField}
            />
          </View>
          <Button
            onPress={handleResetPassword}
            title="Set new Password"
            color={"#6c47ff"}
          ></Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    margin: 10,
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});

export default ForgotPassword;
