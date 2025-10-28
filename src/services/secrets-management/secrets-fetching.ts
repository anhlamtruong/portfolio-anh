// lib/secrets.ts
import "server-only";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

// This type now perfectly matches the secrets you have in Secret Manager.
type AppSecrets = {
  // --- Database ---
  databaseUrlAuthenticate?: string;

  // --- Authentication ---
  authSecret?: string;
  googleClientId?: string;
  googleClientSecret?: string;
  githubClientId?: string;
  githubClientSecret?: string;

  // --- Email Service ---
  resendApiKey?: string;

  // --- Firebase ---
  firebaseProjectId?: string;

  // --- Firebase Admin SDK ---
  firebaseClientEmail?: string;
  firebasePrivateKey?: string;

  // --- Firebase Modular SDK ---
  firebaseAPIKey?: string;
  firebaseAuthDomain?: string;
  firebaseStorageBucket?: string;
  firebaseMessagingSenderId?: string;
  firebaseAppId?: string;
};

// Use a simple in-memory cache
let cachedSecrets: AppSecrets | null = null;

const client = new SecretManagerServiceClient();

async function fetchSecret(secretName: string): Promise<string | undefined> {
  const name = `projects/lam-anh-truong-portfolio/secrets/${secretName}/versions/latest`;
  try {
    const [version] = await client.accessSecretVersion({ name });
    const payload = version.payload?.data?.toString();
    return payload?.replace(/\\n/g, "\n");
  } catch (error) {
    console.error(`Failed to fetch secret: ${secretName}`, error);
    return undefined;
  }
}

export async function getSecrets(): Promise<AppSecrets> {
  if (cachedSecrets) {
    return cachedSecrets;
  }

  console.log("Fetching secrets from Google Secret Manager...");

  const [
    authSecret,
    databaseUrlAuthenticate,
    firebaseClientEmail,
    firebasePrivateKey,
    firebaseProjectId,
    firebaseAPIKey,
    firebaseAuthDomain,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
    githubClientId,
    githubClientSecret,
    googleClientId,
    googleClientSecret,
    resendApiKey,
  ] = await Promise.all([
    fetchSecret("AUTH_SECRET"),
    fetchSecret("DATABASE_URL_AUTHENTICATE"),
    fetchSecret("FIREBASE_CLIENT_EMAIL"),
    fetchSecret("FIREBASE_PRIVATE_KEY"),
    fetchSecret("FIREBASE_PROJECT_ID"),
    fetchSecret("FIREBASE_API_KEY"),
    fetchSecret("FIREBASE_AUTH_DOMAIN"),
    fetchSecret("FIREBASE_STORAGE_BUCKET"),
    fetchSecret("FIREBASE_MESSAGING_SENDER_ID"),
    fetchSecret("FIREBASE_APP_ID"),
    fetchSecret("GITHUB_CLIENT_ID"),
    fetchSecret("GITHUB_CLIENT_SECRET"),
    fetchSecret("GOOGLE_CLIENT_ID"),
    fetchSecret("GOOGLE_CLIENT_SECRET"),
    fetchSecret("RESEND_API_KEY"),
  ]);

  cachedSecrets = {
    authSecret,
    databaseUrlAuthenticate,
    firebaseClientEmail,
    firebasePrivateKey,
    firebaseProjectId,
    githubClientId,
    githubClientSecret,
    googleClientId,
    googleClientSecret,
    resendApiKey,
    firebaseAPIKey,
    firebaseAuthDomain,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
  };

  return cachedSecrets;
}
