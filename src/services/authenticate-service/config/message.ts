export const MESSAGES = {
  actions: {
    admin: {
      success: "Admin Allowed Server Action!",
      error: "Forbidden Server Action!",
    },
    login: {
      success: "Login successful!",
      success_email_sent: "Confirmation email sent!",
      error: "Something went wrong :(",
      error_invalid_code: "Invalid code!",
      error_wrong_code: "Not the right code ╰（‵□′）╯",
      error_code_expired: "Code Expired (っ °Д °;)っ",
      error_invalid_credential: "Invalid credential or email!",
      error_invalid_fields: "Invalid fields!",
      error_email_not_exist: "Email does not exist!",
      twoFactorRequired: "Two-factor authentication required.",
    },
    logout: {
      success: "Logout successful!",
    },
    register: {
      success: "User created successfully! Confirmation email sent!",
      error: "Something went wrong with register!",
      error_invalid_fields: "Invalid fields!",
      error_database: "Something wrong with our database :(",
      error_email_taken: "Email already taken.",
    },
    reset_password: {
      success: "Password reset email sent!",
      error: "Failed to send password reset email.",
      invalidToken: "Invalid reset token.",
      error_invalid_fields: "Invalid Emails",
      error_email_not_found: "Email not found!",
    },
    newPassword: {
      success: "Password reset successful!",
      error: "Failed to reset password.",
    },
    verification: {
      success: "Email verified!",
      error: "Failed to verify email.",
      invalidToken: "Invalid verification token.",
      alreadyVerified: "Email already verified.",
    },
    settings: {
      success: "Settings updated successfully!",
      error: "Failed to update settings.",
      error_unauthorized: "Unauthorized",
      error_email_taken: "Email already in use!",
      error_incorrect_password: "Incorrect password!",
    },
  },
  modals: {
    alert: {
      title: "Are you sure?",
      message: "This action can not be undone.",
      confirm: "Continue",
      cancel: "Cancel",
    },
  },
  ui: {
    error_card_header: "Oops! Something went wrong!",
    back_to_login: "Back to login",
    footer_label: "Powered by Sassy Authy",

    // Login form
    login_header: "Welcome back",
    login_back_to_register: "Don't have an account?",
    login_two_factor_label: "Two Factor Code",
    login_two_factor_placeholder: "123456",
    email_label: "Email",
    email_placeholder: "sassy-authy@example.com",
    password_label: "Password",
    password_placeholder: "********",
    forgot_password: "Forgot password?",
    oauth_account_not_linked: "Email already in use with different provider!",
    login_button: "Login",
    confirm_button: "Confirm",
    go_to_mailbox: "Go to your mail box:",
    mailbox_here: "here",

    // Register form
    register_header: "Create an account",
    register_back_to_login: "Already have an account? ",
    name_label: "Name",
    name_placeholder: "Sassy Authy",
    register_button: "Create an account",

    // Reset form
    reset_header: "Forgot your password?",
    reset_back_to_login: "Back to Login",
    reset_button: "Send reset email",

    // New password form
    new_password_header: "Enter a new password",
    new_password_back_to_login: "Back to Login",
    new_password_placeholder: "your new password",

    // Verification
    verification_header: "Confirm your verification",
    verification_back_to_login: "Back to Login",
    verifying_token: "Verifying your Token",

    // Role gate
    no_permission: "You do not have permission to view this content!",
    go_back: "GO BACK",

    // User button/drawer
    user_settings_title: "User Setting",
    user_settings_description: "This is your account setting model.",
    close_button: "Close",

    // General
    unknown_error: "An unknown error occurred.",
  },

  data: {
    // Account data
    account_not_found: "Account not found.",

    // Password reset token data
    password_reset_token_not_found: "Password reset token not found.",
    password_reset_token_error: "Error fetching password reset token.",

    // Two factor token data
    two_factor_token_not_found: "Two factor token not found.",
    two_factor_token_error: "Error fetching two factor token.",

    // Two factor confirmation data
    two_factor_confirmation_not_found: "Two factor confirmation not found.",
    two_factor_confirmation_error: "Error fetching two factor confirmation.",

    // Verification token data
    verification_token_not_found: "Verification token not found.",
    verification_token_error: "Error fetching verification token.",

    // User data
    user_not_found: "User not found.",
    user_error: "Error fetching user.",
  },

  email: {
    two_factor_subject: "Your Two-Factor Authentication Code",
    two_factor_body: "This is your 2FA Code:",
    reset_password_subject: "Reset Your Password",
    reset_password_body: "Click here to reset your password",
    sign_in_confirm_subject: "Confirm Your Email",
    sign_in_confirm_body: "Click here to confirm email",
  },

  // Add more categories as needed (e.g., twoFactor, profile, etc.)
};
