import { getQueryClient, trpc } from "@/app/creata/_trpc/server";
import ComponentCanva from "../../_component/component-canva";
import ComponentsRegistry from "@/app/creata/_utils/components-registry";
import NavigationBar from "@/app/creata/_component/navigation-bar";

export default async function Repo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: id } = await params;

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
  console.log("Component lookup key:", metadata.key);
  console.log("Components Mapping keys:", Object.keys(ComponentsRegistry));
  const Component = ComponentsRegistry[metadata.key];
  if (!Component) {
    return <div>Component for key {metadata.key} not found in mapping</div>;
  }
  const { propsSchema, config } = metadata;
  const componentProps = {
    ...propsSchema,
    ...config,
  };
  const componentTitle = (
    <h1 className="text-xl md:text-xl font-bold text-center md:text-left">
      {metadata.name}
    </h1>
  );
  return (
    <>
      <NavigationBar childrenLeft={componentTitle} />
      <Component {...componentProps} />
    </>
  );
}
