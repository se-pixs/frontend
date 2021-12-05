export function getFormatOfImage(image: Blob): string {
  return image.type.split('/')[1];
}
