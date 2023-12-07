import { Button } from "@/components/ui/button";

import { TbSwitchHorizontal } from "react-icons/tb";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface productProps {
  productId: number;
  name: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}
interface requestNew {
  productId: number;
  amount: number;
}



export default function RequestStock(props: productProps) {
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: requestNew = {
      productId: props.productId,
      amount: parseInt(e.currentTarget.amount.value),
    };
    const res = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    if (!res.ok) {
      throw new Error("Failed to request stock");
    }
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
