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

export interface Camada {
  titulo: string;
  texto: string;
}

/** Por que cobrir parque grande cabe no prazo: as duas camadas custam coisas
 *  muito diferentes, e so a segunda escala com o tamanho do parque. */
export const CAMADAS: Camada[] = [
  {
    titulo: 'A camada determinística roda em 100% do que for combinado',
    texto:
      'Impressão SHA-256 por arquivo e detectores de padrão. Não usa inteligência artificial, então o custo não cresce com o tamanho do parque. É ela que produz o mapa: onde está a concentração de risco.',
  },
  {
    titulo: 'A camada semântica vai onde o mapa aponta',
    texto:
      'Aí sim entra a leitura por IA, que escreve a regra de negócio em português e faz a análise retroativa dos pull requests. É a parte cara, e por isso é dirigida em vez de uniforme.',
  },
];

export interface Faixa {
  nome: string;
  pericia: string;
  semantica: string;
  prazo: string;
  preco: string;
  destaque?: boolean;
}

export const FAIXAS: Faixa[] = [
  { nome: 'Essencial', pericia: 'até 5 repositórios', semantica: 'os 5', prazo: '1 semana', preco: 'R$ 8.000' },
  { nome: 'Ampliado', pericia: 'até 25 repositórios', semantica: 'os 25', prazo: '3 semanas', preco: 'R$ 24.000' },
  {
    nome: 'Panorama',
    pericia: '100% do parque',
    semantica: 'os mais expostos do mapa',
    prazo: '6 semanas',
    preco: 'a partir de R$ 55.000',
    destaque: true,
  },
];

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
      'Varredura determinística, sem IA no caminho crítico, sobre o código como ele está hoje: rota exposta sem autenticação, credencial ou segredo em texto claro, comunicação de rede e execução de comando fora do padrão, bloco codificado escondido no meio do código e destino de escrita de dado.',
  },
  {
    titulo: 'Deriva retroativa de 90 dias',
    texto:
      'Lemos os pull requests que já foram aprovados e mostramos quais mudaram regra de negócio, em linguagem de negócio. Como aqui existem duas versões para comparar, aparece o que um retrato único não revela: teto operacional elevado, janela de retenção de dado pessoal esticada, controle desligado por configuração e verificação de autorização removida. É comum sair daí uma mudança relevante que passou sem que ninguém de negócio soubesse que estava decidindo algo.',
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
  'Acesso de leitura a até cinco repositórios, com o histórico preservado — é dele que sai o retroativo, sem a Dalia ter estado instalada antes.',
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
