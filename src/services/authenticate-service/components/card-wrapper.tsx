"use client";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { BackButton } from "./back_button";
import { Footer } from "./footer";
import { Header } from "./header";
import { Social } from "./social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-3/4 shadow-md">
        <CardHeader>
          <Header label={headerLabel}></Header>
        </CardHeader>
        <CardContent>{children}</CardContent>

        <CardFooter className="flex flex-col gap-2">
          {showSocial && <Social></Social>}
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          ></BackButton>
          <Footer label={""}></Footer>
        </CardFooter>
      </Card>
    </div>
  );
};
