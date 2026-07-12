const ASSET_CDN = process.env.NEXT_PUBLIC_ASSET_CLOUDFRONT_URL;

export function asset(path: string) {
  
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) {
    console.log("URL = ", `${ASSET_CDN}${path}`)
    return `${ASSET_CDN}${path}`;

  }
  return `${ASSET_CDN}/${path}`;

}