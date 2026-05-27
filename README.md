# Star Wars Random Character

Aplicacion web construida con Next.js (App Router), TypeScript y Tailwind CSS para explorar personajes de Star Wars.

## Descripcion

El proyecto incluye tres experiencias principales:

- Generador aleatorio de personaje.
- Buscador manual con filtros.
- Vista de detalle por personaje.

La app consume datos de una API publica y aplica manejo visual de errores para imagenes invalidas o de mala calidad.

## Stack tecnico

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## API utilizada

Fuente de datos principal:

- Endpoint: https://akabab.github.io/starwars-api/api/all.json
- Archivo de acceso: src/data/swapi.ts

Funciones principales de datos:

- getCharacters(): obtiene todos los personajes.
- getCharacterById(id): busca un personaje por id.
- toBirthYear(value): convierte anio numerico a formato BBY/ABY.

Estrategia de cache en fetch (server):

- Revalidacion cada 3600 segundos (1 hora).

## Funcionalidades implementadas

### 1) Home (generador aleatorio)

Ruta: /

- Carga personajes y selecciona uno aleatorio.
- Boton para generar otro personaje al instante.
- Muestra datos relevantes (especie, afiliaciones, planeta, altura, etc).
- Link directo al buscador manual.

Archivo principal:

- src/app/page.tsx

### 2) Busqueda y filtros

Ruta: /characters

- Busqueda por nombre.
- Filtro por especie.
- Filtro por afiliacion.
- Boton para limpiar filtros.
- Paginacion de resultados.

Archivo principal:

- src/app/characters/page.tsx

### 3) Detalle por personaje

Ruta: /characters/[id]

- Render dinamico por id.
- Si no existe personaje, usa notFound().
- Muestra estadisticas y link a wiki oficial del personaje.

Archivo principal:

- src/app/characters/[id]/page.tsx

## Error de fotos y solucion aplicada

### Problema

La API puede devolver imagenes default, ya que la foto del personaje no está disponible

### Solucion implementada

Se creo un componente reutilizable para imagenes:

- Archivo: src/app/components/CharacterImage.tsx

Ese componente aplica deteccion automatica de calidad al cargar la imagen y decide si mostrar la foto o fallback.

Criterios actuales para fallback:

- naturalWidth < 220
- naturalHeight < 220
- area total < 120000
- aspect ratio < 0.5
- aspect ratio > 1.8

Ademas, si la imagen dispara onError, tambien cae al fallback.

Mensaje de fallback unificado:

- Imagen no disponible. Error de la base de datos

Este comportamiento ya esta aplicado en:

- Home
- Busqueda
- Detalle por id

## Estructura de rutas

```text
/
├─ /characters
│  └─ /characters/[id]
└─ /not-found
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Instalacion y ejecucion local

1. Instala dependencias:

```bash
npm install
```

2. Inicia entorno de desarrollo:

```bash
npm run dev
```

3. Abre en navegador:

- http://localhost:3000

## Archivos clave del proyecto

- src/data/swapi.ts: capa de datos y acceso a API.
- src/app/page.tsx: home con generador aleatorio.
- src/app/characters/page.tsx: buscador con filtros y paginacion.
- src/app/characters/[id]/page.tsx: detalle por personaje.
- src/app/components/CharacterImage.tsx: control de imagen y fallback automatico.

## Notas

- El proyecto usa App Router de Next.js.
- El estilo visual es tematico Star Wars con fondos gradiente, tarjetas y efectos de brillo.
