import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Listing } from "@/interfaces/listings";
import { useQuery } from "@tanstack/react-query";
import { fetchlistings } from "@/api/listingsRelatedApi";

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

  return (
    <View style={{ flex: 1, marginTop: 160 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {isLoading && <Text>Loading....</Text>}
      {isError && <Text>Error in fetching data</Text>}

      {!isLoading && !isError && (
        <Listings listings={items} category={category} />
      )}
    </View>
  );
};

export default Page;
