import * as React from "react";
import { BarLoader } from "react-spinners";

interface EmailTemplateProps {
  // firstName: string;
  token: string;
}

export const EmailTwoFactorTemplate: React.FC<EmailTemplateProps> = ({
  token,
}) => (
  <div className=" flex flex-col gap-4">
    <BarLoader></BarLoader>
    <p>{`This is your 2FA Code: ${token}`}</p>
  </div>
);
export default EmailTwoFactorTemplate;
