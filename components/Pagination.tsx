import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface paginationProps {
  currentPage: number;
  totalPages: number;
}

//TODO: Add Disable logic to these buttons
//TODO: Add onPress to both previous and next buttons and handle the logic for those

const Pagination = ({ currentPage, totalPages }: paginationProps) => {
  return (
    <View style={{ alignItems: "center", marginVertical: 20 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Feather name="chevrons-left" size={24} />
        </TouchableOpacity>

        <Text style={styles.pageNumberText}>
          {currentPage} / {totalPages}
        </Text>

        <TouchableOpacity style={styles.button}>
          <Feather name="chevrons-right" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "60%",
    marginHorizontal: "auto",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  pageNumberText: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Pagination;
