import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const categories = [
  {
    name: "Apartments",
    icon: "apartment",
    category: "Apartment",
  },
  {
    name: "Houses",
    icon: "home",
    category: "House",
  },
  {
    name: "Cabins",
    icon: "house-siding",
    category: "Cabin",
  },
  {
    name: "Bed & Breakfast",
    icon: "local-fire-department",
    category: "Bed %26 Breakfast",
  },
  {
    name: "Others",
    icon: "beach-access",
    category: "Other",
  },
];

interface ItemProps {
  name: string;
  category: string;
  icon: any; // don't know the type and string ain't it
}

const Inbox = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const renderItem = ({ item }: { item: ItemProps }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedCategory(item.category);
        console.log(item.category);
      }}
    >
      <MaterialIcons
        name={item.icon}
        size={32}
        color={
          selectedCategory === item.category ? Colors.primary : Colors.text
        }
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "700", textAlign: "center" }}>Flatlist</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 20,
    alignItems: "center",
  },
});

export default Inbox;
