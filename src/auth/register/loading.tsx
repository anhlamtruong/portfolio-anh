import { CardWrapper } from "@/services/authenticate-service/components/card-wrapper";
import { Skeleton } from "@/services/authenticate-service/components/ui/skeleton";

const LoadingPage = () => {
  return (
    <CardWrapper
      headerLabel="Loading..."
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </CardWrapper>
  );
};

export default LoadingPage;
