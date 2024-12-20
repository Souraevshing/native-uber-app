import { router } from "expo-router";
import { useRef, useState } from "react";
import Swiper from "react-native-swiper";

import Button from "@/components/Button";
import {
  StyledImage,
  StyledSafeAreaView,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components/index";
import { swipeMenu } from "@/constants/index";

/**
 * @description main screen that is rendered after opening
 */
const OnboardUser = () => {
  // ref to track current state of swiper
  const swiperRef = useRef<Swiper>(null);

  // current active tile
  const [active, isActive] = useState(0);

  // checking for last slide to automatically go to first and then loop
  const isLastSlide = active === swipeMenu.length - 1;

  return (
    <StyledSafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* skip btn */}
      <StyledTouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <StyledText className="text-slate-800 text-base hover:text-slate-500 rounded-md text-md font-JakartaBold">
          Skip
        </StyledText>
      </StyledTouchableOpacity>

      {/* swipe menu*/}
      <Swiper
        ref={swiperRef}
        loop={true}
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
                resizeMode="contain"
                className="w-full h-[250px]"
              />

              <StyledView className="flex flex-row items-center justify-center w-full mt-5">
                <StyledText className="text-gray-800 text-3xl font-bold mx-10 text-center">
                  {title}
                </StyledText>
              </StyledView>

              <StyledText className="text-blue-300 text-base font-JakartaBold text-center mx-10 mt-5">
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

export default OnboardUser;
