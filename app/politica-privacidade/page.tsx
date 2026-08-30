import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como a Dalia trata informações coletadas neste site.',
  alternates: { canonical: '/politica-privacidade/' },
  robots: { index: true, follow: true },
};

/**
 * Texto migrado do site anterior, com correcoes de redacao (estava em portugues
 * de Portugal e com data em ingles) e a secao "Este site" reescrita para
 * descrever o que a pagina estatica realmente faz.
 * Revisao juridica pendente — ver README.
 */
export default function Privacidade() {
  return (
    <section className="pb-[90px] pt-16">
      <div className="envolve max-w-[75ch]">
        <p className="sobrancelha">Jurídico</p>
        <h1 className="mt-3.5 text-[clamp(2rem,4vw,2.8rem)]">Política de privacidade</h1>

        <div className="mt-8 flex flex-col gap-5 text-[1.02rem] text-texto-2 [&_h2]:mb-1 [&_h2]:mt-6 [&_h2]:text-texto [&_strong]:text-texto">
          <p>
            A sua privacidade é importante para nós. É política da Dalia respeitar a sua privacidade em relação a
            qualquer informação sua que possamos coletar neste site e nos demais sites que possuímos e operamos.
          </p>
          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe prestar um serviço.
            Fazemos isso por meios justos e legais, com o seu conhecimento e consentimento, informando por que estamos
            coletando e como a informação será usada.
          </p>
          <p>
            Retemos as informações coletadas apenas pelo tempo necessário para prestar o serviço solicitado. Quando
            armazenamos dados, protegemos por meios comercialmente aceitáveis, para evitar perdas e roubos, bem como
            acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>
          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando
            exigido por lei.
          </p>

          <h2>Este site</h2>
          <p>
            Este site é estático: as páginas são arquivos servidos por uma rede de distribuição de conteúdo. Não
            usamos cookies de publicidade nem rastreamento entre sites.
          </p>
          <p>
            A <Link href="/integridade/" className="text-teal underline-offset-4 hover:underline">verificação de
            integridade</Link> demonstrativa roda inteiramente no seu navegador. O código que você digitar ou colar ali
            não é enviado para nós nem para terceiros, e não é armazenado em lugar nenhum.
          </p>
          <p>
            O formulário de contato monta uma mensagem e abre o seu próprio cliente de e-mail. Quando você nos escreve,
            passamos a tratar os dados daquela mensagem — nome, empresa, e-mail e o que você contar — para responder ao
            contato e conduzir a conversa comercial.
          </p>

          <h2>Links para outros sites</h2>
          <p>
            Este site pode ter links para sites externos que não são operados por nós. Não temos controle sobre o
            conteúdo e as práticas desses sites e não podemos aceitar responsabilidade pelas respectivas políticas de
            privacidade.
          </p>
          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos
            fornecer alguns dos serviços desejados.
          </p>

          <h2>Compromisso do usuário</h2>
          <p>
            O usuário se compromete a fazer uso adequado dos conteúdos e das informações que a Dalia oferece no site, em
            caráter enunciativo e não limitativo:
          </p>
          <ul className="ml-1 flex flex-col gap-2.5">
            {[
              'Não se envolver em atividades ilegais ou contrárias à boa-fé e à ordem pública;',
              'Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;',
              'Não causar danos aos sistemas físicos e lógicos da Dalia, de seus fornecedores ou de terceiros, nem introduzir ou disseminar vírus ou quaisquer outros sistemas capazes de causar os danos mencionados.',
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2>Clientes da plataforma</h2>
          <p>
            O tratamento de dados no uso da plataforma Dalia — e não deste site — é regido pelo contrato e pelo adendo
            de proteção de dados assinados com cada cliente. A página de{' '}
            <Link href="/seguranca/" className="text-teal underline-offset-4 hover:underline">
              segurança e privacidade
            </Link>{' '}
            resume esses compromissos.
          </p>

          <h2>Dúvidas</h2>
          <p>
            Para qualquer pergunta sobre como lidamos com dados pessoais, escreva para{' '}
            <a href="mailto:contato@dalia.tec.br" className="text-teal underline-offset-4 hover:underline">
              contato@dalia.tec.br
            </a>
            .
          </p>

          <p className="mt-4 border-t border-linha-suave pt-5 text-[0.9rem] text-texto-3">
            Esta política é efetiva a partir de 23 de abril de 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
