import { StyledImage, StyledText, StyledView } from "@/components/index";
import { icons } from "@/constants/swipe-menu";
import Button from "./Button";

const OAuthUser = () => {
  const handleGoogleLogin = async () => {
    console.log("logged in");
  };

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
