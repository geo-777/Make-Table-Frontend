function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export default function createColor(str) {
  const theme = [195, 215, 235, 255, 275];
  const saturation = [55, 58, 55, 52, 50];
  const lightness = [60, 58, 62, 64, 62];

  const hash = hashString(str);

  const i = hash % theme.length;
  const s = saturation[i] + (hash % 8);
  const l = lightness[i] + ((hash >> 3) % 10);
  
  return `hsl(${theme[i]}, ${s}%, ${l}%)`;
}
