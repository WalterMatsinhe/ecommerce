import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  
  // ✅ FIXED: Handle cart state structure properly
  const cartState = useSelector((state) => state.shopCart || {});
  const cartItems = cartState.cartItems || [];
  
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      // ✅ FIXED: Use the correct cartItems structure
      if (cartItems.length) {
        const indexOfCurrentCartItem = cartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        if (getCurrentProductIndex > -1) {
          const getTotalStock = productList[getCurrentProductIndex].totalStock;

          console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

          if (indexOfCurrentCartItem > -1) {
            const getQuantity = cartItems[indexOfCurrentCartItem].quantity;
            if (getQuantity + 1 > getTotalStock) {
              // ✅ FIXED: Correct toast usage
              toast.error(`Only ${getQuantity} quantity can be added for this item`);
              return;
            }
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id || user?._id, // Handle both possible ID formats
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      // ✅ FIXED: Check response structure properly
      if (data?.payload?.success || data?.payload) {
        // ✅ FIXED: Correct toast usage
        toast.success("Cart item updated successfully");
      } else {
        toast.error("Failed to update cart item");
      }
    }).catch((error) => {
      console.error("Update quantity error:", error);
      toast.error("Failed to update cart item");
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ 
        userId: user?.id || user?._id, // Handle both possible ID formats
        productId: getCartItem?.productId 
      })
    ).then((data) => {
      // ✅ FIXED: Check response structure properly
      if (data?.payload?.success || data?.payload) {
        // ✅ FIXED: Correct toast usage
        toast.success("Cart item deleted successfully");
      } else {
        toast.error("Failed to delete cart item");
      }
    }).catch((error) => {
      console.error("Delete cart item error:", error);
      toast.error("Failed to delete cart item");
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 hover:text-red-500 transition-colors"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;