import * as React from "react";

import { Button } from "@/components/ui/button";

import { MdEdit, MdInfoOutline } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface productProps {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  lastRestock: Date;
  salesLastRestock: number;
}

// Function to format the date
const formatRestockDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("us-EN", options);
};



const updateProduct = async (id: number, data: any) => {
  const res = await fetch(`/api/products?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default function DetailStock(props: productProps) {
  const restockDate = new Date(props.lastRestock);
  const formattedRestockDate = formatRestockDate(restockDate);
  const [editedPrice, setEditedPrice] = React.useState<number>(props.price);
  const [editedDescription, setEditedDescription] = React.useState<string>(
    props.description
  );

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleSave = async () => {
    const data = {
      price: editedPrice,
      description: editedDescription,
    };

    try {
      await updateProduct(props.id, data);
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      window.location.reload();
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="details">
          <MdInfoOutline className={`w-[28px] h-[28px]`} color="white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <h1 className="text-[30px] font-bold">{props.name}</h1>
          </div>
          <hr></hr>
          <div className="flex flex-col gap-2">
            <h2 className="text-darkGreen font-bold">Harga</h2>
            <p>
              {isEditing ? (
                <input
                  type="number"
                  defaultValue={props.price}
                  className="w-full border border-gray-300 rounded-lg p-4"
                  placeholder="Masukkan harga"
                  onChange={(e) => setEditedPrice(parseInt(e.target.value))}
                ></input> // TODO: Add currency formatting to this input
              ) : (
                props.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-darkGreen font-bold">Deskripsi</h2>
            {isEditing ? (
              <textarea
                className="w-full h-[200px] border border-gray-300 rounded-lg p-4"
                defaultValue={props.description}
                placeholder="Masukkan deskripsi"
                onChange={(e) => setEditedDescription(e.target.value)}
              ></textarea>
            ) : (
              <p>{props.description}</p>
            )}
          </div>
          {isEditing ? (
            <div className="flex flex-row gap-4 mt-3">
              <Button variant="default" className="flex-grow" onClick={handleSave}>
                Simpan
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
                className="flex-grow"
              >
                Batal
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-darkGreen font-bold">Stok</h2>
                <p>{props.stock}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-darkGreen font-bold">Terakhir restock</h2>
                <p>{formattedRestockDate}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-darkGreen font-bold">
                  Penjualan sejak restock terakhir
                </h2>
                <p>{props.salesLastRestock}</p>
              </div>
              <Button
                variant="default"
                onClick={() => setIsEditing(true)}
                className="flex-grow w-full mt-4"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
