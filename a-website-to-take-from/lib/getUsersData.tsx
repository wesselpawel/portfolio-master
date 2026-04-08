"use server";

import { fetchUsers } from "@/common/firebase/quixy";
const revalidate = 600;
export async function getUsersData() {
  const data = await fetchUsers();
  return data;
}
