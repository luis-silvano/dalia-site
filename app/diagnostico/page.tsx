import type { Metadata } from 'next';
import Link from 'next/link';
import { CAMADAS, CRONOGRAMA, ENTREGAS, FAIXAS, LIMITES, PRECISAMOS, PRECO, ROTA } from '@/conteudo/diagnostico';

export const metadata: Metadata = {
  title: 'Diagnóstico de Integridade',
  description: `Uma fotografia pericial do seu código em ${PRECO.diasPorExtenso} dias úteis: linha de base SHA-256, perícia do estado atual e as mudanças de regra de negócio que passaram nos últimos 90 dias. ${PRECO.base}, sem instalar nada.`,
  alternates: { canonical: ROTA },
};

export default function Diagnostico() {
  return (
    <>
      <section className="pb-9 pt-16">
        <div className="envolve">
          <p className="sobrancelha">Diagnóstico de Integridade</p>
          <h1 className="mt-3.5">Cinco dias para saber o que o seu código faz sem você saber</h1>
          <p className="chamada mt-5 text-[1.15rem]">
            Toda empresa sabe o que aprovou. Quase nenhuma consegue provar que o que está rodando é exatamente
            aquilo, nem apontar, com data e autor, o que mudou no caminho. O Diagnóstico responde isso sobre até{' '}
            {PRECO.repositoriosPorExtenso} repositórios seus, com evidência documental, sem instalar nada.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/contato/" className="botao botao-primario">
              Quero o Diagnóstico
            </Link>
            <Link href="/integridade/" className="botao botao-fantasma">
              Testar a perícia no navegador
            </Link>
          </div>
        </div>
      </section>

      <section className="faixa py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Escala</p>
            <h2 className="mt-3.5">Como ele cobre parques grandes</h2>
            <p className="chamada mt-3.5">
              A Dalia trabalha em duas camadas, e é isso que permite cobrir centenas de repositórios sem transformar
              o projeto em obra. Na prática: você não paga leitura profunda de 300 repositórios para descobrir que o
              risco estava em 19 deles.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {CAMADAS.map((camada) => (
              <div key={camada.titulo} className="cartao p-6">
                <h3 className="mb-2.5">{camada.titulo}</h3>
                <p className="text-[0.94rem] text-texto-2">{camada.texto}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-[0.94rem]">
              <caption className="sobrancelha mb-3 text-left">Faixas</caption>
              <thead>
                <tr className="border-b border-linha-suave text-texto">
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Faixa</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Perícia completa</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Leitura semântica e retroativo</th>
                  <th scope="col" className="py-2.5 pr-4 font-semibold">Prazo</th>
                  <th scope="col" className="py-2.5 font-semibold">Investimento</th>
                </tr>
              </thead>
              <tbody className="text-texto-2">
                {FAIXAS.map((f) => (
                  <tr key={f.nome} className="border-b border-linha-suave last:border-0">
                    <th scope="row" className={`py-3 pr-4 font-semibold ${f.destaque ? 'text-teal' : 'text-texto'}`}>
                      {f.nome}
                    </th>
                    <td className="py-3 pr-4">{f.pericia}</td>
                    <td className="py-3 pr-4">{f.semantica}</td>
                    <td className="py-3 pr-4">{f.prazo}</td>
                    <td className="py-3 font-semibold text-texto tabular-nums">{f.preco}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 max-w-[70ch] text-[0.9rem] text-texto-2">
            Repositório adicional no Essencial e no Ampliado: {PRECO.repositorioAdicional}. O Panorama é orçado por
            faixa de parque. <b className="font-semibold text-texto">O valor do Diagnóstico é abatido da
            implantação</b> se a plataforma for contratada em até 60 dias da entrega do relatório.
          </p>
        </div>
      </section>

      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Entrega</p>
            <h2 className="mt-3.5">O que você recebe</h2>
            <p className="chamada mt-3.5">
              Tudo chega como um relatório em PDF, datado, que serve de evidência em auditoria interna.
            </p>
          </div>

          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ENTREGAS.map((entrega) => (
              <li key={entrega.titulo} className="cartao p-6">
                {entrega.opcional && (
                  <span className="font-mono text-[0.74rem] font-semibold text-teal">opcional</span>
                )}
                <h3 className={entrega.opcional ? 'mb-2.5 mt-2.5' : 'mb-2.5'}>{entrega.titulo}</h3>
                <p className="text-[0.94rem] text-texto-2">{entrega.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faixa py-[74px]">
        <div className="envolve grid items-start gap-9 lg:grid-cols-2">
          <div>
            <p className="sobrancelha">Como funciona</p>
            <h2 className="mt-3.5">Duas reuniões suas, o resto é nosso</h2>

            {/* Ordem cronologica de verdade — por isso a coluna de dia. */}
            <ol className="mt-6 flex flex-col gap-4">
              {CRONOGRAMA.map((etapa) => (
                <li key={etapa.quando} className="flex gap-4">
                  <span className="min-w-[5.5rem] shrink-0 font-mono text-[0.78rem] font-semibold text-teal">
                    {etapa.quando}
                  </span>
                  <span className="text-[0.95rem] text-texto-2">{etapa.oQue}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="cartao p-6">
            <h3>O que precisamos de você</h3>
            <ul className="mt-4 flex flex-col gap-3 text-[0.95rem] text-texto-2">
              {PRECISAMOS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-7 border-t border-linha-suave pt-6">
              <p className="sobrancelha">Investimento</p>
              <p className="mt-2.5 text-[2rem] font-semibold leading-none text-texto">{PRECO.base}</p>
              <p className="mt-3 text-[0.95rem] text-texto-2">
                Até {PRECO.repositoriosPorExtenso} repositórios, {PRECO.diasPorExtenso} dias úteis. Repositório adicional a{' '}
                {PRECO.repositorioAdicional}. Pagamento na entrega do relatório.
              </p>
              <Link href="/contato/" className="botao botao-primario mt-6">
                Quero o Diagnóstico
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[74px]">
        <div className="envolve max-w-[70ch]">
          <p className="sobrancelha">Limites, ditos com todas as letras</p>
          <h2 className="mt-3.5">{LIMITES.titulo}</h2>
          {LIMITES.paragrafos.map((paragrafo) => (
            <p key={paragrafo} className="chamada mt-4">
              {paragrafo}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
