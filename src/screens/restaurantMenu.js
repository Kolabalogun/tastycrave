import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import Header from "../components/common/navbar";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import Tab from "../components/restaurantMenu/tab";
import { config, getDocBaseOnQuery } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import Card from "../components/restaurantMenu/foodcard";
import EmptyState from "../components/common/emptyState";
import { useGlobalContext } from "../context/useGlobalContext";

const RestaurantMenu = ({ route }) => {
  const navigation = useNavigation();

  const { user } = useGlobalContext();

  const { shop } = route?.params || {};

  const {
    data: foods,
    refetch,
    loading,
  } = useAppwrite(() =>
    getDocBaseOnQuery(5, config.foodsCollectionId, "shops", shop?.$id)
  );

  const [selectedCategory, setSelectedCategory] = useState("Meal");

  useEffect(() => {
    setSelectedCategory(shop?.foodcat[0]);
  }, [route?.params]);

  const rating = Math.floor(shop?.rating);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<AntDesign key={i} name="star" size={12} color="#FF9C01" />);
    }
    return stars;
  };

  const filteredFoods = useMemo(() => {
    if (!foods) return [];

    switch (selectedCategory) {
      case "Meal":
        return foods.filter((post) => post.category.toLowerCase() === "meal");
      case "Pizza":
        return foods.filter((post) => post.category.toLowerCase() === "pizza");
      case "Fruits":
        return foods.filter((post) => post.category.toLowerCase() === "fruits");
      case "Vegetables":
        return foods.filter(
          (post) => post.category.toLowerCase() === "vegetables"
        );
      case "Noodles":
        return foods.filter(
          (post) => post.category.toLowerCase() === "noodles"
        );
      case "Drinks":
        return foods.filter((post) => post.category.toLowerCase() === "drinks");
      default:
        return foods;
    }
  }, [foods, selectedCategory]);

  return (
    <ScreenLayout>
      <View>
        <Header
          title={shop?.name}
          fn={() => navigation.goBack()}
          img={"back"}
          img2={images.logoSmall}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View className="flex flex-row   justify-between     ">
            <View>
              <Image
                source={{ uri: shop?.image }}
                className=" w-24 h-24 rounded-md mb-5 overflow-hidden shadow-lg shadow-black/40 mr-4"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1 justify-between">
              <View>
                <Text
                  className="text-black-200 font-pmedium text-base
                  "
                >
                  {shop?.name}
                </Text>

                <Text className="text-gray-400 mt-2  capitalize font-psemibold text-xs">
                  {shop?.location}
                </Text>
              </View>

              {user?.role === "admin" && (
                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateFood")}
                  className="bg-secondary-100 p-1 rounded-full w-20 items-center justify-center"
                >
                  <Text className="text-white font-pmedium text-xs">
                    Add Food
                  </Text>
                </TouchableOpacity>
              )}

              <View className=" mb-6   flex-row justify-between items-center">
                <View className="items-center flex-row gap-x-1">
                  <View className="items-center flex-row gap-x-1">
                    {renderStars()}
                    <Text className="text-gray-400 uppercase font-psemibold text-xs">
                      {rating}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-400 font-pmedium text-xs">
                  {foods?.length || 0} Dishes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {loading ? (
          <View className="h-64 items-center justify-center">
            <ActivityIndicator color={"#FF9C01"} size="large" />
          </View>
        ) : (
          <>
            <View className="my-5">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shop?.foodcat?.map((category) => (
                  <Tab
                    key={category}
                    category={category}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                ))}
              </ScrollView>
            </View>

            {filteredFoods?.length === 0 ? (
              <EmptyState
                title="No Food found for this category"
                subtitle="Search is Empty"
              />
            ) : (
              <View>
                {filteredFoods?.map((food) => (
                  <Card food={food} key={food?.$id} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default RestaurantMenu;
