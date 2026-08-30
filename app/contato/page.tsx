import type { Metadata } from 'next';
import { FormularioContato } from '@/components/FormularioContato';

export const metadata: Metadata = {
  title: 'Falar com a Dalia',
  description:
    'Avaliação da plataforma, verificação de integridade ou documentação para análise de fornecedor. Fale com a Dalia.',
  alternates: { canonical: '/contato/' },
};

export default function Contato() {
  return (
    <section className="pb-[90px] pt-16">
      <div className="envolve grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="sobrancelha">Falar com a Dalia</p>
          <h1 className="mt-3.5 text-[clamp(2rem,4vw,3rem)]">Comece pelo seu próprio código</h1>
          <p className="chamada mt-5">
            A conversa mais útil não é uma apresentação: é rodar a verificação sobre um repositório seu e olhar o
            resultado junto. Alguns repositórios seus, um interlocutor técnico, nenhuma mudança no seu ambiente.
          </p>

          <dl className="mt-8 flex flex-col gap-5 text-[0.95rem]">
            <div>
              <dt className="etiqueta">E-mail</dt>
              <dd className="mt-1.5">
                <a href="mailto:contato@dalia.tec.br" className="text-teal underline-offset-4 hover:underline">
                  contato@dalia.tec.br
                </a>
              </dd>
            </div>
            <div>
              <dt className="etiqueta">O que ajuda saber de antemão</dt>
              <dd className="mt-1.5 text-texto-2">
                Linguagens principais, se o código está em Git ou não, e o que motivou o contato — auditoria,
                incidente, ou uma pergunta que ficou sem resposta.
              </dd>
            </div>
            <div>
              <dt className="etiqueta">Resposta</dt>
              <dd className="mt-1.5 text-texto-2">Em até um dia útil, por uma pessoa.</dd>
            </div>
          </dl>
        </div>

        <FormularioContato />
      </div>
    </section>
  );
}
