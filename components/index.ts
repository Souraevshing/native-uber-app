import { Ride } from "@/types/types";
import { styled } from "nativewind";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * @description `StyledSafeAreaView` is wrapper for `SafeAreaView`
 */
export const StyledSafeAreaView = styled(SafeAreaView);

/**
 * @description `StyledTouchableOpacity` is wrapper for `TouchableOpacity`
 */
export const StyledTouchableOpacity = styled(TouchableOpacity);

/**
 * @description `StyledText` is wrapper for `Text`
 */
export const StyledText = styled(Text);

/**
 * @description `StyledTextInput` is wrapper for `TextInput`
 */
export const StyledTextInput = styled(TextInput);

/**
 * @description `StyledView` is wrapper for `View`
 */
export const StyledView = styled(View);

/**
 * @description `StyledImage` is wrapper for `Image`
 */
export const StyledImage = styled(Image);

/**
 * @description `StyledScrollView` is wrapper for native `ScrollView` component
 */
export const StyledScrollView = styled(ScrollView);

/**
 * @description `StyledFlatList` is wrapper for native `FlatList` component
 */
export const StyledFlatList = styled(FlatList<Ride>);
