"use client";

import type { ComponentProps, ReactNode } from "react";
import type { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

import { cn, formatDate } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type UserProfileProps = ComponentProps<"div">;
type SessionStatus = "loading" | "authenticated" | "unauthenticated";

type KeystoneSession = Session & {
  keystone?: {
    authId?: string | null;
  };
};

type ProfileField = {
  label: string;
  value: ReactNode;
  hint?: string;
};

type ProfileSection = {
  title: string;
  description?: string;
  fields: ProfileField[];
};

export function UserProfile({ className, ...props }: UserProfileProps) {
  const { data: session, status } = useSession();
  const typedSession = session as KeystoneSession | null;
  const user = typedSession?.user;

  const sections = buildSections({
    user,
    session: typedSession,
    status,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <UserAvatar name={user?.name} imageUrl={user?.image} />
            <div className="flex flex-1 flex-col gap-1">
              <CardTitle className="text-center text-2xl sm:text-left">
                {user?.name ?? "Anonymous User"}
              </CardTitle>
              <CardDescription className="text-center sm:text-left">
                {status === "loading"
                  ? "Fetching session information…"
                  : status === "authenticated"
                    ? "Here’s everything we currently know about your active session."
                    : "We couldn’t find an active session linked to this browser."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {status === "loading" && <LoadingState />}
          {status === "unauthenticated" && (
            <EmptyState message="You’re not signed in. Sign in to review your profile data." />
          )}
          {status === "authenticated" &&
            (sections.length ? (
              <div className="space-y-8">
                {sections.map((section) => (
                  <UserProfileSection key={section.title} {...section} />
                ))}
              </div>
            ) : (
              <EmptyState message="We couldn’t locate any additional profile attributes for this session." />
            ))}
        </CardContent>

        {status === "authenticated" && (
          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => void signOut()}
              type="button"
            >
              Log out
            </Button>
          </CardFooter>
        )}
      </Card>

      {status === "authenticated" && typedSession && (
        <Card>
          <CardHeader>
            <CardTitle>Session Payload</CardTitle>
            <CardDescription>
              Raw session data as returned by the authentication provider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted text-muted-foreground max-h-80 overflow-auto rounded-md p-4 text-xs leading-relaxed">
              {JSON.stringify(typedSession, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function buildSections({
  user,
  session,
  status,
}: {
  user: Session["user"] | undefined;
  session: KeystoneSession | null | undefined;
  status: SessionStatus;
}): ProfileSection[] {
  if (status !== "authenticated" || !session) {
    return [];
  }

  const accountFields: ProfileField[] = [
    {
      label: "Name",
      value: toDisplayValue(user?.name),
    },
    {
      label: "Email",
      value: toDisplayValue(user?.email),
    },
    {
      label: "Avatar",
      value: user?.image ? "Custom avatar set" : "No avatar on record",
    },
  ];

  const sessionFields: ProfileField[] = [
    {
      label: "Session status",
      value: status,
    },
    {
      label: "Auth ID",
      value: toDisplayValue(session.keystone?.authId),
      hint: "Internal identifier used by Keystone.",
    },
    {
      label: "Session expires",
      value: session.expires ? formatDate(session.expires) : "Not available",
    },
  ];

  const metadataEntries = Object.entries(user ?? {}).filter(([key, value]) => {
    if (["name", "email", "image"].includes(key)) {
      return false;
    }
    if (value == null) {
      return false;
    }
    if (typeof value === "string" && value.trim().length === 0) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      return false;
    }
    return true;
  });

  const metadataFields: ProfileField[] = metadataEntries.map(
    ([key, value]) => ({
      label: humanizeLabel(key),
      value: toDisplayValue(value),
    }),
  );

  const sections: ProfileSection[] = [
    {
      title: "Account overview",
      description: "Core attributes shared by your account profile.",
      fields: accountFields,
    },
    {
      title: "Session details",
      description: "Session metadata managed by the authentication provider.",
      fields: sessionFields,
    },
  ];

  if (metadataFields.length) {
    sections.push({
      title: "Additional metadata",
      description: "Extra attributes returned alongside your user profile.",
      fields: metadataFields,
    });
  }

  return sections
    .map((section) => ({
      ...section,
      fields: section.fields.filter((field) => hasMeaningfulValue(field.value)),
    }))
    .filter((section) => section.fields.length > 0);
}

function UserProfileSection({ title, description, fields }: ProfileSection) {
  return (
    <section className="space-y-3">
      <header className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        )}
      </header>
      <dl className="divide-y divide-border overflow-hidden rounded-lg border">
        {fields.map(({ label, value, hint }) => (
          <DetailRow key={label} label={label} value={value} hint={hint} />
        ))}
      </dl>
    </section>
  );
}

function DetailRow({ label, value, hint }: ProfileField) {
  return (
    <div className="flex flex-col gap-1 bg-background/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <dt className="font-medium text-foreground">{label}</dt>
      <dd className="text-muted-foreground flex flex-col items-start gap-1 text-sm sm:items-end sm:text-right">
        <span>{value}</span>
        {hint && (
          <span className="text-muted-foreground/70 text-xs">{hint}</span>
        )}
      </dd>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="bg-muted animate-pulse h-3 w-24 rounded" />
          <div className="bg-muted animate-pulse h-4 w-full rounded" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-muted/40 text-muted-foreground rounded-lg border border-dashed border-border p-6 text-sm leading-relaxed">
      {message}
    </div>
  );
}

function UserAvatar({
  name,
  imageUrl,
}: {
  name?: string | null;
  imageUrl?: string | null;
}) {
  const initials = getInitials(name);
  return imageUrl ? (
    <img
      src={imageUrl}
      alt={name ?? "User avatar"}
      className="border-border h-20 w-20 rounded-full border object-cover"
      referrerPolicy="no-referrer"
    />
  ) : (
    <div className="bg-primary/10 text-primary flex h-20 w-20 items-center justify-center rounded-full border border-border text-xl font-semibold uppercase">
      {initials}
    </div>
  );
}

function getInitials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function toDisplayValue(value: unknown, fallback = "Not provided"): ReactNode {
  if (value === null || value === undefined) {
    return fallback;
  }
  if (typeof value === "string") {
    return value.trim().length ? value : fallback;
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : fallback;
  }
  if (value instanceof Date) {
    return formatDate(value.toISOString());
  }
  if (typeof value === "object") {
    try {
      const serialized = JSON.stringify(value);
      if (!serialized || serialized === "{}" || serialized === "[]") {
        return fallback;
      }
      return serialized;
    } catch {
      return fallback;
    }
  }
  return String(value);
}

function humanizeLabel(label: string) {
  return label
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

function hasMeaningfulValue(value: ReactNode) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string")
    return value.trim().length > 0 && value !== "Not provided";
  return true;
}
