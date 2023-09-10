export function sortAddons(addons, filter) {
    if (filter === "top-downloads") {
      return addons.slice().sort((a, b) => b.downloads - a.downloads);
    } else if (filter === "top-related") {
      return addons.slice().sort((a, b) => b.rating - a.rating);
    } else if (filter === "new-addons") {
      return addons.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    } else if (filter === 'featured') {
      return addons.slice().filter((addon) => addon.featured === true);
    }
  
    return addons;
  }
  export function filterAddons(addons, searchSelectedIDE, filter, searchQuery) {
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

  export function filterAddonsByPaymentStatus(addons, currentFilter) {
    if (currentFilter === "paid") {
      return addons.filter((addon) => addon.isFree === false);
    } else if (currentFilter === "free") {
      return addons.filter((addon) => addon.isFree === true);
    } else {
      return addons;
    }
  }