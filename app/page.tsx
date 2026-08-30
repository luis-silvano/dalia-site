import Link from 'next/link';
import { DemoIntegridade } from '@/components/DemoIntegridade';
import { FRENTES, PASSOS, PERGUNTAS_AUDITORIA } from '@/conteudo/home';
import { Clientes } from '@/components/Clientes';

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ tese */}
      <section className="relative overflow-hidden pb-9 pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[40%] bottom-[40%] right-[55%] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(39,189,176,0.10),transparent_70%)]"
        />
        <div className="envolve relative">
          <p className="sobrancelha">Controle semântico de risco</p>
          <h1 className="mt-3.5">
            O que roda em produção é <span className="text-teal">exatamente</span> o que foi aprovado?
          </h1>
          <p className="chamada mt-5 text-[1.22rem]">
            A Dalia guarda a impressão digital de cada arquivo aprovado e vigia o significado do seu código. Quando
            alguém altera produção por fora do fluxo, você não descobre meses depois — descobre na hora, com o diff, o
            risco e quem alterou.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#demonstracao" className="botao botao-primario">
              Ver a verificação funcionando
            </a>
            <Link href="/contato/" className="botao botao-fantasma">
              Falar com a Dalia
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-linha-suave pt-5 text-[0.86rem] text-texto-3">
            <li>
              <b className="font-semibold text-texto-2">SHA-256</b> por arquivo aprovado
            </li>
            <li>
              <b className="font-semibold text-texto-2">Java, SAS, SQL, Python</b> e mais
            </li>
            <li>
              <b className="font-semibold text-texto-2">Sem instalar agente</b> no seu ambiente
            </li>
            <li>
              <b className="font-semibold text-texto-2">Seu código não treina modelo</b>
            </li>
          </ul>
        </div>
      </section>

      <Clientes />

      {/* --------------------------------------------------- demonstracao */}
      <section id="demonstracao" className="faixa py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Demonstração ao vivo</p>
            <h2 className="mt-3.5">Altere o código e veja a perícia acontecer</h2>
            <p className="chamada mt-3.5">
              Abaixo está um serviço de pagamento aprovado na Dalia. Edite à vontade — ou use o botão para simular
              alguém mexendo direto em produção — e rode a verificação.
            </p>
          </div>
          <DemoIntegridade />
        </div>
      </section>

      {/* -------------------------------------------------------- frentes */}
      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">O que cobrimos</p>
            <h2 className="mt-3.5">A camada que antivírus e EDR não enxergam: o código de negócio</h2>
            <p className="chamada mt-3.5">
              Endpoint, rede e identidade já têm sensor. Uma linha alterada na regra de negócio não dispara nada — o
              sistema continua funcionando, só o significado mudou.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FRENTES.map((frente) => (
              <article key={frente.titulo} className="cartao p-6">
                <p className="etiqueta">{frente.etiqueta}</p>
                <h3 className="mb-2.5 mt-3">{frente.titulo}</h3>
                <p className="text-[0.96rem] text-texto-2">{frente.texto}</p>
              </article>
            ))}
          </div>

          <Link href="/produto/" className="botao botao-fantasma mt-7">
            Ver a cobertura em detalhe
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------- como funciona */}
      <section className="faixa py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Como funciona</p>
            <h2 className="mt-3.5">Sem instalar nada, sem mudar a sua esteira</h2>
          </div>

          {/* Numerado porque a ordem importa: cada passo depende do anterior. */}
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {PASSOS.map((passo, i) => (
              <li key={passo.titulo} className="cartao p-5">
                <span className="font-mono text-[0.74rem] font-semibold text-teal">Passo {i + 1}</span>
                <h3 className="mb-2 mt-2.5 text-[1.02rem]">{passo.titulo}</h3>
                <p className="text-[0.9rem] text-texto-2">{passo.texto}</p>
              </li>
            ))}
          </ol>

          <Link href="/plataforma/" className="botao botao-fantasma mt-8">
            Conhecer a plataforma inteira
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------ evidencia */}
      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Evidência</p>
            <h2 className="mt-3.5">As perguntas que a auditoria faz</h2>
            <p className="chamada mt-3.5">
              Compliance não pergunta se você tem uma ferramenta. Pergunta o que você consegue provar, e em quanto
              tempo.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-linha bg-superficie">
            <table className="w-full border-collapse text-[0.94rem]">
              <caption className="sr-only">
                Comparação entre a resposta usual e a resposta com a Dalia para as perguntas típicas de auditoria
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[38%] border-b border-linha px-3.5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-texto-3">
                    Pergunta
                  </th>
                  <th scope="col" className="border-b border-linha px-3.5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-texto-3">
                    Hoje, na prática
                  </th>
                  <th scope="col" className="border-b border-linha px-3.5 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-teal">
                    Com a Dalia
                  </th>
                </tr>
              </thead>
              <tbody>
                {PERGUNTAS_AUDITORIA.map((linha) => (
                  <tr key={linha.pergunta}>
                    <th scope="row" className="border-b border-linha-suave px-3.5 py-3.5 text-left align-top font-semibold text-texto">
                      {linha.pergunta}
                    </th>
                    <td className="border-b border-linha-suave px-3.5 py-3.5 align-top italic text-texto-3">
                      {linha.hoje}
                    </td>
                    <td className="border-b border-linha-suave px-3.5 py-3.5 align-top text-texto-2">{linha.dalia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <section className="pb-[90px] pt-4">
        <div className="envolve">
          <div className="cartao px-6 py-11 text-center">
            <p className="sobrancelha">Avaliação</p>
            <h2 className="mt-3">Transforme fé em prova, no seu próprio código</h2>
            <p className="mx-auto mt-3.5 max-w-[56ch] text-texto-2">
              Alguns repositórios seus, um interlocutor técnico, nenhuma mudança no seu ambiente. Você termina com o
              relatório de integridade do seu próprio código — e a perícia funcionando.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contato/" className="botao botao-primario">
                Solicitar avaliação
              </Link>
              <Link href="/seguranca/" className="botao botao-fantasma">
                Ler sobre segurança e privacidade
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
