# 🚀 Creata CLI

Creata is a command-line tool designed to streamline the development of Next.js applications by automating the creation of microservice folder structures. Generate pages, API routes, hooks, and components with a single command.

## ✨ Features

- **Rapid Scaffolding**: Create complete folder structures in seconds
- **Optional Generators**: Include API routes, React hooks, and components with simple flags
- **TypeScript Support**: Built with TypeScript, generates `.ts` and `.tsx` files
- **Consistent Architecture**: Enforces standardized project structure

## 📦 Installation

Use directly with `npx`:

```bash
npx creata-cli cre <service-name> [options]
```

Or install globally:

```bash
npm install -g creata-cli
```

## 🛠️ Usage

### Basic Command

```bash
creata cre <service-name>
```

### Available Options

| Flag                | Alias | Description                  |
| ------------------- | ----- | ---------------------------- |
| `--with-api`        | `-a`  | Generate API route           |
| `--with-hooks`      | `-h`  | Generate custom hooks        |
| `--with-components` | `-c`  | Generate component templates |

### Examples

1. **Create a basic service:**

```bash
creata cre dashboard
```

2. **Create service with API:**

```bash
creata cre products --with-api
# or
creata cre products -a
```

3. **Create full service:**

```bash
creata cre user-profile -a -h -c
```

## 📁 Generated Structure

Basic structure:

```
src/app/
└── service-name/
    └── page.tsx
```

Full structure (with all options):

```
src/app/
└── service-name/
    ├── api/
    │   └── route.ts
    ├── components/
    │   └── ServiceNameWidget.tsx
    ├── hooks/
    │   └── useServiceName.ts
    └── page.tsx
```

## 🧪 Development

1. **Clone and Install:**

```bash
git clone <repository-url>
cd creata-cli
npm install
```

2. **Run Locally:**

```bash
npm run dev -- cre example-service -a -h -c
```

3. **Build:**

```bash
npm run build
```

## 🔧 Commands

```bash
# Development
npm run dev

# Build
npm run build

# Create new service
npm run cre
```

## 📝 License

ISC

## ✍️ Author

Created by **Lam Anh Truong**  
📧 Email: anhlamtruong1012@gmail.com

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

Please use the [issues page](https://github.com/anhlamtruong/portfolio-anh/issues) to report any bugs or request features.
