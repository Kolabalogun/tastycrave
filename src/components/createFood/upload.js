import { View, Text, ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormField from "../common/formfield";
import { icons } from "../../constants";
import CustomButton from "../common/custombutton";
import { config, getAllDocs } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { FontAwesome6 } from "@expo/vector-icons";

const UploadFood = ({ form, openPicker, setForm, submit, uploading }) => {
  const { data: categories, loading } = useAppwrite(() =>
    getAllDocs(null, config.categoriesCollectionId)
  );

  const { data: shops } = useAppwrite(() =>
    getAllDocs(null, config.shopsCollectionId)
  );

  return (
    <View className="  mb-3">
      <FormField
        title="Name"
        value={form.name}
        placeholder="Enter the name of the food.."
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
              source={{ uri: form.image.uri }}
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
        title="Price"
        value={form.price}
        keyboardType="number-pad"
        placeholder="Enter the price of the food..."
        handleChangeText={(e) => setForm({ ...form, price: e })}
        otherStyles="mt-5"
      />

      <FormField
        title="Rating"
        value={form.rating}
        keyboardType="number-pad"
        placeholder="Rate the food..."
        handleChangeText={(e) => setForm({ ...form, rating: e })}
        otherStyles="mt-5"
      />

      <View className="mt-7 space-y-2">
        <Text className="text-base text-black-100 font-pmedium">
          Select Restaurant
        </Text>
        <View className="w-full h-16 px-4  rounded-2xl border-[1px] border-[#b4b4b4] flex justify-center    space-x-2">
          <Picker
            selectedValue={form?.shopName}
            onValueChange={(itemValue) => {
              const id = shops?.find((shop) => shop?.name === itemValue);
              setForm({
                ...form,
                shopID: id?.$id,
                shopName: itemValue,
              });
            }}
            style={{ color: "#000" }}
            dropdownIconRippleColor="#000"
            dropdownIconColor={"#000"}
          >
            {shops?.map((shop) => (
              <Picker.Item key={shop?.$id} label={shop?.name} value={shop} />
            ))}
          </Picker>
        </View>
      </View>

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
                setForm({
                  ...form,
                  category: itemValue,
                });
              }}
              selectedValue={form?.category}
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

      <View className={`space-y-2 mt-7`}>
        <Text className="text-base text-black-100 font-pmedium">
          Food Details
        </Text>

        <View className="w-full h-72 px-4   rounded-2xl border-[1px] border-[#b4b4b4] focus:border-secondary flex flex-row items-center">
          <TextInput
            className="flex-1 text-black h-full py-5 font-psemibold text-base"
            value={form.desc}
            placeholder="blah blah blahh...."
            placeholderTextColor="#7B7B8B"
            onChangeText={(e) => setForm({ ...form, desc: e })}
            multiline
            textAlignVertical="top"
            numberOfLines={10}
          />
        </View>
      </View>

      <CustomButton
        title="Submit & Publish"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={uploading}
      />
    </View>
  );
};

export default UploadFood;
