import * as React from "react";
import { BarLoader } from "react-spinners";
import { MESSAGES } from "../config/message";

interface EmailTemplateProps {
  // firstName: string;
  token: string;
}

export const EmailTwoFactorTemplate: React.FC<EmailTemplateProps> = ({
  token,
}) => (
  <div className=" flex flex-col gap-4">
    <BarLoader></BarLoader>
    <p>{`${MESSAGES.email.two_factor_body} ${token}`}</p>
  </div>
);
export default EmailTwoFactorTemplate;
