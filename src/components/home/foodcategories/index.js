import { Text, View } from "react-native";
import React from "react";

import { ScrollView } from "react-native";

import Card from "./card";

const FoodCategory = ({ categories }) => {
  return (
    <View className="mb-2  ">
      <Text className="font-semibold text-lg pb-3">Choose Category</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories
          ?.slice()
          ?.reverse()
          ?.map((category) => (
            <Card key={category?.$id} category={category} />
          ))}
      </ScrollView>
    </View>
  );
};

export default FoodCategory;
