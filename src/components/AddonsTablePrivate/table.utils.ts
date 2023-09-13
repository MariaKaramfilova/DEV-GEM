import { useContext, useEffect, useState } from "react";
import { Addon, AddonsContext } from "../../context/AddonsContext.ts";
import { AuthContext } from "../../context/AuthContext.ts";
import { ADMIN, DESC } from "../../common/common.ts";
import _ from "lodash";

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

export function getComparator<Key extends keyof Addon>(
  order: Order,
  orderBy: Key,
) {
  return order === DESC
    ? (a: Addon, b: Addon) => descendingComparator(a, b, orderBy)
    : (a: Addon, b: Addon) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: Addon[], comparator: (a: Addon, b: Addon) => number): Addon[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [Addon, number]);
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
  const { allAddons } = useContext(AddonsContext);
  const { loggedInUser } = useContext(AuthContext);
  const userAddons = loggedInUser?.role === ADMIN
    ? allAddons
    : allAddons.filter(addon => addon.userUid === loggedInUser?.uid
      || (addon.contributors && loggedInUser && Object.values(addon?.contributors).includes(loggedInUser.uid)));

  const [filteredAddons, setFilteredAddons] = useState(
    loggedInUser?.role === ADMIN
      ? allAddons
      : allAddons.filter(addon => addon.userUid === loggedInUser?.uid));

  const [valueTargetIDE, setValueTargetIDE] = useState('All');
  const [valueSearch, setValueSearch] = useState('');
  const [valueTag, setValueTag] = useState('All');
  const [valueStatus, setValueStatus] = useState('All');

  const targetIDEs = ["All", ...userAddons.map(el => el.targetIDE)
    .filter((el, index, arr) => arr.indexOf(el) === index)];

  const tags = ["All", ...userAddons
    .flatMap((addon) => Object.keys(addon.tags))
    .filter((el, index, arr) => arr.indexOf(el) === index)];
    
  useEffect(() => {
    setFilteredAddons(prev => allAddons.filter(el => prev.some(item => item.addonId === el.addonId)));
  }, [allAddons])

  useEffect(() => {
    (function () {
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

      if (!_.isEqual(updatedAddonList, filteredAddons)) {
        setFilteredAddons([...updatedAddonList]);
      }
    })();
  }, [valueSearch, valueStatus, valueTag, valueTargetIDE, userAddons])



  return {
    filteredAddons,
    targetIDEs,
    tags,
    setValueSearch,
    setValueStatus,
    setValueTag,
    setValueTargetIDE,
    setFilteredAddons
  }
}