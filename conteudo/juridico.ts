/**
 * Documentos juridicos do site.
 *
 * Escritos para serem lidos: o time de compliance do cliente abre isto antes da
 * reuniao. Cada secao responde a uma pergunta concreta, na ordem em que a
 * pergunta aparece.
 *
 * ATENCAO: texto redigido para revisao juridica, nao por advogado. Ver README.
 */

export type Bloco =
  | { tipo: 'paragrafo'; texto: string }
  | { tipo: 'lista'; itens: string[] }
  | { tipo: 'tabela'; legenda: string; colunas: string[]; linhas: string[][] };

export interface Secao {
  id: string;
  titulo: string;
  blocos: Bloco[];
}

export interface Documento {
  sobrancelha: string;
  titulo: string;
  resumo: string;
  atualizadoEm: string;
  escopo: string;
  secoes: Secao[];
  rodape: { titulo: string; texto: string; linkHref: string; linkRotulo: string };
}

/**
 * Qualificacao completa da empresa. Enquanto CNPJ e endereco estiverem vazios,
 * a linha de qualificacao simplesmente nao e renderizada — nunca com placeholder
 * a mostra (ha teste garantindo isso).
 */
export const IDENTIFICACAO = {
  nome: 'Dalia Soluções de Tecnologia Ltda.',
  cnpj: '66.544.067/0001-03',
  /** Frase preposicionada inteira, para caber em "com sede ...". */
  sede: 'na Rua Bela Cintra, 746, conjunto 142, Consolação, São Paulo/SP, CEP 01415-902',
  comarca: 'São Paulo, Estado de São Paulo',
  email: 'contato@dalia.tec.br',
  encarregado: 'contato@dalia.tec.br',
};

export function qualificacao(): string {
  const partes = [IDENTIFICACAO.nome];
  if (IDENTIFICACAO.cnpj) partes.push(`inscrita no CNPJ/MF sob o nº ${IDENTIFICACAO.cnpj}`);
  if (IDENTIFICACAO.sede) partes.push(`com sede ${IDENTIFICACAO.sede}`);
  return partes.join(', ');
}

const ATUALIZADO_EM = '30 de agosto de 2026';

// --------------------------------------------------------------------------
// Politica de privacidade
// --------------------------------------------------------------------------

