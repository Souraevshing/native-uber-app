import {
  StyledImage,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "@/components";
import { icons } from "@/constants/swipe-menu";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/types";

/**
 * @description Layout for Driver details
 * @param item
 * @returns layout rendering all drivers as cards
 */
const DriverCard = ({
  item: {
    id,
    car_image_url,
    car_seats,
    first_name,
    last_name,
    profile_image_url,
    rating,
    title,
    price,
    time,
  },
  selected,
  setSelected,
}: DriverCardProps) => {
  return (
    <StyledTouchableOpacity
      onPress={setSelected}
      className={`${
        selected === id ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <StyledImage
        source={{ uri: profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      <StyledView className="flex-1 flex flex-col items-start justify-center mx-3">
        <StyledView className="flex flex-row items-center justify-start mb-1">
          {/* driver title */}
          <StyledText className="text-lg font-JakartaRegular">
            {title}
          </StyledText>

          {/* driver rating */}
          <StyledView className="flex flex-row items-center space-x-1 ml-2">
            <StyledImage source={icons.star} className="w-3.5 h-3.5" />
            <StyledText className="text-sm font-JakartaRegular">5</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex flex-row items-center justify-start">
          {/* journey fare */}
          <StyledView className="flex flex-row items-center">
            <StyledImage source={icons.rupee} className="w-4 h-4" />
            <StyledText className="text-sm font-JakartaRegular ml-1">
              Rs{price}
            </StyledText>
          </StyledView>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>

          {/* time taken by driver to complete journey */}
          <StyledText className="text-sm font-JakartaRegular text-general-800">
            {formatTime(parseInt(`${time}`) || 5)}
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>

          {/* no of seats available */}
          <StyledText className="text-sm font-JakartaRegular text-general-800">
            {car_seats} seats
          </StyledText>
        </StyledView>
      </StyledView>

      {/* profile image of driver */}
      <StyledImage
        source={{ uri: car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </StyledTouchableOpacity>
  );
};

export default DriverCard;
