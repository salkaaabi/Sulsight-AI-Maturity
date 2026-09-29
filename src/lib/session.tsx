"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PERSONAS, type Persona, personaById } from "@/data/users";

const STORAGE_KEY = "fjr-financial-demo-persona";
const ASSESSMENT_KEY = "fjr-financial-demo-assessment";

export type StoredAssessment = {
  audience: "student" | "adult";
  score: number;
  levelKey: string;
  pathId: string;
  dimensions: { key: string; value: number }[];
  strengths: string[];
  gaps: string[];
  takenAt: string;
};

type SessionValue = {
  persona: Persona | null;
  ready: boolean;
  signIn: (id: string) => void;
  signOut: () => void;
  assessment: StoredAssessment | null;
  saveAssessment: (a: StoredAssessment) => void;
  clearAssessment: () => void;
  personas: Persona[];
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<StoredAssessment | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && personaById(stored)) setPersonaId(stored);
      const a = window.localStorage.getItem(ASSESSMENT_KEY);
      if (a) setAssessment(JSON.parse(a) as StoredAssessment);
    } catch {
      /* التخزين المحلي غير متاح — النموذج يعمل دون حفظ */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((id: string) => {
    setPersonaId(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }, []);

  const signOut = useCallback(() => {
    setPersonaId(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const saveAssessment = useCallback((a: StoredAssessment) => {
    setAssessment(a);
    try {
      window.localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(a));
    } catch {}
  }, []);

  const clearAssessment = useCallback(() => {
    setAssessment(null);
    try {
      window.localStorage.removeItem(ASSESSMENT_KEY);
    } catch {}
  }, []);

  const value = useMemo<SessionValue>(
    () => ({
      persona: personaId ? personaById(personaId) ?? null : null,
      ready,
      signIn,
      signOut,
      assessment,
      saveAssessment,
      clearAssessment,
      personas: PERSONAS,
    }),
    [personaId, ready, signIn, signOut, assessment, saveAssessment, clearAssessment]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession يجب أن يُستخدم داخل SessionProvider");
  return ctx;
}
