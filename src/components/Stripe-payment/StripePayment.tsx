"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load your Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const StripePaymentPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const totalAmount = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://swift-garden-backend.vercel.app/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "your-user-id", // Get this from your auth system
            shopId: "shop-id", // Get this from the cart or state
            items: cart.items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            paymentMethod: "card",
          }),
        });

        const result = await response.json();
        if (result.success) {
          setClientSecret(result.data.paymentIntentClientSecret);
        } else {
          throw new Error("Failed to create payment intent");
        }
      } catch (error) {
        console.log("Error creating payment intent:", error);
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [cart]);

  const handlePayment = async () => {
    if (!clientSecret || !stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log("CardElement is not found.");
      return;
    }
     // Get the card element
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement, // Use the CardElement here to collect card details
        },
      }
    );

    if (error) {
      console.log("Payment failed:", error);
    } else if (paymentIntent.status === "succeeded") {
      // Handle successful payment
      try {
        const response = await fetch(
          "https://swift-garden-backend.vercel.app/api/orders/confirm-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
          }
        );

        const result = await response.json();
        if (result.success) {
          // Show success message
        } else {
          throw new Error("Payment confirmation failed");
        }
      } catch (error) {
        console.log("Error confirming payment:", error);
      }
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl  text-center text-gray-800 mb-6">
            Review Your Order
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-lg font-medium">Item</span>
              <span className="text-lg font-medium">Price</span>
            </div>

            <div className="space-y-3 border-t border-b py-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-gray-800"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>
                    ${item.price} x {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-gray-800 font-semibold text-lg">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <div className="mt-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              onClick={handlePayment}
              style={{
                fontWeight:"normal"
              }}
              disabled={loading || !clientSecret}
              className={`w-full py-3  text-white text-lg rounded-lg ${
                loading || !clientSecret
                  ? "bg-gray-400 font-normal"
                  : "bg-green-500  hover:bg-green-600"
              }`}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default StripePaymentPage;
