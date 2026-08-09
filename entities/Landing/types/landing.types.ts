export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface LandingFilterOption {
  value: number;
  label: string;
  hotelCount: number;
}

export interface LandingAmenityOption extends LandingFilterOption {
  description: string | null;
}

export interface LandingFilters {
  destinations: LandingFilterOption[];
  amenities: LandingAmenityOption[];
  stars: LandingFilterOption[];
  capacities: number[];
  priceRange: {
    min: number;
    max: number;
    currency: "TOMAN";
  };
  metroAccess: Array<{ value: "YES" | "NO"; label: string }>;
  sortOptions: Array<{ value: HotelSort; label: string }>;
}

export type HotelSort =
  | "recommended"
  | "price_asc"
  | "price_desc"
  | "stars_desc"
  | "newest"
  | "name_asc";

export interface HotelSearchParams {
  destination?: string;
  provinceId?: number;
  stars?: number[];
  amenityIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  metroAccess?: "YES" | "NO";
  checkIn?: string;
  checkOut?: string;
  sort?: HotelSort;
  page?: number;
  limit?: number;
}

export interface LandingRoom {
  id: number;
  name: string;
  slug: string;
  capacity: number;
  price: number;
  status: "EMPTY" | "RESERVED" | "MAINTAIN";
}

export interface LandingHotel {
  id: number;
  name: string;
  slug: string;
  cover: string | null;
  stars: number;
  city: number;
  province: { id: number; name: string } | null;
  address: string;
  description: string | null;
  metroAccess: "YES" | "NO";
  geometry: { type: "Point"; coordinates: [number, number] } | null;
  startingPrice: number | null;
  matchingRoomCount: number;
  rooms: LandingRoom[];
  amenities: Array<{
    id: number;
    title: string;
    description: string | null;
  }>;
  images: Array<{
    id: number;
    url: string;
    order: number;
    isCover: boolean;
  }>;
}

export interface HotelSearchResult {
  hotels: LandingHotel[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  activeFilters: HotelSearchParams;
}
