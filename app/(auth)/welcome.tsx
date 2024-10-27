import { router } from "expo-router";
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

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* skip btn */}
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-slate-800 text-lg hover:text-slate-500 rounded-md text-md font-JakartaBold">
          Skip
        </Text>
      </TouchableOpacity>

      {/* swipe menu*/}
      <Swiper
        ref={swiperRef}
        loop
        dotColor="#f3aaff"
        dot={<View className="w-[32px] h-[4px] mx-1 bg-zinc-500" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-zinc-900" />}
        onIndexChanged={(idx) => isActive(idx)}
      >
        {/* map swipe menu array */}
        {swipeMenu.map((item) => {
          const { id, title, image, description } = item;
          return (
            <View key={id} className="flex items-center justify-center p-5">
              <Image
                source={image}
                resizeMethod="scale"
                resizeMode="contain"
                className="w-full h-[250px]"
              />

              <View className="flex flex-row items-center justify-center w-full mt-10">
                <Text className="text-gray-800 text-3xl font-bold mx-10 text-center">
                  {title}
                </Text>
              </View>

              <Text className="text-blue-300 text-base font-JakartaBold text-center text-[#858585] mx-10 mt-3">
                {description}
              </Text>
            </View>
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
    </SafeAreaView>
  );
};

export default WelcomeUser;
