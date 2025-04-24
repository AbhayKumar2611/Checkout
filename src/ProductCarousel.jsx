import React from "react";
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react";

const ProductCarousel = ({ onAddProduct }) => {
  // Sample recommended products
  const recommendedProducts = [
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 49.99,
      image:
        "https://m.media-amazon.com/images/I/71hvGkBMFNL._AC_UF1000,1000_QL80_.jpg",
      description: "Portable waterproof speaker with 20h battery life",
    },
    {
      id: 5,
      name: "USB-C Hub",
      price: 29.99,
      image:
        "https://mm.digikey.com/Volume0/opasdata/d220001/derivates/6/002/179/521/MFG_5G3AGBB-USB-C-HUB_web%28640x640%29.jpg",
      description: "7-in-1 adapter with HDMI, USB ports",
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 19.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAqFW2nHKdFrId66LDUGH5a6AQvU9ZpSqSIQ&s",
      description: "Ergonomic design with silent click",
    },
    {
      id: 7,
      name: "Phone Stand",
      price: 9.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvt9hPv4QIunxecJ1upn7wmgpJjRzTuj_4Mg&s",
      description: "Adjustable angle aluminum desk holder",
    },
    {
      id: 8,
      name: "Screen Protector",
      price: 12.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUra46yVt_YCcLpqW0qVdrclIfRurRJc4mtA&s",
      description: "Tempered glass, anti-scratch",
    },
  ];

  // Scroll the carousel to the left
  const scrollLeft = () => {
    document.getElementById("carousel-container").scrollLeft -= 200;
  };

  // Scroll the carousel to the right
  const scrollRight = () => {
    document.getElementById("carousel-container").scrollLeft += 200;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-medium mb-4">Recommended Products</h2>

      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hover:bg-gray-100"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        {/* Carousel container */}
        <div
          id="carousel-container"
          className="flex overflow-x-auto py-2 px-8 scrollbar-hide snap-x scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none w-40 mr-4 bg-gray-50 rounded-lg p-3 snap-start border border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="flex flex-col h-full">
                <div className="mb-2 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-md"
                  />
                </div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1 mb-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAddProduct(product)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Add to cart"
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-1 z-10 hover:bg-gray-100"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
