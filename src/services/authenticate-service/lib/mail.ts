import { getSecrets } from "@/services/secrets-management/secrets-fetching";
import EmailResetPasswordTemplate from "../components/email/reset_password_email";
import { EmailConfirmTemplate } from "../components/email/sign_in_confirm_email";
import EmailTwoFactorTemplate from "../components/email/two_factor_email";
import { Resend } from "resend";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const emailFrom = process.env.RESEND_EMAIL_ID ?? "anhlamtruong1012@resend.dev";

const getResendClient = async () => {
  const secrets = await getSecrets();
  const RESEND_API_KEY = secrets.resendApiKey ? secrets.resendApiKey : "";
  return new Resend(RESEND_API_KEY);
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  console.log("Sending Two Factor email");
  const resend = await getResendClient();
  await resend.emails.send({
    from: emailFrom,
    to: [email],
    subject: "2FA Code",
    react: EmailTwoFactorTemplate({ token }) as React.ReactElement,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  console.log("Sending verification email");
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const resend = await getResendClient();

  await resend.emails.send({
    from: emailFrom,
    to: [email],
    subject: "Confirm your email",
    react: EmailConfirmTemplate({ confirmLink }) as React.ReactElement,
  });
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  console.log("Sending reset password email");
  const resend = await getResendClient();

  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: emailFrom,
    to: [email],
    subject: "Reset your password email.",
    react: EmailResetPasswordTemplate({
      resetPasswordLink: resetLink,
    }) as React.ReactElement,
  });
};
