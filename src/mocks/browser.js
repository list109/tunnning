import { setupWorker } from "msw";
import { handlers } from "./handlers";

import "./mockAuthState.js";

export const worker = setupWorker(...handlers);
