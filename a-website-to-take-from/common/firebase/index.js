import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { app, auth, provider, storage, db } from "./firebase";

// Helper: get a document reference by collection and id
function getDocRef(collectionName, id) {
  return doc(db, collectionName, id);
}

// Helper: get a collection reference
function getColRef(collectionName) {
  return collection(db, collectionName);
}

// Push a session, create if not exists
export async function pushSession(data) {
  const sessionRef = getDocRef("sessions", data.id);
  const docSnap = await getDoc(sessionRef);
  if (docSnap.exists()) {
    return sessionRef;
  }
  await setDoc(sessionRef, {
    ...data,
    createdAt: Date.now(),
  });
  return sessionRef;
}

// Push an assistant message, create if not exists
export async function pushAssistantMessage(data) {
  const msgRef = getDocRef("assistantMessages", data.id);
  const docSnap = await getDoc(msgRef);
  if (docSnap.exists()) {
    return msgRef;
  }
  await setDoc(msgRef, {
    ...data,
    createdAt: Date.now(),
  });
  return msgRef;
}

// Get all public sessions
export async function getPublicSessions() {
  const colRef = getColRef("publicSessions");
  const querySnapshot = await getDocs(colRef);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// Push a message to a session, create session if not exists
export async function pushSessionMessage(data, sessionId) {
  const sessionRef = getDocRef("publicSessions", sessionId);
  const docSnap = await getDoc(sessionRef);
  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const messages = Array.isArray(currentData.messages)
      ? currentData.messages
      : [];
    await updateDoc(sessionRef, {
      ...currentData,
      messages: [...messages, data],
    });
    return sessionRef;
  }
  await setDoc(sessionRef, {
    ...data,
    createdAt: Date.now(),
    messages: [data],
  });
  return sessionRef;
}

// Create a session if not exists
export async function createSession(data) {
  const sessionRef = getDocRef("publicSessions", data.id);
  const docSnap = await getDoc(sessionRef);
  if (docSnap.exists()) {
    return sessionRef;
  }
  await setDoc(sessionRef, {
    ...data,
    messages: [],
  });
  return sessionRef;
}

// Get all assistant messages
export async function getAssistantMessages() {
  try {
    const colRef = getColRef("assistantMessages");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error getting assistant messages:", error);
    throw error;
  }
}

// Push a second lead, create if not exists
export async function pushSecondLead(data) {
  const leadRef = getDocRef("secondLeads", data.id);
  const docSnap = await getDoc(leadRef);
  if (docSnap.exists()) {
    return leadRef;
  }
  await setDoc(leadRef, {
    ...data,
    createdAt: Date.now(),
  });
  return leadRef;
}

// Get a single document by collection and key
export async function getDocument(collectionName, key) {
  try {
    const docRef = getDocRef(collectionName, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.warn(`Document ${key} not found in collection ${collectionName}`);
    return null;
  } catch (error) {
    console.warn(
      `Error fetching document ${key} from ${collectionName}:`,
      error
    );
    return null;
  }
}

// Get all documents in a collection
export async function getDocuments(collectionName) {
  try {
    const colRef = getColRef(collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.warn(`Error fetching documents from ${collectionName}:`, error);
    return [];
  }
}

// Get blog posts (single doc)
export async function getBlogPosts() {
  const docRef = getDocRef("blog", "blog");
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

// Add a blog post to the posts array
export async function addBlogPost(post) {
  const docRef = getDocRef("blog", "blog");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists() || !docSnap.data()) {
    await setDoc(docRef, { posts: [post] });
  } else {
    await updateDoc(docRef, {
      posts: arrayUnion(post),
    });
  }
}

// Update a blog post by postId
export async function updateBlogPost(postId, updatedPost) {
  const docRef = getDocRef("blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = Array.isArray(docSnap.data().posts)
      ? docSnap.data().posts
      : [];
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      await updateDoc(docRef, { posts });
    }
  }
}

// Create a draft with a custom id if not exists
export async function createDraft(productConfig, customId) {
  const draftRef = getDocRef("drafts", customId);
  const docSnap = await getDoc(draftRef);
  if (docSnap.exists()) {
    return draftRef;
  }
  await setDoc(draftRef, {
    ...productConfig,
    createdAt: Date.now(),
  });
  return draftRef;
}

// Delete a blog post by postId
export async function deleteBlogPost(postId) {
  const docRef = getDocRef("blog", "blog");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const posts = Array.isArray(docSnap.data().posts)
      ? docSnap.data().posts
      : [];
    const postIndex = posts.findIndex((post) => post.postId === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      await updateDoc(docRef, { posts });
    }
  }
}

