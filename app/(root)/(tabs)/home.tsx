import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

import { StyledSafeAreaView, StyledText } from "@/components";
import { Link } from "expo-router";

const Home = () => {
  const { user } = useUser();

  return (
    <StyledSafeAreaView>
      <SignedIn>
        <StyledText>{user?.emailAddresses[0].emailAddress}</StyledText>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>
          <StyledText>Sign In</StyledText>
        </Link>
        <Link href={"/sign-up"}>
          <StyledText>Sign Up</StyledText>
        </Link>
      </SignedOut>
    </StyledSafeAreaView>
  );
};

export default Home;
