import type { Metadata } from 'next';
import Link from 'next/link';
import { CAPACIDADES, TRILHA } from '@/conteudo/plataforma';

export const metadata: Metadata = {
  title: 'A plataforma',
  description:
    'Documentação automática em linguagem de negócio, catálogo de bases governadas, drift semântico com decisão nominal, simulação antes do merge e verificação de integridade em produção.',
  alternates: { canonical: '/plataforma/' },
};

export default function Plataforma() {
  return (
    <>
      <section className="pb-10 pt-16">
        <div className="envolve">
          <p className="sobrancelha">A plataforma</p>
          <h1 className="mt-3.5">Cinco peças de um ciclo só</h1>
          <p className="chamada mt-5 text-[1.15rem]">
            A Dalia documenta o que o código faz, declara o que é crítico, traduz cada mudança em risco de negócio,
            deixa você simular antes de mergear e, no fim, prova que o que roda em produção é o que foi aprovado. Cada
            peça sustenta a seguinte.
          </p>

          {/* Indice: a ordem e a do ciclo, por isso numerado. */}
          <ol className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CAPACIDADES.map((c, i) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="cartao flex h-full flex-col gap-1.5 p-4 transition-colors hover:border-teal"
                >
                  <span className="font-mono text-[0.72rem] font-semibold text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[1.02rem] font-semibold">{c.etiqueta}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {CAPACIDADES.map((capacidade, i) => (
        <section
          key={capacidade.id}
          id={capacidade.id}
          className={(i % 2 === 0 ? 'faixa ' : '') + 'scroll-mt-20 py-14'}
        >
          <div className="envolve grid items-start gap-9 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="etiqueta">
                {String(i + 1).padStart(2, '0')} · {capacidade.etiqueta}
              </p>
              <h2 className="mt-3">{capacidade.titulo}</h2>
              <p className="chamada mt-4">{capacidade.chamada}</p>

              {capacidade.destaque && (
                <figure className="mt-6 border-l-2 border-teal pl-4">
                  <figcaption className="etiqueta">{capacidade.destaque.fonte}</figcaption>
                  <blockquote className="mt-2 text-[0.98rem] text-texto-2">{capacidade.destaque.texto}</blockquote>
                </figure>
              )}

              {capacidade.id === 'integridade' && (
                <Link href="/integridade/" className="botao botao-primario mt-6">
                  Testar a verificação agora
                </Link>
              )}
            </div>

            <ul className="cartao flex flex-col divide-y divide-[color:var(--linha-suave)]">
              {capacidade.itens.map((item) => (
                <li key={item} className="px-5 py-4 text-[0.95rem] text-texto-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Em volta do ciclo</p>
            <h2 className="mt-3.5">O que sustenta a operação do dia a dia</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {TRILHA.map((item) => (
              <article key={item.titulo} className="cartao p-6">
                <h3>{item.titulo}</h3>
                <p className="mt-2.5 text-[0.94rem] text-texto-2">{item.texto}</p>
              </article>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/produto/" className="botao botao-fantasma">
              Ver a cobertura por linguagem
            </Link>
            <Link href="/contato/" className="botao botao-primario">
              Solicitar avaliação
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
