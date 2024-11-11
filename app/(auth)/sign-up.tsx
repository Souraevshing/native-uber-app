import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { OtpInput } from "react-native-otp-entry";

import Button from "@/components/Button";
import Input from "@/components/Input";
import OAuthUser from "@/components/OAuthUser";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components/index";
import { icons, images } from "@/constants/swipe-menu";
import { fetchAPI } from "@/lib/fetch";

/**
 * @description Register user and then login
 */
const SignUpUser = () => {
  const initialState = { name: "", email: "", password: "" };
  const [form, setForm] = useState(initialState);
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [verification, setVerification] = useState<{
    state: "default" | "success" | "error" | "pending";
    error: string;
    code: string;
  }>({
    state: "default",
    error: "",
    code: "",
  });
  const { isLoaded, signUp, setActive } = useSignUp();
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [verifyCodeLoading, setVerifyCodeLoading] = useState<boolean>(false);

  /**
   * @description `validate` all `fields` entered by user and then sign up
   */
  const handleSignUp = async () => {
    if (!isLoaded) {
      Alert.alert("Something went wrong", "Please sign up again");
      return;
    }

    if (!form.email || !form.name || !form.password) {
      Alert.alert("All fields are mandatory", "Please fill in all the fields");
      return;
    }

    // Name validation
    if (!form.name.match(/^[a-zA-Z\s-]{2,50}$/)) {
      Alert.alert("Invalid Name", "Please enter a valid name.");
      return;
    }

    // Email validation
    if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Password validation
    if (
      !form.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character"
      );
      return;
    }

    setSignUpLoading(true); // Start loading
    try {
      await signUp?.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Something went wrong!", err.errors[0].longMessage);
    } finally {
      setSignUpLoading(false); // Stop loading
    }
  };

  /**
   * @description verify the `otp` sent to `registered email`
   */
  const handleVerifyCode = async (code: string) => {
    if (!isLoaded || !signUp) {
      Alert.alert("Something went wrong", "Verification failed");
      return;
    }

    setVerifyCodeLoading(true); // Start loading
    try {
      const signUpUser = await signUp?.attemptEmailAddressVerification({
        code,
      });
      if (signUpUser?.status === "complete") {
        // fetch user after successful sign-up is done
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpUser.createdUserId,
          }),
        });

        // setting setActive with session object to new session id
        await setActive({ session: signUpUser.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "error",
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Verification failed", err.errors[0].longMessage);
      setVerification({
        ...verification,
        error: "Verification failed",
        state: "error",
      });
    } finally {
      setVerifyCodeLoading(false); // Stop loading
    }
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="relative w-full h-[250px]">
        <StyledImage
          source={images.signUpCar}
          className="z-0 w-full h-[250px]"
        />
        <StyledText className="text-2xl text-black font-JakartaMedium absolute bottom-5 left-5 capitalize">
          Create your account 🚕
        </StyledText>
      </StyledView>
      <StyledView className="p-5">
        {/* Full name */}
        <Input
          label="Full Name"
          placeholder="Enter full name"
          icon={icons.person}
          value={form.name}
          textContentType="name"
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        {/* Email */}
        <Input
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          value={form.email}
          textContentType="emailAddress"
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        {/* Password */}
        <Input
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          value={form.password}
          textContentType="password"
          onChangeText={(value) => setForm({ ...form, password: value })}
          secureTextEntry={true}
        />
        {/* Submit form button with loading indicator */}
        <Button
          btnText={
            signUpLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Sign Up"
            )
          }
          onPress={handleSignUp}
          disabled={signUpLoading} // Disable button while loading
          className="mt-2"
        />

        {/* Authenticate user using Google OAuth */}
        <OAuthUser />

        <Link
          href="/sign-in"
          className="text-lg text-center text-general-200 mt-3"
        >
          <StyledText>Already have an account ?</StyledText>
          <StyledText className="text-primary-500 text-center">
            {" "}
            Sign In
          </StyledText>
        </Link>
      </StyledView>

      {/* Verification modals */}
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") {
            setPendingVerification(true);
          }
        }}
      >
        <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <StyledText className="font-JakartaBold text-2xl mb-2">
            Verification
          </StyledText>
          <StyledText className="font-Jakarta mb-5">
            Verification code sent to {form.email}
          </StyledText>

          {/* verification code */}
          <OtpInput
            numberOfDigits={6}
            focusColor={"black"}
            focusStickBlinkingDuration={500}
            onFilled={(code) => {
              setVerification({ ...verification, code });
              handleVerifyCode(code);
            }}
            onTextChange={(code) => setVerification({ ...verification, code })}
            textInputProps={{
              accessibilityLabel: "OTP",
            }}
            autoFocus={true}
          />

          {/* verification error */}
          {verification.error && (
            <StyledText className="text-red-500 text-sm mt-2">
              {verification.error}
            </StyledText>
          )}
        </StyledView>
      </ReactNativeModal>

      {/* show modal for verification success */}
      <ReactNativeModal isVisible={pendingVerification}>
        <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <StyledImage
            source={images.checkSuccess}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <StyledText className="text-3xl font-JakartaBold text-center">
            Verified
          </StyledText>
          <StyledText className="text-base text-gray-700 font-Jakarta text-center mt-2">
            Account verified successfully
          </StyledText>
          <Button
            btnText="Home"
            onPress={() => router.push("/(root)/(tabs)/home")}
            className="mt-5"
          />
        </StyledView>
      </ReactNativeModal>
    </StyledScrollView>
  );
};

export default SignUpUser;
