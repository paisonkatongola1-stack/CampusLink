export type UserRole = 'student' | 'business' | 'landlord' | 'employer' | 'admin';

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
  type: 'Internship' | 'Part-time' | 'Full-time' | 'Freelance';
  tags: string[];
  postedAt: any;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  sellerId: string;
}

export interface EventListing {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  image: string;
  category: string;
  description?: string;
}
