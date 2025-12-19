"use client";

import { SessionProvider } from "next-auth/react";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { UserProfile } from "../components/UserProfile";
import "../styles/globals.css";

function Profile() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-3xl">
        <UserProfile />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <SessionProvider basePath="/api/auth">
      <PageContainer header="Profile" title="Profile">
        <Profile />
      </PageContainer>
    </SessionProvider>
  );
}
