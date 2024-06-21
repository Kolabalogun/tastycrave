import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import useAppwrite from "../lib/useAppwrite";
import { config, getAllDocs } from "../lib/appwrite";

import UserCard from "../components/users/card";

const Users = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: users,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(40, config.userCollectionId));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();

    setRefreshing(false);
  };

  return (
    <ScreenLayout>
      <View className="flex mb-1 mt-14  ">
        <Text className="font-pmedium text-black-100 text-sm">
          Search Results
        </Text>
        <Text className="text-2xl font-psemibold text-black mt-1">
          All Users
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
        ) : (
          <>
            {users?.length > 0 && (
              <View className="my-3">
                <View>
                  {users?.map((user) => (
                    <UserCard key={user?.$id} user={user} refetch={refetch} />
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Users;
