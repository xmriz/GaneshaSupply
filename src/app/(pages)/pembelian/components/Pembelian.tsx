"use client";

import { useEffect, useState } from "react";
import CardPembelian from "./CardPembelian";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  lastRestock: string;
  salesLastRestock: number;
  image: string;
}

async function getDataProducts() {
  const res = await fetch("/api/products", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

async function updateProduct(productUpdate: {
  id: number;
  stock: number;
  lastRestock: string;
  salesLastRestock: number;
}) {
  try {
    const res = await fetch(`/api/products?id=${productUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify(productUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update product");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
export default function Pembelian() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalHarga, setTotalHarga] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getDataProducts()
      .then((data) => {
        const productsWithQuantity = data.map((product: Product) => {
          return { ...product, quantity: 0 };
        });

        setProducts(productsWithQuantity);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleQuantityChange = (productId: number, quantity: number) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);

    const newTotalPrice = updatedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalHarga(newTotalPrice);
  };

  const handlePurchase = async () => {
    const productsToUpdate = products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        id: product.id,
        stock: product.stock - product.quantity,
        lastRestock: new Date().toISOString(),
        salesLastRestock: product.quantity + product.salesLastRestock,
      }));

    const updatedProducts = products.map((product) => ({
      ...product,
      quantity: 0,
    }));
    setProducts(updatedProducts);
    setTotalHarga(0);

    for (const product of productsToUpdate) {
      await updateProduct(product);
    }

    window.location.reload();
  };

  return (
    <>
      <div className="container mb-28">
        <div className="">
          <h1 className="text-darkGreen text-[40px] mb-8">Item Purchase</h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px]">
            <h2 className="animate-pulse text-3xl text-green">Loading . . .</h2>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-[30px] ">
            {products
              .slice() // Create a shallow copy of the array to avoid mutating the original state
              .sort((a, b) => a.name.localeCompare(b.name)) // Sort the products alphabetically by name
              .map((product) => (
                <CardPembelian
                  key={product.id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  stok={product.stock}
                  image={product.image}
                  onQuantityChange={(quantity) =>
                    handleQuantityChange(product.id, quantity)
                  }
                />
              ))}
          </div>
        )}
      </div>
      <div
        className="fixed flex items-center justify-end bottom-0 h-[75px] left-0 w-full bg-white px-16"
        style={{ boxShadow: "0px -2px 100px 10px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex flex-row-reverse gap-10 items-center justify-center">
          <button
            className="bg-green text-white px-4 py-2 text-lg rounded-md hover:bg-[#577B56] hover:shadow-lg"
            onClick={handlePurchase}
          >
            Purchase
          </button>
          <div className="flex flex-col justify-center">
            <h3 className="text-darkGreen text-[14px] leading-3">
              Total Harga
            </h3>
            <p className="text-green text-[25px] font-bold">
              {totalHarga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
