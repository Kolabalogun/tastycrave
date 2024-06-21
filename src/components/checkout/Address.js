import { View, Text, TextInput, Alert, Switch } from "react-native";
import React, { useState } from "react";
import FormField from "../common/formfield";
import CustomButton from "../common/custombutton";

const Address = ({
  setTab,
  address,
  setAddress,
  saveAddress,
  setSaveAddress,
  phoneNumber,
  setPhoneNumber,
  addDesc,
  setAddDesc,
}) => {
  const handleProceed = () => {
    if (!address || !phoneNumber)
      return Alert.alert("Error", "Address or Phone Number can't be empty");

    if (phoneNumber.length < 11 || address.length < 4)
      return Alert.alert("Error", "Invalid phone number ar Address");
    setTab("Payment");
  };

  return (
    <View>
      <View className=" ">
        <View className={`space-y-1 mt-2  `}>
          <Text className="text-base text-black-100 font-pmedium">Address</Text>
          <View className="w-full h-32 px-4   rounded-2xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100   ">
            <TextInput
              className="flex-1 text-black h-full py-5 font-psemibold text-base"
              value={address}
              placeholder="Please enter delivery address..."
              placeholderTextColor="#7B7B8B"
              onChangeText={(e) => setAddress(e)}
              multiline
              textAlignVertical="top"
            />
          </View>
          {/* <View className="flex-row items-center">
            <Text className="text-sm text-black-100 mr-3 font-pmedium">
              Save Address
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#FF9C01" }}
              thumbColor={saveAddress ? "#FF9C01" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setSaveAddress(!saveAddress)}
              value={saveAddress}
              disabled={!address}
            />
          </View> */}
        </View>
        <View className="mb-4  mt-3">
          <FormField
            keyboardType="number-pad"
            title="Phone Number"
            value={phoneNumber}
            maxLength={14}
            placeholder="Enter your Phone Number here..."
            onChangeText={(e) => setPhoneNumber(e)}
            otherStyles="mt-3"
          />
        </View>
        <View className={`space-y-2 mt-4  `}>
          <Text className="text-base text-black-100 font-pmedium">
            Address Description
          </Text>

          <View className="w-full h-32 px-4   rounded-2xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100 flex flex-row items-center">
            <TextInput
              className="flex-1 text-black h-full py-5 font-psemibold text-base"
              value={addDesc}
              placeholder="(optional)..."
              placeholderTextColor="#7B7B8B"
              onChangeText={(e) => setAddDesc(e)}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </View>
      <View className=" mt-3 mb-5  ">
        <CustomButton
          title="Proceed"
          handlePress={handleProceed}
          containerStyles="mt-4"
        />
      </View>
    </View>
  );
};

export default Address;
