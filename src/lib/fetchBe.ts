import { AnyObject } from "@/types/commons/AnyObject";
import { beUrl } from "./be";

// FETCH GENERAL A BE, CON AUTH INCLUIDO.-

export const fetchBe = async (endpoint: string, method: string, token: string, headers?: AnyObject, body?: AnyObject) => {
  const res = await fetch(beUrl(endpoint), {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
};