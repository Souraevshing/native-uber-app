import { styled } from "nativewind";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { InputFieldProps } from "@/types/types";

/**
 *
 * @description reusable `Input` component
 */
const Input = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  /**
   * @description `StyledView` is wrapper for native `View` component
   */
  const StyledView = styled(View);

  /**
   * @description `StyledText` is wrapper for native `Text` component
   */
  const StyledText = styled(Text);

  /**
   * @description `StyledImage` is wrapper for `Image` component
   */
  const StyledImage = styled(Image);

  /**
   * @description `StyledTextInput` is wrapper for `TextInput` component
   */
  const StyledTextInput = styled(TextInput);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledView className="my-2 w-full">
          <StyledText
            className={`text-lg font-JakartaMedium mb-3 ${labelStyle}`}
          >
            {label}
          </StyledText>
          <StyledView
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <StyledImage
                source={icon}
                className={`w-6 h-6 ml-4 ${iconStyle}`}
              />
            )}
            <StyledTextInput
              className={`rounded-full p-5 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </StyledView>
        </StyledView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;
