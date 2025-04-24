import React from "react";

const CartItems = ({ items, onIncrease, onDecrease }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-medium">Your Items</h2>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium flex items-center gap-2">
                ${(item.price * item.quantity).toFixed(2)}
                <button
                  onClick={() => onDecrease(item.id)}
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                >
                  -
                </button>
                <button
                  onClick={() => onIncrease(item.id)}
                  className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
                >
                  +
                </button>
              </p>
              <p className="text-xs text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-gray-500 text-sm">
            No items in your cart.
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItems;
