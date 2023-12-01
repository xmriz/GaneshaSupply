import React, { useState, ChangeEvent } from "react";

interface CounterProps {
  onQuantityChange: (quantity: number) => void;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    if (count >= 0) {
      setCount(count + 1);
    }

    props.onQuantityChange(count + 1);
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }

    props.onQuantityChange(count - 1);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.target.value, 10);
    
    if (!isNaN(inputValue) && inputValue >= 0) {
      setCount(inputValue);
    }
    
    props.onQuantityChange(inputValue);
  }

  return (
    <>
      <div className="flex justify-between text-3xl flex-row-reverse">
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
