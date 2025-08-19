import React, { useState, useEffect } from "react";
import bannerOne from "@/assets/banner-1.png";
import bannerTwo from "@/assets/banner-2.png";
import bannerThree from "@/assets/banner-3.png";
import bannerFour from "@/assets/banner-4.png";
import adidasLogo from "@/assets/brands/Adidas.svg";
import nikeLogo from "@/assets/brands/Nike.svg";
import zaraLogo from "@/assets/brands/Zara.svg";
import levisLogo from "@/assets/brands/Levis.svg";
import pumaLogo from "@/assets/brands/Puma.svg";
import ellesseLogo from "@/assets/brands/Ellesse.svg";
import lacosteLogo from "@/assets/brands/Lacoste.svg";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  WatchIcon,
  ShirtIcon,
  CloudLightning,
  UmbrellaIcon,
  BabyIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree , bannerFour];
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brandWithIcon = [
    { id: "nike", label: "Nike", img: nikeLogo },
    { id: "adidas", label: "Adidas", img: adidasLogo },
    { id: "puma", label: "Puma", img: pumaLogo },
    { id: "levis", label: "Levis", img: levisLogo },
    { id: "zara", label: "Zara", img: zaraLogo },
    { id: "lacoste", label: "Lacoste", img: lacosteLogo },
    { id: "ellesse", label: "Ellesse", img: ellesseLogo },
  ];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log("get details for:", getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleAddtoCart(getCurrentProductId) {
    console.log("add to cart:", getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product added to cart");
      }
    });
  }
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner slider */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={`slide-${index}`}
            alt={`Banner ${index + 1}`}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 border-neon text-neon hover:scale-105" 
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2  border-neon text-neon hover:scale-105"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-white">
          <h2 className="text-3xl font-extrabold font-serif text-center mb-8 text-white ">
            Shop<span className='text-neon'> by </span> Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className="cursor-pointer hover:shadow-2xl  hover:scale-105 hover:shadow-primary "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-16 h-16 mb-4white stroke-2" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold font-serif text-center mb-8">Shop <span className='text-neon'> by </span> Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {brandWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                key={brandItem.id}
                className="cursor-pointer hover:shadow-2xl  hover:scale-105 hover:shadow-primary"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={brandItem.img}
                    alt={brandItem.label}
                    className="w-20 h-20 mb-4 object-contain"
                  />
                  <span className="font-bold text-2xl">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4 ">
          <h2 className="text-3xl font-extrabold font-serif text-center mb-8">
            Featured <span className='text-neon'>Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
                  .slice(0, 4)
                  .map((productItem) => (
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      key={productItem._id}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
