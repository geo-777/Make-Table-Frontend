function hashString(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }

  return Math.abs(hash);
}

export default function createColor(str) {
  const theme = [210, 250, 280, 160, 30];

  const hash = hashString(str);
  const hue = theme[hash % theme.length];

  const saturation = 65 + (hash % 10);
  const lightness = 74 + ((hash >> 3) % 8);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};