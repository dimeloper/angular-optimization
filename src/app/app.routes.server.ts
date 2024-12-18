import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pokedex-bad', // This renders the "/pokedex-bad" route on the server (SSR)
    renderMode: RenderMode.Server,
  },
  {
    path: 'pokedex-optimized', // This renders the "/pokedex-optimized" route on the server (SSR)
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes - like the individual pokemon pages - will be rendered on the client (CSR)
    renderMode: RenderMode.Client,
  },
];
