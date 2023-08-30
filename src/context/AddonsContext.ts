import { createContext } from "react";

export interface Addon {
  name: string;
  ratings?: string[];
  targetIDE: string;
  userUid: string;
  description: string;
  tags: string[];
  downloadLink: string;
  originLink: string;
  isFeatured?: boolean;
  downloadsCount?: number;
  uploadDate: Date;
  draftCreateDate?: Date;
  addonId: string;
  status: string;
  ownerUid: string;
  maintainers?: string[];
  company?: string;
  images?: string[];
  logo?: string;
  versions: string[];
}

export interface AddonsContextType {
  allAddons: Addon[];
  setAllAddons: () => void;
}

/**
 * The AddonsContext provides a context for managing post data.
 *
 * This context includes an array of all addons and a function to set the addons data.
 *
 * @type {AddonsContextType}
 * @property {Array} allAddons - An array containing all the post data.
 * @property {function} setAllAddons - A function to set the post data in the context.
 *
 * @see {@link https://reactjs.org/docs/context.html | React Context}
 *
 * @example
 * import { createContext, useContext } from "react";
 *
 * const AddonsContext = createContext({
 *   allAddons: [],
 *   setAllAddons: () => [],
 * });
 *
 * export default AddonsContext;
 *
 * // In a component, you can use the AddonsContext like this:
 * const { allAddons, setAllAddons } = useContext(AddonsContext);
 */
export const AddonsContext = createContext<AddonsContextType>({
  allAddons: [],
  setAllAddons: () => [],
});
