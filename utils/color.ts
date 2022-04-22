import getRelativeLuminance from 'get-relative-luminance';

function hexToRGB(hex: string): { r: number; g: number; b: number } | null {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getRelativeLuminanceFromHex(hex: string): number {
  const rgb = hexToRGB(hex);
  if (rgb) {
    return getRelativeLuminance(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
  }
  return 0;
}

export function getContrastColor(hex: string): string {
  const luminance1 = getRelativeLuminanceFromHex(hex);
  // console.log(luminance1);

  const expectedContrast = 0.3;
  const luminance2 = (luminance1 + 0.05) / expectedContrast - 0.5;

  return getColorForLuminance(luminance2);
}

function getColorForLuminance(luminance: number): string {
  if (luminance > 0.5) {
    return '#000000';
  }
  return '#ffffff';
}
