import React, { useEffect, useState } from "react";

import { Alert, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import ScreenLayout from "../layout/screenlayout";
import { useNavigation } from "@react-navigation/native";
import UploadShop from "../components/createRestaurant/upload";

import Header from "../components/common/navbar";
import { images } from "../constants";
import { config, createDoc, updateDoc, uploadFile } from "../lib/appwrite";

const initialState = {
  name: "",
  image: null,
  location: "",
  rating: 0,
  foodcat: [],
};

const CreateRestaurant = ({ route }) => {
  const navigation = useNavigation();

  const { shop } = route?.params || {};

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (shop) setForm(shop);
  }, [route?.params]);

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

  const update = async () => {
    if (!name || !image || !location || foodcat?.length === 0 || !rating) {
      return Alert.alert("Error", "Please provide all fields");
    }

    setUploading(true);

    let thumbnailUrl = form.image;

    // Check if the image is a URL
    const isUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    if (!isUrl(form.image)) {
      [thumbnailUrl] = await Promise.all([uploadFile(form.image, "image")]);
    }

    try {
      const updatedForm = {
        name,
        rating: parseFloat(form.rating),
        image: thumbnailUrl,
        location,
        foodcat,
        collectionId: shop?.$collectionId,
        documentId: shop?.$id,
      };

      await updateDoc(updatedForm);

      Alert.alert("Success", "Shop updated successfully");

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error);
    } finally {
      setUploading(false);
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
      Alert.alert("Error", error.message);
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
          title={shop ? "Edit Restaurant" : "Create Restaurant"}
          fn={() => navigation.goBack()}
          img={"back"}
          img2={images.logoSmall}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UploadShop
          shop={shop}
          form={form}
          openPicker={openPicker}
          setForm={setForm}
          uploading={uploading}
          submit={shop ? update : submit}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default CreateRestaurant;
