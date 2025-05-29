import HomeIconComponent from "../(slug)/_component/home-icon";

import Logo from "./logo";
import { cn } from "@/lib/utils";
import UserAvatar from "../(user)/[userId]/_component/user-avatar";

interface NavigationBarProps {
  className?: string;
  childrenRight?: React.ReactNode;
  childrenLeft?: React.ReactNode;
  childrenMiddle?: React.ReactNode;
}

const NavigationBar = ({
  className,
  childrenRight,
  childrenLeft,
  childrenMiddle,
}: NavigationBarProps) => {
  return (
    <div
      className={cn(
        className,
        "flex md:justify-between justify-around items-center top-0 left-0 transform md:-translate-y-full group-hover:translate-y-0 duration-500 group-hover:opacity-100 md:pointer-events-auto pointer-events-none absolute z-50 text-white p-4 w-full bg-black bg-opacity-50 md:opacity-0 hover:opacity-100 transition-all "
      )}
    >
      <div className="flex items-center gap-2">
        <Logo className="invert" />
        {childrenLeft}
      </div>
      {childrenMiddle}
      <div className="mr-4 flex items-center justify-center md:justify-end gap-6">
        {childrenRight}
        <HomeIconComponent />
        <UserAvatar />
      </div>
    </div>
  );
};

export default NavigationBar;
