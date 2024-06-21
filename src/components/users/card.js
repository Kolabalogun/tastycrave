import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { timeAgo } from "../../utils/timeAgo";
import { updateDoc } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/useGlobalContext";
import { useState } from "react";
import { sendPushNotification } from "../../lib/notification";

const UserCard = ({ user, refetch }) => {
  const navigation = useNavigation();
  const { user: seniorMan, updateUser, setUpdateUser } = useGlobalContext();
  const [loadingU, setLoadingU] = useState(false);

  const updateUserInfo = async () => {
    let updateRole;
    if (user?.role === "user") {
      updateRole = "admin";
    } else if (user?.role === "admin") {
      updateRole = "user";
    }

    const form = {
      collectionId: user?.$collectionId,
      documentId: user?.$id,
      role: updateRole,
    };
    setLoadingU(true);
    try {
      await updateDoc(form);
      Alert.alert("Success", `${user?.username} status updated`);

      const message = {
        title: "Tastycrave",
        body: `Your status has been updated to ${updateRole}`,
      };

      await sendPushNotification([user?.expo_Id], message);

      refetch("dontshow");

      user?.$id === seniorMan?.$id && setUpdateUser(!updateUser);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "An error has occurred, please try again");
    } finally {
      setLoadingU(false);
    }
  };

  return (
    <TouchableOpacity className="bg-[#282828] rounded-xl p-2 mb-5 ">
      <View className="flex flex-col     mt-0  ">
        <View className="flex flex-row gap-1 items-start  ">
          <View
            className={`w-[46px] h-[46px] rounded-lg border   border-secondary  flex justify-center items-center p-0.5`}
          >
            <Image
              source={{ uri: user?.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1   ">
            <View className="flex mt-1 justify-center items-center flex-row flex-1">
              <View className="flex justify-center flex-1 ml-3 gap-y-1">
                <View className="items-center flex-row gap-x-1">
                  <Text
                    className="font-psemibold text-sm text-white"
                    numberOfLines={1}
                  >
                    {user?.username}
                  </Text>
                  {user?.role === "admin" ? (
                    <MaterialIcons name="verified" size={14} color="#FF9C01" />
                  ) : (
                    <></>
                  )}
                </View>

                <Text
                  className="text-xs text-gray-100 font-pregular"
                  numberOfLines={1}
                >
                  {user?.email}
                </Text>

                <Text
                  className="text-xs text-gray-100 font-pregular"
                  numberOfLines={1}
                >
                  {timeAgo(user?.$createdAt)}
                </Text>

                <Text
                  className="text-xs text-gray-100 font-pregular"
                  numberOfLines={1}
                >
                  ID: {user?.$id}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="h-[0.5px]   bg-gray-100 mx-5 mt-5 "></View>
      <View className="flex-row items-center ml-4 mt-1">
        <Text className="text-sm text-white  mr-3 font-pmedium">Admin:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FF9C01" }}
          thumbColor={user?.role === "admin" ? "#FF9C01" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => updateUserInfo("admin")}
          value={user?.role === "admin" ? true : false}
          disabled={loadingU}
        />
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
