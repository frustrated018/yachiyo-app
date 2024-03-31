import { View } from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const HomePage = () => {
  const [category, setCategory] = useState<string>("Apartment");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  //TODO: Use the category that we get form header component to get the data from db.

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          // Hide the header for this route
          headerShown: false,
        }}
      />
      <ExploreHeader onCategoryChanged={onDataChanged} />

      {/* Listings  */}

      <Listings category={category} />
    </View>
  );
};

export default HomePage;
