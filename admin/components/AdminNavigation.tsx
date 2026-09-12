"use client";

import { type NavigationProps } from "@keystone-6/core/types";
import {
  getHrefFromList,
  NavContainer,
  NavFooter,
  NavItem,
  NavList,
} from "@keystone-6/core/admin-ui/components";

export function AdminNavigation({ lists }: NavigationProps) {
  const renderableLists = Array.isArray(lists) ? lists : [];

  return (
    <NavContainer>
      <NavList>
        <NavItem href="/">Dashboard</NavItem>
        <NavItem href="/profile-page">Profile</NavItem>
        {renderableLists.map((list) => (
          <NavItem key={list.key} href={getHrefFromList(list)}>
            {list.label}
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
}

export default AdminNavigation;
