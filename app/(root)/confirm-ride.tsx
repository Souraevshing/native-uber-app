import { router } from "expo-router";

import { useDriverStore } from "@/app/store";
import { StyledFlatList, StyledView } from "@/components";
import Button from "@/components/Button";
import DriverCard from "@/components/DriverCard";
import RidesLayout from "@/components/RidesLayout";

/**
 * @description confirm ride after `source` and `destination` selection
 * @returns children as ReactNode
 */
const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RidesLayout snapPoints={["65%", "85%"]} title="Select driver">
      <StyledFlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id)}
          />
        )}
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
