import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Text>The home page </Text>
      <Link href={"/(modals)/login"}>Login Page</Link>
      <Link href={"/(modals)/booking"}>Booking Page</Link>
      <Link href={"/listing/3232"}>Listing details page</Link>
    </View>
  );
};

export default Page;
