# portfolio-anh

Source of [lamanhtruong.com](https://www.lamanhtruong.com), the portfolio of Alan (Lam Anh) Truong.

The homepage is a static Next.js page. On top of it, colored agent cursors build each section as it scrolls into view, looping videos show the projects running, and the page reacts to the pointer. With JavaScript off, every word is still in the HTML.

## Where things are

| Path | What |
| --- | --- |
| `src/content/profile.ts` | Every fact on the site: profile, metrics, experience, projects, links |
| `src/app/(homepage)/` | The homepage: sections, blueprint theme, parallax |
| `src/app/(homepage)/_sections/fx/` | Live effects: WebGL hero, hologram cards, grid spotlight, glitch and scramble type |
| `src/components/swarm/` | The agent-swarm build animation engine |
| `video/` | HyperFrames sources for the looping videos; encoded files are in `public/videos/` |
| `src/app/(public)/links/` | The `/links` page |
| `src/app/opengraph-image.tsx` | The link-preview image |

## Run it

```bash
npm install
npm run dev
```

Check the production build with `npm run build && npm run start`. The homepage should be listed as static (○).

Pages behind sign-in, the view counter and the skill logos need Firebase and NextAuth environment variables in `.env.local`. The homepage still builds and renders without them.

To change a video, edit its composition in `video/<name>/` and re-render it as described in `video/DESIGN.md`.

## How it was made

The techniques behind this site are shared as agent skills in [living-ui-skills](https://github.com/anhlamtruong/living-ui-skills).

## License

[MIT](LICENSE) © Anh Lam Truong
