import React, { useState } from "react";

import { Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ScreenLayout from "../layout/screenlayout";
import { useNavigation } from "@react-navigation/native";
import UploadShop from "../components/createRestaurant/upload";

import Header from "../components/common/navbar";
import { images } from "../constants";
import { config, createDoc, uploadFile } from "../lib/appwrite";

const initialState = {
  name: "",
  image: null,
  location: "",
  rating: 0,
  foodcat: [],
};

const CreateRestaurant = () => {
  const navigation = useNavigation();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState(initialState);

  const { name, image, location, rating, foodcat } = form;

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (result.canceled) {
      Alert.alert("Error", "Image Upload Failed, Please Try Again!");
    }

    if (!result.canceled) {
      setForm({
        ...form,
        image: result.assets[0],
      });
    }
  };

  const submit = async () => {
    if (!name || !image || !location || foodcat.length === 0 || !rating) {
      return Alert.alert("Error", "Please provide all fields");
    }

    setUploading(true);

    const [thumbnailUrl] = await Promise.all([uploadFile(form.image, "image")]);
    try {
      const updatedForm = {
        ...form,
        rating: parseFloat(form.rating),
        image: thumbnailUrl,
      };

      await createDoc(updatedForm, config.shopsCollectionId);

      Alert.alert("Success", "Shop uploaded successfully");

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Unable to upload post");
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
          title={"Create Restaurant"}
          fn={() => navigation.goBack()}
          img={"back"}
          img2={images.logoSmall}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UploadShop
          form={form}
          openPicker={openPicker}
          setForm={setForm}
          uploading={uploading}
          submit={submit}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CreateRestaurant;
