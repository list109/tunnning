import { rest } from "msw";
import urls from "../urls";
import data from "../mockedData";

const { playlists } = data;

const handlers = [
  rest.get(`${urls.api}/me`, (req, res, ctx) => {
    return res(ctx.json({ id: "userId" }));
  }),
  rest.post(`${urls.api}/users/userId/playlists`, async (req, res, ctx) => {
    const id = String(Number.parseInt(Math.random() * 1e10, 10));
    const { name } = await req.json();
    playlists.push({ id, name });
    return res(ctx.json({ id }));
  }),
  rest.post(`${urls.api}/playlists/:requestId/tracks`, (req, res, ctx) => {
    const { requestId } = req.params;
    const createdPlaylist = playlists.find(({ id }) => id === requestId);
    const { length } = req.url.searchParams.get("uris").split(",");
    createdPlaylist.tracks = { total: length };
    return res(ctx.delay(3000), ctx.json({}));
  }),
];

export default handlers;
