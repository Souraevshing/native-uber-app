import { StyledImage, StyledText, StyledView } from "@/components/index";
import { icons } from "@/constants/swipe-menu";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import { Ride } from "@/types/types";

/**
 *
 * @param ride
 * @returns rider details
 * @description layout to render each rider details as cards
 */
const RideCard = ({
  item: {
    created_at,
    destination_address,
    driver,
    destination_latitude,
    destination_longitude,
    driver_id,
    fare_price,
    origin_address,
    origin_latitude,
    origin_longitude,
    payment_status,
    ride_time,
    user_email,
  },
}: {
  item: Ride;
}) => {
  return (
    // rider card details
    <StyledView className="flex flex-row items-center justify-center bg-[#e7ecef] rounded-2xl shadow-sm shadow-slate-500 mb-3">
      {/* container for ride details */}
      <StyledView className="flex flex-col items-center justify-center p-3">
        {/* container for map image */}
        <StyledView className="flex flex-row items-center justify-between">
          {/* map image */}
          <StyledImage
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14.3497&marker=lonlat%3A-122.29188334609739%2C47.54403990655936%3Btype%3Aawesome%3Bcolor%3A%23bb3f73%3Bsize%3Ax-large%3Bicon%3Apaw%7Clonlat%3A-122.29282631194182%2C47.549609195001494%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome%7Clonlat%3A-122.28726954893025%2C47.541766557545884%3Btype%3Amaterial%3Bcolor%3A%234c905a%3Bicon%3Atree%3Bicontype%3Aawesome&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-2xl"
          />

          <StyledView className="flex flex-col  mx-5 gap-y-5 flex-1">
            <StyledView className="flex flex-row items-center gap-x-2">
              {/* to icon for destination */}
              <StyledImage source={icons.to} className="w-5 h-5" />

              {/* origin address */}
              <StyledText
                className="text-base font-JakartaMedium"
                numberOfLines={1}
              >
                {origin_address}
              </StyledText>
            </StyledView>

            {/* destination address */}
            <StyledView className="flex flex-row items-center gap-x-2">
              <StyledImage source={icons.point} className="w-5 h-5" />
              <StyledText className="text-base font-JakartaMedium">
                {destination_address}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* date and time container */}
        <StyledView className="flex flex-col w-full mt-5 rounded-3xl p-3 items-start justify-center bg-blue-100">
          {/* date and time section */}
          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            {/* date and time icon for showing duration */}
            <StyledImage source={icons.clock} className="text-base" />

            {/* date and time at which journey is created  */}
            <StyledText className="text-gray-600">
              {formatDate(created_at)} | {formatTime(ride_time)}
            </StyledText>
          </StyledView>

          {/* driver details section */}
          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-base font-JakartaMedium text-gray-950 ">
              Driver
            </StyledText>

            {/* full name of driver  */}
            <StyledText className="text-gray-600 text-base font-JakartaMedium">
              {driver.last_name} {driver.first_name}
            </StyledText>
          </StyledView>

          {/* car seat section */}
          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-base font-JakartaMedium text-gray-950 ">
              Seats Available
            </StyledText>

            {/* no of car seats available  */}
            <StyledText className="text-gray-600 text-base font-JakartaMedium">
              {driver.car_seats}
            </StyledText>
          </StyledView>

          {/* payment status section */}
          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-base font-JakartaMedium text-gray-950 ">
              Payment Status
            </StyledText>

            {/* payment status done or pending */}
            <StyledText
              className={`text-gray-600 text-base font-JakartaMedium ${
                payment_status === "paid" ? "text-green-500" : "text-red-500"
              }`}
            >
              {payment_status.toUpperCase()}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default RideCard;
