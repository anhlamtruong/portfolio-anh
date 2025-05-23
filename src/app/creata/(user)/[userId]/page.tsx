export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ usedId: string }>;
}) {
  const { usedId } = await params;

  return (
    <>
      <div>{usedId}</div>
    </>
  );
}
