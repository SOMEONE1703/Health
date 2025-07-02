import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  description: string;
};

const NotificationTile = ({ title, description }: Props) => {
  return (
    <TouchableOpacity style={styles.tileContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "98%",

  },
  contentContainer: {
    flexDirection: "column",
  },
  titleContainer: {
    marginBottom: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  descriptionContainer: {
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
});

export default NotificationTile;