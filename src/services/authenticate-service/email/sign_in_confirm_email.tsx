import * as React from "react";

interface EmailTemplateProps {
  // firstName: string;
  confirmLink: string;
}

export const EmailConfirmTemplate: React.FC<EmailTemplateProps> = ({
  confirmLink,
}) => (
  <div>
    <p>
      Click <a href={`${confirmLink}`}>here</a> to confirm email
    </p>
  </div>
);
export default EmailConfirmTemplate;
