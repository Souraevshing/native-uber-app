import { router } from "expo-router";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import Button from "@/components/Button";
import { swipeMenu } from "@/constants/index";

const WelcomeUser = () => {
  // ref to track current state of swiper
  const swiperRef = useRef<Swiper>(null);

  // current active tile
  const [active, isActive] = useState(0);

  // checking for last slide to automatically go to first and then loop
  const isLastSlide = active === swipeMenu.length - 1;

  /**
   * @description `StyledSafeAreaView` is wrapper for `SafeAreaView`
   */
  const StyledSafeAreaView = styled(SafeAreaView);

  /**
   * @description `StyledTouchableOpacity` is wrapper for `TouchableOpacity`
   */
  const StyledTouchableOpacity = styled(TouchableOpacity);

  /**
   * @description `StyledText` is wrapper for `Text`
   */
  const StyledText = styled(Text);

  /**
   * @description `StyledView` is wrapper for `View`
   */
  const StyledView = styled(View);

  /**
   * @description `StyledImage` is wrapper for `Image`
   */
  const StyledImage = styled(Image);

  return (
    <StyledSafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* skip btn */}
      <StyledTouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <StyledText className="text-slate-800 text-lg hover:text-slate-500 rounded-md text-md font-JakartaBold">
          Skip
        </StyledText>
      </StyledTouchableOpacity>

      {/* swipe menu*/}
      <Swiper
        ref={swiperRef}
        loop
        dotColor="#f3aaff"
        dot={<StyledView className="w-[32px] h-[4px] mx-1 bg-zinc-500" />}
        activeDot={<StyledView className="w-[32px] h-[4px] mx-1 bg-zinc-900" />}
        onIndexChanged={(idx) => isActive(idx)}
      >
        {/* map swipe menu array */}
        {swipeMenu.map((item) => {
          const { id, title, image, description } = item;
          return (
            <StyledView
              key={id}
              className="flex items-center justify-center p-5"
            >
              <StyledImage
                source={image}
                resizeMethod="scale"
                resizeMode="contain"
                className="w-full h-[250px]"
              />

              <StyledView className="flex flex-row items-center justify-center w-full mt-10">
                <StyledText className="text-gray-800 text-3xl font-bold mx-10 text-center">
                  {title}
                </StyledText>
              </StyledView>

              <StyledText className="text-blue-300 text-base font-JakartaBold text-center mx-10 mt-3">
                {description}
              </StyledText>
            </StyledView>
          );
        })}
      </Swiper>

      {/* when clicked on button on last slide the button text changes to Continue and then sign up to continue */}
      {/* Next button */}
      <Button
        btnText={isLastSlide ? "Get Started" : "Continue"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-5 font-normal"
      />
    </StyledSafeAreaView>
  );
};

export default WelcomeUser;
