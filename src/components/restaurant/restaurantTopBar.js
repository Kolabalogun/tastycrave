import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RestaurantTopbar = ({ navigation }) => {
  return (
    <View>
      <View style={styles.TopBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://cdn.iconscout.com/icon/premium/png-128-thumb/go-back-arrow-5763885-4827407.png",
            }}
            resizeMode="contain"
            style={{ height: 20, width: 25 }}
          />
        </TouchableOpacity>
        <View style={styles.location}>
          <Text style={styles.locationTxt}></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Checkout")}>
          <Image
            source={require("../../assets/icon/bag.png")}
            resizeMode="contain"
            style={{
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestaurantTopbar;

const styles = StyleSheet.create({
  TopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  location: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  locationTxt: {
    fontSize: 18,
    // backgroundColor: "white",
    width: "70%",
    padding: 7,
    textAlign: "center",

    borderRadius: 15,
    fontWeight: "600",
  },
});
