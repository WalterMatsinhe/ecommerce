import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/auth-slice"

function AdminHeader({setOpen}) {

  const dispatch = useDispatch()

  function handleLogout(){
    dispatch(logoutUser());
  }

  return <header className="w-full flex items-center justify-between px-4 py-3 bg-background border-white border-1">
    <Button onClick = {() => setOpen(true)} className="lg:hidden sm:block bg-primary">
      <AlignJustify/>
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button onClick={(handleLogout)}  variant="ghost" className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium hover:shadow-md hover:scale-103 shadow-red-600 text-white bg-black border-2 border-white">
        <LogOut/>
        Logout
      </Button>
    </div>
  </header>
}

export default AdminHeader;