import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { timeAgo } from "../../utils/timeAgo";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import EmptyState from "../common/emptyState";

const RecentOrders = ({ orders, loading }) => {
  return (
    <View>
      {orders?.length > 0 && (
        <Text className="font-psemibold underline text-black mb-3">
          Recent Orders
        </Text>
      )}

      {loading && (
        <View className="h-64 items-center justify-center">
          <ActivityIndicator color={"#FF9C01"} size="large" />
        </View>
      )}

      {orders?.length > 0 && (
        <View>
          {orders?.map((order) => (
            <TouchableOpacity
              key={order?.$id}
              className="items-center flex-row bg-[#282828] rounded-lg p-4 mb-5 "
            >
              <View className="rounded-full p-2 bg-white">
                <MaterialIcons
                  name={
                    order?.status ? "shopping-cart-checkout" : "shopping-cart"
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
                    <FontAwesome6 name="naira-sign" size={12} color="black" />
                    <Text className="font-pmedium text-[14px] mt-0.5">
                      {order?.price}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {orders?.length === 0 && (
        <EmptyState
          title="You're yet to create an order"
          subtitle="Recent Orders is Empty"
        />
      )}
    </View>
  );
};

export default RecentOrders;
