import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { categoryOptionsMap, brandOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto border-4 border-white ">
      {/* clickable product area */}
      <div onClick={() => handleGetProductDetails(product?._id)} className="">
        <div className="relative  ">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 ">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4 text-black">
          <h2 className="text-2xl font-bold mb-2 text-foreground">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] ">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] ">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-foreground`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-foreground">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>

      {/* button area */}
      <CardFooter>
        <div className="hover:scale-115 duration-200 ">
          {product?.totalStock === 0 ? (
            <Button  variant="ghost" className="w-full opacity-60  cursor-not-allowed border-neon-red rounded-md text-white  bg-black ">
              Out Of Stock
            </Button>
          ) : (
            <Button
            className="w-full opacity-60 cursor-pointer border-neon rounded-md text-white  bg-black"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // stop the parent click
                if (typeof handleAddtoCart === "function") {
                  handleAddtoCart(product?._id);
                } else {
                  console.error("handleAddtoCart is not a function");
                }
              }}
              variant="ghost"
            >
              Add to cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
