/**
 * Textos da pagina inicial. Editar prosa aqui — sem encostar em componente.
 */

export const FRENTES = [
  {
    etiqueta: 'Aplicação',
    titulo: 'Java e o stack corporativo',
    texto:
      'SQL embutido em @Query, entidades JPA, SecurityConfig, transacionalidade, arredondamento financeiro, agendamentos, filas e dependências do pom.xml. Kotlin, TypeScript, Go e Rust também.',
  },
  {
    etiqueta: 'Dados',
    titulo: 'Pipelines e transformações',
    texto:
      'SQL, PySpark, dbt e notebooks: filtro que muda o universo processado, janela de retenção alterada, destino de escrita trocado, granularidade que quebra a comparabilidade histórica.',
  },
  {
    etiqueta: 'Legado sem git',
    titulo: 'SAS e ambientes sem versionamento',
    texto:
      'Onde não existe controle de versão, a Dalia cria o baseline. Resolve %include, macros e bibliotecas entre arquivos para revelar a escrita real — a que some quando se lê um arquivo isolado.',
  },
];

export const PASSOS = [
  {
    titulo: 'Conecte',
    texto: 'Leitura do repositório — GitHub ou Azure DevOps — ou envio direto de pastas, para quem não versiona.',
  },
  {
    titulo: 'Aprove o baseline',
    texto:
      'Cada arquivo é documentado em linguagem de negócio e aprovado nominalmente, com o hash do conteúdo exato.',
  },
  {
    titulo: 'Vigie as mudanças',
    texto:
      'Todo pull request volta com o risco classificado antes do merge. O merge só libera quando tudo tiver sido decidido.',
  },
  {
    titulo: 'Prove a produção',
    texto:
      'A verificação periódica compara produção com o aprovado e pericia o que divergir — com relatório datado.',
  },
];

export const PERGUNTAS_AUDITORIA = [
  {
    pergunta: 'Como você garante que o que roda em produção foi aprovado?',
    hoje: '“Confiamos no processo.”',
    dalia: 'Relatório de integridade com hash por arquivo, datado e exportável em PDF.',
  },
  {
    pergunta: 'Quem alterou, quando e com qual autorização?',
    hoje: 'Busca manual em logs e e-mails antigos.',
    dalia: 'Trilha nominal: mudança, aprovação, data, hash e a autoria identificada no repositório.',
  },
  {
    pergunta: 'Como você detecta mudança feita fora do processo?',
    hoje: 'Não detecta.',
    dalia: 'Verificação automática e perícia do achado, com alerta imediato à equipe de segurança.',
  },
];
