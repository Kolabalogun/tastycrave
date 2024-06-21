import { RefreshControl, ScrollView, View } from "react-native";
import React, { useState } from "react";
import AdsBoard from "../components/home/adsboard";
import FoodCategory from "../components/home/foodcategories";
import ScreenLayout from "../layout/screenlayout";
import SearchInput from "../components/common/searchInput";
import Header from "../components/home/header";
import Restaurants from "../components/home/restaurants";
import { config, getAllDocs } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import { useGlobalContext } from "../context/useGlobalContext";
import Loader from "../components/common/loader";

const Home = () => {
  const { checkCurrentUser } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: categories,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(null, config.categoriesCollectionId));

  const {
    data: shops,
    refetch: shopsRefetch,
    loading: shopsLoading,
  } = useAppwrite(() => getAllDocs(20, config.shopsCollectionId));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await shopsRefetch();
    checkCurrentUser();
    setRefreshing(false);
  };

  if (loading || shopsLoading) return <Loader />;

  return (
    <ScreenLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex mb-6 mt-10   space-y-6">
          <Header />
          <SearchInput />
        </View>

        <AdsBoard />

        <FoodCategory categories={categories} />

        <Restaurants shops={shops} />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Home;
