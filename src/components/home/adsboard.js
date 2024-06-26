import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AdsBoard = () => {
  return (
    <View>
      <View className="flex-row mb-6 justify-between   bg-secondary-200  p-4 rounded-lg">
        <View className="w-[70%]">
          <Text className="text-white font-pmedium text-lg ">Hello</Text>
          <Text className="text-white font-pregular my-1.5">
            Welcome, you have 20% discount on all our product from now till next
            August.
          </Text>
        </View>
        <View>
          <Image
            source={require("../../assets/burger.png")}
            resizeMode="cover"
            style={{ height: 100, width: 100 }}
          />
        </View>
      </View>
    </View>
  );
};

export default AdsBoard;
