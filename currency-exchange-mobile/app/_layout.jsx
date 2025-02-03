import { Stack } from "expo-router";
import { AuthProvider } from "../auth/AuthContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign up",
          }}
        />

        <Stack.Screen
          name="home"
          options={{
            title: "Home",
          }}
        />

        <Stack.Screen
          name="[exchange]"
          options={{
            title: "Exchange",
          }}
        />
      </Stack>
    </AuthProvider>
  );
};
export default RootLayout;
