"use client";

import type { ReactNode } from "react";
import { type NavigationProps } from "@keystone-6/core/types";
import {
  NavigationContainer,
  NavItem,
  ListNavItems,
} from "@keystone-6/core/admin-ui/components";

import { ThemeToggle } from "./ThemeToggle";
import "../styles/globals.css";

function Greeting({ children }: { children: ReactNode }) {
  return (
    <span className="truncate text-sm font-semibold text-foreground">
      {children}
    </span>
  );
}

export function AdminNavigation({ authenticatedItem, lists }: NavigationProps) {
  const displayName =
    authenticatedItem?.state === "authenticated"
      ? authenticatedItem.label
      : null;
  const renderableLists = Array.isArray(lists) ? lists : [];

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <NavItem href="/profile-page">Profile</NavItem>
      <ListNavItems lists={renderableLists} />
    </NavigationContainer>
  );
}

export default AdminNavigation;
