function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function createColor(str) {
  const theme = [195, 350, 255, 35, 145, 210, 10, 280];
  const saturation = [70, 75, 68, 78, 65, 72, 76, 68];
  const lightness = [74, 73, 72, 74, 75, 73, 74, 73];

  const hash = hashString(str);

  const i = hash % theme.length;
  const s = saturation[i] + (hash % 6);
  const l = lightness[i] + ((hash >> 3) % 5);

  return `hsl(${theme[i]}, ${s}%, ${l}%)`;
}