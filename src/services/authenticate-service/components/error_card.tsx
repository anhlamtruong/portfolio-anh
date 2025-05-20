import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { MESSAGES } from "../config/message";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel={MESSAGES.ui.error_card_header}
      backButtonHref="/auth/login"
      backButtonLabel={MESSAGES.ui.back_to_login}
    >
      <div className=" w-full flex justify-center items-center">
        <ExclamationTriangleIcon className=" text-destructive w-20" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
