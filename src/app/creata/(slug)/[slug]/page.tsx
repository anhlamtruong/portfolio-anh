import { FirebaseCreataClient } from "../../_service/firebaseCreataClient";
import ComponentsRegistry from "../../_utils/components-registry";

import { getQueryClient, trpc } from "../../_trpc/server";
import ComponentCanva from "../_component/component-canva";
import NavigationBar from "../../_component/navigation-bar";

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

  if (id === "new") {
    return <ComponentCanva />;
  }

  const queryClient = getQueryClient();
  const metadata = await queryClient.fetchQuery(
    trpc.creata.getComponentMetaDataById.queryOptions({ id })
  );

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
  const componentTitle = (
    <h1 className="text-xl md:text-xl font-bold text-center md:text-left">
      {metadata.name}
    </h1>
  );
  return (
    <>
      <NavigationBar childrenLeft={componentTitle} />
      <Component {...props} />
    </>
  );
}
