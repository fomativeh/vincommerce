import Image from "next/image";
import ratingIcon from "../../assets/icons/rating.png";
import { capitalizeFirstLetter } from "fomautils";
import { useDispatch, useSelector } from "react-redux";
import {
  Product,
  addToCart,
  removeFromCart,
} from "@/app/redux/Features/Products/productSlice";
import { RootState } from "@/app/redux/store";
import React from "react";
type productType = Product;

const ProductCard = ({
  title,
  description,
  price,
  image,
  id,
  rating,
  category,
}: productType) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state?.products.cart);
  const isInCart = cart.some((eachItem: productType) => eachItem.id === id);
  return (
    <section className="flex flex-col justify-start items-start mx-[20px] my-[30px] w-[280px]">
     <> {console.log(rating)}</>
      <figure className="relative w-full h-[250px] rounded-[20px] mb-[20px]">
        <Image src={image} alt={"Product image"} fill />
      </figure>
      <p className="font-bold text-[14px] text-[#722051]">{title}</p>
      <span className="mt-[7px] text-[12px] block w-full text-[#6c6b6b]">
        {description &&
          capitalizeFirstLetter(description?.substring(0, 200) + "...")}
      </span>
      <section className="flex w-full justify-between items-center my-[10px] text-[14px]">
        <span className="font-bold">${price}</span>
        <section className="flex items-center">
          <figure className="relative w-[20px] h-[20px] mr-[5px]">
            <Image src={ratingIcon} alt={"Rating icon"} fill />
          </figure>
          <span>{rating}</span>
        </section>
      </section>
      <button
        className="mt-[15px] w-full bg-[purple] text-[#fff] h-[45px] rounded-[25px] border-none hover:bg-[#622862]"
        onClick={() =>
          isInCart
            ? dispatch(removeFromCart(id))
            : dispatch(addToCart({ id, title, image, price, qty: 1 }))
        }
      >
        {isInCart ? "Remove from cart" : "Add to cart"}
      </button>
    </section>
  );
};

export default ProductCard;
