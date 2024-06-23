import { View, Text, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormField from "../common/formfield";
import { icons } from "../../constants";
import CustomButton from "../common/custombutton";
import { config, deletePost, getAllDocs } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const UploadShop = ({ form, openPicker, setForm, submit, uploading, shop }) => {
  const navigation = useNavigation();
  const {
    data: categories,

    loading,
  } = useAppwrite(() => getAllDocs(null, config.categoriesCollectionId));

  const [loader, setLoader] = useState(false);

  const handleDelete = async () => {
    setLoader(true);
    try {
      await deletePost({
        collectionId: shop.$collectionId,
        documentId: shop.$id,
      });

      Alert.alert("Success", "Shop deleted successfully");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <View className="  mb-3">
      <FormField
        title="Name"
        value={form.name}
        placeholder="Enter the name of the restaurant.."
        handleChangeText={(e) => setForm({ ...form, name: e })}
        otherStyles="mt-5"
      />

      <View className="mt-7 space-y-2">
        <Text className="text-base text-black-100 font-pmedium">
          Thumbnail Image
        </Text>

        <TouchableOpacity onPress={() => openPicker()}>
          {form.image ? (
            <Image
              source={{ uri: form.image.uri || form.image }}
              resizeMode="cover"
              className="w-full h-64 rounded-2xl"
            />
          ) : (
            <View className="w-full h-16 px-4 bg-grey-100 rounded-2xl border-[1px] border-[#b4b4b4] flex justify-center items-center flex-row space-x-2">
              <Image
                source={icons.upload}
                resizeMode="contain"
                alt="upload"
                className="w-5 h-5"
              />
              <Text className="text-sm text-black-100 font-pmedium">
                Choose a file
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FormField
        title="Location"
        value={form.location}
        placeholder="Enter the location of the restaurant..."
        handleChangeText={(e) => setForm({ ...form, location: e })}
        otherStyles="mt-5"
      />

      <FormField
        title="Rating"
        value={String(form.rating)}
        keyboardType="number-pad"
        placeholder="Rate the restaurant..."
        handleChangeText={(e) => setForm({ ...form, rating: e })}
        otherStyles="mt-5"
      />

      <View className="mt-7 space-y-2">
        <Text className="text-base text-black-100 font-pmedium">Category</Text>

        <ScrollView horizontal className="flex-row space-x-2">
          {form.foodcat?.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                const filteredOptions = form.foodcat.filter(
                  (optt) => optt !== opt
                );

                setForm({
                  ...form,
                  foodcat: filteredOptions,
                });
              }}
              className="items-center justify-center flex-row p-2 bg-[#ffebe6] border-[1px] border-[#f8dcd5] rounded-lg"
            >
              <Text className="text-black font-pmedium mt-1 mr-3">{opt}</Text>

              <FontAwesome6 name="times-circle" size={16} color="#000" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {loading ? (
          <Text className="text-black-100">Loading...</Text>
        ) : (
          <View className="w-full h-16 px-4 bg-grey-100 rounded-2xl border-[1px] border-[#b4b4b4] flex justify-center    space-x-2">
            <Picker
              onValueChange={(itemValue) => {
                let updateoptionss;
                if (form.foodcat?.includes(itemValue)) {
                  updateoptionss = form.foodcat.filter(
                    (optt) => optt !== itemValue
                  );
                } else {
                  updateoptionss = [itemValue, ...form.foodcat];
                }

                setForm({
                  ...form,
                  foodcat: [itemValue, ...form.foodcat],
                });
              }}
              style={{ color: "#000" }}
              dropdownIconRippleColor="#000"
              dropdownIconColor={"#000"}
            >
              {categories?.map((cat) => (
                <Picker.Item
                  key={cat?.name}
                  label={cat?.name}
                  value={cat?.name}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      <CustomButton
        title="Submit & Publish"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={uploading}
      />

      {shop && (
        <CustomButton
          title="Delete Restaurant"
          handlePress={handleDelete}
          containerStyles="mt-7"
          isLoading={loader}
        />
      )}
    </View>
  );
};

export default UploadShop;
