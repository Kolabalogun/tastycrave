import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import CheckoutItem from "../components/restaurant/checkoutItem";
import CheckoutTopbar from "../components/restaurant/checkoutTopBar";
import NothingInCart from "../components/restaurant/nothingInCart";

const Checkout = ({ navigation }) => {
  const { foodList, total, handleCheckOut } = useGlobalContext();

  const checkouts = foodList.map((EachItem, index) => (
    <CheckoutItem
      key={index}
      id={EachItem.id}
      name={EachItem.name}
      price={EachItem.price}
      value={EachItem.value}
      photo={EachItem.photo}
    />
  ));

  const [showInfo, showInfoF] = useState(true);
  const [address, addressF] = useState("");
  const [contact, contactF] = useState("");
  const [payment, paymentF] = useState("Cash");
  const [notification, notificationF] = useState("");
  const [details, detailsF] = useState({
    address: "null",
    contact: "null",
    payment: "Cash",
  });

  useEffect(() => {
    let interval = setTimeout(() => {
      notificationF("");
    }, 3000);

    return () => clearInterval(interval);
  }, [notification]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!address || !contact || !payment) {
      notificationF("All Text Field must be filled");
    } else if (address.length < 4 || contact.length < 4) {
      notificationF("Invalid Address or Phone Number");
    } else {
      detailsF({
        address: address,
        contact: contact,
        payment: payment,
      });
      showInfoF(false);
    }
  }

  let deliveryfee = 10;

  function handleNxtPage() {
    if (!showInfo) {
      handleCheckOut();
      // navigation.navigate("MapOrderDelivery");

      navigation.navigate("Success");
    } else {
      notificationF("All Text Field must be filled");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <CheckoutTopbar navigation={navigation} />

      {total === 0 ? (
        <NothingInCart navigation={navigation} />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.foodlist}>{checkouts}</View>
          <View
            style={[styles.delivery, { display: !showInfo ? "none" : "flex" }]}
          >
            <Text style={styles.deliveryHeader}>Delivery Info</Text>

            <View style={styles.contactInput}>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Your Address</Text>
                <TextInput
                  onChangeText={(e) => addressF(e)}
                  style={{
                    backgroundColor: "aliceblue",
                    padding: 3,
                    borderRadius: 5,
                  }}
                  value={address}
                />
              </View>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Your Contact</Text>
                <TextInput
                  maxLength={11}
                  keyboardType="phone-pad"
                  onChangeText={(e) => contactF(e)}
                  style={{
                    backgroundColor: "aliceblue",
                    padding: 3,
                    borderRadius: 5,
                  }}
                  value={contact}
                />
              </View>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Payment Method</Text>
                <TextInput
                  // onChangeText={(e) => paymentF(e)}
                  style={{
                    backgroundColor: "aliceblue",
                    padding: 3,
                    borderRadius: 5,
                  }}
                  value={payment}
                />
              </View>
              <Text style={{ color: "red" }}>{notification}</Text>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.checkoutBtn}
              >
                <Text style={styles.checkoutBtnTxt}>Enter Info</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[styles.delivery, { display: showInfo ? "none" : "flex" }]}
          >
            <Text style={styles.deliveryHeader}>Delivery to</Text>

            <View style={styles.contactInput}>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Your Address</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ flex: 1 }}>{details.address}</Text>
                  <TouchableOpacity onPress={() => showInfoF(true)}>
                    <Text style={{ color: "green", fontWeight: "500" }}>
                      Change Address
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Your Contact</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ flex: 1 }}>{details.contact}</Text>
                  <TouchableOpacity onPress={() => showInfoF(true)}>
                    <Text style={{ color: "green", fontWeight: "500" }}>
                      Change Contact
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.contactInputform}>
                <Text style={styles.contactInputTxt}>Payment Method</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ flex: 1 }}>{details.payment}</Text>
                  <TouchableOpacity onPress={() => showInfoF(true)}>
                    <Text style={{ color: "green", fontWeight: "500" }}>
                      Change
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ color: "red" }}>{notification}</Text>
            </View>
          </View>
          <View style={styles.delivery}>
            <Text style={styles.deliveryHeader}>Payment Details</Text>

            <View style={styles.contactInput}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, fontWeight: "500", fontSize: 15 }}>
                  Sub Total
                </Text>

                <Text style={{ color: "green", fontWeight: "500" }}>
                  ${total}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 5,
                }}
              >
                <Text style={{ flex: 1, fontWeight: "500", fontSize: 15 }}>
                  Delivery Fee
                </Text>

                <Text style={{ color: "green", fontWeight: "500" }}>$10</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleNxtPage}
              style={styles.checkoutBtn}
            >
              <Text style={styles.checkoutBtnTxt}>
                Order - ${total + deliveryfee}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "aliceblue",
  },
  foodlist: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  delivery: {
    backgroundColor: "white",
    padding: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  deliveryHeader: {
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderBottomColor: "green",
    paddingBottom: 3,
  },
  contactInput: {
    padding: 10,
  },
  contactInputTxt: {
    paddingVertical: 3,
    fontWeight: "500",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  checkoutBtn: {
    backgroundColor: "green",
    alignItems: "center",
    borderRadius: 5,
    // marginTop: 10,
  },
  checkoutBtnTxt: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    padding: 10,
  },
});
