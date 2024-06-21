import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import useAppwrite from "../lib/useAppwrite";
import { config, getAllDocs, updateDoc } from "../lib/appwrite";

import EmptyState from "../components/common/emptyState";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { timeAgo } from "../utils/timeAgo";
import OrderTab from "../components/orders/tab";
import { sendPushNotification } from "../lib/notification";

const Orders = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  const {
    data: orders,
    refetch,
    loading,
  } = useAppwrite(() => getAllDocs(30, config.ordersCollectionId));

  console.log(orders[0]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    switch (activeTab) {
      case "pending":
        return orders.filter((order) => order.status === false);
      case "delivered":
        return orders.filter((order) => order.status === true);

      default:
        return orders;
    }
  }, [orders, activeTab]);

  const handleToggle = async (order) => {
    try {
      const form = {
        collectionId: config.ordersCollectionId,
        documentId: order?.$id,
        status: !order?.status,
      };

      await updateDoc({
        ...form,
      });

      Alert.alert("Success", "Order Status have been updated");

      const message = {
        title: "🎉 New Order Alert!",
        body: "Your order has been placed and is speeding its way to you! 🚐✨",
      };

      const successmessage = {
        title: "🍽️ Order Delivered!",
        body: "Your order has been delivered. Enjoy your meal! 🍽️",
      };

      await sendPushNotification(
        [order?.users?.expo_Id],
        order?.status ? message : successmessage
      );

      refetch();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error while trying to toggle status");
    }
  };

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
          All Orders
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <OrderTab activeTab={activeTab} setActiveTab={setActiveTab} />

        {loading ? (
          <View className="h-64 items-center justify-center">
            <ActivityIndicator color={"#FF9C01"} size="large" />
          </View>
        ) : orders?.length > 0 ? (
          <>
            {orders?.length > 0 && (
              <View className="my-3">
                <View>
                  {filteredOrders?.map((order) => (
                    <TouchableOpacity
                      key={order?.$id}
                      className=" bg-[#282828] rounded-lg p-4 mb-5 "
                    >
                      <Text className="text-xs text-white  mb-2  font-pmedium">
                        ID: {order?.$id}
                      </Text>
                      <View className="items-center flex-row  ">
                        <View className="rounded-full p-2 bg-white">
                          <MaterialIcons
                            name={
                              order?.status
                                ? "shopping-cart-checkout"
                                : "shopping-cart"
                            }
                            size={24}
                            color={order?.status ? "#49c77f" : "#FF9C01"}
                          />
                        </View>

                        <View className="flex-1 mx-4">
                          <Text className="text-white   font-pmedium text-base">
                            {order?.item}
                          </Text>
                          <Text className="text-white mt-1   font-pregular text-xs">
                            Status: {order?.status ? "Delivered" : "Pending"}
                          </Text>
                        </View>

                        <View className=" ">
                          <Text className="text-white font-pregular mb-1 text-xs">
                            {timeAgo(order?.$createdAt)}
                          </Text>
                          <View className="bg-white p-1 items-center rounded-md">
                            <View className="flex-row space-x-0.5    items-center">
                              <FontAwesome6
                                name="naira-sign"
                                size={12}
                                color="black"
                              />
                              <Text className="font-pmedium text-[14px] mt-0.5">
                                {order?.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View className=" mt-4">
                        <Text className="text-sm text-white  font-pregular">
                          Address:
                        </Text>

                        <Text className="text-sm text-white  font-pmedium">
                          {order?.address}{" "}
                        </Text>
                      </View>

                      {order?.addressDesc && (
                        <View className=" mt-4">
                          <Text className="text-sm text-white  font-pregular">
                            Address Desc:
                          </Text>

                          <Text className="text-sm text-white  font-pmedium">
                            {order?.addressDesc}{" "}
                          </Text>
                        </View>
                      )}
                      <View className=" mt-4">
                        <Text className="text-sm text-white  font-pregular">
                          Phone Number:
                        </Text>

                        <Text className="text-sm text-white  font-pmedium">
                          {order?.phone}{" "}
                        </Text>
                      </View>

                      <View className="flex-row items-center mt-1">
                        <Text className="text-sm text-white  mr-3 font-pmedium">
                          Change Status
                        </Text>
                        <Switch
                          trackColor={{ false: "#767577", true: "#FF9C01" }}
                          thumbColor={order?.status ? "#FF9C01" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() => handleToggle(order)}
                          value={order?.status}
                          disabled={loading}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <EmptyState
            title="No Order has been placed"
            subtitle="Order List is Empty"
          />
        )}
      </ScrollView>
    </ScreenLayout>
  );
};

export default Orders;
