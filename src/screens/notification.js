import React, { useState } from "react";

import { Alert, ScrollView, Text, TextInput, View } from "react-native";

import ScreenLayout from "../layout/screenlayout";

import Header from "../components/common/navbar";
import { images } from "../constants";
import { sendPushNotification } from "../lib/notification";
import { useGlobalContext } from "../context/useGlobalContext";
import FormField from "../components/common/formfield";
import CustomButton from "../components/common/custombutton";

const initialState = {
  title: "",
  body: "",
};

const Notification = () => {
  const [uploading, setUploading] = useState(false);

  const { allexpoPushToken } = useGlobalContext();

  const [form, setForm] = useState(initialState);

  const { title, body } = form;

  const submit = async () => {
    if (!body || !title) {
      return Alert.alert("Error", "Please provide content for your message");
    }

    setUploading(true);

    try {
      const message = {
        title,
        body,
      };

      await sendPushNotification(allexpoPushToken, message);

      Alert.alert("Success", "Message sent successfully");
    } catch (error) {
      Alert.alert("Error", "Unable to send message");
      console.log(error);
    } finally {
      setForm(initialState);

      setUploading(false);
    }
  };

  return (
    <ScreenLayout>
      <View>
        <Header
          title={"Send Notification"}
          fn={() => navigation.goBack()}
          img={"back"}
          img2={images.logoSmall}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="  mb-3">
          <FormField
            title="Title"
            value={form.title}
            placeholder="Enter the title of the notification.."
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mt-5"
          />

          <View className={`space-y-2 mt-7`}>
            <Text className="text-base text-black-100 font-pmedium">
              Message
            </Text>

            <View className="w-full h-72 px-4   rounded-2xl border-[1px] border-[#b4b4b4] focus:border-secondary flex flex-row items-center">
              <TextInput
                className="flex-1 text-black h-full py-5 font-psemibold text-base"
                value={form.body}
                placeholder="blah blah blahh...."
                placeholderTextColor="#7B7B8B"
                onChangeText={(e) => setForm({ ...form, body: e })}
                multiline
                textAlignVertical="top"
                numberOfLines={10}
              />
            </View>
          </View>

          <CustomButton
            title="Publish"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Notification;
