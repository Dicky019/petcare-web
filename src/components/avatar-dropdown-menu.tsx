import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AvatarDropdownMenu() {
  const { data: session } = useSession({
    required: true,
  });

  // const image = () =>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={session?.user.image ? session.user.image : "./bg.png"}
            alt={session?.user.name ? session.user.name : "@shadcn"}
          />
          <AvatarFallback>DD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user.name && (
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <div className="font-normal">Name</div>
              <div>{session?.user.name}</div>
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        {session?.user.email && (
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <div className="font-normal">Email</div>
              <div>{session?.user.email}</div>
            </div>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
