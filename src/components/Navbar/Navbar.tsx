import Image from "next/image";
import cartIcon from "../../assets/icons/cart.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
const Navbar = () => {
  const cartItemsCount = useSelector((state: RootState) => state.products.cart);
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center h-[80px] bg-[purple] z-[2] px-[50px] max-sm:px-[30px]">
      <Link href={"/"}>
        <section className="flex items-center text-[#fff]">
          <p>vin</p>
          <span className="font-bold text-[20px]">Commerce</span>
        </section>
      </Link>
      <Link href={"/Cart"}>
        <section className="relative cursor-pointer">
          <div className="text-[12px] flex justify-center items-center z-[9] right-[-12px] top-[-10px] absolute p-[5px] px-[8px] rounded-[50px] bg-[#000000] text-[#fff]">
            {cartItemsCount?.length}
          </div>
          <figure className="relative w-[30px] h-[30px]">
            <Image src={cartIcon} alt={"Cart icon"} fill />
          </figure>
        </section>
      </Link>
    </nav>
  );
};

export default Navbar;
