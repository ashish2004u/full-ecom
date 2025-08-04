import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromCart, decrementQty, incrementQty } from "../redux/slice/cartSlice";
import { toast } from "react-hot-toast"; // ✅ Toast import

const CartCard = ({ id, name, price, image, qty, size }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart({ id, name, price, image, qty, size }));
    toast.error(`${name} removed from cart`, {
      icon: '🗑️',
      style: {
        borderRadius: '8px',
        background: '#fff',
        color: '#EF4444',
      },
    });
  };

  return (
    <tr className="border-t">
      <td className="p-3">{id}</td>

      <td className="p-3">
        <img
          src={image}
          alt="T-shirt"
          className="w-14 h-14 object-cover rounded"
        />
      </td>

      <td className="p-3">{name}</td>

      <td className="p-3">{size}</td>

      <td className="p-3">
        <div className="flex items-center gap-2">
          <button className="border px-2 py-1 rounded">
            <AiOutlineMinus
              onClick={() =>
                qty > 1 ? dispatch(decrementQty({ id, size })) : null
              }
            />
          </button>
          <span>{qty}</span>
          <button className="border px-2 py-1 rounded">
            <AiOutlinePlus
              onClick={() =>
                qty >= 1 ? dispatch(incrementQty({ id, size })) : null
              }
            />
          </button>
        </div>
      </td>

      <td className="p-3">₹{price}</td>

      <td className="p-3 text-red-500">
        <button onClick={handleRemove} className="cursor-pointer">
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
};

export default CartCard;
