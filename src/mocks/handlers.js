import { rest } from "msw";
import search from "./endpoints/search";
import userPlaylists from "./endpoints/userPlaylists";
import rename from "./endpoints/rename";
import save from "./endpoints/save";

export const handlers = [].concat(
  search,
  userPlaylists,
  rename,
  save,
  rest.all("*", (req, res, ctx) => {
    return req.passthrough();
  })
);
