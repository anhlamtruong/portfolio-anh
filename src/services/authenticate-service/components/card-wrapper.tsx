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
    <div className="relative w-screen h-screen">
      <Card
        style={{ width: "45%" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md"
      >
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
