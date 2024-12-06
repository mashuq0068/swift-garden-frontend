"use client";
import Aos from "aos";
import { useEffect } from "react";

const products = [
  {
    id: 1,
    title: "Fresh Organic Fruit (50gm)",
    description: "Delicious organic fruit packed with nutrients.",
    price: 150,
    image: "/images/veg-1.png", // Replace with your own images
    isNew: true,
  },
  {
    id: 2,
    title: "Orange Juice (5ltr)",
    description: "Freshly squeezed orange juice.",
    price: 150,
    image: "/images/veg-2.png",
    isNew: true,
  },
  {
    id: 3,
    title: "Fresh Dried Almond (50g)",
    description: "High-quality dried almonds.",
    price: 200,
    image: "/images/veg-3.png",
    isNew: true,
  },
  {
    id: 4,
    title: "Shrimp - Jumbo (5 lb)",
    description: "Fresh jumbo shrimps.",
    price: 230,
    image: "/images/veg-4.png",
    isNew: true,
  },
  {
    id: 5,
    title: "Sp. Red Fresh Guava",
    description: "Sweet and juicy guavas.",
    price: 42,
    image: "/images/veg-6.png",
    isNew: true,
  },
  {
    id: 1,
    title: "Fresh Organic Fruit (50gm)",
    description: "Delicious organic fruit packed with nutrients.",
    price: 150,
    image: "/images/veg-1.png", // Replace with your own images
    isNew: true,
  },
  {
    id: 2,
    title: "Orange Juice (5ltr)",
    description: "Freshly squeezed orange juice.",
    price: 150,
    image: "/images/veg-2.png",
    isNew: true,
  },
  {
    id: 3,
    title: "Fresh Dried Almond (50g)",
    description: "High-quality dried almonds.",
    price: 200,
    image: "/images/veg-3.png",
    isNew: true,
  },
  {
    id: 4,
    title: "Shrimp - Jumbo (5 lb)",
    description: "Fresh jumbo shrimps.",
    price: 230,
    image: "/images/veg-4.png",
    isNew: true,
  },
  {
    id: 5,
    title: "Sp. Red Fresh Guava",
    description: "Sweet and juicy guavas.",
    price: 42,
    image: "/images/veg-6.png",
    isNew: true,
  },
  {
    id: 1,
    title: "Fresh Organic Fruit (50gm)",
    description: "Delicious organic fruit packed with nutrients.",
    price: 150,
    image: "/images/veg-1.png", // Replace with your own images
    isNew: true,
  },
  {
    id: 2,
    title: "Orange Juice (5ltr)",
    description: "Freshly squeezed orange juice.",
    price: 150,
    image: "/images/veg-2.png",
    isNew: true,
  },
  {
    id: 3,
    title: "Fresh Dried Almond (50g)",
    description: "High-quality dried almonds.",
    price: 200,
    image: "/images/veg-3.png",
    isNew: true,
  },
  {
    id: 4,
    title: "Shrimp - Jumbo (5 lb)",
    description: "Fresh jumbo shrimps.",
    price: 230,
    image: "/images/veg-4.png",
    isNew: true,
  },
  {
    id: 5,
    title: "Sp. Red Fresh Guava",
    description: "Sweet and juicy guavas.",
    price: 42,
    image: "/images/veg-6.png",
    isNew: true,
  },
  {
    id: 4,
    title: "Shrimp - Jumbo (5 lb)",
    description: "Fresh jumbo shrimps.",
    price: 230,
    image: "/images/veg-4.png",
    isNew: true,
  },
  {
    id: 5,
    title: "Sp. Red Fresh Guava",
    description: "Sweet and juicy guavas.",
    price: 42,
    image: "/images/veg-6.png",
    isNew: true,
  },
  {
    id: 1,
    title: "Fresh Organic Fruit (50gm)",
    description: "Delicious organic fruit packed with nutrients.",
    price: 150,
    image: "/images/veg-1.png", // Replace with your own images
    isNew: true,
  },
  {
    id: 2,
    title: "Orange Juice (5ltr)",
    description: "Freshly squeezed orange juice.",
    price: 150,
    image: "/images/veg-2.png",
    isNew: true,
  },
  {
    id: 4,
    title: "Shrimp - Jumbo (5 lb)",
    description: "Fresh jumbo shrimps.",
    price: 230,
    image: "/images/veg-4.png",
    isNew: true,
  },
  {
    id: 5,
    title: "Sp. Red Fresh Guava",
    description: "Sweet and juicy guavas.",
    price: 42,
    image: "/images/veg-6.png",
    isNew: true,
  },
  {
    id: 1,
    title: "Fresh Organic Fruit (50gm)",
    description: "Delicious organic fruit packed with nutrients.",
    price: 150,
    image: "/images/veg-1.png", // Replace with your own images
    isNew: true,
  },
  {
    id: 2,
    title: "Orange Juice (5ltr)",
    description: "Freshly squeezed orange juice.",
    price: 150,
    image: "/images/veg-2.png",
    isNew: true,
  },
];

const Products = () => {
  // Static product data
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, []);

  return (
    <div className="min-h-screen mt-20 py-10">
    <h1 className="text-center text-4xl mb-12 font-bold text-gray-800">
      Our <span className="text-green-500">Products</span>
    </h1>
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <div
            data-aos="fade-right"
            key={i}
            className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Section */}
            <div className="relative h-56">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
            {/* Content Section */}
            <div className="p-4 space-y-2">
              <h3 className="text-gray-800 font-semibold text-lg truncate">
                {product.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Products;
