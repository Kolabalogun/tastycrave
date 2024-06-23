import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import useAppwrite from "../lib/useAppwrite";
import { config, getAllDocs, getDocBaseOnQuery } from "../lib/appwrite";
import SearchInput from "../components/common/searchInput";
import ShopCard from "../components/home/restaurants/card";
import Card from "../components/restaurantMenu/foodcard";
import EmptyState from "../components/common/emptyState";

const Search = ({ route }) => {
  let { query, type } = route.params;

  const [refreshing, setRefreshing] = useState(false);

  const {
    data: foods,
    refetch,
    loading,
  } = useAppwrite(() =>
    getDocBaseOnQuery(
      20,
      config.foodsCollectionId,
      type === "cat" ? "category" : "name",
      query
    )
  );

  const {
    data: shops,
    refetch: shopRefresh,
    loading: shoploading,
  } = useAppwrite(
    type === "restaurants"
      ? () => getAllDocs(30, config.shopsCollectionId)
      : () =>
          getDocBaseOnQuery(
            20,
            config.shopsCollectionId,
            type === "cat" ? "foodcat" : "name",
            query
          )
  );

  const data = [...foods, ...shops];

  useEffect(() => {
    refetch();
    shopRefresh();
  }, [query]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await shopRefresh();

    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <View className="flex mb-1 mt-14  ">
        <Text className="font-pmedium text-black-100 text-sm">
          Search Results
        </Text>
        <Text className="text-2xl font-psemibold text-black mt-1">{query}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {type !== "restaurants" && (
          <View className="mt-6 mb-6">
            <SearchInput initialQuery={query} />
          </View>
        )}

        {loading || shoploading ? (
          <View className="h-64 items-center justify-center">
            <ActivityIndicator color={"#FF9C01"} size="large" />
          </View>
        ) : data.length > 0 ? (
          <>
            {foods?.length > 0 && (
              <View>
                <Text className="font-psemibold underline text-black mb-3">
                  Foods
                </Text>

                <View>
                  {foods?.map((food) => (
                    <Card key={food?.$id} food={food} />
                  ))}
                </View>
              </View>
            )}

            {shops?.length > 0 && (
              <View className="my-5">
                {type !== "restaurants" && (
                  <Text className="font-psemibold underline text-black mb-3">
                    Restaurants
                  </Text>
                )}

                <View>
                  {shops?.map((shop) => (
                    <ShopCard key={shop?.$id} shop={shop} />
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <EmptyState
            title="No Food or Restaurants found for this search"
            subtitle="Search is Empty"
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Search;
