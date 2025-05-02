export const fetchVideoBlob = async (url: string): Promise<string> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch video: ${url}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};
