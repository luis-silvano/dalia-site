import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import { Cabecalho } from '@/components/Cabecalho';
import { Rodape } from '@/components/Rodape';
import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--fonte-display-arquivo',
  display: 'swap',
});

const corpo = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--fonte-corpo-arquivo',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--fonte-mono-arquivo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dalia.tec.br'),
  title: {
    default: 'DALIA — Controle semântico de risco em código',
    template: '%s — DALIA',
  },
  description:
    'A Dalia guarda a impressão digital de cada arquivo aprovado e detecta alterações feitas fora do fluxo, com o diff, o risco e a autoria. Verifique a integridade do seu código.',
  keywords: [
    'integridade de código',
    'governança de código',
    'risco semântico',
    'auditoria de repositório',
    'SHA-256',
    'LGPD',
    'compliance',
  ],
  authors: [{ name: 'DALIA' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dalia.tec.br',
    siteName: 'DALIA',
    title: 'DALIA — Controle semântico de risco em código',
    description:
      'O que roda em produção é exatamente o que foi aprovado? A Dalia prova, com hash por arquivo e perícia do que divergir.',
    images: [{ url: '/marca/og.png', width: 1200, height: 630, alt: 'DALIA — Enterprise Semantic Risk Control' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DALIA — Controle semântico de risco em código',
    description:
      'O que roda em produção é exatamente o que foi aprovado? A Dalia prova, com hash por arquivo e perícia do que divergir.',
    images: ['/marca/og.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#0a1017',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable} ${mono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:font-semibold focus:text-[#06231f]"
        >
          Pular para o conteúdo
        </a>
        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
