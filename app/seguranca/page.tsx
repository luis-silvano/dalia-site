import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Segurança e privacidade',
  description:
    'Como a Dalia trata o seu código: acesso somente leitura e revogável, vedação de treino de modelos, isolamento por organização, LGPD por contrato e notificação de incidente em 24 horas.',
  alternates: { canonical: '/seguranca/' },
};

const BLOCOS = [
  {
    titulo: 'Seu código não treina modelo nenhum',
    itens: [
      'Vedação contratual nossa e dos provedores de IA que utilizamos.',
      'Regime de retenção zero disponível, sem armazenamento de prompt do lado do provedor.',
      'O conteúdo enviado para análise é o necessário para classificar a mudança, não o repositório inteiro.',
    ],
  },
  {
    titulo: 'Acesso somente leitura, revogável a qualquer momento',
    itens: [
      'A Dalia não escreve no seu ambiente: ela lê, comenta no pull request e registra decisão na própria plataforma.',
      'Instalação por aplicativo do GitHub ou conexão com o Azure DevOps, com permissão limitada aos repositórios que você escolher.',
      'Em ambientes sem versionamento, nem acesso é necessário: você envia os arquivos.',
      'Revogar o acesso interrompe a coleta imediatamente.',
    ],
  },
  {
    titulo: 'Isolamento entre organizações',
    itens: [
      'Segregação lógica multi-inquilino: todo dado é endereçado pela organização dona.',
      'Identidade corporativa com múltiplo fator, provisionamento por convite e perfis por papel.',
      'Áreas sensíveis — integridade e decisões de risco — restritas a perfil de administrador.',
    ],
  },
  {
    titulo: 'LGPD por contrato, não por promessa',
    itens: [
      'Adendo de proteção de dados completo, com subprocessadores nomeados.',
      'Notificação de incidente de segurança em até 24 horas.',
      'Devolução e eliminação dos dados ao fim do contrato, com atestado.',
      'A Dalia processa código-fonte e metadados de repositório. Se dado pessoal aparecer no código, ele é tratado sob o mesmo adendo.',
    ],
  },
];

export default function Seguranca() {
  return (
    <>
      <section className="pb-10 pt-16">
        <div className="envolve">
          <p className="sobrancelha">Segurança e privacidade</p>
          <h1 className="mt-3.5">Feita para passar pela análise do seu time</h1>
          <p className="chamada mt-5 text-[1.15rem]">
            Vender uma ferramenta de segurança para quem entende de segurança tem um pré-requisito: responder às
            perguntas difíceis antes de elas serem feitas. Esta página existe para o seu time de segurança da
            informação, não para o seu time de compras.
          </p>
        </div>
      </section>

      <section className="faixa py-14">
        <div className="envolve grid gap-5 md:grid-cols-2">
          {BLOCOS.map((bloco) => (
            <article key={bloco.titulo} className="cartao p-6">
              <h2 className="text-[1.25rem]">{bloco.titulo}</h2>
              <ul className="mt-4 flex flex-col gap-2.5 text-[0.95rem] text-texto-2">
                {bloco.itens.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-[74px]">
        <div className="envolve grid items-start gap-9 lg:grid-cols-2">
          <div>
            <p className="sobrancelha">Diligência</p>
            <h2 className="mt-3.5">Documentação para a sua análise de fornecedor</h2>
            <p className="chamada mt-4">
              Sob acordo de confidencialidade, disponibilizamos o adendo de proteção de dados, a relação de
              subprocessadores, a descrição da arquitetura e o desenho de retenção. Se o seu time tiver questionário
              próprio de fornecedor, respondemos no formato dele.
            </p>
            <Link href="/contato/" className="botao botao-primario mt-6">
              Solicitar a documentação
            </Link>
          </div>

          <div className="cartao p-6">
            <h3>Encontrou algo?</h3>
            <p className="mt-3 text-[0.95rem] text-texto-2">
              Se você identificar uma vulnerabilidade na plataforma ou neste site, escreva para{' '}
              <a
                href="mailto:contato@dalia.tec.br"
                className="text-teal underline-offset-4 hover:underline"
              >
                contato@dalia.tec.br
              </a>
              . Respondemos em até dois dias úteis e não tomamos medida legal contra pesquisa feita de boa-fé, sem
              acesso a dado de terceiro e sem degradar o serviço.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
