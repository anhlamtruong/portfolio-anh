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

// Locally the client finds Google credentials on its own (gcloud login or
// GOOGLE_APPLICATION_CREDENTIALS). Vercel has neither, so there the service
// account key comes from the GOOGLE_APPLICATION_CREDENTIALS_JSON env var.
// Returns null when Secret Manager can't be used; secrets then come from
// env vars only.
function createSecretManagerClient(): SecretManagerServiceClient | null {
  const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON?.trim();
  if (!raw) {
    // Without a key, the client on Vercel only fails, after a slow lookup
    // for credentials that aren't there.
    return process.env.VERCEL ? null : new SecretManagerServiceClient();
  }

  try {
    // Accept the key file as plain JSON or as base64-encoded JSON.
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const key = JSON.parse(json);

    return new SecretManagerServiceClient({
      projectId: key.project_id,
      credentials: {
        client_email: key.client_email,
        private_key: key.private_key?.replace(/\\n/g, "\n"),
      },
    });
  } catch (error) {
    console.error(
      "GOOGLE_APPLICATION_CREDENTIALS_JSON is not a valid service account key",
      error
    );
    return null;
  }
}

const client = createSecretManagerClient();

async function fetchSecret(secretName: string): Promise<string | undefined> {
  if (client) {
    const name = `projects/lam-anh-truong-portfolio/secrets/${secretName}/versions/latest`;
    try {
      const [version] = await client.accessSecretVersion({ name });
      const payload = version.payload?.data?.toString();
      if (payload) {
        return payload.replace(/\\n/g, "\n");
      }
    } catch (error) {
      console.error(`Failed to fetch secret: ${secretName}`, error);
    }
  }

  // Fall back to the env var with the same name. Vercel still has the
  // Firebase Admin keys and RESEND_API_KEY set this way.
  return process.env[secretName]?.replace(/\\n/g, "\n");
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
