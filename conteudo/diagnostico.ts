/**
 * Textos da pagina /diagnostico — a oferta de entrada da Dalia.
 *
 * E o unico produto com preco publicado no site. O preco esta aqui, e nao
 * escrito no meio do JSX, porque ele aparece em tres lugares da pagina e
 * precisa mudar num lugar so.
 */

export const ROTA = '/diagnostico/';

export const PRECO = {
  base: 'R$ 8.000',
  repositorioAdicional: 'R$ 1.200',
  repositoriosInclusos: 5,
  repositoriosPorExtenso: 'cinco',
  diasUteis: 5,
  diasPorExtenso: 'cinco',
};

export interface Entrega {
  titulo: string;
  texto: string;
  opcional?: boolean;
}

export const ENTREGAS: Entrega[] = [
  {
    titulo: 'Linha de base criptográfica',
    texto:
      'Impressão SHA-256 de cada arquivo, datada. A partir dela, qualquer alteração futura é detectável — inclusive a feita direto no servidor, que não deixa commit para ninguém achar.',
  },
  {
    titulo: 'Perícia do estado atual',
    texto:
      'Varredura determinística, sem IA no caminho crítico, procurando o que costuma passar na revisão de código: rota exposta sem autenticação, verificação de autorização removida, credencial em texto claro, teto operacional elevado, janela de retenção de dado pessoal alterada, controle desligado por configuração e arredondamento monetário alterado.',
  },
  {
    titulo: 'Deriva retroativa de 90 dias',
    texto:
      'Lemos os pull requests que já foram aprovados e mostramos quais mudaram regra de negócio, em linguagem de negócio. É comum aparecer mudança relevante que passou sem que ninguém de negócio soubesse que estava decidindo algo.',
  },
  {
    titulo: 'Documentação das regras encontradas',
    texto:
      'Uma amostra do que a plataforma gera continuamente: as regras de negócio que estão no seu código, escritas para quem não lê código.',
  },
  {
    titulo: 'Confronto entre repositório e produção',
    texto:
      'Onde mora a pergunta mais incômoda: o que está no ar confere com o que foi aprovado? Depende de nos dar acesso ao artefato publicado, por isso não entra no escopo fixo.',
    opcional: true,
  },
];

export interface Etapa {
  quando: string;
  oQue: string;
}

export const CRONOGRAMA: Etapa[] = [
  { quando: 'Dia 1', oQue: 'Reunião de 45 minutos. Você indica os repositórios e o que te preocupa.' },
  { quando: 'Dias 2 a 4', oQue: 'Rodamos. Nada é instalado no seu ambiente e ninguém da sua equipe é alocado.' },
  { quando: 'Dia 5', oQue: 'Apresentação dos achados, uma hora, com o relatório em PDF na mão.' },
];

export const PRECISAMOS: string[] = [
  'Acesso de leitura a até cinco repositórios.',
  'Quarenta e cinco minutos no começo e uma hora no fim.',
  'Nada mais: sem agente, sem instalação, sem janela de manutenção.',
];

export const LIMITES = {
  titulo: 'O que o Diagnóstico não é',
  paragrafos: [
    'Não é teste de invasão nem auditoria de segurança ofensiva. Não emitimos parecer de conformidade regulatória — a conformidade é sua; nós produzimos a evidência que a sustenta.',
    'E não é demonstração gratuita disfarçada. O relatório é entregue e é seu, independentemente de qualquer contratação posterior.',
  ],
};
