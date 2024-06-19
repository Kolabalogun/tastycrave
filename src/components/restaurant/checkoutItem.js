import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const CheckoutItem = ({ photo, name, price, value }) => {
  return (
    <>
      {value ? (
        <View style={styles.cartitem}>
          <View style={styles.right}>
            <Image
              source={{ uri: photo }}
              style={{
                height: 50,
                width: 50,
                borderRadius: 20,
                marginRight: 10,
              }}
            />
          </View>
          <View style={styles.left}>
            <Text style={styles.leftname}>{name} </Text>
            <Text style={styles.leftname}>Plate: {value} </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.total}>${price * value} </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  cartitem: {
    flexDirection: "row",

    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  left: {
    justifyContent: "center",
    flex: 1,
  },
  leftname: {
    paddingVertical: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  total: {
    paddingVertical: 6,
    fontSize: 16,
    fontWeight: "600",
  },
});
