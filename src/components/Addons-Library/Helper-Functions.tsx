export default function truncateText(text: string | undefined | null, limit: number) {
    if (!text) {
      return '';
    }

    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  }