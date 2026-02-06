"use client";

import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setUser, clearUser  } from "@/store/userSlice";

export function useMeRedux() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((s) => s.userStore);

  const loadMe = useCallback(async () => {
    // si ya está autenticado, no vuelvas a pedir (ajustalo a tu gusto)
    if (userState.user) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (res.status === 401) {
        dispatch(clearUser());
        return;
      }

      const me = await res.json();
      dispatch(setUser(me));
      setIsLoading(false);
    } catch (error) {
      dispatch(clearUser());
      setIsLoading(false);
    }
  }, [dispatch, userState.user]);

  return {
    ...userState,
     isLoading,
    loadMe,
  };
}
