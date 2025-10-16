import * as React from "react";

interface EmailTemplateProps {
  // firstName?: string;
  resetPasswordLink: string;
}

// Simple, email-friendly reset password template using inline styles so it renders
// well across common email clients. Keep markup minimal and avoid external CSS.
export const EmailResetPasswordTemplate: React.FC<EmailTemplateProps> = ({
  resetPasswordLink,
}) => {
  const containerStyle: React.CSSProperties = {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111827",
    padding: "24px",
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    maxWidth: 600,
    margin: "0 auto",
  };
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    padding: 20,
    borderRadius: 6,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };
  const buttonStyle: React.CSSProperties = {
    display: "inline-block",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 600,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Reset your password</h2>
        <p style={{ marginTop: 0, marginBottom: 16, lineHeight: 1.4 }}>
          We received a request to reset the password for your account. Click
          the button below to set a new password. If you didn&apos;t request
          this, you can safely ignore this email.
        </p>

        <a href={resetPasswordLink} style={buttonStyle}>
          Reset password
        </a>

        <p style={{ marginTop: 18, fontSize: 12, color: "#6b7280" }}>
          If the button doesn&apos;t work, copy and paste this link into your
          browser:
          <br />
          <a href={resetPasswordLink} style={{ color: "#2563eb" }}>
            {resetPasswordLink}
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmailResetPasswordTemplate;
