import {
  StyledImage,
  StyledSafeAreaView,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components";
import { images } from "@/constants/swipe-menu";

const Chat = () => {
  return (
    <StyledSafeAreaView className="flex-1 bg-white p-5">
      <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledText className="text-2xl font-JakartaBold">Chat</StyledText>
        <StyledView className="flex-1 h-fit flex justify-center items-center">
          <StyledImage
            source={images.message}
            alt="message"
            className="w-full h-40"
            resizeMode="contain"
          />
          <StyledText className="text-3xl font-JakartaBold mt-3">
            No Messages Yet
          </StyledText>
          <StyledText className="text-base mt-2 text-center px-7">
            Start a conversation with your friends and family
          </StyledText>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Chat;
