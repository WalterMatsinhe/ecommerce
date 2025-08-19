import React from "react";
import accountImage from "@/assets/AccountBg.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { FlipText} from "@/components/magicui/flip-text";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      
      <FlipText className="font-extrabold font-mono text-8xl mt-6  text-white mb-6">
        Account
      </FlipText>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 border-neon">
        <div className="flex flex-col rounded-lg  bg-black p-6 shadow-sm">
          <Tabs defaultValue = 'orders'>
            <TabsList>
              <TabsTrigger value = 'orders' className="bg-primary-foreground border-2 shadow-md shadow-emerald-400  text-white ">Orders</TabsTrigger>
              <TabsTrigger value = 'address' className="bg-primary-foreground border-2 shadow-md shadow-emerald-400  text-white  ml-3">Address</TabsTrigger>
            </TabsList>
            <TabsContent value = 'orders'>
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value='address'>
              <Address/> 
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
