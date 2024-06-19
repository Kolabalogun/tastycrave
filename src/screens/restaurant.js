import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/useGlobalContext";

import Header from "../components/common/navbar";
import { images } from "../constants";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import CustomButton from "../components/common/custombutton";

const { height } = Dimensions.get("window");

const Restaurant = ({ navigation, route }) => {
  const { increment, currentFood, decrement } = useGlobalContext();

  useEffect(() => {
    let { food } = route.params;
    foodF(food);
  }, [route.params]);

  const [count, countF] = useState(0);
  const [food, foodF] = useState(null);

  const [constt, consttF] = useState(null);

  return (
    <SafeAreaView className="flex-1 bg-primary h-full relative">
      <ScrollView className="relative">
        <View className="px-4">
          <Header
            title={food?.name}
            fn={() => navigation.goBack()}
            img={"back"}
            img2={images.logoSmall}
          />
        </View>

        <View style={{ flex: 2, height: height * 0.5 }}>
          <ImageBackground
            source={{ uri: food?.image }}
            style={styles.imageBackground}
            resizeMode="cover"
          ></ImageBackground>
        </View>
        <View style={styles.foodBoard} className="relative  flex-1 bg-black">
          <View style={styles.line}></View>
          <View className="justify-between flex-1 bg-white h-full">
            <View className="mt-3 flex-row items-center">
              <View
                style={{ flex: 3 }}
                className="flex-row items-center justify-between"
              >
                <Text className="font-psemibold text-xl ">{food?.name}</Text>
              </View>
              <View className="flex-row items-center space-x-3 bg-secondary-200 py-2 px-1 rounded-full">
                <TouchableOpacity
                  className="px-3 "
                  onPress={() => {
                    decrement(food?.menuId);
                    if (constt > 0 || food?.value) {
                      consttF(count - 1);
                    }
                  }}
                >
                  <Text className="text-white font-psemibold text-xl">-</Text>
                </TouchableOpacity>
                <View className="  ">
                  <Text className="text-white font-psemibold text-xl">
                    {constt ? currentFood : food?.value}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    increment(food?.menuId);
                    consttF(count + 1);
                  }}
                  className="px-3 "
                >
                  <Text className="text-white font-psemibold text-xl">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row space-x-0.5 mt-3  items-center">
              <FontAwesome6 name="naira-sign" size={14} color="black" />
              <Text className="font-pmedium text-[16px] mt-0.5">
                {food?.price}
              </Text>
            </View>
            <View className="items-center flex-row gap-x-1">
              <AntDesign name="star" size={12} color="#FF9C01" />
              <Text className="text-gray-400 uppercase font-psemibold text-sm">
                {food?.rating}
              </Text>
            </View>

            <View className="mt-6">
              <Text className="font-plight  ">{food?.desc}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Cart"
          handlePress={() => navigation.navigate("Cart")}
          containerStyles="mt-7"
        />
      </View>
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    width: "100%",
  },
  foodBoard: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "white",
    paddingHorizontal: 20,
    marginTop: -36,
    paddingBottom: 10,
    marginBottom: 140,
  },
  line: {
    borderRadius: 5,
    borderColor: "#FF9C01",
    borderWidth: 2,
    width: 90,
    alignSelf: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
