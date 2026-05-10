import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { store } from "../../../state/store";
import { addWishItem, removeWishItem } from "../../../state/wishlist/Action";
import { formatPriceINR } from "../../../utils/price";
import { motion } from "framer-motion";

const HomeSectionCard = ({ product, productLabel }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const [favChecked, setFavChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFavouriteChange = (event) => {
    setFavChecked(event.target.checked);
    if (event.target.checked === true) {
      dispatch(addWishItem({ productId: product._id }));
    } else {
      dispatch(removeWishItem(product._id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      className="group relative bg-white rounded-[24px] overflow-hidden transition-all duration-500 cursor-pointer h-[380px] w-full border border-gray-100/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2"
    >
      <div className="relative aspect-[1/1.1] overflow-hidden rounded-[20px] m-2">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.imageUrls?.[0]?.imageUrl}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${mouseHover ? 'scale-110' : 'scale-100'}`}
          />
        </Link>

        {/* Favorite Icon */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-white/80 backdrop-blur-md rounded-full p-1 shadow-sm hover:scale-110 transition-transform">
            <Checkbox
              checked={favChecked}
              onChange={handleFavouriteChange}
              icon={<FavoriteBorderIcon sx={{ fontSize: 20, color: '#94a3b8' }} />}
              checkedIcon={<FavoriteIcon sx={{ fontSize: 20, color: '#ef4444' }} />}
            />
          </div>
        </div>

        {/* Product Label */}
        {productLabel && (
          <div className="absolute bottom-3 left-3 z-10 px-3 py-1 bg-[#97c2d5] text-white text-[10px] font-bold rounded-full tracking-widest shadow-lg">
            {productLabel}
          </div>
        )}
      </div>

      <div className="p-4 text-center">
        <h3 className="text-gray-900 font-medium text-sm mb-2 truncate px-2 group-hover:text-[#97c2d5] transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center justify-center gap-3">
          <p className="text-[#1e293b] font-bold text-base">₹ {formatPriceINR(product.discountedPrice)}</p>
          <p className="text-gray-400 line-through text-xs italic">₹ {formatPriceINR(product.price)}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSectionCard;
