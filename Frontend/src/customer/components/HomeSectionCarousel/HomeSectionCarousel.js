import React, { useEffect, useState } from "react";
import HomeSectionCard from "../Section_card/HomeSectionCard";
import Slider from "react-slick";
import "./style1.css";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../state/store";
import { findProducts } from "../../../state/product/Action";

const HomeSectionCarousel = ({
    sectionName,
    sectionDisc,
    sectionLabel,
    sectionCategory,
    _id,
}) => {
    const dispatch = useDispatch();
    const [localProducts, setLocalProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Using a similar structure to the Redux action but fetching locally
                // to avoid state collision between multiple carousels
                const collection = _id === 'best-of-loupe' ? 'best-sellers' :
                    _id === 'new-arrivals' ? 'new-arrival' :
                        _id === 'reccomanded' ? 'reccomanded' : null;

                const params = new URLSearchParams({
                    category: sectionCategory || "jewellery",
                    color: "",
                    minPrice: "10",
                    maxPrice: "1000000",
                    minDiscount: "0",
                    maxDiscount: "100",
                    sort: "low_to_high",
                    pageNumber: "1",
                    pageSize: "12",
                    occasion: "",
                    type: "",
                    collectionName: collection || ""
                });

                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5455'}/api/products?${params.toString()}`);
                const data = await response.json();
                setLocalProducts(data);
            } catch (error) {
                console.error("Error in HomeSectionCarousel fetch:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sectionCategory, _id]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        fade: false,
        arrows: true,
        autoplay: false,
        initialSlide: 0,
        swipeToSlide: true,
        className: "center",
        leftPadding: "60px",
        // focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: false,
                    className: "center",
                    centerPadding: "60px",
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 968,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // centerMode: true,
                    dots: false,
                    speed: 500,
                    className: "center",
                    infinite: true,
                    centerPadding: "60px",
                    swipeToSlide: true,
                },
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    speed: 500,
                    initialSlide: 2,
                    className: "center",
                    infinite: true,
                    centerPadding: "60px",
                    swipeToSlide: true,
                    // className: "center",
                    // centerMode: true,
                    // centerPadding: "40px",
                },
            },
        ],
    };

    // High-quality Dummy Products precisely matching the screenshot's data
    const dummyProducts = [
        { _id: 'd1', title: 'Celestial Star Necklace', discountedPrice: 99, price: 120, discountPercent: 18, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop' }] },
        { _id: 'd2', title: 'Radiant Hoop Earrings', discountedPrice: 85, price: 110, discountPercent: 23, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop' }] },
        { _id: 'd3', title: 'Infinity Ring', discountedPrice: 75, price: 95, discountPercent: 21, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3f41e?q=80&w=1000&auto=format&fit=crop' }] },
        { _id: 'd4', title: 'Charm Bracelet', discountedPrice: 90, price: 125, discountPercent: 28, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1611085510590-09c063b46903?q=80&w=1000&auto=format&fit=crop' }] },
        { _id: 'd5', title: 'Eternal Gold Band', discountedPrice: 150, price: 200, discountPercent: 25, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000&auto=format&fit=crop' }] },
        { _id: 'd6', title: 'Diamond Studs', discountedPrice: 1200, price: 1500, discountPercent: 20, imageUrls: [{ imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop' }] }
    ];

    const displayProducts = localProducts?.content?.length > 0 ? localProducts.content : dummyProducts;

    const items = displayProducts?.map((item, index) => (
        <HomeSectionCard
            product={item}
            index={index}
            key={item._id}
            productLabel={sectionLabel}
        />
    ))
        || loading ? [1, 2, 3, 4].map(n => <div key={n} className="p-4 h-[20rem] animate-pulse bg-gray-200 rounded-lg"></div>) : null;

    return (
        <div className="my-5" id={_id}>
            {sectionName && (
                <div>
                    <h2
                        style={{ letterSpacing: "1px" }}
                        className="text-4xl font-semibold text-[#97c2d5] text-center px-10"
                    >
                        {sectionName}
                    </h2>
                    <p className="text-lg font-normal text-center pt-2">{sectionDisc}</p>
                    <img
                        src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711727694/Line-Design_fhgakp.svg"
                        className="w-full h-20 object-cover"
                        alt=""
                    />
                </div>
            )}

            <div className="slider-container">
                <Slider {...settings}>{items}</Slider>
            </div>
        </div>
    );
};

export default HomeSectionCarousel;
