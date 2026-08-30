/**
 * Verificacao de integridade que roda inteiramente no navegador do visitante.
 *
 * Nada aqui vai para a rede: o SHA-256 usa a Web Crypto do proprio navegador e os
 * padroes de risco sao os detectores deterministicos da plataforma, portados para
 * TypeScript. E a mesma leitura que a Dalia faz quando encontra um arquivo em
 * producao diferente do que foi aprovado.
 */

export type Nivel = 'critico' | 'alto';

export interface Detector {
  id: string;
  nivel: Nivel;
  titulo: string;
  explicacao: string;
  padrao: RegExp;
}

export interface Achado extends Detector {
  evidencia: string;
}

export interface Resultado {
  integro: boolean;
  hashAprovado: string;
  hashAtual: string;
  linhasNovas: string[];
  achados: Achado[];
  severidade: 'ÍNTEGRO' | 'CRÍTICO' | 'ALTO' | 'A CLASSIFICAR';
}

/**
 * Mesma normalizacao do backend: fim de linha e espaco no fim do arquivo nao
 * caracterizam alteracao de conteudo.
 */
export function normalizar(texto: string): string {
  return String(texto ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t\n]+$/, '');
}

export async function sha256(texto: string): Promise<string> {
  const dados = new TextEncoder().encode(normalizar(texto));
  const resumo = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(resumo))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const DETECTORES: Detector[] = [
  {
    id: 'rede',
    nivel: 'critico',
    titulo: 'Comunicação de rede nova',
    explicacao:
      'O código passou a falar com um destino que não existia na versão aprovada. É o vetor clássico de exfiltração: o sistema continua funcionando normalmente enquanto envia dados para fora.',
    padrao:
      /https?:\/\/[\w.-]+|HttpClient|HttpURLConnection|RestTemplate|WebClient|new\s+Socket\s*\(|requests\.(get|post)|fetch\s*\(/,
  },
  {
    id: 'execucao',
    nivel: 'critico',
    titulo: 'Execução de comando no sistema',
    explicacao:
      'A alteração introduz execução de processo no sistema operacional. Código de negócio legítimo raramente precisa disso; backdoor precisa sempre.',
    padrao:
      /Runtime\s*\.\s*getRuntime\s*\(\s*\)\s*\.\s*exec|ProcessBuilder|os\.system\s*\(|subprocess\.|eval\s*\(|Function\s*\(\s*["']/,
  },
  {
    id: 'acesso',
    nivel: 'critico',
    titulo: 'Controle de acesso afrouxado',
    explicacao:
      'A configuração abre acesso ou desabilita proteção. Rotas que exigiam credencial podem ter ficado públicas sem que nada no sistema pare de funcionar.',
    padrao:
      /permitAll\s*\(|csrf\s*\(\s*\)\s*\.\s*disable|anonymous\s*\(\s*\)|verify\s*=\s*False|@PreAuthorize\s*\(\s*["']permitAll/,
  },
  {
    id: 'arredondamento',
    nivel: 'critico',
    titulo: 'Arredondamento financeiro alterado',
    explicacao:
      'A regra de arredondamento de valores mudou. Centavo a centavo, em volume, isso desloca repasses e quebra a conciliação — sem gerar um único erro.',
    padrao: /RoundingMode\s*\.\s*(FLOOR|DOWN|CEILING|UP)|setScale\s*\(\s*\d+\s*\)/,
  },
  {
    id: 'segredo',
    nivel: 'alto',
    titulo: 'Credencial em texto claro',
    explicacao:
      'Foi adicionado o que tem formato de chave ou segredo em claro no código. Além do risco imediato, o segredo passa a viver no histórico do repositório.',
    padrao:
      /sk_(live|test)_[A-Za-z0-9]{10,}|AKIA[0-9A-Z]{12,}|gh[pousr]_[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|(password|senha|secret|api[_-]?key|token)\s*[=:]\s*["'][^"']{6,}["']/i,
  },
  {
    id: 'destino',
    nivel: 'alto',
    titulo: 'Destino de escrita alterado',
    explicacao:
      'A alteração muda para onde os dados vão. O processo continua rodando e reportando sucesso, gravando em outro lugar.',
    padrao:
      /\.(save|write|insert)To\s*\(|INSERT\s+INTO|CREATE\s+TABLE|DROP\s+TABLE|saveAsTable\s*\(|\.mode\s*\(\s*["']overwrite/i,
  },
];

const COMENTARIO = /^\s*(\/\/|\*|\/\*|#|--|%\*)/;

/** Linhas que existem na versao atual e nao existiam na aprovada, fora comentarios. */
export function linhasIntroduzidas(aprovado: string, atual: string): string[] {
  const base = new Set(normalizar(aprovado).split('\n'));
  return normalizar(atual)
    .split('\n')
    .filter((linha) => linha.trim() && !base.has(linha) && !COMENTARIO.test(linha));
}

/** Esconde o miolo de um segredo antes de exibi-lo na tela. */
export function mascarar(linha: string): string {
  return linha
    .replace(/(sk_(?:live|test)_)[A-Za-z0-9]+/g, '$1************')
    .replace(/(AKIA)[0-9A-Z]{12,}/g, '$1************')
    .replace(/(gh[pousr]_)[A-Za-z0-9]{20,}/g, '$1************');
}

export function severidadeDe(achados: Achado[]): Resultado['severidade'] {
  if (achados.some((a) => a.nivel === 'critico')) return 'CRÍTICO';
  if (achados.length) return 'ALTO';
  return 'A CLASSIFICAR';
}

export async function verificar(aprovado: string, atual: string): Promise<Resultado> {
  const [hashAprovado, hashAtual] = await Promise.all([sha256(aprovado), sha256(atual)]);

  if (hashAprovado === hashAtual) {
    return {
      integro: true,
      hashAprovado,
      hashAtual,
      linhasNovas: [],
      achados: [],
      severidade: 'ÍNTEGRO',
    };
  }

  const linhasNovas = linhasIntroduzidas(aprovado, atual);
  const achados: Achado[] = [];

  for (const detector of DETECTORES) {
    const evidencia = linhasNovas.find((linha) => detector.padrao.test(linha));
    if (evidencia) achados.push({ ...detector, evidencia: evidencia.trim() });
  }

  return {
    integro: false,
    hashAprovado,
    hashAtual,
    linhasNovas,
    achados,
    severidade: severidadeDe(achados),
  };
}
