import React from "react";
import { useState } from "react";
import "./App.css";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Home,
  Package,
  ShoppingBag,
  Tag,
  Truck,
} from "lucide-react";
import CartItems from "./CartItems";

function App() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 79.99, quantity: 1 },
    { id: 2, name: "Smart Watch", price: 129.99, quantity: 1 },
    { id: 3, name: "Portable Power Bank", price: 34.99, quantity: 2 },
  ]);

  const deliveryAddress = "123 Main Street, Apt 4B, New York, NY 10001";
  const deliveryFee = 5.99;
  const estimatedDelivery = "Apr 27 - Apr 29";
  const promoDiscount = promoApplied ? 15 : 0;

  const handleIncrease = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee - promoDiscount;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    // Mock validation - accept "SAVE15" as valid promo code
    if (promoCode.toUpperCase() === "SAVE15") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  // Order tracking steps for the timeline
  const trackingSteps = [
    { id: 1, name: "Order Placed", icon: <Check />, status: "completed" },
    { id: 2, name: "Packed", icon: <Package />, status: "active" },
    { id: 3, name: "Out for Delivery", icon: <Truck />, status: "pending" },
    { id: 4, name: "Delivered", icon: <Home />, status: "pending" },
  ];

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Order Confirmed!
            </h2>
            <p className="text-gray-600">
              Thank you for your order. Your order number is #38291.
            </p>
            <p className="text-gray-600">
              Estimated delivery: {estimatedDelivery}
            </p>

            {/* Order Tracking Timeline */}
            <div className="w-full mt-6">
              <h3 className="text-lg font-medium text-left mb-4">
                Order Status
              </h3>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>

                {/* Timeline steps */}
                <div className="space-y-6">
                  {trackingSteps.map((step) => (
                    <div key={step.id} className="flex items-start relative">
                      <div
                        className={`w-3 h-3 rounded-full flex items-center justify-center z-10 mt-1.5 mr-4 ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : step.status === "active"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {step.status === "completed" && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`rounded-full p-2 mr-3 ${
                            step.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : step.status === "active"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              step.status === "completed"
                                ? "text-green-600"
                                : step.status === "active"
                                ? "text-blue-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.name}
                          </p>
                          {step.status === "completed" && (
                            <p className="text-xs text-gray-500">
                              Apr 24, 2025
                            </p>
                          )}
                          {step.status === "active" && (
                            <p className="text-xs text-gray-500">In progress</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setOrderPlaced(false)}
              className="mt-6 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Checkout Summary
        </h1>

        {/* Order Tracking Timeline */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-medium mb-4">Estimated Timeline</h2>

          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-1 border-2 border-blue-500">
                <Check className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs text-center font-medium">Order Placed</p>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-1">
              <div className="w-0 h-full bg-blue-500"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Package className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-center text-gray-500">Packed</p>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-1">
              <div className="w-0 h-full bg-blue-500"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Truck className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-center text-gray-500">
                Out for Delivery
              </p>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-1">
              <div className="w-0 h-full bg-blue-500"></div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                <Home className="h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-center text-gray-500">Delivered</p>
            </div>
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Today</span>
            <span>{estimatedDelivery}</span>
          </div>
        </div>

        {/* Items Component - Now passing the state and handlers */}
        <CartItems
          items={items}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />

        {/* Delivery section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-4">
            <Truck className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Delivery Details</h2>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-700">{deliveryAddress}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm">Estimated Delivery</p>
            <p className="text-sm font-medium">{estimatedDelivery}</p>
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <div className="flex items-center mb-4">
            <Tag className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium">Promo Code</h2>
          </div>
          <form onSubmit={handlePromoSubmit} className="flex space-x-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <br />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </form>
          <span className="block text-xs mt-2 mb-2 text-red-400 font-semibold">
            Please Enter SAVE15 As Promo Code
          </span>

          {promoError && (
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Invalid promo code. Try "SAVE15"</span>
            </div>
          )}

          {promoApplied && (
            <div className="flex items-center mt-2 text-green-600 text-sm">
              <Check className="h-4 w-4 mr-1" />
              <span>Promo code applied! $15 discount</span>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-medium mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Promo Discount</span>
                <span className="text-green-600">
                  -${promoDiscount.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="border-t pt-3 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Buttons */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
        >
          <span>Place Order</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default App;
