export interface IAsset {
  title?: string;
  description?: string;
  url: string;
  contentType?: string;
  fileName?: string;
}

export interface IImageAsset extends IAsset {
  width?: number;
  height?: number;
  isPortrait?: boolean;
};
