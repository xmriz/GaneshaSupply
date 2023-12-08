"use client";

import { useEffect, useState } from "react";
import CardStock from "./CardStock";
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image: string;
  lastRestock: Date;
  salesLastRestock: number;
}

interface Request {
  id: number;
  timeReq: Date;
  amount: number;
  productId: number;
}

async function getDataProducts() {
  const res = await fetch("/api/products", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

async function getDataRequest() {
  const res = await fetch("/api/request", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

const PengelolaanInventori = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getDataProducts(), getDataRequest()])
      .then(([productsData, requestsData]) => {
        setProducts(productsData);
        setRequests(requestsData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1 className="text-[40px] text-darkGreen mb-8">
          Inventory Management System
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green"></div>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-[60px] lg:gap-[40px] my-10 flex flex-col">
          {products
            .slice() // Create a shallow copy to avoid modifying the original array
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort products alphabetically by name
            .map((product) => (
              <CardStock
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                stock={product.stock}
                lastRestock={product.lastRestock}
                salesLastRestock={product.salesLastRestock}
                image={product.image}
                request={requests.find((req) => req.productId === product.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default PengelolaanInventori;
