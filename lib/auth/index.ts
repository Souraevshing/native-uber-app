import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import { fetchAPI } from "../fetch";

/**
 * @description getting `token` from cache by securing it as well
 */
export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error(err);
      return;
    }
  },
};

/**
 * @description authenticate user with google
 * @param startOAuthFlow StartOAuthFlowParams
 * @returns success or error response
 */
export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
        scheme: "my-app",
      }),
    });

    if (createSessionId) {
      if (setActive) {
        await setActive({ session: createSessionId });

        if (signUp.createUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createUserId,
            }),
          });
        }

        return {
          success: true,
          code: "success",
          message: "Successfully authenticated!",
        };
      }
    }
    return {
      success: false,
      code: "error",
      message: "Something went wrong!",
    };
  } catch (err: any) {
    console.error(err);

    return {
      success: false,
      code: err.code,
      message: err?.errors[0]?.longMessage,
    };
  }
};
