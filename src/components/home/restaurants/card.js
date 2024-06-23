import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ShopCard = ({ shop }) => {
  const navigation = useNavigation();

  const rating = Math.floor(shop?.rating);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AntDesign key={i} name="star" size={12} color="#FF9C01" />);
    }
    return stars;
  };

  return (
    <View className="mt-4">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RestaurantMenu", {
            shop,
          });
        }}
        className="flex flex-row justify-between"
      >
        <View>
          <Image
            source={{ uri: shop?.image }}
            className="w-24 h-16 rounded-md mb-5 overflow-hidden shadow-lg shadow-black/40 mr-4"
            resizeMode="cover"
          />
        </View>
        <View className="flex-1 justify-between">
          <Text className="text-black-200 font-pmedium text-base">
            {shop?.name}
          </Text>

          <View className="mb-6 flex-row justify-between items-center">
            <View className="items-center flex-row gap-x-1">
              <View className="items-center flex-row gap-x-1">
                {renderStars()}
                <Text className="text-gray-400 uppercase font-psemibold text-xs">
                  {rating}
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 font-pmedium text-xs">
              {shop?.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="h-[0.5px] bg-gray-500 mx-3 my-2"></View>
    </View>
  );
};

export default ShopCard;
