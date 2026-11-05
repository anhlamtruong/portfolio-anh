// The theme editor reads ?theme= and local state; keep it dynamic.
export const dynamic = "force-dynamic";

export default function ThemeEditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
