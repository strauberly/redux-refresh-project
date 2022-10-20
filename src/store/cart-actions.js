import { createClient } from "@supabase/supabase-js";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await supabase.from("cart").select("*");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Retrieve cart data failed.");
      }
      const data = await response;
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items,
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: " Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await supabase
        .from("cart")
        .insert([{ items: cart, totalQuantity: cart.totalQuantity }]);

      if (response.status !== 201) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart data sent!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "sending cart failed!",
        })
      );
    }
  };
};
