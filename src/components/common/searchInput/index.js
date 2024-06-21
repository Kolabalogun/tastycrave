import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../../../constants";

const SearchInput = ({ initialQuery }) => {
  const navigation = useNavigation();

  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4   rounded-2xl border-[1px] border-[#b4b4b4] focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black-100 h-full flex-1 font-pregular"
        value={query}
        placeholder={`Search foods, restaurants, etc...`}
        placeholderTextColor="#2d2d2d"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        className="bg-secondary-100 p-3 rounded-full"
        onPress={() => {
          if (query === "") {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }

          navigation.navigate("Search", { query: query.trim() });
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
