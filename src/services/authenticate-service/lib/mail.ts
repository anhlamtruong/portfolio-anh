import EmailResetPasswordTemplate from "../components/email/reset_password_email";
import { EmailConfirmTemplate } from "../components/email/sign_in_confirm_email";
import EmailTwoFactorTemplate from "../components/email/two_factor_email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  console.log("Sending Two Factor email");
  await resend.emails.send({
    from: "anhlamtruong1012@resend.dev",
    to: [email],
    subject: "2FA Code",
    react: EmailTwoFactorTemplate({ token }) as React.ReactElement,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  console.log("Sending verification email");
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "anhlamtruong1012@resend.dev",
    to: [email],
    subject: "Confirm your email",
    react: EmailConfirmTemplate({ confirmLink }) as React.ReactElement,
  });
};
export const sendResetPasswordEmail = async (email: string, token: string) => {
  console.log("Sending reset password email");
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "anhlamtruong1012@resend.dev",
    to: [email],
    subject: "Reset your password email.",
    react: EmailResetPasswordTemplate({
      resetPasswordLink: resetLink,
    }) as React.ReactElement,
  });
};
