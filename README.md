# Star Wars Random Character

Proyecto base con Next.js (App Router), TypeScript y Tailwind CSS.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estructura de enrutamiento

```text
/
├─ /characters
│  └─ /characters/[id]
└─ /not-found (automatica)
```

## Archivos clave

- `src/app/page.tsx`: landing con links de navegacion.
- `src/app/characters/page.tsx`: listado preparado para consumir API.
- `src/app/characters/[id]/page.tsx`: detalle dinamico por id preparado para API.

## Desarrollo

1. Instala dependencias (`npm install`) si aun no estan instaladas.
2. Ejecuta `npm run dev`.
3. Abre `http://localhost:3000`.
