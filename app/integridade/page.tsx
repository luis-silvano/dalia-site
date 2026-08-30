import type { Metadata } from 'next';
import Link from 'next/link';
import { DemoIntegridade } from '@/components/DemoIntegridade';

export const metadata: Metadata = {
  title: 'Verificação de integridade',
  description:
    'Compare o que roda em produção com o que foi aprovado. Hash SHA-256 por arquivo, perícia do que divergir e relatório de evidência datado. Teste agora no seu navegador.',
  alternates: { canonical: '/integridade/' },
};

const ETAPAS = [
  {
    titulo: 'Compara o conteúdo, não a data',
    texto:
      'Cada arquivo aprovado tem o SHA-256 do seu conteúdo exato guardado na Dalia. Fim de linha e o carimbo de aprovação são normalizados antes da comparação, então só diferença real de conteúdo acusa divergência.',
  },
  {
    titulo: 'Separa o que divergiu e como',
    texto:
      'A verificação classifica cada arquivo em íntegro, alterado fora do fluxo, em produção sem versão aprovada, ou aprovado e ausente em produção. Arquivo novo também é periciado — é por onde um atacante costuma entrar.',
  },
  {
    titulo: 'Pericia a diferença',
    texto:
      'Sobre o diff, detectores determinísticos procuram comunicação de rede nova, execução de comando, credencial em claro, controle de acesso afrouxado e mudança de destino de escrita. O que casa vira achado com severidade.',
  },
  {
    titulo: 'Identifica a autoria',
    texto:
      'Quando o arquivo vem de um repositório conectado, a Dalia busca o último commit que tocou aquele caminho e traz autor, data, mensagem e o link do commit.',
  },
  {
    titulo: 'Vira evidência',
    texto:
      'O achado gera relatório em PDF com hashes, diff, padrões detectados, veredito e autoria — e dispara alerta para a equipe de segurança. É o documento que a auditoria pede no fim do ano.',
  },
];

export default function Integridade() {
  return (
    <>
      <section className="pb-9 pt-16">
        <div className="envolve">
          <p className="sobrancelha">Verificação de integridade</p>
          <h1 className="mt-3.5">A diferença entre confiar e provar é um hash</h1>
          <p className="chamada mt-5 text-[1.15rem]">
            Um sistema comprometido não para de funcionar — é exatamente esse o objetivo de quem o compromete. A
            verificação de integridade da Dalia compara, arquivo por arquivo, o que está rodando com o que foi
            aprovado, e explica o que mudou e por que aquilo é perigoso.
          </p>
        </div>
      </section>

      <section className="faixa py-14">
        <div className="envolve">
          <div className="mb-8 max-w-[70ch]">
            <h2>Teste aqui mesmo</h2>
            <p className="chamada mt-3.5">
              Esta demonstração roda inteira no seu navegador — é a mesma lógica de comparação e os mesmos detectores
              da plataforma. Cole o seu próprio código se quiser.
            </p>
          </div>
          <DemoIntegridade />
        </div>
      </section>

      <section className="py-[74px]">
        <div className="envolve">
          <div className="mb-9 max-w-[70ch]">
            <p className="sobrancelha">Na plataforma</p>
            <h2 className="mt-3.5">O que a verificação completa faz</h2>
            <p className="chamada mt-3.5">
              A demonstração acima é um recorte. Rodando sobre o seu repositório, a verificação percorre este caminho:
            </p>
          </div>

          {/* Ordem real de execucao — por isso numerado. */}
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ETAPAS.map((etapa, i) => (
              <li key={etapa.titulo} className="cartao p-6">
                <span className="font-mono text-[0.74rem] font-semibold text-teal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2.5 mt-2.5">{etapa.titulo}</h3>
                <p className="text-[0.94rem] text-texto-2">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="faixa py-[74px]">
        <div className="envolve grid items-start gap-9 lg:grid-cols-2">
          <div>
            <p className="sobrancelha">Limites, ditos com todas as letras</p>
            <h2 className="mt-3.5">O que o relatório atesta — e o que não atesta</h2>
            <p className="chamada mt-4">
              A verificação prova correspondência de conteúdo na data indicada. Ela não é atestado de correção
              funcional nem de que a alteração foi mal-intencionada: essa leitura é do time, com a evidência na mão.
              Preferimos escrever isso aqui do que deixar sua auditoria descobrir depois.
            </p>
          </div>

          <div className="cartao p-6">
            <h3>Onde ela entra na sua rotina</h3>
            <ul className="mt-4 flex flex-col gap-3 text-[0.95rem] text-texto-2">
              <li>
                <b className="font-semibold text-texto">Periódica</b> — roda no ciclo que você definir e só fala quando
                encontra divergência.
              </li>
              <li>
                <b className="font-semibold text-texto">Sob demanda</b> — antes de uma auditoria, depois de um
                incidente, ou quando alguém precisa de uma resposta agora.
              </li>
              <li>
                <b className="font-semibold text-texto">Restrita</b> — a aba de integridade é acessível apenas a quem
                tem perfil de administrador na sua organização.
              </li>
            </ul>
            <Link href="/contato/" className="botao botao-primario mt-6">
              Ver rodando no seu código
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
