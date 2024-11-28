import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback } from "react";
import { Alert } from "react-native";

import { StyledImage, StyledText, StyledView } from "@/components/index";
import { icons } from "@/constants/swipe-menu";
import { googleOAuth } from "@/lib/auth";
import Button from "./Button";

const OAuthUser = () => {
  // start google oauth flow
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // authenticate user if logged in already or first time user
  const handleGoogleLogin = useCallback(async () => {
    try {
      const res = await googleOAuth(startOAuthFlow);

      if (res.code === "session_exists" || res.code === "success") {
        Alert.alert("Success", "Session already exists");
        router.push("/(root)/(tabs)/home");
      }

      Alert.alert(res.success ? "success" : "error", res.message);
    } catch (error) {
      Alert.alert("Error", "Please login");
      console.error(error);
    }
  }, [startOAuthFlow]);

  return (
    <StyledView>
      <StyledView className="flex flex-row justify-center items-center mt-2 gap-x-3">
        <StyledView className="flex-1 h-[1px] bg-general-200" />
        <StyledText className="text-lg">Or </StyledText>
        <StyledView className="flex-1 h-[1px] bg-general-200" />
      </StyledView>
      <Button
        className="mt-2 w-full shadow-none bg-black"
        btnText="Sign In With Google"
        IconLeft={() => (
          <StyledImage
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="secondary"
        onPress={handleGoogleLogin}
      />
    </StyledView>
  );
};

export default OAuthUser;
