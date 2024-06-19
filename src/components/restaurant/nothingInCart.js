import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const NothingInCart = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4615794-3822062.png",
        }}
        style={{ height: 290, width: 300 }}
      />

      <Text style={{ fontSize: 16 }}>Oops, your cart is empty.</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.checkoutBtn}
      >
        <Text style={styles.checkoutBtnTxt}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NothingInCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutBtn: {
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  checkoutBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    padding: 10,
  },
});
