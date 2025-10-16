import * as React from "react";

interface EmailTemplateProps {
  // firstName?: string;
  confirmLink: string;
}

export const EmailConfirmTemplate: React.FC<EmailTemplateProps> = ({
  confirmLink,
}) => {
  const containerStyle: React.CSSProperties = {
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111827",
    padding: 24,
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
    backgroundColor: "#10b981",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: 6,
    textDecoration: "none",
    fontWeight: 600,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ margin: 0, marginBottom: 8 }}>Confirm your email</h2>
        <p style={{ marginTop: 0, marginBottom: 16, lineHeight: 1.4 }}>
          Please confirm your email address so you can complete account
          registration and access all features.
        </p>

        <a href={confirmLink} style={buttonStyle}>
          Confirm email
        </a>

        <p style={{ marginTop: 18, fontSize: 12, color: "#6b7280" }}>
          If you didn&apos;t create an account with us, you can safely ignore
          this email.
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmTemplate;
