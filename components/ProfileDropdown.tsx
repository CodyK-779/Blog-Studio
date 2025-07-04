import SignoutButton from "./SignoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  userImg: string;
  fallbackAvatar: string | null;
}

const ProfileDropdown = ({ userImg, fallbackAvatar }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-8">
          <AvatarImage src={userImg} />
          <AvatarFallback className="bg-red-500 dark:bg-blue-600 text-white">
            {fallbackAvatar}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center justify-center">
        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
