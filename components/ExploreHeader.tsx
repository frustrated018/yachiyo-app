import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
];

const ExploreHeader = () => {
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where To?</Text>
                <Text style={{ fontFamily: "mon" }}>
                  Anywhere · Any week · Add Guests
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={30} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
             paddingHorizontal:10
          }}
        >
          {categories.map((item, idx) => (
            <TouchableOpacity
              key={item.name + idx}
              onPress={() => selectCategory(idx)}
              ref={(el) => (itemsRef.current[idx] = el)}
              style={
                activeIndex === idx
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }
            >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === idx ? Colors.primary : Colors.text}
              />
              <Text
                style={
                  activeIndex === idx
                    ? styles.categoryTextActive
                    : styles.categoryText
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: "#fff",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: 50,
  },
  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    borderWidth: StyleSheet.hairlineWidth,

    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.text,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.primary,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
