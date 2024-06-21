import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Home from "../../screens/home";
 
import { Text, View } from "react-native";
import Profile from "../../screens/profile";
import Checkout from "../../screens/checkout";
import Cart from "../../screens/cart";

const Tabs = createBottomTabNavigator();
 
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="gap-2 py-3 items-center justify-center">
      {icon}
      <Text
        className={`${
          focused ? "font-psemibold" : "font-pregular"
        } text-xs capitalize`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabNavigations = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fbfbfb",
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarActiveTintColor: "#ffa001",
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={"Home"}
              color={color}
              focused={focused}
              icon={
                <MaterialCommunityIcons
                  name="home-assistant"
                  size={focused ? 26 : 24}
                  color={focused ? "#ffa001" : "#c7c7c7"}
                />
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"Cart"}
        component={Cart}
        options={{
          tabBarActiveTintColor: "#ffa001",
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={"Cart"}
              color={color}
              focused={focused}
              icon={
                <FontAwesome6
                  name="cart-plus"
                  size={focused ? 26 : 24}
                  color={focused ? "#ffa001" : "#c7c7c7"}
                />
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name={"Profile"}
        component={Profile}
        options={{
          tabBarActiveTintColor: "#ffa001",
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name={"Profile"}
              color={color}
              focused={focused}
              icon={
                <FontAwesome
                  name="user"
                  size={focused ? 26 : 24}
                  color={focused ? "#ffa001" : "#c7c7c7"}
                />
              }
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigations;
