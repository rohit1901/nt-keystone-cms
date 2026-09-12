import { getApp } from "@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/App";

import * as idView from "@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/id-field-view";
import * as textView from "@keystone-6/core/fields/types/text/views";
import * as passwordView from "@keystone-6/core/fields/types/password/views";
import * as timestampView from "@keystone-6/core/fields/types/timestamp/views";
import * as selectView from "@keystone-6/core/fields/types/select/views";
import * as checkboxView from "@keystone-6/core/fields/types/checkbox/views";
import * as relationshipView from "@keystone-6/core/fields/types/relationship/views";
import * as integerView from "@keystone-6/core/fields/types/integer/views";
import * as virtualView from "@keystone-6/core/fields/types/virtual/views";
import * as customImageView from "../../../admin/components/CustomImageCell";
import * as floatView from "@keystone-6/core/fields/types/float/views";
import * as multiselectView from "@keystone-6/core/fields/types/multiselect/views";
import * as adminConfig from "../../../admin/config";
import "../../../admin/styles/globals.css";

export default getApp({
  adminConfig,
  apiPath: "/api/graphql",
  fieldViews: [
    idView,
    textView,
    passwordView,
    timestampView,
    selectView,
    checkboxView,
    relationshipView,
    integerView,
    virtualView,
    customImageView,
    floatView,
    multiselectView,
  ],
});
