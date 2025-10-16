import * as React from "react";

interface EmailTemplateProps {
  // firstName?: string;
  token: string;
}

export const EmailTwoFactorTemplate: React.FC<EmailTemplateProps> = ({
  token,
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
    textAlign: "center",
  };
  const codeStyle: React.CSSProperties = {
    display: "inline-block",
    fontSize: 22,
    letterSpacing: 2,
    padding: "10px 18px",
    background: "#f3f4f6",
    borderRadius: 6,
    fontWeight: 700,
    marginTop: 12,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ margin: 0 }}>Your verification code</h2>
        <p style={{ marginTop: 8, marginBottom: 12 }}>
          Use the code below to complete sign in. This code will expire in 10
          minutes.
        </p>

        <div style={codeStyle}>{token}</div>

        <p style={{ marginTop: 18, fontSize: 12, color: "#6b7280" }}>
          Didn&apos;t request this? If you think someone else is trying to
          access your account, please contact support.
        </p>
      </div>
    </div>
  );
};

export default EmailTwoFactorTemplate;
