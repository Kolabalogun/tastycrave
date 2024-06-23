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

const FoodDetails = ({ navigation, route }) => {
  const { setCart, cart } = useGlobalContext();

  useEffect(() => {
    let { food } = route?.params || {};
    setFood({ ...food, value: 0 });
  }, [route?.params]);

  const [food, setFood] = useState(null);

  const IsFoodInCart = cart?.find((fd) => fd?.$id === food?.$id);

  useEffect(() => {
    IsFoodInCart && setFood(IsFoodInCart);
  }, [cart, food]);

  const handleIncrement = () => {
    const updatedFood = { ...food, value: food.value + 1 };

    setCart((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.$id === food.$id);
      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex] = updatedFood;
        return updatedCart;
      }
      return [...prev, updatedFood];
    });
    setFood(updatedFood);
  };

  const handleDecrement = () => {
    if (food?.value > 0) {
      const updatedFood = { ...food, value: food.value - 1 };
      setCart((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.$id === food.$id
        );
        if (existingItemIndex > -1) {
          const updatedCart = [...prev];
          if (updatedFood.value > 0) {
            updatedCart[existingItemIndex] = updatedFood;
          } else {
            updatedCart.splice(existingItemIndex, 1);
          }
          return updatedCart;
        }
        return [...prev];
      });
      setFood(updatedFood);
    }
  };
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
                <TouchableOpacity className="px-3 " onPress={handleDecrement}>
                  <Text className="text-white font-psemibold text-xl">-</Text>
                </TouchableOpacity>
                <View className="  ">
                  <Text className="text-white font-psemibold text-xl">
                    {IsFoodInCart ? IsFoodInCart?.value : food?.value}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleIncrement} className="px-3 ">
                  <Text className="text-white font-psemibold text-xl">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row space-x-0.5 mt-3  items-center justify-between">
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
            </View>

            <Text className="text-gray-400 uppercase font-psemibold text-sm">
              {food?.shops?.name}
            </Text>

            <View className="mt-6">
              <Text className="font-plight  ">{food?.desc}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {food?.value > 0 && (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Cart"
            value={cart?.length}
            handlePress={() => navigation.navigate("Cart")}
            containerStyles="mt-7"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FoodDetails;

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
