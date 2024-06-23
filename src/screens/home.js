import { Alert, RefreshControl, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import AdsBoard from "../components/home/adsboard";
import FoodCategory from "../components/home/foodcategories";
import ScreenLayout from "../layout/screenlayout";
import SearchInput from "../components/common/searchInput";
import Header from "../components/home/header";
import Restaurants from "../components/home/restaurants";
import { config, getAllDocs, updateDoc } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import { useGlobalContext } from "../context/useGlobalContext";
import Loader from "../components/common/loader";

const Home = () => {
  const { checkCurrentUser, user, expoPushToken } = useGlobalContext();
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
  } = useAppwrite(() => getAllDocs(30, config.shopsCollectionId));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await shopsRefetch();
    checkCurrentUser();
    setRefreshing(false);
  };

  useEffect(() => {
    const checkIfUserHasExpoID = async () => {
      const form = {
        collectionId: user?.$collectionId,
        documentId: user?.$id,
        expo_Id: expoPushToken,
      };

      if (user?.expo_Id === null || user?.expo_Id === "") {
        await updateDoc(form);

        // Alert.alert("User Expo ID has been updated");
      }
    };

    checkIfUserHasExpoID();
  }, []);

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
