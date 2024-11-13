import { Driver, MarkerData } from "@/types/types";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

/**
 * Generates an array of marker data for each driver, with random offsets to simulate nearby locations.
 * @param data Array of driver data
 * @param userLatitude Latitude of the user's current location
 * @param userLongitude Longitude of the user's current location
 * @returns Marker data array with modified locations near the user
 */
export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver, id) => {
    // Apply a small random offset to create nearby coordinates
    const latOffset = (Math.random() - 0.5) * 0.01; // Offset latitude by up to ±0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Offset longitude by up to ±0.005

    // Spread the driver data into MarkerData format and set a unique id
    return {
      id: driver.driver_id ?? id, // Use driver_id if available; otherwise use array index
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

/**
 * Calculates a map region covering the user and destination, adding padding for better display.
 * @param userLatitude Latitude of the user's location, nullable
 * @param userLongitude Longitude of the user's location, nullable
 * @param destinationLatitude Latitude of the destination, nullable
 * @param destinationLongitude Longitude of the destination, nullable
 * @returns A region object for mapping, centered and padded to include both locations
 */
export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  // Default location if user coordinates are missing
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // Return user location with minimal delta if no destination is given
  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  // Calculate bounding box for padding, using min/max coordinates
  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  // Adjust delta to include padding for better view
  const latitudeDelta = (maxLat - minLat) * 1.3; // Padding factor
  const longitudeDelta = (maxLng - minLng) * 1.3; // Padding factor

  // Center between user and destination
  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

/**
 * Calculates the estimated travel time and cost for each driver to reach the user, and from user to destination.
 * @param markers Array of drivers' marker data
 * @param userLatitude Latitude of the user's location, nullable
 * @param userLongitude Longitude of the user's location, nullable
 * @param destinationLatitude Latitude of the destination, nullable
 * @param destinationLongitude Longitude of the destination, nullable
 * @returns Promise resolving to array of MarkerData with `time` and `price` fields added
 */
export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  // Return if necessary coordinates are missing
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    // Fetch travel times and calculate price for each driver
    const timesPromises = markers.map(async (marker) => {
      const responseToUser = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
      );
      const dataToUser = await responseToUser.json();
      const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds to reach user

      const responseToDestination = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
      );
      const dataToDestination = await responseToDestination.json();
      const timeToDestination =
        dataToDestination.routes[0].legs[0].duration.value; // Time in seconds to reach destination

      // Total time in minutes, converting and rounding price
      const totalTime = (timeToUser + timeToDestination) / 60;
      const price = (totalTime * 0.5).toFixed(2); // Price calculation based on total time

      return { ...marker, time: totalTime, price };
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};
