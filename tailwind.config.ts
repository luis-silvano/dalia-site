import type { Config } from 'tailwindcss';

/**
 * Tokens da marca DALIA.
 * A fonte da verdade das cores e o :root em app/globals.css — aqui elas sao
 * apenas expostas ao Tailwind, para nao existirem dois lugares para editar.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './conteudo/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fundo: 'var(--fundo)',
        'fundo-2': 'var(--fundo-2)',
        superficie: 'var(--superficie)',
        'superficie-2': 'var(--superficie-2)',
        linha: 'var(--linha)',
        'linha-suave': 'var(--linha-suave)',
        texto: 'var(--texto)',
        'texto-2': 'var(--texto-2)',
        'texto-3': 'var(--texto-3)',
        teal: 'var(--teal)',
        ouro: 'var(--ouro)',
        critico: 'var(--critico)',
      },
      fontFamily: {
        display: 'var(--fonte-display)',
        corpo: 'var(--fonte-corpo)',
        mono: 'var(--fonte-mono)',
      },
      maxWidth: {
        conteudo: '1140px',
        leitura: '65ch',
      },
    },
  },
  plugins: [],
};

export default config;
