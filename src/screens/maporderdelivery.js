// import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";

// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import Polyline from "@mapbox/polyline";
// import { initialCurrentLocation } from "../utils/dataarray";

// const MapOrderDelivery = ({ route, navigation }) => {
//   const [itemm, itemmF] = useState(null);
//   const [streetName, streetNamef] = useState("");
//   const [fromLocation, fromLocationf] = useState(null);
//   const [toLocation, toLocationf] = useState(null);
//   const [region, regionf] = useState(null);
//   const [coords, coordsf] = useState([]);

//   let currentLocation = initialCurrentLocation;

//   const item = {
//     menuId: 1,
//     name: "Crispy Baked French Fries",
//     photo:
//       "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?cs=srgb&dl=pexels-daniel-reche-3616956.jpg&fm=jpg",
//     description: "Crispy Baked French Fries",
//     calories: 194,
//     status: "Available",
//     categories: [4],
//     location: {
//       longitude: 4.5862441,
//       latitude: 8.4975072,
//     },
//     value: 0,
//     isCart: false,
//     amount: 1,
//     price: 8,
//   };

//   useEffect(() => {
//     let fromLoc = currentLocation.gps;
//     let toLoc = item.location;
//     let street = currentLocation?.streetName;

//     let mapRegion = {
//       latitude: (fromLoc.latitude + toLoc.latitude) / 2,
//       longitude: (fromLoc.longitude + toLoc.longitude) / 2,
//       latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
//       longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
//     };

//     // console.log(fromLoc);
//     // console.log(toLoc);

//     itemmF(item);
//     streetNamef(street);
//     fromLocationf(fromLoc);
//     toLocationf(toLoc);
//     regionf(mapRegion);

//     getDirections("40.1884979, 29.061018", "41.0082,28.9784");
//   }, []);

//   const getDirections = async (startLoc, destinationLoc) => {
//     try {
//       let resp = await fetch(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}`
//       );
//       let respJson = await resp.json();

//       console.log(respJson);
//       let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//       let coords = points.map((point, index) => {
//         return {
//           latitude: point[0],
//           longitude: point[1],
//         };
//       });
//       coordsf({ coords: coords });
//       return coords;
//     } catch (error) {
//       alert(error);
//       return error;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         initialRegion={region}
//         style={styles.map}
//       >
//         <MapViewDirections
//           origin={fromLocation}
//           destination={toLocation}
//           apikey={"AIzaSyCd_XHj6NKLUoBSfTAy9z6y2Ecz5x2knvQ"}
//           strokeWidth={5}
//           strokeColor={"green"}
//           optimizeWaypoints={true}
//         />
//         {/* <MapView.Polyline
//           coordinates={coords}
//           strokeWidth={2}
//           strokeColor="red"
//         /> */}
//         <Marker coordinate={toLocation}>
//           <View
//             style={{
//               height: 30,
//               width: 30,
//               borderRadius: 20,
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "white",
//             }}
//           >
//             <View
//               style={{
//                 height: 20,
//                 width: 20,
//                 borderRadius: 15,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "white",
//               }}
//             >
//               <Image
//                 style={{ height: 25, width: 25 }}
//                 source={require("../../assets/icon/pin.png")}
//               />
//             </View>
//           </View>
//         </Marker>
//         <Marker
//           coordinate={fromLocation}
//           anchor={{ x: 0.5, y: 0.5 }}
//           flat={true}
//         >
//           <Image
//             style={{ height: 40, width: 40 }}
//             source={require("../../assets/icon/car.png")}
//           />
//         </Marker>
//       </MapView>
//     </View>
//   );
// };

// export default MapOrderDelivery;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });
