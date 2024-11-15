import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useRef } from "react";

import {
  StyledGestureHandlerRootView,
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components";
import Map from "@/components/Map";
import { icons } from "@/constants/swipe-menu";

/**
 * @description Layout to show rides by wrapping all routes related to rides
 * @param title
 * @param children
 * @returns children as ReactNode
 */
const RidesLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <StyledGestureHandlerRootView className="flex-1">
      <StyledView className="flex-1 bg-white">
        <StyledView className="flex flex-col h-screen bg-blue-400">
          <StyledView className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <StyledTouchableOpacity onPress={() => router.back()}>
              <StyledView className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <StyledImage
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-5 h-6"
                />
              </StyledView>
            </StyledTouchableOpacity>
            <StyledText className="text-xl font-JakartaBold ml-5 text-zinc-800">
              {title || "Back"}
            </StyledText>
          </StyledView>
          <Map />
        </StyledView>

        {/* collapsible modal to enter source and destination information and search on the map */}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
          role="searchbox"
          keyboardBehavior="extend"
          enableContentPanningGesture
          enableDynamicSizing
        >
          {/* render the ReactNode children in the view to render on screen */}
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            {children}
          </BottomSheetView>
        </BottomSheet>
      </StyledView>
    </StyledGestureHandlerRootView>
  );
};

export default RidesLayout;
