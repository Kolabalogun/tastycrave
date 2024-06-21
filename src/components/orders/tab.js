import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const OrderTab = ({ activeTab, setActiveTab }) => {
  return (
    <View className="flex flex-row items-center justify-between space-x-4 w-full  my-5 pt-3 pb-1 px-4 bg-black-100 rounded-lg border-2 border-black-200 focus:border-secondary">
      <TouchableOpacity
        onPress={() => setActiveTab("pending")}
        className="gap-2 items-center flex-1"
      >
        <View>
          <Text
            className={`font-psemibold ${
              activeTab === "pending" ? "text-white" : "text-white "
            } text-base`}
          >
            Pending
          </Text>
        </View>

        <View
          className={`w-full self-center ${
            activeTab === "pending" ? "bg-secondary" : "bg-black-100"
          } h-[2.5px]`}
        ></View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab("delivered")}
        className="gap-2 items-center flex-1"
      >
        <View>
          <Text
            className={`font-psemibold ${
              activeTab === "delivered" ? "text-white" : "text-white"
            } text-base`}
          >
            Delivered
          </Text>
        </View>

        <View
          className={`w-full self-center ${
            activeTab === "delivered" ? "bg-secondary" : "bg-black-100"
          } h-[2.5px]`}
        ></View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderTab;
