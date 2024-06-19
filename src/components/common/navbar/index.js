import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Header = ({ title, fn, img, img2 }) => {
  return (
    <View className="flex mb-3 mt-12   justify-between items-center flex-row">
      <TouchableOpacity onPress={fn} className="">
        {img === "back" ? (
          <Feather name="arrow-left" size={24} color="black" />
        ) : (
          <Image
            source={img}
            resizeMode="contain"
            style={{ height: img ? 28 : 20, width: img ? 28 : 20 }}
          />
        )}
      </TouchableOpacity>
      <View>
        <Text className="text-black-200 text-lg font-pmedium capitalize">
          {title}
        </Text>
        <View className="w-4 self-center   bg-secondary h-[2px]"></View>
      </View>
      <TouchableOpacity className="">
        <Image
          source={img2}
          resizeMode="contain"
          style={{ height: 30, width: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
