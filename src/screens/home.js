import { ScrollView, View } from "react-native";
import React from "react";
import AdsBoard from "../components/home/adsboard";
import FoodCategory from "../components/home/foodcategories";
import ScreenLayout from "../layout/screenlayout";
import SearchInput from "../components/common/searchInput";
import Header from "../components/home/header";
import Restaurants from "../components/home/restaurants";
import FoodList from "../components/home/foodlist";

const Home = () => {
  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex mb-6 mt-10   space-y-6">
          <Header />
          <SearchInput />
        </View>

        <AdsBoard />

        <FoodCategory />

        <Restaurants />

        <FoodList />
      </ScrollView>
    </ScreenLayout>
  );
};

export default Home;
