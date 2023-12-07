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

const handleDelete = async (id: number) => {
  const res = await fetch(`/api/request?id=${id}`, {
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

  useEffect(() => {
    getDataRequest()
      .then((dataReq) => {
        setRequests(dataReq);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let obj = requests.find((o) => o.productId === props.productId);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => handleDelete(props.productId)}
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
