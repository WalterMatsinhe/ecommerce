import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector} from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { Label } from "../ui/label";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useState, useEffect } from "react";
import UserCartWrapper from "./cart-wrapper";
import UserCartItemsContent from "./cart-items-content";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { useLocation, useSearchParams

 } from "react-router-dom";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-xl font-bold hover:scale-115 duration-500 bg-transparent border-none cursor-pointer hover:text-neon"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
    const {cartItems} = useSelector(state => state.shopCart)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect (()=> {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch , user?.id])

  return (
    <div className="flex lg:items-center lg flex-row flex-col gap-4">
      <Sheet open= {openCartSheet} onOpenChange = {()=> setOpenCartSheet(false)}>
        <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon" className = 'border-neon-red'>
          <ShoppingCart className="w-6 h-6 text-neon-red" />
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
        setOpenCartSheet={setOpenCartSheet}
        cartItems = 
        {cartItems &&  cartItems.items && cartItems.items.length > 0 
          ? cartItems.items 
          : []
        }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="shadow-2xl shadow-[0_0_8px_hsl(var(--primary))]"
        >
          <Avatar className="bg-black cursor-pointer hover:scale-105 border-neon ">
            <AvatarFallback className="bg-black text-foreground font-extrabold">
              {user?.userName?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white text-black border-neon">
          <DropdownMenuLabel className="font-extrabold text-lg ">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="h-px border-2 border-black" />
          <DropdownMenuItem
            className="cursor-pointer hover:scale-105 duration-200"
            onClick={() => navigate("/shop/account")}
          >
            <UserCog className="mr-2 h-6 w-6 stroke-[3] " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-px " />
          <DropdownMenuItem
            className="cursor-pointer hover:scale-105  hover:text-neon-red transition-transform duration-200"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-6 w-6 stroke-[3]  " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="border-neon">
          <Link to="/shop/home" className="flex items-center gap-2 mr-2 ">
            <HousePlug className="h-9 w-9 stroke-2 text-white  bg-black " />
            <span className="text-neon text-2xl font-extrabold ">
              Ecommerce
            </span>
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-black/85 backdrop-blur-md border-neon">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
