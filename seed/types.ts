// --- Helpers ---
// Helper type for Prisma records with IDs
export type WithId<T> = T & { id: number };
export type Maybe<T> = T | null | undefined;
