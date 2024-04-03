import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchLisingById } from "@/api/listingsRelatedApi";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const params = useLocalSearchParams();

  //! Fake db Call
  const showToast = () => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Bid placed!",
        text2: "Please go to the checkout page to Complete the reservation.",
      });
    }, 3000);
  };

  // Handle if params.id is an array by taking the first element
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: listing,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Detials"],
    queryFn: () => fetchLisingById({ id }),
  });

  // Render loading indicator if data is loading
  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Render error message if there's an error fetching data
  if (isError) {
    return (
      <View style={styles.stateContainer}>
        <Text style={{ color: "#d00000", fontFamily: "mon-b", fontSize: 20 }}>
          Couldn't Get Listing.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: listing?.xl_picture_url }}
          style={[styles.image]}
          resizeMode="cover"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing.name}</Text>
          <Text style={styles.location}>
            {listing?.room_type} in {listing?.smart_location}
          </Text>
          <Text style={styles.rooms}>
            {listing?.guests_included} guests · {listing?.bedrooms} bedrooms ·{" "}
            {listing?.beds} bed · {listing?.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing?.review_scores_rating / 20} ·{" "}
              {listing?.number_of_reviews} reviews
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image
              source={{ uri: listing?.host_picture_url }}
              style={styles.host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing?.host_name}
              </Text>
              <Text>Hosted since {listing?.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing?.description}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>${listing?.price ?? "N/A"}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 20 }]}
            onPress={showToast}
          >
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Toast position="bottom" />
    </View>
  );
};

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors.text,
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.text,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.text,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.text,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
});

export default DetailsPage;
