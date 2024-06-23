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
import { MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "../utils/timeAgo";
import { useNavigation } from "@react-navigation/native";

const Help = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const {
    data: helps,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(30, config.helpCollectionId));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <View className="flex mb-1 mt-14">
        <Text className="font-pmedium text-black-100 text-sm">
          Search Results
        </Text>
        <Text className="text-2xl font-psemibold text-black mt-1">
          All User Messages
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
        ) : helps?.length > 0 ? (
          <View className="my-3">
            {helps.map((help) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateRestaurant", {
                    help: help,
                  })
                }
                key={help?.$id}
                className="bg-[#282828] rounded-lg p-4 mb-5"
              >
                <Text className="text-xs text-white mb-2 font-pmedium">
                  ID: {help?.$id}
                </Text>
                <View className="items-center flex-row">
                  <View className="rounded-full p-2 bg-white">
                    <MaterialIcons
                      name={"message"}
                      size={24}
                      color={"#49c77f"}
                    />
                  </View>

                  <View className="flex-1 mx-4">
                    <Text className="text-white font-pmedium text-base">
                      {help?.title}
                    </Text>

                    <Text className="text-gray-400  font-psemibold text-sm">
                      {help?.email}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-white font-pregular mb-1 text-[11px]">
                      Created At:
                    </Text>
                    <Text className="text-white font-pregular mb-1 text-xs">
                      {timeAgo(help?.$createdAt)}
                    </Text>
                  </View>
                </View>

                <View className="mt-4">
                  <Text className="text-sm text-white font-pregular">
                    Message:
                  </Text>
                  <Text className="text-sm text-white font-pmedium">
                    {help?.body}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <EmptyState
            title="No messages has been placed"
            subtitle="Message list is empty"
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Help;
