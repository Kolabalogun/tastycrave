import React from "react";
import FoodCard from "./foodcard";
import { useGlobalContext } from "../../../context/useGlobalContext";

const FoodList = () => {
  const { dummycategory } = useGlobalContext();
  return (
    <>
      {dummycategory.map((food, index) => (
        <FoodCard key={index} food={food} />
      ))}
    </>
  );
};

export default FoodList;
