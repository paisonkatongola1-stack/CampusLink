import { ROLES, JOB_TYPES, MARKETPLACE_CATEGORIES } from '../utils/constants';

export type UserRole = typeof ROLES[number];

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  university?: string;
  course?: string;
  year?: string;
  skills?: string[];
  bio?: string;
  createdAt: any;
}

export interface AccommodationListing {
  id: string;
  title: string;
  price: string;
  distance: string;
  location: string;
  image: string;
  amenities: string[];
  landlordId: string;
  university: string;
}

export interface JobListing {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: typeof JOB_TYPES[number];
  tags: string[];
  postedAt: any;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: string;
  location: string;
  rating: number;
  category: typeof MARKETPLACE_CATEGORIES[number];
  image: string;
  sellerId: string;
}
