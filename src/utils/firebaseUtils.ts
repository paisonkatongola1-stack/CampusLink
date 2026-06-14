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
  deleteDoc
} from "firebase/firestore";
import { auth } from "../firebase";

const db = getFirestore();

export const createUserProfile = async (userId: string, data: any) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const getAccommodations = async () => {
  const querySnapshot = await getDocs(collection(db, "accommodation"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const postMarketplaceItem = async (data: any) => {
  return await addDoc(collection(db, "marketplace"), {
    ...data,
    sellerId: auth.currentUser?.uid,
    createdAt: new Date()
  });
};

export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: new Date()
  });
};

export { db };
