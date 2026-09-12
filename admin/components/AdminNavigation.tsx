"use client";

import { type NavigationProps } from "@keystone-6/core/types";
import {
  getHrefFromList,
  NavContainer,
  NavItem,
  NavList,
} from "@keystone-6/core/admin-ui/components";
import { SessionStatus } from "./SessionStatus";

export function AdminNavigation({ lists }: NavigationProps) {
  return (
    <NavContainer>
      <NavList>
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href="/profile-page">Profile</NavItem>
        {lists.map((list) => (
          <NavItem key={list.key} href={getHrefFromList(list)}>
            {list.label}
          </NavItem>
        ))}
      </NavList>
      <div className="mt-auto px-3 pb-3 pt-4">
        <SessionStatus />
      </div>
    </NavContainer>
  );
}

export default AdminNavigation;
