import { router } from "expo-router";
import { FlatList } from "react-native";

import { StyledView } from "@/components";
import Button from "@/components/Button";
import DriverCard from "@/components/DriverCard";
import RidesLayout from "@/components/RidesLayout";
import { useDriverStore } from "@/store";

/**
 * @description confirm ride after `source` and `destination` selection
 * @returns children as ReactNode
 */
const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RidesLayout snapPoints={["65%", "85%"]} title="Select driver">
      <FlatList
        data={drivers}
        renderItem={({ item }) => {
          return (
            <DriverCard
              item={item}
              selected={selectedDriver!}
              setSelected={() => setSelectedDriver(Number(item.id!))}
            />
          );
        }}
        ListFooterComponent={() => {
          return (
            <StyledView className="mx-5 mt-10">
              <Button
                btnText={"Select Ride"}
                onPress={() => router.push("/(root)/book-ride")}
              ></Button>
            </StyledView>
          );
        }}
      />
    </RidesLayout>
  );
};

export default ConfirmRide;
