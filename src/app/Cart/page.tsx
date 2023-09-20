"use client";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import {
  addQuantity,
  reduceQuantity,
  removeFromCart,
} from "../redux/Features/Products/productSlice";

type ItemListProps = {
  title: string;
  price: string;
  image: string;
  id: number;
  dispatch: any;
  qty: number;
};

const ItemList = ({
  title,
  price,
  image,
  id,
  dispatch,
  qty,
}: ItemListProps) => {
  return (
    <section className="w-full flex items-center justify-between max-sm:my-[40px] my-[20px] max-sm:flex-col max-sm:justify-start">
      <span className="max-sm:w-full max-sm:text-left max-sm:my-[10px] w-[16%] font-bold my-[20px] pr-[20px]">{title}</span>
      <span className="max-sm:w-full max-sm:text-left max-sm:my-[10px] w-[16%] my-[20px]">${Number(price).toFixed(2)}</span>
      <section className="max-sm:w-full w-[16%] flex max-sm:justify-center justify-start items-center">
        <figure className="max-sm:w-[150px] max-sm:h-[150px] w-[100px] h-[80px] relative">
          <Image src={image} alt={"Product image"} fill />
        </figure>
      </section>
      <span className="max-sm:w-full max-sm:text-center max-sm:my-[30px] w-[16%] my-[20px]">${(Number(price) * qty).toFixed(2)}</span>
      <section className="max-sm:w-full w-[16%] flex justify-start max-sm:justify-center max-sm:mb-[25px] items-center">
        <button
          className="bg-[purple] text-[#fff] w-[30px] h-[30px] font-bold rounded-[20px] mr-[20px]"
          onClick={() => dispatch(reduceQuantity(id))}
        >
          -
        </button>
        <span className="font-bold mr-[20px]">{qty}</span>
        <button
          className="bg-[purple] text-[#fff] w-[30px] h-[30px] font-bold rounded-[20px]"
          onClick={() => dispatch(addQuantity(id))}
        >
          +
        </button>
      </section>
      <section className="max-sm:w-full w-[16%] flex justify-start items-center">
        <button
          className="bg-[purple] max-sm:w-full text-[#fff] px-[20px] py-[10px] font-bold rounded-[20px]"
          onClick={() => dispatch(removeFromCart(id))}
        >
          Remove item
        </button>
      </section>
    </section>
  );
};

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.products.cart);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let sum = 0;
    cartItems?.forEach((item: any) => (sum += item.price * item.qty));
    return sum;
  };
  return (
    <main className="w-full flex justify-between items-center p-[30px] pt-[120px]">
      <Navbar />
      <section className="w-full flex flex-col justify-start items-start">
        <section className="w-full flex items-center justify-between mb-[20px] max-sm:hidden">
          <span className="w-[16%] font-bold">Title</span>
          <span className="w-[16%] font-bold">Price</span>
          <span className="w-[16%] font-bold">Image</span>
          <span className="w-[16%] font-bold">Quantity Price</span>
          <span className="w-[16%] font-bold">Quantity</span>
          <span className="w-[16%] font-bold">Remove Item</span>
        </section>
        {cartItems?.map((eachItem: any, i: number) => {
          return (
            <ItemList
            key={i}
              dispatch={dispatch}
              title={eachItem.title}
              price={eachItem.price}
              image={eachItem.image}
              id={eachItem.id}
              qty={eachItem.qty}
            />
          );
        })}
        <section className="w-full flex justify-center items-center max-sm:px-[5px] px-[40px] my-[50px]">
          <section className="flex justify-start items-center mr-[40px]">
            <span className="mr-[20px] max-sm:text-[14px]">Total Price:</span>
            <span className="font-bold">${totalPrice().toFixed(2)}</span>
          </section>
          <button className="bg-[#3c4cc4] text-[#fff] px-[25px] py-[10px] font-bold rounded-[20px]">
            Checkout
          </button>
        </section>
      </section>
    </main>
  );
};

export default Cart;
