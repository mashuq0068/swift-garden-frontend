"use client";
import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";

const StripePaymentPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  console.log("payment url", paymentUrl);

  const totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const createPaymentLink = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://swift-garden-backend.vercel.app/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: auth.id, // Get this from your auth system
            shopId: cart.items[0].shopId, // Get this from the cart or state
            items: cart.items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            paymentMethod: "card",
          }),
        });

        const result = await response.json();
        console.log(result);
        if (result.success && result.data.paymentUrl) {
          setPaymentUrl(result.data.paymentUrl); // Get the Stripe payment link
        } else {
          throw new Error("Failed to create payment link");
        }
      } catch (error) {
        console.log("Error creating payment link:", error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentLink();
  }, [cart, auth.id]);

  const handleRedirect = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl; // Redirect to Stripe payment page
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
    <div className="bg-white shadow-md rounded-2xl overflow-hidden w-full max-w-xl">
      {/* Header */}
      <div className="bg-gray-500 text-white text-center py-6">
        <h2 className="text-3xl font-bold">Order Summary</h2>
        <p className="text-sm mt-2">Review your items and proceed to payment</p>
      </div>
  
      {/* Cart Items */}
      <div className="p-6 space-y-4 max-h-96 overflow-auto">
        {cart.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.photo}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold text-green-600">
                €{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
  
      {/* Total Amount */}
      <div className="flex items-center justify-between bg-gray-100 p-6 border-t">
        <span className="text-xl font-medium text-gray-800">Total Amount:</span>
        <span className="text-2xl font-bold text-green-600">
          €{totalAmount.toFixed(2)}
        </span>
      </div>
  
      {/* Payment Button */}
      <div className="bg-white p-6">
        <button
          onClick={handleRedirect}
          disabled={loading || !paymentUrl}
          className={`w-full py-3 rounded-lg text-lg font-semibold text-white shadow-lg transition-all duration-200 ${
            loading || !paymentUrl
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Creating Payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default StripePaymentPage;
