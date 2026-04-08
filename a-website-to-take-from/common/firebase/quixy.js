import {
  collection,
  getDocs,
  query,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  where,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { app, auth, provider, storage, db } from "./firebase";

/**
 * Get a user by their userId.
 */
export async function getUserById(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    throw error;
  }
}

/**
 * Add a message to a conversation between participants.
 * The conversation is stored in the "conversations" collection, with the document id as the sorted participant ids joined by "_".
 */
export async function addMessageToConversation(
  message,
  authorId,
  participants
) {
  try {
    const sortedParticipantIds = participants?.map((p) => p.uid).sort();
    const conversationId = sortedParticipantIds.join("_");
    const conversationDocRef = doc(db, "conversations", conversationId);
    const conversationDoc = await getDoc(conversationDocRef);

    if (!conversationDoc.exists()) {
      throw new Error(`Conversation with ID ${conversationId} does not exist`);
    }

    // Use arrayUnion to add the new message to the messages array
    const newMessage = {
      id: uuidv4(),
      content: message,
      sender: authorId,
      timestamp: Date.now(),
    };
    await updateDoc(conversationDocRef, {
      messages: arrayUnion(newMessage),
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new conversation document in the "conversations" collection.
 */
export async function createConversation(conversationId, conversationData) {
  try {
    const conversationDocRef = doc(db, "conversations", conversationId);
    await setDoc(conversationDocRef, conversationData);
    return { id: conversationId, ...conversationData };
  } catch (error) {
    throw error;
  }
}

/**
 * Add a conversation between participants, or return the existing conversation id if it already exists.
 */
export async function addConversation(participants) {
  try {
    const sortedParticipantIds = participants.map((p) => p.uid).sort();
    const conversationId = sortedParticipantIds.join("_");
    const conversationDocRef = doc(db, "conversations", conversationId);
    const conversationDoc = await getDoc(conversationDocRef);

    if (conversationDoc.exists()) {
      return conversationDoc.id;
    } else {
      const newConversationData = {
        participants,
        messages: [],
        createdAt: Date.now(),
        id: conversationId,
      };

      if (
        Object.values(newConversationData).some((value) => value === undefined)
      ) {
        throw new Error("Undefined value found in conversation data");
      }

      await createConversation(conversationId, newConversationData);
      return conversationId;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateUser(userId, data) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, data);
}

export async function getOpinions() {
  const opinionsRef = collection(db, "opinions");
  const opinionsSnap = await getDocs(opinionsRef);
  return opinionsSnap.docs.map((doc) => ({ ...doc.data() }));
}

export async function addOpinion(data) {
  const id = uuidv4();
  const opinionRef = doc(db, "opinions", id);
  await setDoc(opinionRef, {
    ...data,
    id,
    createdAt: Date.now(),
  });
  return id;
}

export async function pushAssistantMessage(data, uid) {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);
  const message = { ...data, createdAt: Date.now() };
  if (userDocSnap.exists()) {
    await updateDoc(userDocRef, {
      assistantMessages: arrayUnion(message),
    });
    return userDocRef;
  } else {
    await setDoc(userDocRef, {
      assistantMessages: [message],
    });
    return userDocRef;
  }
}

export async function deleteJobOffer(jobOfferId) {
  const jobOfferRef = doc(db, "job_offers", jobOfferId);
  await deleteDoc(jobOfferRef);
}

export async function deleteService(id) {
  const serviceRef = doc(db, "services", id);
  await deleteDoc(serviceRef);
}

export async function createAIChat(data) {
  const chatId = uuidv4();
  const chatDocRef = doc(db, "chats", chatId);
  const docSnap = await getDoc(chatDocRef);
  if (docSnap.exists()) {
    return chatDocRef;
  } else {
    await setDoc(chatDocRef, {
      ...data,
      createdAt: Date.now(),
      id: chatId,
    });
    return chatDocRef;
  }
}

export async function pushSpecialization(data) {
  const id = uuidv4();
  const specializationDocRef = doc(db, "specializations", id);
  const docSnap = await getDoc(specializationDocRef);
  if (docSnap.exists()) {
    return specializationDocRef;
  } else {
    await setDoc(specializationDocRef, {
      ...data,
      createdAt: Date.now(),
      id,
    });
    return specializationDocRef;
  }
}

export async function updateSpecialization(id, data) {
  const docRef = doc(db, "specializations", id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function createUser(data) {
  const dbUser = await getDocument("users", data.uid);
  if (!dbUser) {
    await setDoc(doc(db, "users", data.uid), data);
    return { exists: false };
  }
  return { exists: true };
}

export async function pushLead(data) {
  const id = uuidv4();
  const leadDocRef = doc(db, "leads", id);
  const docSnap = await getDoc(leadDocRef);
  if (docSnap.exists()) {
    return leadDocRef;
  } else {
    await setDoc(leadDocRef, {
      ...data,
      createdAt: Date.now(),
      id,
    });
    return leadDocRef;
  }
}

export async function updateContent(id, data) {
  const docRef = doc(db, "content", id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function updateLead(id, data) {
  const docRef = doc(db, "leads", id);
  await updateDoc(docRef, data);
  return docRef;
}

async function addBooking(req, id) {
  await setDoc(doc(db, "bookings", id), req);
}

async function updateBooking(uid, id) {
  const docRef = doc(db, "bookings", id);
  await updateDoc(docRef, {
    uid: uid,
    isReliable: true,
  });
}

async function getBookingById(id) {
  const docRef = doc(db, "bookings", id);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) return null;
  return { ...docSnapshot.data() };
}

async function getBookingsByUserId(uid) {
  const ref = collection(db, "bookings");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  return response.docs.map((doc) => ({ ...doc.data() }));
}

async function getAllBookings() {
  const ref = collection(db, "bookings");
  const response = await getDocs(ref);
  return response.docs.map((doc) => ({ ...doc.data() }));
}

async function getBookings(uid) {
  const requestsCollection = collection(db, "bookings");
  const userRequestsQuery = query(requestsCollection, where("uid", "==", uid));
  const querySnapshot = await getDocs(userRequestsQuery);
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
}

async function getUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  return response.docs.map((doc) => ({ ...doc.data() }));
}

async function getUser(uid) {
  const ref = collection(db, "users");
  const filter = query(ref, where("uid", "==", uid));
  const response = await getDocs(filter);
  return response.docs.length > 0
    ? { id: response.docs[0].id, ...response.docs[0].data() }
    : null;
}

async function getDocument(collectionName, key) {
  const docRef = doc(db, collectionName, key);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) return null;
  return { ...docSnapshot.data() };
}

export async function fetchUsers() {
  const ref = collection(db, "users");
  const response = await getDocs(ref);
  return response.docs.map((doc) => ({ ...doc.data() }));
}

export async function fetchOffers() {
  const ref = collection(db, "offers");
  const response = await getDocs(ref);
  return response.docs.map((doc) => ({ ...doc.data() }));
}

async function getDocuments(collectionName) {
  const ref = collection(db, collectionName);
  const res = await getDocs(ref);
  return res.docs.map((doc) => ({ ...doc.data() }));
}

async function addDocument(collectionName, uniqueId, data) {
  await setDoc(doc(db, collectionName, uniqueId), data);
}

async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(doc(db, collectionName, uniqueId));
}

async function updateDocument(keys, values, collectionName, id) {
  const docRef = doc(db, collectionName, id);
  const docSnapshot = await getDoc(docRef);

  let updatedData = {};
  if (docSnapshot.exists()) {
    updatedData = { ...docSnapshot.data() };
  }
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}

async function updateUserLeads(uid, data) {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);
  const userData = userSnapshot.exists() ? userSnapshot.data() : {};
  const leads = userData?.leads || [];
  await updateDoc(userRef, { leads: [...leads, data] });
}

async function getBlogPosts() {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { posts: [] };
}

async function addBlogPost(post) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists() || !docSnap.data()) {
    await setDoc(docRef, { posts: [post] });
  } else {
    await updateDoc(docRef, {
      posts: arrayUnion(post),
    });
  }
}

async function updateBlogPost(postId, updatedPost) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts || [];
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

// Auto blogger
// product === generated blog post

export async function createDraft(productConfig, customId) {
  const draftDocRef = doc(db, "drafts", customId);
  const docSnap = await getDoc(draftDocRef);
  if (docSnap.exists()) {
    return draftDocRef;
  } else {
    await setDoc(draftDocRef, {
      ...productConfig,
      createdAt: Date.now(),
      id: customId,
    });
    return draftDocRef;
  }
}

export async function deleteBlogPost(postId) {
  const docRef = doc(db, "blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = docSnap.data().posts || [];
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await updateDoc(docRef, { posts });
    }
  }
}

