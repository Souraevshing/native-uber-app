import { StripeProvider } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";

/**
 * @description payment provider using `stripe` sdk
 * @param children -- ReactNode
 */
export function PaymentProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [publishableKey, setPublishableKey] = useState<string>("");

  const fetchPublishableKey = async () => {
    const key = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.native.uber.app" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      {children}
    </StripeProvider>
  );
}
