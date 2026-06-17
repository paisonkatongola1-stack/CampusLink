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
  city?: string;
  genderPreference?: 'male' | 'female' | 'mixed';
  description?: string;
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
  description?: string;
  companyLogo?: string;
  isRemote?: boolean;
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
  description?: string;
  createdAt?: any;
}

export interface EventListing {
  id: string;
  title: string;
  date: any;
  time: string;
  venue: string;
  organizer: string;
  image: string;
  description?: string;
  category?: string;
  price?: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  location: string;
  services: string[];
  logo?: string;
  contactEmail?: string;
  contactPhone?: string;
  ownerId: string;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: any;
  cvUrl?: string;
  coverLetter?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: any;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: any;
  link?: string;
}

export interface Review {
  id: string;
  targetId: string; // businessId, accommodationId, or sellerId
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface SavedItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'accommodation' | 'job' | 'marketplace' | 'event';
  savedAt: any;
}
