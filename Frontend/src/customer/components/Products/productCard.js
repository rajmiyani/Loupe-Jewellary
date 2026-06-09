import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
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
      className="group relative flex flex-col items-center p-4 transition-all duration-700 cursor-pointer w-full max-w-[19rem] hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] rounded-[32px]"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] mb-6 transition-all duration-700 group-hover:translate-y-[-8px]">
        <img
          src={!isMouseHover ? primaryImageUrl : hoverImageUrl}
          alt={product?.title}
          className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${isMouseHover ? 'scale-110 rotate-1' : 'scale-100'}`}
        />

        {/* Premium Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-5 left-5 bg-white/80 backdrop-blur-xl px-3 py-1.5 rounded-full border border-gray-100 shadow-sm z-10 transition-all duration-300 group-hover:scale-110">
            <p className="text-[0.6rem] font-black text-[#3c7399] uppercase tracking-[0.15em]">{discount}% OFF</p>
          </div>
        )}

        {/* Luxury Badge (New Arrival) */}
        {index < 3 && (
          <div className="absolute top-5 right-5 bg-[#3c7399]/90 backdrop-blur-xl px-3 py-1.5 rounded-full shadow-sm z-10">
            <p className="text-[0.6rem] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#3c7399]" />
              New
            </p>
          </div>
        )}
      </div>

      {/* Product Information Stack */}
      <div className="w-full text-center space-y-3 px-2">
        <Typography
          sx={{
            fontSize: '0.6rem',
            fontWeight: 800,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            transition: 'color 0.3s'
          }}
          className="group-hover:text-[#3c7399]"
        >
          {product?.type || "Fine Jewellery"}
        </Typography>

        <h3 className="text-[1.05rem] font-medium text-[#3c7399] font-serif leading-tight line-clamp-2 min-h-[2.5rem]">
          {product?.title || "Untitled Masterpiece"}
        </h3>

        {/* Elegant Pricing Display */}
        <div className="flex flex-col items-center pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-[1.15rem] font-bold text-[#1e3545] font-sans tracking-tight">
              ₹{formatPriceINR(productDiscountedPrice)}
            </span>
            {discount > 0 && (
              <span className="text-[0.8rem] text-slate-400 line-through font-normal">
                ₹{formatPriceINR(productPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[0.7rem] font-black text-[#D4AF37] uppercase tracking-wider ml-1">
                ({discount}% OFF)
              </span>
            )}
          </div>

          {/* Collection Signature */}
          <div className={`mt-3 transition-all duration-500 overflow-hidden ${isMouseHover ? 'h-6 opacity-100' : 'h-0 opacity-0'}`}>
            <p className="text-[0.65rem] font-bold text-[#3c7399] uppercase tracking-widest border-t border-slate-50 pt-2 px-6">
              {product?.brand || "Loupe Jeweler Boutique"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
