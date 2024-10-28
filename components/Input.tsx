import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

import {
  StyledImage,
  StyledText,
  StyledTextInput,
  StyledView,
} from "@/components/index";
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
