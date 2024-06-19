import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CheckoutTopbar = ({ navigation }) => {
  return (
    <View style={styles.TopBar}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/icon/back.png")}
          resizeMode="contain"
          style={{ height: 20, width: 25 }}
        />
      </TouchableOpacity>
      <View style={styles.location}>
        <Text style={styles.locationTxt}>Checkout</Text>
      </View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  );
};

export default CheckoutTopbar;

const styles = StyleSheet.create({
  TopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  location: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  locationTxt: {
    fontSize: 20,
    backgroundColor: "white",
    width: "70%",
    padding: 7,
    textAlign: "center",

    borderRadius: 15,
    fontWeight: "600",
  },
});