export const PRIVACIDADE: Documento = {
  sobrancelha: 'Jurídico',
  titulo: 'Política de Privacidade',
  resumo:
    'Esta política explica quais dados pessoais a Dalia trata, para quê, com qual fundamento legal e por quanto tempo — e como você exerce os seus direitos. Ela foi escrita para ser lida por inteiro, sem letra miúda.',
  atualizadoEm: ATUALIZADO_EM,
  escopo: 'este site e à relação com quem nos procura',
  secoes: [
    {
      id: 'quem-somos',
      titulo: 'Quem trata os seus dados',
      blocos: [
        {
          tipo: 'paragrafo',
          texto: `${qualificacao()} ("Dalia", "nós"), desenvolvedora da plataforma de controle semântico de risco em código, é quem trata os dados pessoais descritos nesta política.`,
        },
        {
          tipo: 'paragrafo',
          texto:
            'O tratamento observa a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais) e, no que couber, o Marco Civil da Internet (Lei nº 12.965/2014).',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Dúvidas, pedidos e reclamações sobre proteção de dados devem ser enviados ao nosso encarregado, no endereço indicado ao final desta política. Respondemos a todos.',
        },
      ],
    },
    {
      id: 'dois-papeis',
      titulo: 'Os dois papéis da Dalia, e por que a distinção importa',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'A Dalia ocupa posições diferentes conforme o dado. Confundir as duas é a origem da maior parte das dúvidas que recebemos, então elas ficam separadas desde o início.',
        },
        {
          tipo: 'tabela',
          legenda: 'Papéis da Dalia no tratamento de dados pessoais',
          colunas: ['Situação', 'Papel da Dalia', 'O que rege'],
          linhas: [
            [
              'Você visita este site ou nos escreve',
              'Controladora — decidimos por que e como tratar',
              'Esta política',
            ],
            [
              'Sua empresa usa a plataforma e submete código',
              'Operadora — tratamos conforme a instrução do cliente',
              'O contrato e o adendo de proteção de dados assinados com o cliente',
            ],
            [
              'Você é pessoa usuária da plataforma pela sua empresa',
              'Controladora quanto aos dados de conta e acesso',
              'Esta política, somada ao contrato do cliente',
            ],
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Na condição de operadora, a Dalia não decide o que fazer com o conteúdo submetido pelo cliente: executa o que foi contratado. Se dado pessoal aparecer dentro do código-fonte analisado, ele é tratado sob o adendo de proteção de dados daquele cliente, não sob esta política.',
        },
      ],
    },
    {
      id: 'dados',
      titulo: 'Quais dados tratamos',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Coletamos o mínimo necessário para cada finalidade. Não compramos bases, não enriquecemos cadastro com dados de terceiros e não fazemos perfilamento comportamental.',
        },
        {
          tipo: 'tabela',
          legenda: 'Categorias de dados pessoais tratados',
          colunas: ['Categoria', 'Exemplos', 'Origem'],
          linhas: [
            [
              'Dados de contato',
              'Nome, empresa, cargo, e-mail corporativo e o que você escrever na mensagem',
              'Você, ao nos procurar',
            ],
            [
              'Dados de conta',
              'Nome, e-mail corporativo, organização, perfil de acesso e registro de autenticação',
              'A empresa cliente, ao provisionar o acesso',
            ],
            [
              'Registros de uso da plataforma',
              'Ações realizadas, decisões de aprovação e rejeição, data, hora e autoria',
              'Gerados pelo uso',
            ],
            [
              'Metadados de repositório',
              'Nome de repositório, identificador de commit, autor e mensagem de commit',
              'O repositório que o cliente conectou',
            ],
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'A autoria de commit merece nota: ela é dado pessoal e é justamente o que permite responder “quem alterou”. Ela é tratada para a finalidade de segurança e rastreabilidade, sob instrução do cliente, e nunca para avaliar desempenho individual.',
        },
      ],
    },
    {
      id: 'finalidades',
      titulo: 'Para que tratamos, e com qual base legal',
      blocos: [
        {
          tipo: 'tabela',
          legenda: 'Finalidades e bases legais do tratamento',
          colunas: ['Finalidade', 'Base legal (LGPD)'],
          linhas: [
            [
              'Responder ao seu contato e conduzir a conversa comercial',
              'Procedimentos preliminares de contrato, art. 7º, V',
            ],
            ['Prestar o serviço contratado e dar suporte', 'Execução de contrato, art. 7º, V'],
            [
              'Manter a trilha de auditoria e a segurança da plataforma',
              'Legítimo interesse, art. 7º, IX, e cumprimento de obrigação regulatória do cliente',
            ],
            ['Emitir cobrança e cumprir obrigações fiscais', 'Obrigação legal, art. 7º, II'],
            [
              'Exercer direitos em processo administrativo, judicial ou arbitral',
              'Art. 7º, VI',
            ],
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Onde a base é o legítimo interesse, avaliamos previamente se ele prevalece sobre os direitos do titular e limitamos o tratamento ao estritamente necessário. Você pode se opor a esse tratamento pelos canais desta política.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Não tratamos dados pessoais para publicidade comportamental, não vendemos dados e não os disponibilizamos a terceiros para uso próprio deles.',
        },
      ],
    },
    {
      id: 'site',
      titulo: 'O que este site faz — e o que ele não faz',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Este site é estático: as páginas são arquivos servidos por uma rede de distribuição de conteúdo. Não há cookie de publicidade, não há rastreamento entre sites e não há perfilamento do visitante.',
        },
        {
          tipo: 'lista',
          itens: [
            'A demonstração de verificação de integridade roda inteiramente no seu navegador. O código que você digitar ou colar não é enviado para nós nem para terceiros, não é armazenado e não sai do seu dispositivo.',
            'O formulário de contato não envia nada para servidores nossos: ele monta a mensagem e abre o seu próprio cliente de e-mail. O tratamento começa quando você decide enviar.',
            'A hospedagem registra dados técnicos de acesso, como endereço IP e horário, pelo tempo necessário à segurança e ao funcionamento do serviço.',
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Se um dia adotarmos medição de audiência, será por ferramenta que não usa cookie nem identifica o visitante individualmente — e esta política será atualizada antes.',
        },
      ],
    },
    {
      id: 'compartilhamento',
      titulo: 'Com quem compartilhamos',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Compartilhamos dados pessoais apenas com quem é necessário para o serviço existir, sempre sob contrato que impõe as mesmas obrigações que assumimos com você.',
        },
        {
          tipo: 'lista',
          itens: [
            'Provedor de infraestrutura em nuvem, que hospeda a plataforma e este site.',
            'Provedores de modelos de inteligência artificial, que analisam trechos de código sob vedação contratual de uso para treinamento, com regime de retenção zero disponível.',
            'Provedor de identidade e autenticação, que gerencia o acesso das pessoas usuárias.',
            'Provedor de correio eletrônico, para a comunicação com você.',
            'Autoridades públicas, quando houver ordem legal — hipótese em que informamos o titular, salvo se a lei vedar.',
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'A relação nominal e atualizada dos subprocessadores é entregue aos clientes no adendo de proteção de dados e a interessados mediante acordo de confidencialidade.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Nenhum provedor de inteligência artificial utiliza o código dos nossos clientes para treinar modelos. Essa vedação é contratual — nossa com eles, e nossa com o cliente.',
        },
      ],
    },
    {
      id: 'transferencia',
      titulo: 'Transferência internacional',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Parte da infraestrutura e dos provedores de inteligência artificial opera fora do Brasil. Nessas hipóteses, a transferência internacional se apoia em cláusulas contratuais que garantem grau de proteção compatível com a LGPD, conforme o art. 33.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Clientes com exigência de residência de dados em território nacional devem tratar o ponto na negociação: a arquitetura admite configuração específica, e isso é decidido por contrato, não por padrão.',
        },
      ],
    },
    {
      id: 'retencao',
      titulo: 'Por quanto tempo guardamos',
      blocos: [
        {
          tipo: 'tabela',
          legenda: 'Prazos de retenção por categoria',
          colunas: ['Dado', 'Prazo'],
          linhas: [
            ['Contato comercial sem contratação', 'Até 24 meses do último contato, ou antes, se você pedir'],
            ['Dados de conta e conteúdo do cliente', 'Durante o contrato, e eliminados conforme o adendo ao término'],
            ['Trilha de auditoria e decisões', 'Enquanto durar o contrato e pelo prazo que o cliente indicar para fins regulatórios'],
            ['Registros de acesso a aplicação', 'Seis meses, conforme o Marco Civil da Internet'],
            ['Documentos fiscais e contábeis', 'Pelos prazos legais aplicáveis'],
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Encerrado o prazo, os dados são eliminados ou anonimizados. Ao fim do contrato, o cliente pode solicitar a devolução dos dados e recebe atestado de eliminação.',
        },
      ],
    },
    {
      id: 'seguranca',
      titulo: 'Como protegemos',
      blocos: [
        {
          tipo: 'lista',
          itens: [
            'Criptografia em trânsito e em repouso.',
            'Segregação lógica entre organizações: todo dado é endereçado à organização dona.',
            'Controle de acesso por papel, com múltiplo fator na autenticação e áreas sensíveis restritas a perfil de administrador.',
            'Acesso somente leitura ao ambiente do cliente, revogável a qualquer momento por ele.',
            'Registro de acesso e de operação, com autoria e data.',
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Nenhuma medida elimina o risco por completo. Na hipótese de incidente de segurança que possa acarretar risco ou dano relevante, comunicamos o cliente em até 24 horas da ciência e a Autoridade Nacional de Proteção de Dados e os titulares nos prazos e termos da LGPD.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Se você identificar uma vulnerabilidade neste site ou na plataforma, escreva para nós. Não adotamos medida legal contra pesquisa feita de boa-fé, sem acesso a dado de terceiro e sem degradação do serviço.',
        },
      ],
    },
    {
      id: 'direitos',
      titulo: 'Os seus direitos, e como exercê-los',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'O art. 18 da LGPD garante a você, titular, os direitos abaixo. Basta escrever para o encarregado: não exigimos formulário, cadastro nem justificativa.',
        },
        {
          tipo: 'lista',
          itens: [
            'Confirmação de que tratamos os seus dados, e acesso a eles.',
            'Correção de dado incompleto, inexato ou desatualizado.',
            'Anonimização, bloqueio ou eliminação de dado desnecessário, excessivo ou tratado em desconformidade com a lei.',
            'Portabilidade a outro fornecedor, nos termos da regulamentação.',
            'Eliminação dos dados tratados com base no seu consentimento.',
            'Informação sobre com quem compartilhamos os seus dados.',
            'Informação sobre a possibilidade de não consentir, e as consequências disso.',
            'Revogação do consentimento, quando essa for a base do tratamento.',
            'Oposição a tratamento fundado em legítimo interesse.',
          ],
        },
        {
          tipo: 'paragrafo',
          texto:
            'Respondemos em até 15 dias. Podemos pedir informação adicional apenas para confirmar a sua identidade, e essa informação é usada só para isso.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Se você é pessoa usuária da plataforma por meio da sua empresa, pedidos sobre o conteúdo submetido por ela devem ser direcionados à própria empresa, que é a controladora desses dados. Recebendo o pedido, nós o encaminhamos e apoiamos a resposta.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Você também pode peticionar diretamente à Autoridade Nacional de Proteção de Dados. Preferimos resolver com você antes, mas o direito é seu.',
        },
      ],
    },
    {
      id: 'alteracoes',
      titulo: 'Alterações nesta política',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Podemos atualizar esta política para refletir mudança em serviço, tecnologia ou legislação. A data da versão vigente aparece no topo da página.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Alteração relevante — nova finalidade, nova categoria de dado, mudança de base legal — é comunicada aos clientes por e-mail antes de entrar em vigor.',
        },
      ],
    },
    {
      id: 'contato-privacidade',
      titulo: 'Encarregado e contato',
      blocos: [
        {
          tipo: 'paragrafo',
          texto: `Pedidos, dúvidas e reclamações sobre proteção de dados: ${IDENTIFICACAO.encarregado}.`,
        },
        {
          tipo: 'paragrafo',
          texto:
            'Identifique-se e descreva o pedido. Se a resposta depender do seu empregador, dizemos isso com clareza e indicamos o caminho, em vez de simplesmente arquivar.',
        },
      ],
    },
  ],
  rodape: {
    titulo: 'Precisa da documentação completa?',
    texto:
      'Sob acordo de confidencialidade, entregamos o adendo de proteção de dados, a relação nominal de subprocessadores, a descrição da arquitetura e o desenho de retenção. Respondemos também a questionário próprio de fornecedor.',
    linkHref: '/seguranca/',
    linkRotulo: 'Ver segurança e privacidade',
  },
};

