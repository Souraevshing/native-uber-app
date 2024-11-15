import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components";
import { icons } from "@/constants/swipe-menu";
import { formatTime } from "@/lib/utils/formatDate";
import { DriverCardProps } from "@/types/types";

/**
 * @description Layout for Driver details
 * @param item
 * @returns layout rendering all drivers as cards
 */
const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <StyledTouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <StyledImage
        source={{ uri: item.profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      <StyledView className="flex-1 flex flex-col items-start justify-center mx-3">
        <StyledView className="flex flex-row items-center justify-start mb-1">
          <StyledText className="text-lg font-JakartaRegular">
            {item.first_name} {item.last_name}
          </StyledText>

          <StyledView className="flex flex-row items-center space-x-1 ml-2">
            <StyledImage source={icons.star} className="w-3.5 h-3.5" />
            <StyledText className="text-sm font-JakartaRegular">
              {item.rating ? item.rating.toFixed(1) : "N/A"}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex flex-row items-center justify-start">
          <StyledView className="flex flex-row items-center">
            <StyledImage source={icons.dollar} className="w-4 h-4" />
            <StyledText className="text-sm font-JakartaRegular ml-1">
              ${item.price ?? "N/A"} {/* If price is available, show it */}
            </StyledText>
          </StyledView>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800">
            {item.time ? formatTime(item.time) : "N/A"}{" "}
            {/* Handle undefined time */}
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800">
            {item.car_seats} seats
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledImage
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </StyledTouchableOpacity>
  );
};

export default DriverCard;
