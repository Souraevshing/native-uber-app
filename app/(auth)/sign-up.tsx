import { styled } from "nativewind";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import Button from "@/components/Button";
import Input from "@/components/Input";
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

  /**
   * @description `StyledView` is wrapper for native `View` component
   */
  const StyledView = styled(View);

  /**
   * @description `StyledText` is wrapper for native `Text` component
   */
  const StyledText = styled(Text);

  /**
   * @description `StyledImage` is wrapper for native `Image` component
   */
  const StyledImage = styled(Image);

  const handleSignUp = async () => {
    console.log(form);
  };

  return (
    <ScrollView>
      <StyledView className="flex-1 bg-white">
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
          <Button btnText="Sign Up" onPress={handleSignUp} className="mt-44" />
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

export default SignUpUser;