// --------------------------------------------------------------------------
// Termos de uso
// --------------------------------------------------------------------------

export const TERMOS: Documento = {
  sobrancelha: 'Jurídico',
  titulo: 'Termos de Uso do Site',
  resumo:
    'Estas condições valem para a navegação neste site e para a ferramenta pública de verificação de integridade. O uso da plataforma Dalia é regido pelo contrato assinado com cada cliente, não por aqui.',
  atualizadoEm: ATUALIZADO_EM,
  escopo: 'este site e à demonstração pública',
  secoes: [
    {
      id: 'aceitacao',
      titulo: 'Aceitação',
      blocos: [
        {
          tipo: 'paragrafo',
          texto: `Ao navegar neste site você concorda com estes termos. Se não concordar, basta não utilizá-lo. O site é mantido pela ${qualificacao()}.`,
        },
      ],
    },
    {
      id: 'o-que-e',
      titulo: 'O que este site é',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Este é um site institucional: ele apresenta a Dalia e permite entrar em contato. Ele não é a plataforma, não dá acesso a ela e não substitui o contrato de prestação de serviços.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Havendo divergência entre o que se lê aqui e o que consta do contrato assinado com um cliente, prevalece o contrato.',
        },
      ],
    },
    {
      id: 'demonstracao',
      titulo: 'A demonstração de verificação de integridade',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'A ferramenta disponível na página de integridade executa inteiramente no seu navegador: calcula o resumo criptográfico do texto e aplica um conjunto reduzido de detectores. Nada é transmitido a nós.',
        },
        {
          tipo: 'lista',
          itens: [
            'É uma demonstração didática, com um recorte dos detectores da plataforma. Não é auditoria de segurança nem parecer técnico.',
            'Ausência de achado não significa ausência de risco, e a presença de achado não é acusação a pessoa alguma.',
            'Você é responsável por ter o direito de colar ali o código que colar.',
            'Nenhuma decisão de segurança deve se apoiar exclusivamente nesta demonstração.',
          ],
        },
      ],
    },
    {
      id: 'uso',
      titulo: 'Uso permitido e uso vedado',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Você pode usar este site para conhecer a Dalia, avaliar a solução e falar conosco. Compromete-se, em contrapartida, a não:',
        },
        {
          tipo: 'lista',
          itens: [
            'Praticar ato ilícito ou contrário à boa-fé e à ordem pública.',
            'Tentar obter acesso não autorizado a sistemas, contas ou dados.',
            'Introduzir código malicioso ou degradar deliberadamente o funcionamento do site.',
            'Extrair conteúdo de forma automatizada em volume que prejudique o serviço.',
            'Utilizar a marca, o conteúdo ou o material do site para se apresentar como Dalia ou como parceiro sem autorização escrita.',
          ],
        },
      ],
    },
    {
      id: 'propriedade',
      titulo: 'Propriedade intelectual',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'A marca DALIA, o logotipo, os textos, o desenho e o código deste site pertencem à Dalia e são protegidos pela legislação aplicável. A navegação não transfere direito algum sobre eles.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Citar trechos com indicação da fonte é bem-vindo. Reprodução integral, uso comercial e obra derivada dependem de autorização escrita.',
        },
      ],
    },
    {
      id: 'disponibilidade',
      titulo: 'Disponibilidade e conteúdo',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'O site é oferecido no estado em que se encontra. Buscamos mantê-lo disponível e correto, mas não garantimos funcionamento ininterrupto nem ausência de erro, e podemos alterar ou remover conteúdo a qualquer tempo.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Compromissos de nível de serviço existem para a plataforma e constam do contrato de cada cliente. Eles não se aplicam a este site.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Podemos manter links para sites de terceiros. Não controlamos esse conteúdo e não respondemos por ele.',
        },
      ],
    },
    {
      id: 'responsabilidade',
      titulo: 'Limitação de responsabilidade',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Nos limites da lei, a Dalia não responde por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso deste site ou da demonstração pública.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Nada nestes termos afasta direitos do consumidor previstos em lei, nem a responsabilidade por dolo ou culpa grave.',
        },
      ],
    },
    {
      id: 'privacidade-link',
      titulo: 'Dados pessoais',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'O tratamento de dados pessoais relacionado a este site está descrito na Política de Privacidade, que integra estes termos.',
        },
      ],
    },
    {
      id: 'lei',
      titulo: 'Lei aplicável e foro',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Estes termos são regidos pela lei brasileira. Antes de qualquer medida judicial, as partes buscarão solução direta pelos canais de contato indicados.',
        },
        {
          tipo: 'paragrafo',
          texto:
            'Não havendo acordo, fica eleito o foro da comarca de São Paulo, Estado de São Paulo, com renúncia a qualquer outro, salvo hipótese legal que assegure foro diverso ao consumidor.',
        },
      ],
    },
    {
      id: 'alteracoes-termos',
      titulo: 'Alterações',
      blocos: [
        {
          tipo: 'paragrafo',
          texto:
            'Podemos alterar estes termos. A versão vigente é sempre a publicada nesta página, com a data indicada no topo.',
        },
      ],
    },
  ],
  rodape: {
    titulo: 'Ficou alguma dúvida?',
    texto:
      'Se algum ponto destes termos não estiver claro, escreva. Preferimos explicar antes a discutir depois.',
    linkHref: '/politica-privacidade/',
    linkRotulo: 'Ler a política de privacidade',
  },
};
