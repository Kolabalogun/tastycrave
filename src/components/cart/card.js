import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useGlobalContext } from "../../context/useGlobalContext";

const CartCard = ({ food }) => {
  const navigation = useNavigation();
  const { cart, setCart } = useGlobalContext();

  const handleDelete = () => {
    setCart(cart.filter((item) => item.$id !== food.$id));
  };

  return (
    <View className="mb-0">
      <View className="flex flex-row bg-[#ffebe6] rounded-xl p-2 justify-between">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("FoodDetails", {
              food,
            });
          }}
        >
          <Image
            source={{ uri: food?.image }}
            className="w-24 h-20 rounded-md   overflow-hidden shadow-lg shadow-black/40 mr-4"
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View className="flex-1  ">
          <Text className="text-black-200 font-pmedium text-lg">
            {food?.name}
          </Text>

          <View className="mb-2 flex-row justify-between items-center">
            <View className="items-center flex-row">
              <View>
                <View className="flex-row space-x-0.5 mt-3  items-center">
                  <FontAwesome6 name="naira-sign" size={12} color="black" />
                  <Text className="font-pmedium text-[14px] mt-0.5">
                    {food?.price}
                  </Text>
                </View>
                <View className="items-center flex-row">
                  <Feather name="shopping-bag" size={12} color="#FF9C01" />
                  <Text className="text-black uppercase ml-1 font-pmedium text-xs">
                    {food?.value}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleDelete}>
              <Feather name="trash-2" size={24} color="#fb0000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[0.5px] bg-gray-300 mx-3 my-3"></View>
    </View>
  );
};

export default CartCard;
