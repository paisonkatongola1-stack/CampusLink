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
  avatarUrl?: string;
  cvUrl?: string;
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
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface JobListing {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: 'Internship' | 'Part-time' | 'Full-time' | 'Freelance';
  tags: string[];
  postedBy: string;
  status: 'pending' | 'approved' | 'rejected';
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
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
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
  organizerId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  location: string;
  services: string[];
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: any;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: any;
}
