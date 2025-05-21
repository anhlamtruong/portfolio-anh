# 🧱 creata-cli

A custom CLI to upload and down components

---

## 📦 Install & Dev Setup

```bash
# Clone and install dependencies
git clone <your-repo-url>
cd the-architect-cli
pnpm install  # or npm install / yarn / bun
```

---

## 🧪 Local Development

Run your CLI directly via dev script:

```bash
# From the root
npm run dev -- cre dashboard --with-api --with-hooks --with-components

# Or with short aliases
npm run dev -- cre dashboard -a -h -c
```

⚠️ Always include `--` after `npm run dev` to pass flags properly.

---

## 🌐 Global Usage

### Option 1: Use via `npm link`

```bash
pnpm build         # compile TypeScript to dist/
npm link           # symlink as global CLI command

# Then run anywhere:
creata cre dashboard -a -h -c
```

### Option 2: Use with `npx`

After publishing to npm:

```bash
npx creata cre dashboard -a -h -c
```

---

## 🧠 CLI Usage

```bash
tac arch <name> [options]
```

| Option              | Alias | Description                  |
| ------------------- | ----- | ---------------------------- |
| `--with-api`        | `-a`  | Include API route in `/api`  |
| `--with-hooks`      | `-h`  | Include custom hook template |
| `--with-components` | `-c`  | Include sample UI component  |

### Example

```bash
tac arch blog --with-api
# or
tac arch blog -a
```

---

## 🛠️ Output Structure

```bash
src/app/blog/
├── page.tsx
├── api/
│   └── route.ts
├── hooks/
│   └── useBlog.ts
└── components/
    └── BlogWidget.tsx
```

---

## 🧼 Clean Up

To remove global CLI:

```bash
npm unlink -g creata
```

---

## ✍️ Author

Created by **Lam Anh Truong**
📧 Email: anhlamtruong1012@gmail.com
