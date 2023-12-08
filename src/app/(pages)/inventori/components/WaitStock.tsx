import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

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
  request: Request;
}

const handleSubmit = async (
  productId: number,
  amount: number,
  stock: number
) => {
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
  const [request, setRequest] = useState<Request | undefined | null>(
    props.request
  );
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setRequest(props.request);
    Promise.all([getDataProducts()])
      .then(([productsData]) => {
        setProducts(productsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [props.request]);

  // Use optional chaining to handle possible undefined values
  let prod = products.find((o) => o.id === props.productId);

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <TooltipTrigger asChild>
            <DialogTrigger>
              <Button variant="hourglass">
                <FaHourglass className="fill-white" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <DialogContent>
            <div>
              <h1 className="font-bold">
                Apakah Anda yakin ingin menyelesaikan request?
              </h1>
              <div className="flex gap-5 justify-end mx-5 mt-5">
                <Button
                  size="sm"
                  className="h-10 px-5 w-15 bg-green"
                  onClick={() => {
                    handleSubmit(
                      props.productId,
                      request?.amount || 0,
                      prod?.stock || 0
                    );
                  }}
                >
                  Ya
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-10 px-5 w-15"
                  >
                    Tidak
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <TooltipContent>
          <p>
            <span className="font-bold">Request Amount</span>: {request?.amount}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
