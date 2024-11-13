import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/types";
/**
 * @description `store` to keep track of `user` location
 */
const useLocationStore = create<LocationStore>((set) => ({
  destinationAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  userAddress: null,
  userLatitude: null,
  userLongitude: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    /**
     * @description select available drivers and if found and location set, then clear that driver so that driver is not assigned any other ride till previous ride is completed
     */
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();

    if (selectedDriver) {
      clearSelectedDriver();
    }
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    /**
     * @description select available drivers and if found and location set, then clear that driver so that driver is not assigned any other ride till previous ride is completed
     */
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) {
      clearSelectedDriver();
    }
  },
}));

/**
 * @description store to `set`, `clear`, and `initialize` drivers list at the start
 */
export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

export default useLocationStore;
