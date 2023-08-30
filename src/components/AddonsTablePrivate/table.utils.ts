import { useContext, useEffect, useState } from "react";
import { AddonsContext } from "../../context/AddonsContext.ts";
import { AuthContext } from "../../context/AuthContext.ts";

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const useFilters = () => {
  const { allAddons, setAllAddons } = useContext(AddonsContext);
  const { loggedInUser } = useContext(AuthContext);
  const [userAddons, setUserAddons] = useState(allAddons.filter(addon => addon.userUid === loggedInUser.uid));
  const [filteredAddons, setFilteredAddons] = useState(allAddons.filter(addon => addon.userUid === loggedInUser.uid));
  const [valueTargetIDE, setValueTargetIDE] = useState('All');
  const [valueSearch, setValueSearch] = useState('');
  const [valueTag, setValueTag] = useState('All');
  const [valueStatus, setValueStatus] = useState('All');

  const [targetIDEs, setTargetIDEs] = useState<string[]>(
    ["All", ...userAddons.map(el => el.targetIDE)
      .filter((el, index, arr) => arr.indexOf(el) === index)]);
  const [tags, setTags] = useState<string[]>(
    ["All", ...userAddons
      .reduce((arr, addon) => [...arr, ...Object.keys(addon.tags)], [])
      .filter((el, index, arr) => arr.indexOf(el) === index)]);

      useEffect(() => {
        (function() {
          let updatedAddonList = [...userAddons];
      
          if (valueStatus !== "All") {
            updatedAddonList = updatedAddonList
              .filter(el => el["status"].toLowerCase() === valueStatus.toLowerCase())
          }
          
          if (valueTargetIDE !== "All") {
            updatedAddonList = updatedAddonList
              .filter(el => el["targetIDE"].toLowerCase() === valueTargetIDE.toLowerCase())
          }
      
          if (valueTag !== "All") {
            updatedAddonList = updatedAddonList
              .filter(el => Object.keys(el["tags"]).includes(valueTag))
          } 
      
          
          if (valueSearch !== "") {
            updatedAddonList = updatedAddonList
              .filter((el) => {
                return el.name
                    .split(" ")
                    .filter((el) =>
                      el.toLowerCase().startsWith(valueSearch.toLowerCase())
                    ).length > 0
              })
          }
      
          setFilteredAddons([...updatedAddonList]);
        })();
      }, [valueSearch, valueStatus, valueTag, valueTargetIDE, userAddons])
  


  return {
    filteredAddons,
    targetIDEs,
    tags,
    setValueSearch,
    setValueStatus,
    setValueTag,
    setValueTargetIDE
  }
}