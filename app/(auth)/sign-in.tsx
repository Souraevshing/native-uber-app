import { useClerk, useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";

import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components";
import Button from "@/components/Button";
import Input from "@/components/Input";
import OAuthUser from "@/components/OAuthUser";
import { icons, images } from "@/constants/swipe-menu";

const SignInUser = () => {
  /**
   * @description `initialState` form state at the start
   */
  const initialState: { email: string; password: string } = {
    email: "",
    password: "",
  };

  /**
   * @description `Form` objects for validation
   */
  const [form, setForm] = useState(initialState);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [logInLoading, setLogInLoading] = useState<boolean>(false);
  const { signOut } = useClerk();

  /**
   * @description `validate` all `fields` entered by user and then sign up
   */
  const handleLogIn = useCallback(async () => {
    //deactivating all previous session
    await signOut();

    if (!isLoaded) {
      Alert.alert("Something went wrong", "Please sign up again");
      return;
    }

    if (!form.email || !form.password) {
      Alert.alert("All fields are mandatory", "Please fill in all the fields");
      return;
    }

    // Email validation
    if (!form.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLogInLoading(true); // Start loading
    try {
      const signInUser = await signIn?.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInUser.status === "complete") {
        await setActive({ session: signInUser.createdSessionId });

        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(`${signInUser.status}`, null, 2));
        Alert.alert("Something went wrong!", `Failed to sign in`);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Something went wrong!", err.errors[0].longMessage);
    } finally {
      setLogInLoading(false); // Stop loading
    }
  }, [isLoaded, form]);

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="relative w-full h-[250px]">
        <StyledImage
          source={images.signUpCar}
          className="z-0 w-full h-[250px]"
        />
        <StyledText className="text-2xl text-black font-JakartaMedium absolute bottom-5 left-5">
          Login 👋
        </StyledText>
      </StyledView>
      <StyledView className="p-5">
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
        {/* Submit form button */}
        <Button
          btnText={
            logInLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              "Sign In"
            )
          }
          onPress={handleLogIn}
          className="mt-2"
        />

        {/* Authenticate user using Google OAuth */}
        <OAuthUser />

        <Link
          href="/sign-up"
          className="text-lg text-center text-general-200 mt-3"
        >
          <StyledText>Not registered ?</StyledText>
          <StyledText className="text-primary-500 text-center">
            {" "}
            Sign Up
          </StyledText>
        </Link>
      </StyledView>
    </StyledScrollView>
  );
};

export default SignInUser;
