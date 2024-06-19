export const Reducers = (state, action) => {
  if (action.type === "SELECTEDCATEGORY") {
    let item = action.payload;

    let filterFoodList = state.FoodArray.filter((foods) =>
      foods.categories.includes(item.id)
    );

    return {
      ...state,
      dummycategory: filterFoodList,
      selectedCategory: action.payload,
    };
  }

  if (action.type === "INCREASE") {
    let newvalue;

    let tempCart = state.foodList.map((food) => {
      if (food.menuId === action.payload) {
        newvalue = food.value;
        return { ...food, value: food.value + 1 };
      }

      return food;
    });
    tempCart.map((food) => {
      if (food.menuId === action.payload) {
        newvalue = food.value;
        return food.value;
      }
    });

    return { ...state, foodList: tempCart, currentFood: newvalue };
  }
  if (action.type === "DECREASE") {
    let newvalue;

    let tempCart = state.foodList.map((food) => {
      if (food.menuId === action.payload) {
        newvalue = food.value;
        return { ...food, value: food.value - 1 };
      }

      return food;
    });
    tempCart.map((food) => {
      if (food.menuId === action.payload) {
        newvalue = food.value;
        return food.value;
      }
    });

    return { ...state, foodList: tempCart, currentFood: newvalue };
  }

  if (action.type === "GETTOTAL") {
    const { total, navAmount } = state.foodList.reduce(
      (cartTotal, cartItem) => {
        const { price, value } = cartItem;
        const itemtotal = price * value;

        cartTotal.total += itemtotal;
        cartTotal.navAmount += value;
        // console.log(price, value);
        return cartTotal;
      },
      {
        total: 0,
        navAmount: 0,
      }
    );

    return { ...state, total, navAmount };
  }

  if (action.type === "CHECKOUT") {
    let tempCart = state.foodList.map((food) => {
      return { ...food, value: 0 };
    });

    return { ...state, foodList: tempCart };
  }

  return state;
};
