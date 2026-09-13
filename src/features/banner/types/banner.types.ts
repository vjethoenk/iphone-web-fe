export type BannerStatus = "ACTIVE" | "INACTIVE";

export interface Banner {
  id?: string;
  title: string;
  imageUrl: string;
  displayOrder: number;
  status: BannerStatus;
  createdAt?: string;
  updatedAt?: string;
}