import { FirebaseCreataClient } from "../../_service/firebaseCreataClient";
import ComponentsRegistry from "../../_utils/components-registry";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const firebaseClient = new FirebaseCreataClient();
  const components = await firebaseClient.getAllComponentConfigs();

  return components
    ? components.map((comp) => ({ slug: String(comp.id) }))
    : [];
}

export default async function Repo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const id = (await params).slug;
  const firebaseClient = new FirebaseCreataClient();
  const metadata = await firebaseClient.getComponentConfigBySlug(id);

  if (!metadata) {
    return <div>Component not found</div>;
  }
  console.log("Component lookup key:", metadata.props.link);
  console.log("Components Mapping keys:", Object.keys(ComponentsRegistry));
  const Component =
    ComponentsRegistry[
      metadata.key ?? metadata.slug ?? metadata.props.link ?? ""
    ];
  if (!Component) {
    return (
      <div>Component for key {metadata.props.link} not found in mapping</div>
    );
  }
  const { props } = metadata;

  return (
    <div className="relative">
      <h1 className="text-xl font-bold">{metadata.name}</h1>
      <Component {...props} />
    </div>
  );
}
