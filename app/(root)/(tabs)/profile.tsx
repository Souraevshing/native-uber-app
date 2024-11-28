import { useUser } from "@clerk/clerk-expo";
import React from "react";

import {
  StyledImage,
  StyledSafeAreaView,
  StyledScrollView,
  StyledText,
  StyledView,
} from "@/components";
import Input from "@/components/Input";

const Profile = () => {
  const { user } = useUser();

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <StyledText className="text-2xl font-JakartaBold my-5">
          My profile
        </StyledText>

        <StyledView className="flex items-center justify-center my-5">
          <StyledImage
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </StyledView>

        <StyledView className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <StyledView className="flex flex-col items-start justify-start w-full">
            <Input
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <Input
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <Input
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <Input
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Profile;
