import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { swipeMenu } from "@/constants/index";

const WelcomeUser = () => {
  // ref to track current state of swiper
  const swiperRef = useRef<Swiper>(null);

  // current active tile
  const [active, isActive] = useState(0);

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

      {/* swipe */}
      <Swiper
        ref={swiperRef}
        loop
        dotColor="#f3aaff"
        dot={<View className="w-[32px] h-[4px] mx-1 bg-zinc-500" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-zinc-900" />}
        onIndexChanged={(idx) => isActive(idx)}
      >
        {swipeMenu.map((item) => {
          const { id, title, image, description } = item;
          return (
            <View key={id}>
              <Text>{title}</Text>
            </View>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
};

export default WelcomeUser;
