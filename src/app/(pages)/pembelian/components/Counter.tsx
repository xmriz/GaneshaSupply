import React, { useState, ChangeEvent } from "react";

interface CounterProps {
  onQuantityChange: (quantity: number) => void;
  stok: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    if (count < props.stok) {
      setCount(count + 1);
      props.onQuantityChange(count + 1);
    }
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      props.onQuantityChange(count - 1);
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setCount(0);
      props.onQuantityChange(0);
    } else {
      const number = parseInt(value);

      if (number > props.stok) {
        setCount(props.stok);
        props.onQuantityChange(props.stok);
      } else {
        setCount(number);
        props.onQuantityChange(number);
      }
    }
  }


  return (
    <>
      <div className="flex text-3xl flex-row-reverse">
        <button onClick={handleIncrement} className="rounded  text-darkGreen px-4">+</button>
        <input 
          type="text" 
          value={count} 
          onChange={handleChange} 
          className="text-center w-16 rounded border border-gray-300"
        />
        <button onClick={handleDecrement} disabled={count === 0} className="rounded text-darkGreen px-4">-</button>
      </div>
    </>
  );
}
