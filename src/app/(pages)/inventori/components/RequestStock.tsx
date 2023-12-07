import { Button } from "@/components/ui/button";

import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

interface productProps {
  productId: number;
  name: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}
interface requestNew {
  productId: number,
  amountReq:number,
}



export default function RequestStock(props: productProps) {
  const amount = useRef()

  const submitHandler = (event:any) => {
    event.preventDefault();
    const amountEntered = event.target.amount.value;

    const requestBaru = {
      productId : props.productId,
      timeReq : new Date(),
      amountReq : amountEntered,
    };
  
    fetch("/api/request", {
      method: "POST",
      body: JSON.stringify(requestBaru),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
  
        response
          .json()
          .then((data) => {
            throw new Error(data.message || "Something went wrong");
          })
          .catch((error) => {
            console.log(error)
          });
      })
      .then((data) => {
        console.log("success")
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        location.reload();
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="request">
          <TbSwitchHorizontal className="w-[28px] h-[28px]" color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-[20px] font-bold">
          Berapa jumlah item ini yang ingin direstock?
        </h1>
        <form className="flex w-full items-center gap-5" onSubmit={submitHandler}>
          <Input type="number" placeholder="Jumlah" className="h-10" name="amount" required/>
          <Button type="submit" size= "sm" className="h-10">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
