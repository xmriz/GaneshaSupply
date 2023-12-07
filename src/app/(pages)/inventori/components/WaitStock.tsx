import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaHourglass } from "react-icons/fa6";
import { useEffect,useState } from "react";

interface Request {
    id: number;
    timeReq: Date;
    amountReq: number;
    productId: number;
  }
  
interface requestProps{
    productId: number;
}
  
async function getDataRequest() {
    const res = await fetch("/api/request", {
      method: "GET",
    });
  
    const data = await res.json();
    return data;
  }

export default function WaitStock(props:requestProps) {
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
  console.log(requests)
  let obj = requests.find(o => o.productId === props.productId);
  

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="hourglass">
            <FaHourglass className="fill-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            <span className="font-bold">Request Amount</span>: {obj?.amountReq}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
