"use client";

import { SessionProvider } from "next-auth/react";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { UserProfile } from "../components/UserProfile";


function Profile() {
  return (
    <div className="flex w-full justify-center p-6 md:p-10">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <UserProfile />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <SessionProvider basePath="/api/auth">
      <div className="text-primary">
      <PageContainer header="Profile" title="Profile">
        <Profile />
        </PageContainer>
        </div>
    </SessionProvider>
  );
}
