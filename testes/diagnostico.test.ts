import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CRONOGRAMA,
  ENTREGAS,
  LIMITES,
  PRECISAMOS,
  PRECO,
  ROTA,
  type Entrega,
} from '../conteudo/diagnostico.ts';
import sitemap from '../app/sitemap.ts';

/** Todo texto que o visitante lê nesta página. */
const VISIVEIS: string[] = [
  ...ENTREGAS.flatMap((e: Entrega) => [e.titulo, e.texto]),
  ...CRONOGRAMA.flatMap((e) => [e.quando, e.oQue]),
  ...PRECISAMOS,
  LIMITES.titulo,
  ...LIMITES.paragrafos,
];

test('nenhum texto visível está vazio', () => {
  for (const texto of VISIVEIS) {
    assert.ok(texto.trim().length > 0, 'texto vazio na página do Diagnóstico');
  }
});

test('todo texto visível começa com maiúscula', () => {
  for (const texto of VISIVEIS) {
    const primeira = texto.trim()[0];
    assert.equal(primeira, primeira.toLocaleUpperCase('pt-BR'), `começa em minúscula: ${texto}`);
  }
});

test('todo parágrafo termina com pontuação', () => {
  const paragrafos = [...ENTREGAS.map((e) => e.texto), ...PRECISAMOS, ...LIMITES.paragrafos];
  for (const texto of paragrafos) {
    assert.match(texto.trim(), /[.!?]$/, `sem pontuação final: ${texto}`);
  }
});

// Decisao comercial: "piloto" virou expectativa de gratuidade e prazo fixo, e
// por isso saiu de toda comunicacao. O termo usado e "avaliacao".
test('a palavra "piloto" não aparece', () => {
  for (const texto of VISIVEIS) {
    assert.doesNotMatch(texto, /piloto/i, `"piloto" saiu da comunicação: ${texto}`);
  }
});

// A Dalia instrumenta e produz evidencia; a conformidade e do cliente. Afirmar
// o contrario e promessa que nao se sustenta numa auditoria.
test('não promete conformidade regulatória ao cliente', () => {
  const promete = VISIVEIS.filter((t) => /conformidade/i.test(t) && !/não emitimos|é sua/i.test(t));
  assert.deepEqual(promete, []);
});

// Os detectores da Dalia rodam sobre um diff. Com baseline vazio, o arquivo
// inteiro conta como linha nova, entao padrao de PRESENCA e detectavel num
// retrato unico — mas "elevado", "alterada", "removida" e "desligado" comparam
// dois lados e so existem na passagem retroativa. Prometer isso na varredura
// de estado e promessa que nao se cumpre na entrega.
test('a perícia de estado não promete achado que exige comparação', () => {
  const estado = ENTREGAS.find((e) => /estado atual/i.test(e.titulo));
  assert.ok(estado, 'sumiu a entrega de perícia do estado atual');
  assert.doesNotMatch(estado.texto, /elevad|alterad|removid|desligad/i, estado.texto);
});

test('a deriva retroativa é quem carrega os achados comparativos', () => {
  const retro = ENTREGAS.find((e) => /retroativa/i.test(e.titulo));
  assert.ok(retro, 'sumiu a entrega de deriva retroativa');
  for (const termo of [/teto operacional/i, /retenção/i, /autorização removida/i]) {
    assert.match(retro.texto, termo, `faltou ${termo} na deriva retroativa`);
  }
});

test('o preço está em formato brasileiro', () => {
  assert.match(PRECO.base, /^R\$ \d{1,3}(\.\d{3})*$/);
  assert.match(PRECO.repositorioAdicional, /^R\$ \d{1,3}(\.\d{3})*$/);
});

test('o preço publicado é o mesmo do documento comercial', () => {
  assert.equal(PRECO.base, 'R$ 8.000');
  assert.equal(PRECO.repositorioAdicional, 'R$ 1.200');
  assert.equal(PRECO.repositoriosInclusos, 5);
  assert.equal(PRECO.diasUteis, 5);
});

test('o extenso publicado bate com o número usado na conferência', () => {
  const extenso: Record<number, string> = { 1: 'um', 2: 'dois', 3: 'três', 4: 'quatro', 5: 'cinco' };
  assert.equal(PRECO.repositoriosPorExtenso, extenso[PRECO.repositoriosInclusos]);
  assert.equal(PRECO.diasPorExtenso, extenso[PRECO.diasUteis]);
});

test('o cronograma cabe nos dias úteis prometidos', () => {
  const ultimo = CRONOGRAMA[CRONOGRAMA.length - 1].quando;
  assert.match(ultimo, new RegExp(`\\b${PRECO.diasUteis}\\b`), `o cronograma passa de ${PRECO.diasUteis} dias`);
});

test('os repositórios prometidos batem entre preço e texto', () => {
  const fala = PRECISAMOS.some((t) => /cinco repositórios/i.test(t));
  assert.ok(fala, 'o texto do que precisamos não cita os cinco repositórios');
  assert.equal(PRECO.repositoriosInclusos, 5);
});

// A entrega opcional depende de acesso ao artefato publicado. Sem a marca, ela
// e lida como escopo fixo e vira reclamacao na entrega.
test('a entrega que depende do cliente está marcada como opcional', () => {
  const producao = ENTREGAS.find((e) => /produção/i.test(e.titulo));
  assert.ok(producao, 'sumiu a entrega de confronto com produção');
  assert.equal(producao.opcional, true);
});

test('a rota está no sitemap', () => {
  const rotas = sitemap().map((p) => new URL(p.url).pathname);
  assert.ok(rotas.includes(ROTA), `${ROTA} fora do sitemap`);
});

// Acentuacao decomposta (NFD) ja quebrou PDF em producao. O mesmo texto
// alimenta pagina e documento, entao a checagem vale aqui tambem.
test('todo texto visível está em NFC, para a acentuação não quebrar', () => {
  for (const texto of VISIVEIS) {
    assert.equal(texto, texto.normalize('NFC'), `texto fora de NFC: ${texto}`);
  }
});

test('a rota termina em barra, como o resto do site', () => {
  assert.match(ROTA, /^\/[a-z-]+\/$/);
});