// Get all drafts
export async function getDrafts() {
  const colRef = getColRef("drafts");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// Get a single draft by id
export async function getDraft(draftId) {
  const draftRef = getDocRef("drafts", draftId);
  const docSnap = await getDoc(draftRef);
  return docSnap.exists() ? { ...docSnap.data(), id: draftRef.id } : null;
}

// Update a draft by id
export async function updateDraft(draftId, updates) {
  const draftRef = getDocRef("drafts", draftId);
  return await updateDoc(draftRef, updates);
}

// Delete a draft by id
export async function deleteDraft(draftId) {
  const draftRef = getDocRef("drafts", draftId);
  return await deleteDoc(draftRef);
}

// Delete multiple drafts by ids
export async function deleteMultipleDrafts(draftIds) {
  await Promise.all(
    draftIds.map((draftId) => deleteDoc(getDocRef("drafts", draftId)))
  );
}

// Delete multiple products by ids
export async function deleteMultipleProducts(productIds) {
  await Promise.all(
    productIds.map((productId) => deleteDoc(getDocRef("products", productId)))
  );
}

// Add a document to a collection with a unique id
export async function addDocument(collectionName, uniqueId, data) {
  await setDoc(getDocRef(collectionName, uniqueId), data);
}

// Remove a document from a collection by id
export async function removeDocument(collectionName, uniqueId) {
  await deleteDoc(getDocRef(collectionName, uniqueId));
}

// Update document fields by keys and values
export async function updateDocument(keys, values, collectionName, id) {
  const docRef = getDocRef(collectionName, id);
  const docSnap = await getDoc(docRef);
  const existingData = docSnap.data() || {};
  const updatedData = { ...existingData };
  keys.forEach((key, index) => {
    updatedData[key] = values[index];
  });
  await updateDoc(docRef, updatedData);
}

// Get all second leads
export async function getSecondLeads() {
  try {
    const colRef = getColRef("secondLeads");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error getting second leads:", error);
    throw error;
  }
}

// Push a lead, create if not exists
export async function pushLead(data) {
  const leadRef = getDocRef("leads", data.id);
  const docSnap = await getDoc(leadRef);
  if (docSnap.exists()) {
    return leadRef;
  }
  await setDoc(leadRef, {
    ...data,
    createdAt: Date.now(),
  });
  return leadRef;
}

// Push a message, create if not exists
export async function pushMessage(data) {
  const msgRef = getDocRef("messages", data.id);
  const docSnap = await getDoc(msgRef);
  if (docSnap.exists()) {
    return msgRef;
  }
  await setDoc(msgRef, {
    ...data,
    createdAt: Date.now(),
  });
  return msgRef;
}

// Get all leads
export async function getLeads() {
  try {
    const colRef = getColRef("leads");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error getting leads:", error);
    throw error;
  }
}

// Get all messages
export async function getMessages() {
  try {
    const colRef = getColRef("messages");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
}

// Update a message by id
export async function updateMessage(id, data) {
  const msgRef = getDocRef("messages", id);
  await updateDoc(msgRef, data);
  return msgRef;
}

// Update a second lead by id
export async function updateSecondLead(id, data) {
  const leadRef = getDocRef("secondLeads", id);
  await updateDoc(leadRef, data);
  return leadRef;
}

// Delete a second lead by id
export async function deleteSecondLead(id) {
  const leadRef = getDocRef("secondLeads", id);
  await deleteDoc(leadRef);
  return leadRef;
}

// Update a lead by id
export async function updateLead(id, data) {
  const leadRef = getDocRef("leads", id);
  await updateDoc(leadRef, data);
  return leadRef;
}

// Delete a lead by id
export async function deleteLead(id) {
  const leadRef = getDocRef("leads", id);
  await deleteDoc(leadRef);
  return leadRef;
}

// Update an application (employee) by id
export async function updateApplication(id, data) {
  const appRef = getDocRef("employees", id);
  await updateDoc(appRef, data);
  return appRef;
}

// Update a course by id
export async function updateCourse(id, data) {
  const courseRef = getDocRef("courses", id);
  await updateDoc(courseRef, data);
  return courseRef;
}

// Push a course, create if not exists
export async function pushCourse(data) {
  const courseRef = getDocRef("courses", data.id);
  const docSnap = await getDoc(courseRef);
  if (docSnap.exists()) {
    return courseRef;
  }
  await setDoc(courseRef, {
    ...data,
    createdAt: Date.now(),
  });
  return courseRef;
}

// Push an employee, create if not exists
export async function pushEmployee(data) {
  const empRef = getDocRef("employees", data.id);
  const docSnap = await getDoc(empRef);
  if (docSnap.exists()) {
    return empRef;
  }
  await setDoc(empRef, {
    ...data,
    createdAt: Date.now(),
  });
  return empRef;
}

// Get all links
export async function getLinks() {
  const colRef = getColRef("links");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

// Get a link by id
export async function getLinksById(id) {
  const colRef = getColRef("links");
  const snapshot = await getDocs(colRef);
  const links = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return links.find((link) => link.id === id);
}

// Get invite by id (searches for link containing id)
export async function getInviteById(id) {
  const colRef = getColRef("links");
  const snapshot = await getDocs(colRef);
  for (const docSnap of snapshot.docs) {
    const dataArr = Array.isArray(docSnap.data().data)
      ? docSnap.data().data
      : [];
    const found = dataArr.find((link) => link.link && link.link.includes(id));
    if (found) return found;
  }
  return undefined;
}

// Push a link (overwrites if exists)
export async function pushLinks(data) {
  const linkRef = getDocRef("links", data.id);
  await setDoc(linkRef, {
    ...data,
    createdAt: Date.now(),
  });
  return linkRef;
}

// Fetch all links (same as getLinks)
export async function fetchLinks() {
  return getLinks();
}

// Helper: replace object in array by link
function replaceById(array, newObj) {
  return Array.isArray(array)
    ? array.map((item) =>
        item.link && newObj.link && item.link.includes(newObj.link)
          ? newObj
          : item
      )
    : [];
}

// Update a link by linkId
export async function updateLink(linkId, updatedLink) {
  const colRef = getColRef("links");
  const snapshot = await getDocs(colRef);
  for (const docSnap of snapshot.docs) {
    const dataArr = Array.isArray(docSnap.data().data)
      ? docSnap.data().data
      : [];
    if (dataArr.some((l) => l.link && l.link.includes(linkId))) {
      const newObject = {
        link: `https://hexon.work/invite/${linkId}`,
        ...updatedLink,
      };
      const updatedArray = replaceById(dataArr, newObject);
      await updateDoc(getDocRef("links", docSnap.id), {
        data: updatedArray,
      });
      break;
    }
  }
}

// Delete a link by id
export async function deleteLink(id) {
  await deleteDoc(getDocRef("links", id));
}

export { provider, storage, auth, app };
