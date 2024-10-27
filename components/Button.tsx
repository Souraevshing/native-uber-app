import { ButtonProps } from "@/types/types";
import { Text, TouchableOpacity } from "react-native";

/**
 *
 * @param bgVariant
 * @returns "primary" | "secondary" |"danger" | "outline"
 */
const getBgVariantStyle = (bgVariant: ButtonProps["bgVariant"]) => {
  switch (bgVariant) {
    case "primary":
      return "bg-blue-500";
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

/**
 *
 * @param textVariant
 * @returns "primary" | "secondary" |"danger" | "success"
 */
const getTextVariantStyle = (textVariant: ButtonProps["textVariant"]) => {
  switch (textVariant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

/**
 * @description reusable component `Button`
 */
const Button = ({
  btnText,
  onPress,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className = "",
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full rounded-full flex flex-row justify-center items-center shadow-lg shadow-neutral-500/95 ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
        {btnText}
      </Text>

      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default Button;
