# Detres Inmobiliaria

Portal inmobiliario construido con Next.js 15, Tailwind CSS v4 y Supabase.

## Requisitos

- Node.js 18+ (tienes v24, perfecto)
- Cuenta de Supabase (ya configurada) y de Vercel

## Puesta en marcha local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Las variables de entorno ya estan en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Crear el usuario administrador (una sola vez)

El panel `/admin` requiere una cuenta. Crea el usuario en Supabase:

1. Entra a tu proyecto en supabase.com
2. Authentication -> Users -> Add user -> Create new user
3. Escribe correo y contrasena y marca "Auto confirm user"
4. Ingresa en `/admin/login` con esas credenciales

## Estructura

- `src/app` - paginas (home, propiedades, ficha, nosotros, contacto, admin)
- `src/components` - componentes de UI y de admin
- `src/lib` - configuracion de marca, clientes de Supabase, consultas y utilidades
- `src/lib/config.ts` + `src/app/globals.css` - **identidad de marca** (nombre, contacto, colores). Cambiar la marca = editar estos dos archivos.

## Panel de administracion (`/admin`)

- Crear, editar, publicar/ocultar y eliminar propiedades
- Subir fotos (a Supabase Storage) o agregar por URL
- Ver solicitudes (leads) del formulario de contacto

## Base de datos

Tablas en Supabase: `properties`, `property_images`, `cities`, `agents`, `leads`.
Seguridad con RLS: el publico solo ve propiedades publicadas; la escritura requiere sesion de admin.

## Despliegue

Conectado a Vercel via GitHub: cada push a `main` despliega automaticamente.
Recuerda configurar en Vercel (Settings -> Environment Variables) las mismas dos variables de `.env.local`.
