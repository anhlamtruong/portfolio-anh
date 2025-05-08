import { FirebaseCreataClient } from "../../_service/firebaseCreataClient";
import ComponentsRegistry from "../../_utils/components-registry";
import StepBackIconComponent from "../_component/step-back-icon";
import HomeIconComponent from "../_component/home-icon";

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
    <div className="relative group">
      <div className="flex md:justify-between justify-around items-center top-0 left-0 transform md:-translate-y-full group-hover:translate-y-0 duration-500 group-hover:opacity-100 md:pointer-events-auto pointer-events-none absolute z-50 text-white p-4 w-full bg-black bg-opacity-15 md:opacity-0 hover:opacity-100 transition-all ">
        <h1 className="text-xl md:text-xl font-bold text-center md:text-left">
          {metadata.name}
        </h1>
        <div className="mr-4 flex items-center justify-center md:justify-end gap-6">
          <HomeIconComponent />
          <StepBackIconComponent />
        </div>
      </div>
      <Component {...props} />
    </div>
  );
}
