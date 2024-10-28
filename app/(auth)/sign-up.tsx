import { Link } from "expo-router";
import { useState } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import {
  StyledImage,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components/index";
import { icons, images } from "@/constants/swipe-menu";

/**
 * @description Register user and then login
 */
const SignUpUser = () => {
  /**
   * @description `initialState` form state at the start
   */
  const initialState: { name: string; email: string; password: string } = {
    name: "",
    email: "",
    password: "",
  };

  /**
   * @description `Form` objects for validation
   */
  const [form, setForm] = useState(initialState);

  const handleSignUp = async () => {
    console.log(form);
  };

  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="relative w-full h-[250px]">
        <StyledImage
          source={images.signUpCar}
          className="z-0 w-full h-[250px]"
        />
        <StyledText className="text-2xl text-black font-JakartaMedium absolute bottom-5 left-5 capitalize">
          Create your account
        </StyledText>
      </StyledView>
      <StyledView className="p-5">
        {/* Full name */}
        <Input
          label="Full Name"
          placeholder="Enter full name"
          icon={icons.person}
          value={form.name}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
        {/* Email */}
        <Input
          label="Email"
          placeholder="Enter email"
          icon={icons.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        {/* Password */}
        <Input
          label="Password"
          placeholder="Enter password"
          icon={icons.lock}
          onChangeText={(value) => setForm({ ...form, password: value })}
          secureTextEntry={true}
        />
        {/* Submit form button */}
        <Button btnText="Sign Up" onPress={handleSignUp} className="mt-10" />

        {/* Authenticate user using Google OAuth */}

        <Link
          href="/sign-in"
          className="text-lg text-center text-general-200 mt-10"
        >
          <StyledText>Already have an account ?</StyledText>
          <StyledText className="text-primary-500 text-center">
            {" "}
            Sign In
          </StyledText>
        </Link>
      </StyledView>
    </StyledScrollView>
  );
};

export default SignUpUser;
