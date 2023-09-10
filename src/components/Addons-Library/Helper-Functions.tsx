export function truncateText(text: string | undefined | null, maxLength: number) {
  if (!text) {
    return '';
  }

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
  }

  export function sortAddons(addons, NUM_CARDS_IN_HOMEPAGE) {
    if (addons.length > 0) {
      const sortedAddonsByDownload = addons
        .slice()
        .sort((a, b) => b.downloads - a.downloads);
      const topDownloads = sortedAddonsByDownload.slice(0, NUM_CARDS_IN_HOMEPAGE);
  
      const sortedAddonsByRating = addons
        .slice()
        .sort((a, b) => b.rating - a.rating);
      const topRatings = sortedAddonsByRating.slice(0, NUM_CARDS_IN_HOMEPAGE);
  
      const sortedByDate = addons
        .slice()
        .sort(
          (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
        );
      const topNewAddons = sortedByDate.slice(0, NUM_CARDS_IN_HOMEPAGE);
  
      const featuredAddons = addons
        .slice()
        .filter((addon) => addon.featured === true)
        .slice(0, NUM_CARDS_IN_HOMEPAGE);
  
      return { topDownloads, topRatings, topNewAddons, featuredAddons };
    } else {
      return { topDownloads: [], topRatings: [], topNewAddons: [], featuredAddons: [] };
    }
  }

export function filterAddons(addons, selectedIDE, searchSelectedIDE) {
  const filteredAddons = [];

  if (selectedIDE !== 'All platforms' && selectedIDE) {
    const filteredBySelectedIDE = addons.filter((addon) => addon.targetIDE === selectedIDE);
    filteredAddons.push(...filteredBySelectedIDE);
  }

  if (searchSelectedIDE !== 'All platforms' && searchSelectedIDE) {
    const filteredBySearchSelectedIDE = addons.filter((addon) => addon.targetIDE === searchSelectedIDE);
    filteredAddons.push(...filteredBySearchSelectedIDE);
  }

  return filteredAddons;
}
