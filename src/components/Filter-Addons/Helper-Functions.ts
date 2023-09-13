import { Addon } from "../../context/AddonsContext";
export function sortAddons(addons: Addon[], filter: string) {
    if (filter === "top-downloads") {
      return addons.slice().sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (filter === "top-rated") {
      return addons.slice().sort((a, b) => b.rating - a.rating);
    } else if (filter === "new-addons") {
      return addons.slice().sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
    } else if (filter === 'featured') {
      return addons.slice().filter((addon) => addon.featured === true);
    }
  
    return addons;
  }
  export function filterAddons(addons: Addon[], searchSelectedIDE: string, filter: string, searchQuery: string) {
    let filtered = addons;
  
    if (searchSelectedIDE && searchSelectedIDE !== 'All platforms') {
      filtered = filtered.filter((addon) => addon.targetIDE === searchSelectedIDE);
    }
  
    if (filter === "search") {
      filtered = filtered.filter((addon) =>
        addon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    return filtered;
  }

  export function filterAddonsByPaymentStatus(addons: Addon[], currentFilter: string) {
    if (currentFilter === "paid") {
      return addons.filter((addon) => addon.isFree === false);
    } else if (currentFilter === "free") {
      return addons.filter((addon) => addon.isFree === true);
    } else {
      return addons;
    }
  }