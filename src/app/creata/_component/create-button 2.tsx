import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PackagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClockLoader } from "react-spinners";

// 1) turn your Button into a motion component
const MotionButton = motion.create(Button);

// 2) define a shared variants object
const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};
const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.2 },
  tap: { scale: 0.8 },
};

export function CreateButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/creata/new?mode=metadata");
    }, 100);
  };

  return (
    <MotionButton
      className="p-4 mb-8"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
    >
      {/* child motion.div will inherit the same variant */}
      <motion.div variants={iconVariants} className="relative">
        {isLoading ? (
          <ClockLoader color={"white"} size={18} />
        ) : (
          <PackagePlus className="w-4 h-4" />
        )}
      </motion.div>
      <span>Create</span>
    </MotionButton>
  );
}
