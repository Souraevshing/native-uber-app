import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Home = () => {
  const { isSignedIn } = useAuth();

  /**
   * @description if user is signed in, then redirect user to `/(root)/(tabs)/home`
   */
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/onboard-user" />;
};

export default Home;
