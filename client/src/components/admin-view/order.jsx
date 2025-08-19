import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useState } from "react";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-left">
              <TableCell>55555</TableCell>
              <TableCell>17/08/2025</TableCell>
              <TableCell>In process</TableCell>
              <TableCell>10000</TableCell>
              <TableCell>
                <Dialog open = {openDetailsDialog} onOpenChange={setOpenDetailsDialog} >
                  <Button onClick={() => setOpenDetailsDialog(true)} className=" border-2 border-black  -mr-16 ">
                    View Details
                  </Button>
                  <AdminOrderDetailsView/>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
