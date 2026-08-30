import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'O que cobrimos',
  description:
    'Java e o stack corporativo, pipelines de dados e legado sem versionamento. A Dalia lê o significado da mudança e classifica o risco antes do merge.',
  alternates: { canonical: '/produto/' },
};

const FRENTES = [
  {
    etiqueta: 'Aplicação',
    titulo: 'Java e o stack corporativo',
    resumo:
      'O código que move dinheiro raramente é o que mais recebe atenção de segurança. A Dalia lê a mudança pelo que ela significa para o negócio.',
    exemplos: [
      'SQL embutido em @Query e text blocks, inclusive quando montado por concatenação',
      'Entidades JPA: coluna, tipo, nullability, índice — mudança de schema é mudança de contrato',
      'SecurityConfig: comparação por conjunto de rotas, então uma rota nova em permitAll não passa despercebida',
      '@Transactional e propagação alteradas, que mudam o que acontece quando algo falha no meio',
      'Arredondamento financeiro: BigDecimal, setScale e RoundingMode',
      '@Scheduled, listeners de fila e o que muda de janela ou de tópico',
      'Dependências do pom.xml e do build.gradle',
    ],
  },
  {
    etiqueta: 'Dados',
    titulo: 'Pipelines e transformações',
    resumo:
      'Um filtro alterado não gera erro. Gera um número diferente no relatório do mês que vem, sem nada que aponte para a causa.',
    exemplos: [
      'Universo processado: filtros, joins e a linha que passou a ficar de fora',
      'Janela de retenção e critério de expurgo',
      'Destino de escrita: a tabela que deixou de ser alimentada e a que passou a ser',
      'Granularidade e chave de agregação, que quebram a comparabilidade histórica',
      'SQL, PySpark, dbt e notebooks',
    ],
  },
  {
    etiqueta: 'Legado sem git',
    titulo: 'SAS e ambientes sem versionamento',
    resumo:
      'Onde não existe controle de versão, não existe nem ponto de partida. A Dalia constrói o baseline e depois passa a vigiá-lo.',
    exemplos: [
      'Resolução de %include entre arquivos, seguindo as macros de caminho',
      'Entrada no corpo da macro chamada, para achar a operação real — que costuma estar a dois ou três saltos do job',
      'Resolução de libname: libref para caminho, e daí para a tabela governada',
      'Grafo entre arquivos, que revela as escritas que somem quando se lê um arquivo isolado',
    ],
  },
];

export default function Produto() {
  return (
    <>
      <section className="pb-10 pt-16">
        <div className="envolve">
          <p className="sobrancelha">O que cobrimos</p>
          <h1 className="mt-3.5">Risco não é linha alterada. É significado alterado.</h1>
          <p className="chamada mt-5 text-[1.15rem]">
            Ferramentas de análise estática contam linhas e apontam padrões. A Dalia lê a mudança e responde outra
            pergunta: o que isso muda para o negócio, e quem precisa aprovar. Cada mudança volta como um cartão em
            linguagem de negócio, com a severidade e a decisão registrada nominalmente.
          </p>
        </div>
      </section>

      {FRENTES.map((frente, i) => (
        <section key={frente.titulo} className={i % 2 === 0 ? 'faixa py-14' : 'py-14'}>
          <div className="envolve grid items-start gap-9 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="etiqueta">{frente.etiqueta}</p>
              <h2 className="mt-3">{frente.titulo}</h2>
              <p className="chamada mt-4">{frente.resumo}</p>
            </div>
            <ul className="cartao flex flex-col divide-y divide-[color:var(--linha-suave)] p-0">
              {frente.exemplos.map((exemplo) => (
                <li key={exemplo} className="px-5 py-3.5 text-[0.95rem] text-texto-2">
                  {exemplo}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Governança</p>
            <h2 className="mt-3.5">A decisão fica registrada, e o merge respeita a decisão</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="cartao p-6">
              <h3>Placar por pull request</h3>
              <p className="mt-2.5 text-[0.95rem] text-texto-2">
                Um PR com cinco achados só libera quando os cinco tiverem decisão. Aprovar um não destrava o resto — e
                o check run mostra quantos faltam.
              </p>
            </article>
            <article className="cartao p-6">
              <h3>Decisão nominal</h3>
              <p className="mt-2.5 text-[0.95rem] text-texto-2">
                Quem aprovou, quando e com qual justificativa. É o que transforma revisão de código em trilha de
                auditoria.
              </p>
            </article>
            <article className="cartao p-6">
              <h3>Documentação que acompanha</h3>
              <p className="mt-2.5 text-[0.95rem] text-texto-2">
                A documentação do arquivo é atualizada junto com a aprovação, então ela não envelhece em relação ao
                código — o problema de toda documentação escrita à mão.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/integridade/" className="botao botao-primario">
              Ver a verificação de integridade
            </Link>
            <Link href="/contato/" className="botao botao-fantasma">
              Solicitar avaliação
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
