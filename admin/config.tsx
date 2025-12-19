import { type AdminConfig } from "@keystone-6/core/types";
import { NimbusTechLogo } from "./components/NimbusTechLogo";

// Presently the Logo is the only Admin UI component that is customisable.
export const components: AdminConfig["components"] = {
  Logo: NimbusTechLogo,
};
