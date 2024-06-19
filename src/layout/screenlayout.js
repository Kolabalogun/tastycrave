import { SafeAreaView, StatusBar } from "react-native";
import React from "react";

const ScreenLayout = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 px-4   bg-primary h-full">
      {children}
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default ScreenLayout;
