import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp
} from "firebase/firestore";
import { auth } from "../firebase";
import { UserProfile, AccommodationListing, JobListing, MarketplaceItem } from "../types";

// Note: In a real environment with Data Connect, we would use the generated SDK.
// Since we are setting up the schema/operations, we'll keep the Firestore implementation
// as the primary data store for the MVP, but aligned with the new schema.

const db = getFirestore();

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const postAccommodation = async (data: any) => {
  return await addDoc(collection(db, "accommodation"), {
    ...data,
    landlordId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

export const postJob = async (data: any) => {
  return await addDoc(collection(db, "jobs"), {
    ...data,
    employerId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

export const updateListingStatus = async (collectionName: string, docId: string, status: 'approved' | 'rejected') => {
  const docRef = doc(db, collectionName, docId);
  return await updateDoc(docRef, { status });
};

export const getAccommodations = async (): Promise<AccommodationListing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "accommodation"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AccommodationListing));
  } catch (e) {
    console.error("Error fetching accommodations:", e);
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

export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

export { db };
