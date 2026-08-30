import type { MetadataRoute } from 'next';

const BASE = 'https://dalia.tec.br';

const PAGINAS: { caminho: string; prioridade: number }[] = [
  { caminho: '/', prioridade: 1 },
  { caminho: '/integridade/', prioridade: 0.9 },
  { caminho: '/produto/', prioridade: 0.8 },
  { caminho: '/seguranca/', prioridade: 0.7 },
  { caminho: '/contato/', prioridade: 0.6 },
  { caminho: '/politica-privacidade/', prioridade: 0.2 },
];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGINAS.map(({ caminho, prioridade }) => ({
    url: BASE + caminho,
    changeFrequency: 'monthly',
    priority: prioridade,
  }));
}
