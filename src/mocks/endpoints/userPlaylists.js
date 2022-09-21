import { rest } from "msw";
import urls from "../urls";
import data from "../mockedData";

const { playlists } = data;

const handler = rest.get(`${urls.api}/me/playlists`, (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.json({ items: [...playlists] }));
});

export default handler;
