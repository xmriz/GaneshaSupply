import Image from "next/image";
import Counter from "./Counter";

interface CardPembelianProps {
  title: string;
  description: string;
  price: number;
  stok: number;
  image: string;
  onQuantityChange: (quantity: number) => void;
}

export default function CardPembelian(props: CardPembelianProps) {
  return (
    <div
      className="w-full p-[30px] rounded-lg"
      style={{ boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-row gap-[40px]">
        <div
          className="w-[180px] h-[180px] bg-white rounded-lg "
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="flex flex-col justify-between grow">
          <h1 className="text-darkGreen text-[28px] font-bold">
            {props.title}
          </h1>
          <p className="text-darkGreen text-[20px]">{props.description}</p>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-10">
              <div className="">
                <h3 className="text-darkGreen text-[20px] font-bold">Stok</h3>
                <p className="text-darkGreen text-[20px]">{props.stok}</p>
              </div>
              <div className="">
                <h3 className="text-darkGreen text-[20px] font-bold">Harga</h3>
                <p className="text-darkGreen text-[20px]">
                  {props.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
              </div>
            </div>
            <div className="">
              <Counter onQuantityChange={props.onQuantityChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
