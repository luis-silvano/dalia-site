'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Marca } from './Marca';

const LINKS = [
  { href: '/plataforma/', rotulo: 'Plataforma' },
  { href: '/produto/', rotulo: 'O que cobrimos' },
  { href: '/integridade/', rotulo: 'Integridade' },
  { href: '/seguranca/', rotulo: 'Segurança' },
];

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-linha-suave bg-[rgba(10,16,23,0.86)] backdrop-blur-md">
      <div className="envolve flex items-center justify-between gap-6 py-3.5">
        <Marca />

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[0.94rem] text-texto-2 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-texto">
              {l.rotulo}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contato/" className="botao botao-primario hidden sm:inline-flex">
            Solicitar avaliação
          </Link>
          <button
            type="button"
            className="botao botao-fantasma md:hidden"
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-mobile" aria-label="Principal (celular)" className="border-t border-linha-suave md:hidden">
          <div className="envolve flex flex-col py-2">
            {[...LINKS, { href: '/contato/', rotulo: 'Falar com a Dalia' }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="border-b border-linha-suave py-3 text-texto-2 last:border-0"
                onClick={() => setAberto(false)}
              >
                {l.rotulo}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
