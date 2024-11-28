import { useAuth } from "@clerk/clerk-expo";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import ReactNativeModal from "react-native-modal";

import { StyledImage, StyledText, StyledView } from "@/components";
import Button from "@/components/Button";
import { images } from "@/constants/swipe-menu";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/types";

/**
 * @description make `payment` after selecting ride details
 * @param fullName full name of customer,
 * @param amount amount to be paid by customer,
 * @param email email of the customer,
 * @param driverId unique id of driver,
 * @param rideTime total time taken to complete the journey
 */
const Payment = ({
  fullName,
  amount,
  email,
  driverId,
  rideTime,
}: PaymentProps) => {
  // handle payment status
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const {
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
    setDestinationLocation,
    setUserLocation,
    userAddress,
    userLatitude,
    userLongitude,
  } = useLocationStore();

  // get userId of logged in user
  const { userId } = useAuth();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  /**
   * @description payment interface to initialize with `default values
   */
  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "native-uber-app",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "INR",
        },
        confirmHandler: confirmHandler,
      },
      returnURL: "myapp://book-ride",
    });
    if (error) {
      Alert.alert(`Error: ${error.message}`);
    }
  };

  /**
   * @description `confirm payment` after entering payment details and `payment method`
   * @param paymentMethod
   * @param shouldSavePaymentMethod
   * @param intentCreationCallback
   */
  const confirmHandler = async (
    paymentMethod: any,
    shouldSavePaymentMethod: any,
    intentCreationCallback: any
  ) => {
    const { paymentIntent, customer } = await fetchAPI(
      "/(api)/(stripe)/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email.split("@")[0],
          email: email,
          amount: amount,
          paymentMethodId: paymentMethod.id,
        }),
      }
    );

    if (paymentIntent.client_secret) {
      const { result } = await fetchAPI("(api)/(stripe)/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          payment_intent_id: paymentIntent.id,
          customer_id: customer,
        }),
      });

      if (result.client_secret) {
        await fetchAPI("/(api)/ride/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            origin_address: userAddress,
            destination_address: destinationAddress,
            origin_latitude: userLatitude,
            origin_longitude: userLongitude,
            destination_latitude: destinationLatitude,
            destination_longitude: destinationLongitude,
            ride_time: rideTime.toFixed(0),
            fare_price: parseInt(amount) * 100,
            payment_status: "paid",
            driver_id: driverId,
            user_id: userId,
          }),
        });

        intentCreationCallback({ clientSecret: result.client_secret });
      }
    }
  };

  /**
   * @description make payment handler method to start payment
   */
  const handlePayment = async () => {
    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === PaymentSheetError.Canceled) {
        Alert.alert(`Error: ${error.message}`);
      }
    } else {
      setPaymentSuccess(true);
    }
  };

  return (
    <>
      <Button
        btnText={"Confirm ride"}
        className="my-10"
        onPress={handlePayment}
      />

      <ReactNativeModal
        isVisible={paymentSuccess}
        onBackdropPress={() => setPaymentSuccess(false)}
      >
        <StyledView className="flex flex-col items-center justify-center bg-white p-7 rounded-md">
          <StyledImage source={images.check} className="w-28 h-28 mt-5" />
          <StyledText className="text-2xl text-center font-Jakarta mt-5">
            Booked successfully
          </StyledText>
          <StyledText className="text-2xl text-center font-Jakarta mt-3">
            Hang tight for your ride
          </StyledText>

          <Button
            btnText={"Back"}
            onPress={() => {
              setPaymentSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </StyledView>
      </ReactNativeModal>
    </>
  );
};

export default Payment;
