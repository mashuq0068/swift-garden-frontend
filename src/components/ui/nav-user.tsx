"use client"

import {

  ChevronsUpDown,

  LogOut,

  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"


export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  // const { isMobile } = useSidebar()

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage
            src={
              "https://tse1.mm.bing.net/th?id=OIP.kdMwybQdHDRFYF5Avk1DIQHaHa&pid=Api&P=0&h=220"
            }
            alt={"Code Prophet"}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="hidden lg:flex flex-col text-left text-sm">
          <span className="truncate font-semibold">Swift Garden</span>
          <span className="truncate text-xs">swift@gmail.com</span>
        </div>
        <ChevronsUpDown className="ml-auto size-4 hidden lg:block" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="w-56 rounded-lg"
      side="bottom"
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex justify-center items-center gap-2 px-3 py-2 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={
                "https://tse1.mm.bing.net/th?id=OIP.kdMwybQdHDRFYF5Avk1DIQHaHa&pid=Api&P=0&h=220"
              }
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User />
          <Link href="/view-profile">See Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      {/* <DropdownMenuItem>
        <LuUserCheck />
        <Link to="/create-user">Create User</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator /> */}
      <DropdownMenuItem>
        <LogOut />
        <Link href="/">Log out</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
