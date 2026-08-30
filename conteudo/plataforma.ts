/**
 * Textos da pagina /plataforma — o que a Dalia faz, na ordem em que o cliente
 * encosta em cada coisa. Editar prosa aqui.
 */

export interface Capacidade {
  id: string;
  etiqueta: string;
  titulo: string;
  chamada: string;
  itens: string[];
  destaque?: { texto: string; fonte: string };
}

export const CAPACIDADES: Capacidade[] = [
  {
    id: 'documentacao',
    etiqueta: 'Documentação',
    titulo: 'A documentação que ninguém teve tempo de escrever',
    chamada:
      'A Dalia lê cada arquivo e escreve o que ele faz em linguagem de negócio — não em comentário de código. É o ponto de partida: sem saber o que o arquivo faz hoje, não há como dizer que a mudança de amanhã é arriscada.',
    itens: [
      'Um documento por arquivo, em português, dizendo o que entra, o que sai e qual regra de negócio está ali.',
      'Identificação das bases governadas que o arquivo lê e escreve.',
      'Regeração sob demanda quando o arquivo muda — com o custo da leitura de IA mostrado antes de você confirmar.',
      'Busca em toda a documentação, inclusive no que veio de repositório sem versionamento.',
    ],
    destaque: {
      texto:
        'Documentação escrita à mão envelhece no dia seguinte. Esta acompanha o código porque é gerada a partir dele e revalidada a cada aprovação.',
      fonte: 'Por que isso importa',
    },
  },
  {
    id: 'governanca',
    etiqueta: 'Governança',
    titulo: 'Quais bases são críticas — e quem responde por elas',
    chamada:
      'Nem toda tabela merece a mesma atenção. A governança é onde se declara o que é crítico, e essa declaração passa a mudar a severidade de tudo que tocar naquilo.',
    itens: [
      'Catálogo das bases governadas descobertas na leitura do código, não digitadas à mão.',
      'Aprovação ou rejeição nominal, com motivo registrado — obrigatório na rejeição.',
      'A criticidade da base entra no cálculo de risco: mexer no que é crítico não pode pesar igual a mexer no resto.',
    ],
  },
  {
    id: 'drift',
    etiqueta: 'Drift semântico',
    titulo: 'A mudança volta traduzida, não em forma de diff',
    chamada:
      'Todo pull request volta com cartões de mudança: o que mudou de significado, qual o impacto para o negócio e qual a severidade. Quem decide não precisa ler o diff para entender o risco.',
    itens: [
      'Um cartão por mudança semântica, escrito em linguagem de negócio, com severidade classificada.',
      'Agrupamento por pull request, com placar: um PR com cinco achados só libera quando os cinco tiverem decisão.',
      'Decisão individual ou em lote, sempre nominal e com justificativa.',
      'O check run no PR mostra quantos achados faltam — o merge respeita a decisão, não o contrário.',
      'Relatório em PDF de cada drift, com link para o pull request de origem.',
    ],
    destaque: {
      texto:
        'Aprovar um achado de cinco não destrava o merge. Parece detalhe, mas é a diferença entre governança e teatro de governança.',
      fonte: 'Por que isso importa',
    },
  },
  {
    id: 'simulacao',
    etiqueta: 'Simulação',
    titulo: 'Saber o risco antes de escrever o código',
    chamada:
      'A simulação responde à pergunta que hoje só é respondida depois: se eu fizer esta mudança, o que quebra e quem precisa aprovar? Dá para perguntar de três jeitos.',
    itens: [
      'Por descrição: escreva a mudança em português, como escreveria num commit, e veja o risco projetado.',
      'Por arquivo: aponte o caminho e simule o efeito de alterá-lo.',
      'Por pull request: busque o PR por número, título ou branch e simule antes de mergear.',
    ],
    destaque: {
      texto:
        'É o único momento em que o custo de mudar de ideia ainda é zero. Depois do merge, tudo fica mais caro.',
      fonte: 'Por que isso importa',
    },
  },
  {
    id: 'integridade',
    etiqueta: 'Integridade',
    titulo: 'Provar que produção é o que foi aprovado',
    chamada:
      'O fecho do ciclo. Documentação, governança e drift cuidam do que passa pelo processo; a verificação de integridade cuida do que não passou.',
    itens: [
      'SHA-256 de cada arquivo aprovado, comparado com o que está rodando.',
      'Perícia automática do que divergir, com autoria identificada quando o repositório permite.',
      'Relatório de evidência em PDF e alerta imediato para a equipe de segurança.',
    ],
  },
];

export const TRILHA = [
  {
    titulo: 'Fontes',
    texto:
      'Repositórios do GitHub e do Azure DevOps conectados por leitura, ou envio direto de pastas para quem não versiona.',
  },
  {
    titulo: 'Atividade',
    texto:
      'Trilha do que aconteceu na organização: leitura, aprovação, decisão, verificação — com autor e data.',
  },
  {
    titulo: 'Achados',
    texto:
      'Fila do que exige atenção, com a possibilidade de marcar falso positivo e ensinar o motor a não repetir.',
  },
  {
    titulo: 'Perfis',
    texto:
      'Papéis por pessoa: quem apenas consulta, quem decide e quem administra. Áreas sensíveis ficam restritas a administrador.',
  },
];
