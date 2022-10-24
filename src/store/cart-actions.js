import { createClient } from "@supabase/supabase-js";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        supabase
          .from("cart")
          .select("items, totalQuantity")
          .order("id", { ascending: false })
          .single()
      );
      console.log(response.ok);

      const { data } = await supabase
        .from("cart")
        .select("items, totalQuantity")
        .order("id", { ascending: false })
        .single();
      console.log(JSON.stringify(data));
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const cartContents = data;

      console.log(JSON.stringify(cartContents));
      return cartContents;
    };
    try {
      const cartData = await fetchData();
      console.log(cartData);
      dispatch(
        cartActions.replaceCart({
          items: cartData?.items || [],
          totalQuantity: cartData?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
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
      const sendResponse = await supabase
        .from("cart")
        .upsert({ items: cart.items, totalQuantity: cart.totalQuantity });

      if (sendResponse.status !== 201) {
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
