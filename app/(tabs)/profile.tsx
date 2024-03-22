import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <View>
      <Text>Profile Page</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Button
          title="Sign In"
          onPress={() => router.push("/(modals)/login")}
        />
      )}
    </View>
  );
};

export default Profile;
