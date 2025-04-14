import { useQuery } from "@tanstack/react-query";
import { getLogosFromStorage } from "../actions/get-logos-storage";

export const useCompaniesLogos = () => {
  return useQuery({
    queryKey: ["companies-logos"],
    queryFn: () => getLogosFromStorage(),
  });
};
