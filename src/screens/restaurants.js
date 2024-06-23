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
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "../utils/timeAgo";
import { useNavigation } from "@react-navigation/native";

const Restaurants = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {
    data: shops,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(50, config.shopsCollectionId));

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
          All Restaurants
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
        ) : shops?.length > 0 ? (
          <View className="my-3">
            {shops.map((shop) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateRestaurant", {
                    shop: shop,
                  })
                }
                key={shop?.$id}
                className="bg-[#282828] rounded-lg p-4 mb-5"
              >
                <Text className="text-xs text-white mb-2 font-pmedium">
                  ID: {shop?.$id}
                </Text>
                <View className="items-center flex-row">
                  <View className="rounded-full p-2 bg-white">
                    <MaterialIcons
                      name={"home-work"}
                      size={24}
                      color={"#49c77f"}
                    />
                  </View>

                  <View className="flex-1 mx-4">
                    <Text className="text-white font-pmedium text-base">
                      {shop?.name}
                    </Text>
                    <View className="items-center flex-row gap-x-1">
                      {renderStars(Math.ceil(shop?.rating))}
                      <Text className="text-gray-400 uppercase font-psemibold text-sm">
                        {shop?.rating}
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className="text-white font-pregular mb-1 text-[11px]">
                      Created At:
                    </Text>
                    <Text className="text-white font-pregular mb-1 text-xs">
                      {timeAgo(shop?.$createdAt)}
                    </Text>
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-sm text-white font-pregular">
                    Location:
                  </Text>
                  <Text className="text-sm text-white font-pmedium">
                    {shop?.location}
                  </Text>
                </View>

                <View className="my-4">
                  <Text className="text-sm text-white font-pregular">
                    Food Categories:
                  </Text>
                  <Text className="text-sm text-white font-pmedium">
                    {shop?.foodcat
                      ?.filter((food) => food)
                      .map((food) => food)
                      .join(", ")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <EmptyState
            title="No shop has been placed"
            subtitle="Shop list is empty"
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Restaurants;
