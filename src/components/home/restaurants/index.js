import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import Card from "./card";
import { useNavigation } from "@react-navigation/native";

const Restaurants = ({ shops }) => {
  const navigation = useNavigation();

  return (
    <View className="my-6   ">
      <View className="justify-between mb-1 flex-row items-center  ">
        <Text className="font-semibold text-lg ">Nearby Restaurants</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Search", {
              query: "All Restaurants",
              type: "restaurants",
            })
          }
          className="font-semibold text-xs "
        >
          <Text className="font-pmedium text-secondary-200">See All</Text>
        </TouchableOpacity>
      </View>

      <View>
        {shops?.map((shop) => (
          <Card key={shop?.$id} shop={shop} />
        ))}
      </View>
    </View>
  );
};

export default Restaurants;
