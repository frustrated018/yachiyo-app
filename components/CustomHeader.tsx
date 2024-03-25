import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const CustomHeader = () => {
  const [active, setActive] = useState(0);
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 0 ? Colors.primary : Colors.text,
            textDecorationLine: active === 0 ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === 1 ? Colors.primary : Colors.text,
            textDecorationLine: active === 1 ? "underline" : "none",
          }}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    paddingLeft: 50,
  },
});

export default CustomHeader;
