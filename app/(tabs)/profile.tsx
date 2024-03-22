import { View, Text, Button, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.cardContainer}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          User Information
        </Text>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        <Text style={{ marginTop: 10 }}>
          First name: {user ? firstName : "Not Available"}
        </Text>
        <Text>Last name: {user ? lastName : "Not Available"}</Text>
      </View>

      {isSignedIn && (
        <Button
          title="Log Out"
          onPress={() => signOut()}
          color={Colors.secondary}
        />
      )}
      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Log In" color={Colors.secondary} />
        </Link>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 15,
    marginBottom: 40,
  },
});

export default Profile;
