// Homepage types for Creata
import { RouterOutputs } from "./trpc";

export type HomePageGetLogosOutput =
  RouterOutputs["creata"]["getComponentsMetaData"];
export type HomePageGetLogosOutputById =
  RouterOutputs["creata"]["getComponentMetaDataById"];
