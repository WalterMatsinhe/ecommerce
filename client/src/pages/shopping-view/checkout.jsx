import React, { useState } from "react";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { FlipText } from "@/components/magicui/flip-text";
import { createNewOrder } from "@/store/shop/order-slice"; 
import { toast } from "sonner";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const {approvalURL} = useSelector(state => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false); 
  const dispatch = useDispatch();


  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  function handleInitialePaypalPayment() {

    const orderData = {
      userId: user?.id,
      cartId : cartItems ?._id,
      cartItems:
        cartItems?.items?.map((singleCartItem) => ({
          productId: singleCartItem?.productId,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem?.salePrice
              : singleCartItem?.price,
          quantity: singleCartItem?.quantity,
        })) || [],
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pinCode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      } else {
        setIsPaymentStart(false);
      }
    });
  }

  if(approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center relative  w-full overflow-hidden">
        <FlipText className="font-extrabold font-mono text-8xl mt-8  text-white ">
          Checkout
        </FlipText>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5 p-5 border-neon">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div>
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item.id || item._id} cartItem={item} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          <div className="mt-14 space-y-4">
            <div className="flex justify-between ml-4 mr-4 text-6xl">
              <span className="font-bold text-white">Total :</span>
              <span className="font-bold ">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-8 w-full ">
            <Button
              onClick={handleInitialePaypalPayment}
              className="w-full border-neon-red bg-primary-foreground text-white hover:scale-103 "
              variant = 'ghost'
            >
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
