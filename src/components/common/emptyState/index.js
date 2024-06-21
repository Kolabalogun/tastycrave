import { View, Text, Image } from "react-native";
import { images } from "../../../constants";
import CustomButton from "../custombutton";
import { useNavigation } from "@react-navigation/native";

const EmptyState = ({ title, subtitle }) => {
  const navigation = useNavigation();
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.empty}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm text-center capitalize font-pmedium text-black-100">
        {title}
      </Text>
      <Text className="text-xl text-center font-psemibold text-black mt-2">
        {subtitle}
      </Text>

      {title !== "No Food found for this category" &&
        title !== "You're yet to create an order" && (
          <CustomButton
            title={`Go back`}
            handlePress={() => navigation.navigate("Home")}
            containerStyles="w-full my-5"
          />
        )}
    </View>
  );
};

export default EmptyState;
