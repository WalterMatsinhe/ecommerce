import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";


function ProductDetailsDialog({ open, setOpen, productDetails }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative  rounded-lg">
          {productDetails?.image ? (
            <img
              src={productDetails.image}
              alt={productDetails.title || "Product image"}
              width={600}
              height={600}
              className="rounded-xl aspect-square w-full object-cover border-2 border-primary shadow-md shadow-primary"
            />
          ) : (
            <div className="aspect-square w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>
        <div >
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold mb-4">
              {productDetails?.title || "Product Title"}
            </DialogTitle>
          </DialogHeader>
          <Separator />
          <div>
            <p className="text-muted-foreground text-2xl mb-6 mt-4">
              {productDetails?.description || "No description available"}
            </p>
          </div>
          <div className="flex items-center justify-between overflow-hidden">
            <p
              className={`text-3xl font bold text-primary ${
                productDetails?.price > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.price > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {" "}
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className=" flex items-center justify-center mt-5">
            <Button className="text-white w-full border-2 border-black hover:scale-110 duration-400 mb-5">
              Add to cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto ">
            <h2 className="text-xl font-bold mt-2 mb-4">Reviews</h2>
            <div className="flex gap-4 mb-2">
              <Avatar className="w-10 h-10 ml-2 rounded-full flex items-center justify-center shadow-2xl shadow-[0_0_8px_hsl(var(--primary))]">
                <AvatarFallback>WM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-bold">Walter Matsinhe</h3>
                </div>
                <div className="flex items-center justify-center  gap-1.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
                <p className="text-muted-foreground">
                  This is an awesome product
                </p>
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <Avatar className="w-10 h-10 ml-2 rounded-full flex items-center justify-center shadow-2xl shadow-[0_0_8px_hsl(var(--primary))]">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-bold">Arony Sitoe</h3>
                </div>
                <div className="flex items-center justify-center  gap-1.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
                <p className="text-muted-foreground">
                  I really like this product
                </p>
              </div>
            </div>
            <div className="flex gap-4 mb-2">
              <Avatar className="w-10 h-10 ml-2 rounded-full flex items-center justify-center shadow-2xl shadow-[0_0_8px_hsl(var(--primary))]">
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center justify-center gap-2">
                  <h3 className="font-bold">Alberto Junior</h3>
                </div>
                <div className="flex items-center justify-center  gap-1.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
                <p className="text-muted-foreground">
                 I recommend this product
                </p>
              </div>
            </div>
            <div className = 'mt-4  ml-2 mb-2 flex items-center justify-center gap-2'>
                <Input placeholder = 'Write a review...'/>
                <Button className="border-2 border-black">Submit</Button>
              </div>    
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
