import Link from 'next/link';
import { Simbolo } from './Marca';

const COLUNAS = [
  {
    titulo: 'Produto',
    itens: [
      { href: '/plataforma/', rotulo: 'A plataforma' },
      { href: '/integridade/', rotulo: 'Verificação de integridade' },
      { href: '/produto/', rotulo: 'O que cobrimos' },
      { href: '/seguranca/', rotulo: 'Segurança e privacidade' },
    ],
  },
  {
    titulo: 'Empresa',
    itens: [
      { href: '/contato/', rotulo: 'Falar com a Dalia' },
      { href: '/politica-privacidade/', rotulo: 'Política de privacidade' },
      { href: '/termos/', rotulo: 'Termos de uso' },
    ],
  },
];

export function Rodape() {
  return (
    <footer className="border-t border-linha-suave bg-fundo-2">
      <div className="envolve grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Simbolo tamanho={30} />
            <span className="font-display text-[1.05rem] font-extrabold tracking-[0.14em]">DALIA</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[0.95rem] text-texto-2">
            Quando o significado muda, o risco começa.
          </p>
          <a
            href="mailto:contato@dalia.tec.br"
            className="mt-4 inline-block text-[0.95rem] text-teal underline-offset-4 hover:underline"
          >
            contato@dalia.tec.br
          </a>
        </div>

        {COLUNAS.map((coluna) => (
          <nav key={coluna.titulo} aria-label={coluna.titulo}>
            <h2 className="etiqueta">{coluna.titulo}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.95rem] text-texto-2">
              {coluna.itens.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-texto">
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-linha-suave">
        <div className="envolve flex flex-wrap items-center justify-between gap-3 py-5 text-[0.85rem] text-texto-3">
          {/* Sem ano: pagina estatica congelaria o ano do build e envelheceria sozinha. */}
          <span>© DALIA — Enterprise Semantic Risk Control</span>
          <span>Feito no Brasil</span>
        </div>
      </div>
    </footer>
  );
}
