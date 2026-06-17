import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy
} from "firebase/firestore";
import { auth } from "../firebase";
import {
  UserProfile,
  AccommodationListing,
  JobListing,
  MarketplaceItem,
  EventListing,
  BusinessProfile,
  Application,
  SavedItem
} from "../types";

const db = getFirestore();

// User Profiles
export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await updateDoc(doc(db, "users", userId), data);
};

// Accommodations
export const getAccommodations = async (): Promise<AccommodationListing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "accommodation"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AccommodationListing));
  } catch (e) {
    console.error("Error fetching accommodations:", e);
    return [];
  }
};

export const postAccommodation = async (data: Partial<AccommodationListing>) => {
  return await addDoc(collection(db, "accommodation"), {
    ...data,
    landlordId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

// Marketplace
export const getMarketplaceItems = async (): Promise<MarketplaceItem[]> => {
  try {
    const q = query(collection(db, "marketplace"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplaceItem));
  } catch (e) {
    console.error("Error fetching marketplace items:", e);
    return [];
  }
};

export const postMarketplaceItem = async (data: Partial<MarketplaceItem>) => {
  return await addDoc(collection(db, "marketplace"), {
    ...data,
    sellerId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

// Jobs
export const getJobs = async (): Promise<JobListing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "jobs"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobListing));
  } catch (e) {
    console.error("Error fetching jobs:", e);
    return [];
  }
};

export const postJob = async (data: Partial<JobListing>) => {
  return await addDoc(collection(db, "jobs"), {
    ...data,
    employerId: auth.currentUser?.uid,
    postedAt: Timestamp.now()
  });
};

export const applyForJob = async (jobId: string, applicantData: Partial<Application>) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

// Events
export const getEvents = async (): Promise<EventListing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventListing));
  } catch (e) {
    console.error("Error fetching events:", e);
    return [];
  }
};

// Businesses
export const getBusinesses = async (): Promise<BusinessProfile[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "businesses"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BusinessProfile));
  } catch (e) {
    console.error("Error fetching businesses:", e);
    return [];
  }
};

// Saved Items
export const saveItem = async (userId: string, itemId: string, itemType: SavedItem['itemType']) => {
  return await addDoc(collection(db, "saved_items"), {
    userId,
    itemId,
    itemType,
    savedAt: Timestamp.now()
  });
};

export const getSavedItems = async (userId: string): Promise<SavedItem[]> => {
  const q = query(collection(db, "saved_items"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SavedItem));
};

export { db };
