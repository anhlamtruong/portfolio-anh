// Auth pages read the session and URL params on every request, so they stay
// dynamic (as they were when the root layout called auth()).
export const dynamic = "force-dynamic";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AuthLayout;
