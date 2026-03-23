export interface Room {
  name: string;
  slug: string;
  capacity: number;
  status: "RESERVED" | "MAINTAIN" | "EMPTY";
  price: number;
  bookType: "DAILY" | "WEEKLY" | "MONTHLY";
  bathService: number;
  balcony: number;
  geoDirection: "NORTH" | "SOUTH" | "EAST" | "WEST";
  kitchen: "YES" | "NO";
  description: string;
}
