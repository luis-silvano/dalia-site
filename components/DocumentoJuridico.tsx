import Link from 'next/link';
import type { Documento, Bloco } from '@/conteudo/juridico';

function Conteudo({ bloco }: { bloco: Bloco }) {
  if (bloco.tipo === 'paragrafo') {
    return <p className="text-[1.01rem] text-texto-2">{bloco.texto}</p>;
  }

  if (bloco.tipo === 'lista') {
    return (
      <ul className="flex flex-col gap-2.5">
        {bloco.itens.map((item) => (
          <li key={item} className="flex gap-2.5 text-[1.01rem] text-texto-2">
            <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-linha bg-superficie">
      <table className="w-full border-collapse text-[0.95rem]">
        <caption className="sr-only">{bloco.legenda}</caption>
        <thead>
          <tr>
            {bloco.colunas.map((coluna) => (
              <th
                key={coluna}
                scope="col"
                className="border-b border-linha px-3.5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-texto-3"
              >
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bloco.linhas.map((linha) => (
            <tr key={linha[0]}>
              {linha.map((celula, i) => (
                <td
                  key={i}
                  className={
                    'border-b border-linha-suave px-3.5 py-3.5 align-top ' +
                    (i === 0 ? 'font-semibold text-texto' : 'text-texto-2')
                  }
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocumentoJuridico({ documento }: { documento: Documento }) {
  return (
    <section className="pb-[90px] pt-16">
      <div className="envolve">
        <p className="sobrancelha">{documento.sobrancelha}</p>
        <h1 className="mt-3.5 text-[clamp(2rem,4vw,2.9rem)]">{documento.titulo}</h1>
        <p className="chamada mt-5">{documento.resumo}</p>
        <p className="mt-5 text-[0.86rem] text-texto-3">
          Versão de {documento.atualizadoEm}. Aplica-se a {documento.escopo}.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[240px_1fr]">
          {/* Indice: numerado porque as clausulas sao referenciadas pelo numero. */}
          <nav aria-label="Índice do documento" className="lg:sticky lg:top-24">
            <h2 className="etiqueta">Índice</h2>
            <ol className="mt-4 flex flex-col gap-2 text-[0.9rem]">
              {documento.secoes.map((secao, i) => (
                <li key={secao.id} className="flex gap-2.5">
                  <span className="font-mono text-[0.78rem] text-texto-3 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <a href={`#${secao.id}`} className="text-texto-2 transition-colors hover:text-teal">
                    {secao.titulo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex max-w-[72ch] flex-col gap-11">
            {documento.secoes.map((secao, i) => (
              <section key={secao.id} id={secao.id} className="scroll-mt-24">
                <h2 className="text-[1.35rem]">
                  <span className="mr-2.5 font-mono text-[0.85rem] font-normal text-teal tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {secao.titulo}
                </h2>
                <div className="mt-4 flex flex-col gap-4">
                  {secao.blocos.map((bloco, j) => (
                    <Conteudo key={j} bloco={bloco} />
                  ))}
                </div>
              </section>
            ))}

            <div className="cartao p-6">
              <h2 className="text-[1.15rem]">{documento.rodape.titulo}</h2>
              <p className="mt-2.5 text-[0.98rem] text-texto-2">{documento.rodape.texto}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="mailto:contato@dalia.tec.br" className="botao botao-primario">
                  Falar com a Dalia
                </a>
                <Link href={documento.rodape.linkHref} className="botao botao-fantasma">
                  {documento.rodape.linkRotulo}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
