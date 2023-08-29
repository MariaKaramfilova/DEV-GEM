export const handleCopyDetails = async (downloadLink) => {
    const detailsToCopy = downloadLink;
    
    try {
      await navigator.clipboard.writeText(detailsToCopy);
      console.log("Addon details copied to clipboard");
    } catch (error) {
      console.error("Error copying addon details:", error);
    }
  };