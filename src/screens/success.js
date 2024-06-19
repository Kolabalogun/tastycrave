import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Success = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdni.iconscout.com/illustration/premium/thumb/successful-delivery-2644410-2206498.png",
        }}
        style={{ height: 290, width: 300 }}
      />

      <Text style={{ fontSize: 14 }}>
        You've successfully placed your Order. Delivery is en route.
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Home");
        }}
        style={styles.checkoutBtn}
      >
        <Text style={styles.checkoutBtnTxt}>You want more food?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "aliceblue",
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
