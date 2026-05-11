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
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      onClick={() => navigate(`/product/${product?._id}`)}
      className="group relative flex flex-col items-center p-3 mb-10 transition-all duration-500 cursor-pointer w-[17rem] md:w-[19rem]"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-[#f8fafc] mb-5 shadow-sm group-hover:shadow-xl transition-shadow duration-500">
        <img
          src={!isMouseHover ? primaryImageUrl : hoverImageUrl}
          alt={product?.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${isMouseHover ? 'scale-110' : 'scale-100'}`}
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <p className="text-[0.65rem] font-black text-[#97c2d5] uppercase tracking-wider">{discount}% OFF</p>
          </div>
        )}

        {/* New Arrival Badge (If applicable) */}
        {index < 3 && (
          <div className="absolute top-4 right-4 bg-[#1e293b] px-2.5 py-1 rounded-full shadow-sm">
            <p className="text-[0.6rem] font-bold text-white uppercase tracking-widest">New</p>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="w-full text-center space-y-1.5 transition-all duration-300">
        <p className="text-[0.65rem] font-black text-[#94a3b8] uppercase tracking-[0.2em] mb-1">
          {product?.type || "Fine Jewellery"}
        </p>

        <h3 className="text-[1.1rem] font-semibold text-[#1e293b] font-serif leading-tight px-2 line-clamp-1">
          {product?.title || "Untitled Masterpiece"}
        </h3>

        {/* Dynamic Divider */}
        <div className="flex items-center justify-center gap-2 py-1">
          <div className={`h-[1px] bg-slate-100 transition-all duration-500 ${isMouseHover ? 'w-12' : 'w-4'}`} />
          <div className="w-1 h-1 rounded-full bg-[#97c2d5]" />
          <div className={`h-[1px] bg-slate-100 transition-all duration-500 ${isMouseHover ? 'w-12' : 'w-4'}`} />
        </div>

        {/* Pricing */}
        <div className="flex flex-col items-center transition-all duration-300 transform">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#1e293b]">
              ₹{formatPriceINR(productDiscountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-[0.8rem] text-[#94a3b8] line-through decoration-slate-300">
                ₹{formatPriceINR(productPrice)}
              </span>
            )}
          </div>

          {/* Collection Name on Hover */}
          <div className={`overflow-hidden transition-all duration-500 ${isMouseHover ? 'h-6 opacity-100 mt-2' : 'h-0 opacity-0'}`}>
            <p className="text-[0.7rem] font-bold text-[#97c2d5] uppercase tracking-widest">
              {product?.brand || "Loupe Collection"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
