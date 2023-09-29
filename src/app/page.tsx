"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard/page";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Product, loadProducts } from "./redux/Features/Products/productSlice";
import { capitalizeFirstLetter } from "fomautils";
import Skeleton from "react-loading-skeleton";

type productType = Product;

const ProductLoader = () => {
  return (
    <section className="flex flex-col justify-start items-start mx-[20px] mt-[20px] mb-[100px] w-[280px]">
      <section className="w-full h-[200px] mb-[20px]">
        <Skeleton className="relative w-full h-full rounded-[20px" />
      </section>

      <section className="w-full h-[30px]">
        <Skeleton className="w-full h-full" />
      </section>

      <section className="mt-[17px] w-full flex flex-col justify-between items-center h-[50px]">
        <section className="w-full h-[25%]">
          <Skeleton className="w-full h-full" />
        </section>

        <section className="w-full h-[25%]">
          <Skeleton className="w-full h-full" />
        </section>

        <section className="w-full h-[25%]">
          <Skeleton className="w-full h-full" />
        </section>
      </section>

      <section className="flex w-full justify-between items-center mt-[20px] text-[14px]">
        <section className="w-[50px] h-[30px]">
          <Skeleton className="w-full h-full" />
        </section>
        <section className="flex items-center h-[30px]">
          <section className="w-[60px] h-full mr-[4px]">
            <Skeleton className="w-full h-full" />
          </section>
          <section className="w-[30px] h-full">
            <Skeleton className="w-full h-full" />
          </section>
        </section>
      </section>
      <section className="mt-[15px] w-full h-[45px] rounded-[25px]">
        <section className="w-full h-full">
          <Skeleton className="w-full h-full" />
        </section>
      </section>
    </section>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((jsonData) => {
        const productsData = jsonData.map((json: any) => ({
          title: json.title,
          description: json.description,
          price: json.price,
          image: json.image,
          id: json.id,
          rate: json.rating.rate,
          category: json.category,
        }));
        dispatch(loadProducts(productsData));
      })
      .catch((e) => alert("Slow network. Please reload and retry."));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [filter, setFilter] = useState<string>("All products");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<productType[]>([]);
  const products = useSelector((state: RootState) => state?.products.products);
  const categories: string[] = [];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  products.map((eachProduct: productType) => {
    !categories.some(
      (eachCategory: string) => eachCategory == eachProduct.category
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

  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <main className="flex min-h-screen flex-col justify-start items-center pt-[80px]">
      <Navbar />
      <section className="mb-[20px] mt-[35px] w-full flex items-center justify-start px-[30px]">
        {isLoading && (
          <section className="w-full flex justify-between sm:justify-start items-center h-[50px]">
            <section className="h-[70%] w-[70px] sm:mr-[20px]">
              <Skeleton className="h-full" />
            </section>
            <section className="w-[75%] max-w-[400px] h-[70%]">
              <Skeleton className="w-full h-full" />
            </section>
          </section>
        )}
        {categories.length !== 0 && (
          <>
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

              {categories.map((eachCategory: string, i: number) => {
                return (
                  <li
                    className={`mr-[20px] cursor-pointer max-sm:text-[12px] hover:underline max-sm:my-[5px] ${
                      filter == eachCategory && "underline font-bold"
                    }`}
                    key={i}
                    onClick={() => setFilter(eachCategory)}
                  >
                    {capitalizeFirstLetter(eachCategory)}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>

      {!isLoading && (
        <span className="my-[30px] text-[40px] max-sm:text-[30px]">
          {capitalizeFirstLetter(filter)}
        </span>
      )}

      {isLoading && (
        <section className="w-[200px] my-[55px] h-[35px]">
          <Skeleton className="w-full h-full" />
        </section>
      )}

      <section
        className={`w-full flex flex-wrap justify-evenly ${
          isLoading ? `items-start` : `tems-center`
        }`}
      >
        {isLoading &&
          [1, 2, 3, 4].map((e, i) => {
            return <ProductLoader key={i} />;
          })}

        {!isFiltering &&
          products &&
          products?.length > 0 &&
          products.map((eachProduct: productType, index: number) => {
            return (
              <ProductCard
                id={eachProduct.id}
                key={index}
                title={eachProduct?.title}
                price={eachProduct.price}
                description={eachProduct.description}
                image={eachProduct.image}
                rating={eachProduct.rating}
                category={eachProduct.category}
              />
            );
          })}

        {isFiltering &&
          filteredProducts &&
          filteredProducts?.length > 0 &&
          filteredProducts.map((eachProduct: productType, index: number) => {
            return (
              <ProductCard
                id={index}
                key={index}
                title={eachProduct?.title}
                price={eachProduct.price}
                description={eachProduct.description}
                image={eachProduct.image}
                rating={eachProduct.rating}
                category={eachProduct.category}
              />
            );
          })}
      </section>
    </main>
  );
};

export default Home;
