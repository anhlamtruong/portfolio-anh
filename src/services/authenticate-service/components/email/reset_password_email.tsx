import * as React from "react";
import { BarLoader } from "react-spinners";

interface EmailTemplateProps {
  // firstName: string;
  resetPasswordLink: string;
}

export const EmailResetPasswordTemplate: React.FC<EmailTemplateProps> = ({
  resetPasswordLink,
}) => (
  <div className=" flex flex-col gap-4">
    <BarLoader></BarLoader>
    <p>
      Click <a href={`${resetPasswordLink}`}>here</a> to reset your password
    </p>
  </div>
);
export default EmailResetPasswordTemplate;
