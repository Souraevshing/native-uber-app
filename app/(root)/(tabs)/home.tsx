import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

const Home = () => {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
    </View>
  );
};

export default Home;
