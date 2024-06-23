import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import useAppwrite from "../lib/useAppwrite";
import { config, getAllDocs } from "../lib/appwrite";

import EmptyState from "../components/common/emptyState";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "../utils/timeAgo";
import { useNavigation } from "@react-navigation/native";

const Foods = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {
    data: foods,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(100, config.foodsCollectionId));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AntDesign key={i} name="star" size={12} color="#FF9C01" />);
    }
    return stars;
  };

  return (
    <ScreenLayout>
      <View className="flex mb-1 mt-14">
        <Text className="font-pmedium text-black-100 text-sm">
          Search Results
        </Text>
        <Text className="text-2xl font-psemibold text-black mt-1">
          All Foods
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View className="h-64 items-center justify-center">
            <ActivityIndicator color={"#FF9C01"} size="large" />
          </View>
        ) : foods?.length > 0 ? (
          <View className="my-3">
            {foods.map((food) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateFood", {
                    food: food,
                  })
                }
                key={food?.$id}
                className="bg-[#282828] rounded-lg p-4 mb-5"
              >
                <Text className="text-xs text-white mb-2 font-pmedium">
                  ID: {food?.$id}
                </Text>
                <View className="items-center flex-row">
                  <View className="rounded-full p-1 bg-white">
                    <Entypo
                      name="shopping-basket"
                      size={22}
                      color={"#FF9C01"}
                    />
                  </View>

                  <View className="flex-1 mx-4">
                    <Text className="text-white font-pmedium text-base">
                      {food?.name}
                    </Text>
                    <View className="items-center flex-row gap-x-1">
                      {renderStars(Math.ceil(food?.rating))}
                      <Text className="text-gray-400 uppercase font-psemibold text-sm">
                        {food?.rating}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className="text-white font-pregular mb-1 text-[11px]">
                      Created At:
                    </Text>
                    <Text className="text-white font-pregular mb-1 text-xs">
                      {timeAgo(food?.$createdAt)}
                    </Text>
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-sm text-white font-pregular">
                    Restaurant:
                  </Text>
                  <Text className="text-sm text-white font-pmedium">
                    {food?.foods?.name}
                  </Text>
                </View>

                <View className="mt-4 justify-between items-center flex-row">
                  <View>
                    <Text className="text-sm text-white font-pregular">
                      Category:
                    </Text>
                    <Text className="text-sm mt-1 text-white font-pmedium">
                      {food?.category}
                    </Text>
                  </View>
                  <View className="mt-4">
                    <Text className="text-sm text-white font-pregular">
                      Price:
                    </Text>
                    <Text className="text-sm mt-1 text-white font-pmedium">
                      N {food?.price}
                    </Text>
                  </View>
                </View>

                <View className="my-4">
                  <Text className="text-sm text-white font-pregular">
                    Food Description:
                  </Text>
                  <Text className="text-sm mt-1 text-white font-pmedium">
                    {food?.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <EmptyState
            title="No food has been placed"
            subtitle="food list is empty"
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Foods;
