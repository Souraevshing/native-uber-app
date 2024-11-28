import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { StyledMapView, StyledText, StyledView } from "@/components/index";
import { icons } from "@/constants/swipe-menu";
import { useFetch } from "@/hooks/useFetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/types";

/**
 * render `Google Maps` ui to user using google's external API key
 */
const Map = () => {
  // fetch drivers list from db
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

  const {
    destinationLongitude,
    destinationLatitude,
    userLatitude,
    userLongitude,
  } = useLocationStore();

  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const { setDrivers, selectedDriver } = useDriverStore();

  const region = calculateRegion({
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  });

  // calculate driver car location and show as marker on the map
  useEffect(() => {
    if (Array.isArray([drivers])) {
      if (!userLatitude || !userLongitude) {
        return;
      }

      const newMarkers = generateMarkersFromData({
        data: drivers!,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, setDrivers, userLatitude, userLongitude]);

  // calculate drivers time when markers is greater than 0 and destination longitude and latitude is present
  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        destinationLatitude,
        destinationLongitude,
        userLatitude,
        userLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [
    destinationLatitude,
    destinationLongitude,
    markers,
    setDrivers,
    userLatitude,
    userLongitude,
  ]);

  // show loader when loading or latitude and longitude is uninitialized
  if (loading || !userLatitude || !userLongitude) {
    return (
      <StyledView className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </StyledView>
    );
  }

  // show error if present
  if (error) {
    return (
      <StyledView className="flex justify-between items-center w-full">
        <StyledText>{error}</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledMapView
      provider={PROVIDER_GOOGLE}
      tintColor="black"
      mapType="mutedStandard"
      showsCompass={true}
      showsScale={true}
      showsPointsOfInterest={false}
      showsUserLocation={true}
      showsTraffic={true}
      showsBuildings={true}
      showsIndoorLevelPicker={true}
      showsIndoors={true}
      showsMyLocationButton={true}
      userInterfaceStyle="dark"
      zoomEnabled={true}
      zoomTapEnabled={true}
      zoomControlEnabled={true}
      region={region}
      className="w-full h-full rounded-3xl"
    >
      {markers.map((marker, _index) => {
        return (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            image={
              selectedDriver === +marker.id
                ? icons.selectedMarker
                : icons.marker
            }
          />
        );
      })}

      {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!}
            strokeColor="#0286FF"
            strokeWidth={2}
            timePrecision="now"
          />
        </>
      )}
    </StyledMapView>
  );
};

export default Map;
