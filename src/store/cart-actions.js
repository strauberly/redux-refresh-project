import { createClient } from "@supabase/supabase-js";
import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("cartContents")
        .select("cartContents->items, cartContents->totalQuantity")
        .order("id", { ascending: false })
        .limit(1);
      console.log(JSON.stringify(data));
      console.log(data.status);
      if (data.status !== 200) {
        throw new Error("Could not fetch cart data!");
      }
      const cartContents = await data;
      console.log(cartContents);
      return cartContents;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
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
        .from("cartContents")
        .insert({ cartContents: cart });

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

// export const getCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = fetch(await supabase.from("cartContents").select("*"));
//       console.log(response.json());
//       if (!response.ok) {
//         throw new Error("Retrieve cart data failed.");
//       }
//       const data = await response.json();
//       console.log(data);
//       return data;
//     };
//     try {
//       const cartData = await fetchData();
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items,
//           totalQuantity: cartData.totalQuantity,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: " Error!",
//           message: "Fetching cart data failed",
//         })
//       );
//     }
//   };
// };

// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "pending",
//         title: "Sending...",
//         message: "Sending cart data!",
//       })
//     );

//     const sendRequest = async () => {
//       const response = await supabase
//         .from("cartContents")
//         .insert({ items: cart, totalQuantity: cart.totalQuantity });

//       if (response.status !== 201) {
//         throw new Error("Sending cart data failed.");
//       }
//     };

//     try {
//       await sendRequest();

//       dispatch(
//         uiActions.showNotification({
//           status: "success",
//           title: "Success!",
//           message: "Cart data sent!",
//         })
//       );
//     } catch (error) {
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "sending cart failed!",
//         })
//       );
//     }
//   };
// };
