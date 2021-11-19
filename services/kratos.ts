import { Configuration } from "@ory/client";
import { V0alpha2Api } from "@ory/kratos-client";

export default new V0alpha2Api(new Configuration({ basePath: process.env.KRATOS_ADMIN_URL }));
