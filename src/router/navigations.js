import Checkout from "../screens/checkout";
import Login from "../screens/login";
import Register from "../screens/register";
import Restaurant from "../screens/restaurant";
import RestaurantMenu from "../screens/restaurantMenu";
import Success from "../screens/success";
import TabNavigations from "./tab/tab";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Tabs"}
    >
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="Tabs" component={TabNavigations} />

      <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />

      <Stack.Screen name="Restaurant" component={Restaurant} />

      <Stack.Screen name="Checkout" component={Checkout} />
      {/* <Stack.Screen name="MapOrderDelivery" component={MapOrderDelivery} /> */}
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default Navigations;
