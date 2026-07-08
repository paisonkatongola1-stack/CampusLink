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
  onSnapshot,
  orderBy,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { UserProfile, AccommodationListing, JobListing, MarketplaceItem } from "../types";

const db = getFirestore();
const storage = getStorage();

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), {
    ...data,
    createdAt: serverTimestamp()
  });
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
    status: 'pending',
    createdAt: serverTimestamp()
  });
};

export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: serverTimestamp()
  });
};

// Messaging
export const sendMessage = async (conversationId: string, text: string) => {
  if (!auth.currentUser) return;

  await addDoc(collection(db, `conversations/${conversationId}/messages`), {
    senderId: auth.currentUser.uid,
    text,
    createdAt: serverTimestamp()
  });

  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: text,
    lastMessageAt: serverTimestamp()
  });
};

export const onMessagesUpdate = (conversationId: string, callback: (messages: any[]) => void) => {
  const q = query(
    collection(db, `conversations/${conversationId}/messages`),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// File Upload
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Favorites
export const saveItem = async (collectionName: string, itemId: string) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    [`saved_${collectionName}`]: arrayUnion(itemId)
  });
};

export const unsaveItem = async (collectionName: string, itemId: string) => {
  if (!auth.currentUser) return;
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    [`saved_${collectionName}`]: arrayRemove(itemId)
  });
};

export { db, storage };
