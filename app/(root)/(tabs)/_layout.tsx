import { Tabs } from "expo-router";

import { StyledImage, StyledView } from "@/components";
import { icons } from "@/constants/swipe-menu";
import { ImageSourcePropType } from "react-native";

/**
 * @description `TabIcon` component for displaying icons for tabs
 */
const TabIcon = ({
  focused,
  source,
  color,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  color: string;
}) => {
  return (
    <StyledView
      className={`flex items-center justify-center flex-row rounded-full ${
        focused ? "bg-gray-900" : ""
      }`}
    >
      <StyledView
        className={`rounded-full w-12 h-12 items-center justify-center ${
          focused ? "bg-gray-900" : ""
        }`}
      >
        <StyledImage
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </StyledView>
      <StyledImage />
    </StyledView>
  );
};

/**
 * @description `TabsLayout` a layout or parent to all `tabs` screens
 */
const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarInactiveTintColor: "#5e60ce",
        tabBarActiveTintColor: "#5e60ce",
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#6c757d",
          borderRadius: 99,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 10,
          height: 70,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
        headerTintColor: "#fcbf49",
      }}
    >
      {/* Home tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} source={icons.home} color={color} />
          ),
        }}
      />

      {/* Rides tab */}
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} source={icons.list} color={color} />
          ),
        }}
      />

      {/* Chat tab */}
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} source={icons.chat} color={color} />
          ),
        }}
      />

      {/* Profile tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} source={icons.profile} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
