import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";


function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress,setCurrentSelectedAddress}) {
  return (
    <Card onClick = {setCurrentSelectedAddress? () => setCurrentSelectedAddress(addressInfo) : null}>
      <CardContent className="grid gap-2 p-4 bg-white text-black rounded-md border-2 border-white">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-4" >
          <Button onClick={() => handleEditAddress(addressInfo)} className="border-2 border-black">Edit</Button>
          <Button onClick={() => handleDeleteAddress(addressInfo)} className="border-neon-red text-white hover:scale-105" >Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
