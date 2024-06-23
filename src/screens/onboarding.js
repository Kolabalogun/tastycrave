import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

import { images } from "../constants";
import CustomButton from "../components/common/custombutton";

const Onboarding = ({ navigation }) => {
  const { height } = Dimensions.get("window");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="relative  ">
        <View style={{ flex: 1, height: height * 0.6 }}>
          <Image
            source={images.food}
            className="h-full   w-full"
            resizeMode="cover"
          />
        </View>
        <View
          style={{ flex: 1 }}
          className="relative justify-between flex-1 bg-white"
        >
          <View style={styles.line}></View>
          <View className="justify-between flex-1 bg-white  p-4 h-full">
            <Text className="font-pbold mt-3  text-4xl">Discover</Text>
            <Text className="font-pbold mt-2 text-4xl">our world of Food</Text>

            <Text className="font-pmedium text-gray-500 my-4 text-sm mr-8">
              Order your favorite food from us and enjoy the fastest delivery
              possible.
            </Text>
          </View>
          <View className="bg-white px-4">
            <CustomButton
              title="Get Started"
              handlePress={() => navigation.navigate("Register")}
              containerStyles="mt-5"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  line: {
    borderRadius: 5,
    borderColor: "#FF9C01",
    borderWidth: 2,
    width: 90,
    alignSelf: "center",
    marginVertical: 10,
  },
});
