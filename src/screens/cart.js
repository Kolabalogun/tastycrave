import { Image, ScrollView, Text, View } from "react-native";
import React from "react";

import ScreenLayout from "../layout/screenlayout";
import { useGlobalContext } from "../context/useGlobalContext";
import CartCard from "../components/cart/card";
import CustomButton from "../components/common/custombutton";
import { images } from "../constants";
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { cart: carts } = useGlobalContext();
  const navigation = useNavigation();

  const totalPrice = carts?.reduce(
    (sum, item) => sum + item?.price * (item?.value || 1),
    0
  );

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex mb-6 mt-10   space-y-6">
          <View className="items-center my-3 flex-row">
            <Text className="text-3xl font-pregular">Cart</Text>
            <Text className="text-xs font-psemibold text-secondary">
              {"    "}({carts?.length})
            </Text>
          </View>
        </View>

        {carts?.length === 0 && (
          <View className="flex-1 h-full  justify-center">
            <View className="items-center">
              <View>
                <Image
                  source={images.cart}
                  className="h-96  w-96"
                  resizeMode="contain"
                />
              </View>

              <Text className="font-psemibold text-3xl">Hungry?</Text>
              <Text className="font-pregular mt-1 mb-5  ">
                You don't have any foods in cart
              </Text>
            </View>
            <CustomButton
              title={"Start Shopping"}
              handlePress={() => navigation.navigate("Home")}
            />
          </View>
        )}

        {carts?.length > 0 && (
          <View>
            {carts?.map((cart) => (
              <CartCard key={cart?.$id} food={cart} />
            ))}
          </View>
        )}
      </ScrollView>

      {carts?.length > 0 && (
        <View className="absolute bottom-0 w-full  py-4 self-center">
          <CustomButton
            title={`Pay (N${totalPrice})`}
            handlePress={() => navigation.navigate("Checkout")}
            containerStyles="mt-7"
          />
        </View>
      )}
    </ScreenLayout>
  );
};

export default Cart;
