import { rest } from "msw";
import urls from "../urls";
import data from "../mockedData";

const { searchResults } = data;

const handler = rest.get(`${urls.api}/search`, (req, res, ctx) => {
  return res(
    ctx.delay(2000),
    ctx.json({ tracks: { items: [...searchResults] } })
  );
});

export default handler;
