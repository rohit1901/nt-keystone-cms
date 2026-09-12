"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { cn } from "../lib/utils";

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

function getInitials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function StatusDot({ status }: { status: SessionStatus }) {
  return (
    <span
      className={cn(
        "absolute right-0 bottom-0 block size-2.5 rounded-full ring-2 ring-white",
        status === "authenticated" && "bg-emerald-500",
        status === "loading" && "bg-amber-400 animate-pulse",
        status === "unauthenticated" && "bg-slate-400",
      )}
    />
  );
}

function UserAvatar({
  name,
  imageUrl,
  status,
}: {
  name?: string | null;
  imageUrl?: string | null;
  status: SessionStatus;
}) {
  const initials = getInitials(name);

  return (
    <div className="relative inline-flex shrink-0">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name ?? "User avatar"}
          className="size-9 rounded-full object-cover ring-2 ring-white/20"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white flex size-9 items-center justify-center rounded-full text-xs font-bold ring-2 ring-white/20 select-none">
          {initials}
        </div>
      )}
      <StatusDot status={status} />
    </div>
  );
}

function SessionStatusInner() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="size-9 rounded-full bg-white/10 animate-pulse" />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
          <div className="h-2.5 w-14 rounded bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
        <UserAvatar
          name={user?.name}
          imageUrl={user?.image}
          status={status}
        />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {user?.name ?? "Guest"}
          </p>
          <p className="truncate text-xs text-white/50">
            {status === "authenticated"
              ? user?.email ?? "Authenticated"
              : "Not signed in"}
          </p>
        </div>
      </div>

      {status === "authenticated" && (
        <button
          onClick={() => void signOut({ callbackUrl: "/auth/signin" })}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            className="size-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Log out
        </button>
      )}

      {status === "unauthenticated" && (
        <a
          href="/auth/signin"
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg
            className="size-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
          Sign in
        </a>
      )}
    </div>
  );
}

export function SessionStatus() {
  return (
    <SessionProvider basePath="/api/auth">
      <SessionStatusInner />
    </SessionProvider>
  );
}
