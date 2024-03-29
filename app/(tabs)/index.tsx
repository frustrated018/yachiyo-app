import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Listing } from "@/interfaces/listings";
import { useQuery } from "@tanstack/react-query";
import { fetchlistings } from "@/api/listingsRelatedApi";
import Colors from "@/constants/Colors";

const Page = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchlistings,
  });

  const items = data?.data;

  const [category, setCategory] = useState<string>("Tiny homes");

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  //TODO: Use the category that we get form header component to get the data from db.

  return (
    <View style={{ flex: 1, marginTop: 160 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {isError && (
        <View style={styles.container}>
          <Text style={{ color: "#d00000", fontFamily: "mon-b", fontSize: 20 }}>
            Couldn't Get Listings.
          </Text>
        </View>
      )}

      {!isLoading && !isError && (
        <Listings listings={items} category={category} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
