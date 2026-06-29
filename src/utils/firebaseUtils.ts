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
  Timestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { UserProfile, AccommodationListing, JobListing, MarketplaceItem } from "../types";

const db = getFirestore();
const storage = getStorage();

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
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

// Messaging Functions
export const sendMessage = async (conversationId: string, text: string) => {
  if (!auth.currentUser) return;
  return await addDoc(collection(db, "conversations", conversationId, "messages"), {
    senderId: auth.currentUser.uid,
    text,
    timestamp: Timestamp.now()
  });
};

export const onMessagesUpdate = (conversationId: string, callback: (messages: any[]) => void) => {
  const q = query(
    collection(db, "conversations", conversationId, "messages"),
    orderBy("timestamp", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// File Upload Functions
export const uploadFile = async (path: string, file: File) => {
  const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

// Saved Items Logic
export const saveItem = async (type: string, itemId: string) => {
  if (!auth.currentUser) return;
  return await addDoc(collection(db, "saved_items"), {
    userId: auth.currentUser.uid,
    itemId,
    type,
    savedAt: Timestamp.now()
  });
};

export const unsaveItem = async (itemId: string) => {
  if (!auth.currentUser) return;
  const q = query(
    collection(db, "saved_items"),
    where("userId", "==", auth.currentUser.uid),
    where("itemId", "==", itemId)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach(async (document) => {
    await deleteDoc(doc(db, "saved_items", document.id));
  });
};

export { db, storage };
