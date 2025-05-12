import { Skeleton } from "@/components/ui/skeleton";
import { CardWrapper } from "@/services/authenticate-service/components/card-wrapper";

const LoadingPage = () => {
  return (
    <CardWrapper
      headerLabel="Loading..."
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
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
