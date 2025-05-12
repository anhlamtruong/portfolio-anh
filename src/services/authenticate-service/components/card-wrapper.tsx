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
    <>
      <Card className="w-96 h-auto shadow-md">
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
    </>
  );
};
