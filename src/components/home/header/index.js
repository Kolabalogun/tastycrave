import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import getTimeOfDay from "../../../utils/timeOfTheDay";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();
  return (
    <View className="flex justify-between items-start flex-row mt-3 mb-5">
      <View>
        <Text className="font-pmedium text-sm text-black-100">
          {getTimeOfDay()},
        </Text>
        <Text className="text-2xl font-psemibold text-black-200 capitalize">
          {user?.username}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        className="w-10 h-10 border border-secondary-200 rounded-lg flex justify-center items-center"
      >
        <Image
          source={{ uri: user?.avatar }}
          className="w-[85%] h-[85%] rounded-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
