"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard/page";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { loadProducts } from "./redux/Features/Products/productSlice";
import { capitalizeFirstLetter } from "fomautils";

export type productType = {
  title: string;
  description: string;
  price: number;
  image: string;
  id: number;
  rating: any;
  category?:string
};

export default function Home() {
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        dispatch(loadProducts(json));
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const [filter, setFilter] = useState<string>("All products");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const products = useSelector((state: RootState) => state?.products.products);
  const categories: string[] = [];

  products.map((eachProduct: productType) => {
    !categories.some(
      (eachCategory: any) => eachCategory == eachProduct.category
    ) && categories.push(eachProduct.category as string);
  });

  useEffect(() => {
    if (filter == "All products") {
      setIsFiltering(false);
    } else {
      setIsFiltering(true);
      let categoryProducts: productType[] = [];
      products.map(
        (eachProduct: productType) =>
          eachProduct.category == filter && categoryProducts.push(eachProduct)
      );
      setFilteredProducts(categoryProducts);
    }
  }, [filter]);

  return (
    <main className="flex min-h-screen flex-col justify-start items-center pt-[80px]">
      <Navbar />
      <section className="mb-[20px] mt-[35px] w-full flex items-center justify-start px-[30px]">
        <span className="bg-[#302e2e] px-[30px] py-[10px] max-sm:text-[12px] rounded-[20px] text-[#fff]">
          Filter
        </span>
        <ul className="flex justify-start items-center ml-[20px] flex-wrap max-sm:max-w-[60vw]">
          <li
            className={`mr-[20px] cursor-pointer max-sm:text-[12px] ${
              filter == "All" && "underline font-bold"
            } hover:underline`}
            onClick={() => setFilter("All products")}
          >
            All
          </li>
          {categories.map((e: any, i: number) => {
            return (
              <li
                className={`mr-[20px] cursor-pointer max-sm:text-[12px] hover:underline max-sm:my-[5px] ${
                  filter == e && "underline font-bold"
                }`}
                key={i}
                onClick={() => setFilter(e)}
              >
                {capitalizeFirstLetter(e)}
              </li>
            );
          })}
        </ul>
      </section>
      <span className="my-[30px] text-[40px] max-sm:text-[30px]">
        {capitalizeFirstLetter(filter)}
      </span>
      <section className="w-full flex flex-wrap justify-evenly items-center">
        {!isFiltering &&
          products &&
          products?.length > 0 &&
          products.map((eachProduct: any, index: number) => {
            return (
              <ProductCard
                id={eachProduct.id}
                key={index}
                title={eachProduct?.title}
                price={eachProduct.price}
                description={eachProduct.description}
                image={eachProduct.image}
                rating={eachProduct.rating}
              />
            );
          })}

        {isFiltering &&
          filteredProducts &&
          filteredProducts?.length > 0 &&
          filteredProducts.map((eachProduct: any, index: number) => {
            return (
              <ProductCard
                id={index}
                key={index}
                title={eachProduct?.title}
                price={eachProduct.price}
                description={eachProduct.description}
                image={eachProduct.image}
                rating={eachProduct.rating}
              />
            );
          })}
      </section>
    </main>
  );
}
