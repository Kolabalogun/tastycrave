import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { config, getAllDocs } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import Card from "./card";

const Restaurants = () => {
  const {
    data: shops,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(5, config.shopsCollectionId));

  return (
    <View className="my-4   ">
      <View className="justify-between mb-6 flex-row items-center  ">
        <Text className="font-semibold text-lg ">Nearby Restaurants</Text>
        <TouchableOpacity className="font-semibold text-xs ">
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
