import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaHourglass } from "react-icons/fa6";
import { useEffect, useState } from "react";

interface Request {
  id: number;
  timeReq: Date;
  amount: number;
  productId: number;
}

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

interface requestProps {
  productId: number;
}

async function getDataRequest() {
  const res = await fetch("/api/request", {
    method: "GET",
  });

  const data = await res.json();
  return data;
}

const handleSubmit = async (productId: number, amount: number, stock:number) => {
  const productUpdate = {
    id: productId,
    stock: stock + amount,
    lastRestock: new Date().toISOString(),
    salesLastRestock: 0,
  };

  try {
    await updateProduct(productUpdate);
  } catch (error) {
    console.error("Error updating product:", error);
  } finally {
    await handleDelete(productId);
  }
};

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

const handleDelete = async (productId: number) => {
  const res = await fetch(`/api/request?productId=${productId}`, {
    method: "DELETE",
  }).finally(() => {
    window.location.reload();
  });

  if (!res.ok) {
    throw new Error("Failed to request stock");
  }
};

export default function WaitStock(props: requestProps) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getDataRequest()
      .then((dataReq) => {
        setRequests(dataReq);
      })
      .catch((err) => {
        console.log(err);
      });
    getDataProducts()
      .then((dataProd) => {
        setProducts(dataProd);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Use optional chaining to handle possible undefined values
  let obj = requests.find((o) => o.productId === props.productId);
  let prod = products.find((o) => o.id === props.productId);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {
              if (obj?.amount && prod?.stock) {
                handleSubmit(props.productId, obj?.amount, prod?.stock);
              }
            }}
            variant="hourglass"
          >
            <FaHourglass className="fill-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <span className="font-bold">Request Amount</span>: {obj?.amount}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
