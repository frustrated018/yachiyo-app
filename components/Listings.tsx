import React, { useState } from "react";
import {
  View,
  FlatList,
  ListRenderItem,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Listing } from "@/interfaces/listings";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchlistings } from "@/api/listingsRelatedApi";
import Colors from "@/constants/Colors";

interface ListingsProps {
  category: string;
}

//! Issue: Category changes but the current page doesn't so if i'm on page 2 and i change the category the request goes with page=2 so that needs to be fixed

const Listings = ({ category }: ListingsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings", currentPage, category],
    queryFn: () => fetchlistings({ currentPage, category }),
  });
  const items = data?.data;
  const metaData = data?.metaData;

  // Render one listing row for the FlatList
  const renderRow: ListRenderItem<Listing> = ({ item }) => {
    return (
      <Link href={`/details/${item._id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <Image source={{ uri: item.medium_url }} style={styles.image} />

            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}
            >
              <Ionicons name="heart-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Text */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{ fontSize: 16, fontFamily: "mon-sb", width: "80%" }}
              >
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons name="star" size={16} />
                <Text style={{ fontFamily: "mon-sb" }}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            </View>

            <Text style={{ fontFamily: "mon" }}>
              Room Type: {item.room_type}
            </Text>
            <Text style={{ fontFamily: "mon" }}>
              Property Type: {item.property_type}
            </Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
              <Text style={{ fontFamily: "mon" }}>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      {isLoading && (
        <View style={styles.stateContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {isError && (
        <View style={styles.stateContainer}>
          <Text style={{ color: "#d00000", fontFamily: "mon-b", fontSize: 20 }}>
            Couldn't Get Listings.
          </Text>
        </View>
      )}

      {!isLoading && !isError && (
        <FlatList
          renderItem={renderRow}
          data={items}
          ListFooterComponent={() => (
            <Pagination
              totalPages={metaData.totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listing: {
    padding: 16,
    gap: 10,
    paddingVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default Listings;
