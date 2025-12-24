import { type AdminConfig } from "@keystone-6/core/types";
import { NimbusTechLogo } from "./components/NimbusTechLogo";
import { AdminNavigation } from "./components/AdminNavigation";

// Custom admin UI components exposed to Keystone.
export const components: AdminConfig["components"] = {
  Logo: NimbusTechLogo,
  Navigation: AdminNavigation,
};
