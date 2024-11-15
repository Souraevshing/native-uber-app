import { useEffect, useState } from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import useLocationStore, { useDriverStore } from "@/app/store/index";
import { StyledMapView, StyledSafeAreaView } from "@/components/index";
import { icons } from "@/constants/swipe-menu";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { MapProps, MarkerData } from "@/types/types";

const drivers = [
  {
    id: "1",
    driver_id: 1,
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: 4.8,
  },
  {
    id: "2",
    driver_id: 2,
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    rating: 4.6,
  },
  {
    id: "3",
    driver_id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    rating: 4.7,
  },
  {
    id: "4",
    driver_id: 4,
    first_name: "Robert",
    last_name: "Green",
    profile_image_url:
      "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
    car_image_url:
      "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
    car_seats: 4,
    rating: 4.9,
  },
];

const Map = ({}: MapProps) => {
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
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (userLatitude && userLongitude && drivers.length > 0) {
      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  return (
    <StyledSafeAreaView>
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
    </StyledSafeAreaView>
  );
};

export default Map;
