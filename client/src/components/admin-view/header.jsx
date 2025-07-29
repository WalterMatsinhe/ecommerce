import { AlignJustify, LogOut } from "lucide-react"
import { Button } from "../ui/button"

function AdminHeader() {

  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button className="lg:hidden sm:block bg-neutral-600">
      <AlignJustify/>
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button className="inline-flex gap-2 items-center rounded-md x-4 py-2 text-sm font-medium shadow bg-neutral-600">
        <LogOut/>
        Logout
      </Button>
    </div>
  </header>
}

export default AdminHeader;