export async function getDrafts() {
  const querySnapshot = await getDocs(collection(db, "drafts"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  const draftDoc = await getDoc(draftDocRef);
  return draftDoc.exists() ? { ...draftDoc.data(), id: draftDoc.id } : null;
}

export async function updateDraft(draftId, updates) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await updateDoc(draftDocRef, updates);
}

export async function deleteDraft(draftId) {
  const draftDocRef = doc(db, "drafts", draftId);
  return await deleteDoc(draftDocRef);
}

export async function deleteMultipleDrafts(draftIds) {
  const promises = draftIds.map(async (draftId) => {
    const draftDocRef = doc(db, "drafts", draftId);
    await deleteDoc(draftDocRef);
  });
  await Promise.all(promises);
}

export async function deleteMultipleProducts(productIds) {
  const promises = productIds.map(async (productId) => {
    const productDocRef = doc(db, "products", productId);
    await deleteDoc(productDocRef);
  });
  await Promise.all(promises);
}

export async function createProduct(productConfig) {
  const productDocRef = doc(db, "products", productConfig.id);
  const docSnap = await getDoc(productDocRef);
  if (docSnap.exists()) {
    return productDocRef;
  } else {
    await setDoc(productDocRef, {
      ...productConfig,
      createdAt: Date.now(),
      id: productConfig.id,
    });
    return productDocRef;
  }
}

export async function getProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function addJobOffer(jobOffer) {
  const jobOfferDocRef = doc(db, "offers", jobOffer.id);
  await setDoc(jobOfferDocRef, {
    ...jobOffer,
    creationTime: Date.now(),
    id: jobOffer.id,
  });
  return jobOfferDocRef;
}

export async function updateJobOffer(jobOfferId, jobOffer) {
  const jobOfferDocRef = doc(db, "offers", jobOfferId);
  await updateDoc(jobOfferDocRef, jobOffer);
  return jobOfferDocRef;
}

export async function fetchJobOffer(jobOfferId) {
  const jobOfferDocRef = doc(db, "offers", jobOfferId);
  const jobOfferDoc = await getDoc(jobOfferDocRef);
  return jobOfferDoc.exists()
    ? { ...jobOfferDoc.data(), id: jobOfferDoc.id }
    : null;
}

export async function updateApplication(id, data) {
  const docRef = doc(db, "employees", id);
  await updateDoc(docRef, data);
  return docRef;
}

export async function fetchJobOffers() {
  const querySnapshot = await getDocs(collection(db, "offers"));
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

export async function getProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  const productDoc = await getDoc(productDocRef);
  return productDoc.exists()
    ? { ...productDoc.data(), id: productDoc.id }
    : null;
}

export async function getProductByUrl(url) {
  const products = await getProducts();
  return products.find((product) => product.url === url);
}

export async function updateProduct(productId, updates) {
  const productDocRef = doc(db, "products", productId);
  return await updateDoc(productDocRef, updates);
}

export async function deleteProduct(productId) {
  const productDocRef = doc(db, "products", productId);
  return await deleteDoc(productDocRef);
}

export async function addOrder(id, data) {
  await setDoc(doc(db, "orders", id), data);
  const docRef = doc(db, "orders", id);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.exists() ? { ...docSnapshot.data() } : null;
}

export async function updateOrder(keys, values, id) {
  const docRef = doc(db, "orders", id);
  const docSnapshot = await getDoc(docRef);

  let updatedData = {};
  if (docSnapshot.exists()) {
    updatedData = { ...docSnapshot.data() };
    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });
    await updateDoc(docRef, updatedData);
  } else {
    keys.forEach((key, index) => {
      updatedData[key] = values[index];
    });
    await setDoc(docRef, updatedData);
  }
  return updatedData;
}

export async function getIdea(userId, ideaId) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userIdeas = userDoc.data().ideas || [];
    const ideaIndex = userIdeas.findIndex((idea) => idea.id === ideaId);
    if (ideaIndex !== -1) {
      return userIdeas[ideaIndex];
    }
  }
  return null;
}

export {
  addBooking,
  addDocument,
  getBookings,
  removeDocument,
  getUsers,
  getUser,
  updateDocument,
  getAllBookings,
  updateBooking,
  getBookingById,
  getBookingsByUserId,
  getBlogPosts,
  addBlogPost,
  updateBlogPost,
  getDocument,
  getDocuments,
  updateUserLeads,
  app,
  auth,
  provider,
  storage,
  db,
};
