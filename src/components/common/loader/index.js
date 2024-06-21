import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import getTimeOfDay from "../../../utils/timeOfTheDay";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { images } from "../../../constants";
import ScreenLayout from "../../../layout/screenlayout";

const Loader = () => {
  const { user } = useGlobalContext();
  return (
    <ScreenLayout>
      <View className="flex mb-6 mt-10   space-y-6">
        <View className="flex justify-between items-start flex-row mt-3 mb-5">
          <View>
            <Text className="font-pmedium text-sm text-black-100">
              {getTimeOfDay()},
            </Text>
            <Text className="text-2xl font-psemibold text-black-200 capitalize">
              {user?.username}
            </Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={images.logoSmall}
              className="w-9 h-9"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View className="h-[68vh] items-center justify-center">
        <ActivityIndicator color={"#FF9C01"} size="large" />
      </View>
    </ScreenLayout>
  );
};

export default Loader;
