import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import { images } from "../constants";
import { useGlobalContext } from "../context/useGlobalContext";
import InfoBox from "../components/common/profile/infoBox";
import { useNavigation } from "@react-navigation/native";
import { config, getDocBaseOnQuery, signOut } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

import RecentOrders from "../components/profile/recentOrders";

const Profile = () => {
  const { user, setUser, setIsLoggedIn, storeData, checkCurrentUser } =
    useGlobalContext();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: orders,
    refetch,
    loading: ordersLoading,
  } = useAppwrite(() =>
    getDocBaseOnQuery(20, config.ordersCollectionId, "users", user?.$id)
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();

    checkCurrentUser();
    setRefreshing(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      storeData(null);
      Alert.alert("Tastycrave", "User logged out successfully");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="w-full flex justify-center   mt-12 mb-12   ">
          <View className="justify-between flex-row flex-1  items-center mb-10">
            <TouchableOpacity onPress={() => navigation.goBack()} className="">
              <Image resizeMode="contain" style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
            <View>
              <Text className="text-black-200 text-lg font-pmedium capitalize">
                User Profile
              </Text>
              <View className="w-4 self-center   bg-secondary h-[2px]"></View>
            </View>
            <View className=" ">
              {loading ? (
                <View className="flex w-full items-end ">
                  <ActivityIndicator color={"#FF9C01"} />
                </View>
              ) : (
                <TouchableOpacity
                  onLongPress={logout}
                  className="flex w-full items-end "
                >
                  <Image
                    source={images.logoSmall}
                    resizeMode="contain"
                    className="w-8 h-8"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View className="items-center">
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            {user?.role === "admin" && (
              <View className="items-center mb-2 justify-center flex-row">
                <Text className="text-blackc-100 text-xs font-psemibold ">
                  Status:{" "}
                </Text>

                <MaterialIcons name="verified" size={14} color="#FF9C01" />
              </View>
            )}

            <View className="mt-3 mb-5 flex flex-row">
              <InfoBox
                title={orders?.length || 0}
                subtitle="Recent Orders"
                titleStyles="text-xl"
              />
            </View>
          </View>

          {user?.role === "admin" && (
            <View>
              <View className="my-5">
                <Text className=" py-1 border-b-black-200 border-b-[1px] text-black uppercase text-xs font-psemibold">
                  SETTINGS
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Orders")}
                  className="justify-between py-1 border-b-black-200 border-b-[1px]  flex-row items-center"
                >
                  <View>
                    <Text className=" py-4 text-black flex-col  capitalize text-sm font-pmedium">
                      All Orders
                    </Text>
                  </View>

                  <View>
                    <MaterialIcons
                      name={"shopping-cart-checkout"}
                      size={20}
                      color={"#FF9C01"}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Users")}
                  className="justify-between py-1 border-b-black-200 border-b-[1px]  flex-row items-center"
                >
                  <View>
                    <Text className=" py-4 text-black flex-col  capitalize text-sm font-pmedium">
                      All Users
                    </Text>
                  </View>

                  <View>
                    <FontAwesome5 name="users" size={20} color="#FF9C01" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateRestaurant")}
                  className="justify-between py-1 border-b-black-200 border-b-[1px]  flex-row items-center"
                >
                  <View>
                    <Text className=" py-4 text-black flex-col  capitalize text-sm font-pmedium">
                      Create Restaurant
                    </Text>
                  </View>

                  <View>
                    <FontAwesome6
                      name="house-chimney-medical"
                      size={20}
                      color="#FF9C01"
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("CreateFood")}
                  className="justify-between py-1 border-b-black-200 border-b-[1px]  flex-row items-center"
                >
                  <View>
                    <Text className=" py-4 text-black flex-col  capitalize text-sm font-pmedium">
                      Create Food
                    </Text>
                  </View>

                  <View>
                    <MaterialIcons name="fastfood" size={20} color="#FF9C01" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View className="w-full     bg-gray-300 h-[1px] mb-5"></View>

          <RecentOrders loading={ordersLoading} orders={orders} />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Profile;
