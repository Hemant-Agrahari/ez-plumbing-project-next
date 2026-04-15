const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
// staging
 const port = 1186;

// live
// const port = 249;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      switch (pathname) {
        case "/ceo-candidate-criteria-and-interview-process":
          res.writeHead(301, {
            Location:
              "/what-are-the-ceo-selection-criteria-and-how-boards-interview-ceo-candidates",
          });
          res.end();
          break;
        case "/when-to-hire-ceo-for-startup-how-long-find-best-ceo":
          res.writeHead(301, {
            Location:
              "/when-to-hire-a-ceo-for-your-startup-and-how-long-does-it-take-to-hire-best-ceo",
          });
          res.end();
          break;
        case "/abu-dhabi-recruitment-agencies-diversity-inclusion":
          res.writeHead(301, {
            Location:
              "/role-of-abu-dhabi-recruitment-agencies-in-promoting-diversity-and-inclusion",
          });
          res.end();
          break;
        case "/mdyog-mandir-natural-oils-social-media-design":
          res.writeHead(301, {
            Location: "/udyog-mandir-natural-oils-social-media-design",
          });
          res.end();
          break;
        default:
          handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
