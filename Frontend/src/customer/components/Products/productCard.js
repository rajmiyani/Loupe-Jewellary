import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import { formatPriceINR } from "../../../utils/price";

const PLACEHOLDER_IMAGE_URL =
  "https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg";

function resolveImageUrl(imageItem) {
  if (!imageItem) return undefined;
  if (typeof imageItem === "string") return imageItem;
  if (typeof imageItem === "object" && imageItem.imageUrl) return imageItem.imageUrl;
  return undefined;
}

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [isMouseHover, setMouseHover] = useState(false);

  const listOfImageUrls = Array.isArray(product?.imageUrls)
    ? product.imageUrls.map(resolveImageUrl).filter(Boolean)
    : [];
  const primaryImageUrl = listOfImageUrls[0] || PLACEHOLDER_IMAGE_URL;
  const hoverImageUrl = listOfImageUrls[1] || primaryImageUrl;

  const productPrice = Number(product?.price) || 0;
  const productDiscountedPrice = Number(product?.discountedPrice) || 0;
  const hasValidPrice = productPrice > 0 && productDiscountedPrice >= 0;
  const discount = hasValidPrice
    ? Math.max(0, Math.floor(((productPrice - productDiscountedPrice) / productPrice) * 100))
    : 0;

  return (
    <div
      onMouseEnter={() => {
        setMouseHover(true);
      }}
      onMouseLeave={() => {
        setMouseHover(false);
      }}
      style={
        isMouseHover ? { zIndex: zIndex.modal + 2, boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px" } : { zIndex: zIndex.appBar, boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"}
      }
      onClick={() => navigate(`/product/${product?._id}`)}
      className="p-2 rounded-lg w-[17rem] md:w-[18rem] h-[26rem] overflow-visible hover:-translate-y-10 hover:h-[32rem] hover:bg-white m-3 transition-all duration-300 cursor-pointer"
    >
      <div className="h-[18rem] md:h-[20rem] mb-3 overflow-hidden rounded-md">
        <img
          style={
            isMouseHover
              ? {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              }
              : {}
          }
          src={!isMouseHover ? primaryImageUrl : hoverImageUrl}
          alt="jewellery"
          className="h-full w-full object-cover border transition duration-300"
        />
      </div>

      <div className="flex flex-col justify-center items-center text-center">
        <div className="mb-2">
          <h1 
            className="text-lg font-semibold text-gray-900 dark:text-white" 
            style={{textOverflow: "ellipsis", overflow: "hidden", width: "13rem", whiteSpace: "nowrap"}}
          >
            {product?.title || "Untitled Product"}
          </h1>
          <button
            style={{ textTransform: "capitalize" }}
            className="text-sm font-bold text-rose-500 dark:text-amber-400 px-2"
          >
            {product?.category?.name || "Unknown Category"}
          </button>
        </div>

        {isMouseHover && (
          <div>
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd9a3b5d2/Line-Design.svg"
              alt=""
              className="w-full h-6 py-0 object-cover scale-150 px-5 overflow-hidden"
            />
              <div className="flex justify-evenly items-center w-full ">
                <p className="text-xl font-semibold">₹ {formatPriceINR(productDiscountedPrice)}</p>
              <p className="text-xs font-bold text-red-500">{discount}% off</p>
            </div>
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd9a3b5d2/Line-Design.svg"
              alt=""
              className="w-full h-6 py-0 object-cover scale-150 px-5 overflow-hidden"
            />
            <div className="flex px-2 justify-around items-center w-full my-2">
              <div className="flex-col items-center justify-center w-6/12 space-y-2">
                <p className="text-xs font-bold text-gray-500">Brand</p>
                <button className="text-sm font-bold text-fuchsia-500 bg-fuchsia-50 px-2">
                  {product?.brand || "Brand"}
                </button>
              </div>
              <div className="flex-col items-center justify-center w-6/12 space-y-2">
                <p className="text-xs font-bold text-gray-500">Type</p>
                <button
                  style={{ textTransform: "capitalize" }}
                  className="text-sm font-bold text-rose-500 bg-rose-50 px-2"
                >
                  {product?.type || "Type"}
                </button>
              </div>
            </div>
          </div>
        )}

        {
          !isMouseHover &&
          (
            <div className="my-2 flex w-full gap-2 items-center justify-center hover:text-red-500 transition duration-500">
              <p className="text-sm font-medium opacity-50 dark:text-gray-300">Hover Details</p>
              <span>&rarr;</span>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ProductCard;
