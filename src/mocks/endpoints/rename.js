import { rest } from "msw";
import urls from "../urls";
import data from "../mockedData";

const { playlists } = data;

const handler = rest.put(
  `${urls.api}/playlists/:requestId`,
  async (req, res, ctx) => {
    const { name } = await req.json();
    const { requestId } = req.params;

    if (requestId) {
      const renamedPlaylist = playlists.find(({ id }) => id === requestId);
      renamedPlaylist.name = name;
      return res(ctx.delay(2000), ctx.status(200));
    }
    return res(
      ctx.delay(2000),
      ctx.status(400),
      ctx.json({ errorMessage: "Could not rename the playlist" })
    );
  }
);

export default handler;
