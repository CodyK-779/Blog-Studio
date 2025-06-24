import SignoutButton from "./SignoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Props {
  userImg: string;
}

const ProfileDropdown = ({ userImg }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer size-8">
          <AvatarImage src={userImg ?? "../public/avatar.png"} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
