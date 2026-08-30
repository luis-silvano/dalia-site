import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  DETECTORES,
  linhasIntroduzidas,
  mascarar,
  normalizar,
  severidadeDe,
  sha256,
  verificar,
  type Achado,
} from '../lib/integridade.ts';

import { CODIGO_APROVADO, CODIGO_ADULTERADO } from '../conteudo/exemplo.ts';

const achado = (nivel: 'critico' | 'alto'): Achado => ({
  id: 'x',
  nivel,
  titulo: 't',
  explicacao: 'e',
  padrao: /x/,
  evidencia: 'linha',
});

// ------------------------------------------------------------------ hash

test('sha256 confere com o vetor conhecido de string vazia', async () => {
  assert.equal(await sha256(''), 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
});

test('fim de linha e espaco no fim nao mudam o hash', async () => {
  const unix = 'linha um\nlinha dois';
  assert.equal(await sha256(unix), await sha256('linha um\r\nlinha dois'));
  assert.equal(await sha256(unix), await sha256(unix + '\n\n  '));
});

test('uma letra diferente muda o hash', async () => {
  assert.notEqual(await sha256('total = 10'), await sha256('total = 11'));
});

test('normalizar nao engole espaco no meio do arquivo', () => {
  assert.equal(normalizar('a\n\nb'), 'a\n\nb');
});

// -------------------------------------------------------- linhas novas

test('linhas introduzidas ignora comentarios e linhas ja existentes', () => {
  const novas = linhasIntroduzidas('mantida\noutra', 'mantida\n// comentario novo\ncodigo novo\noutra');
  assert.deepEqual(novas, ['codigo novo']);
});

test('reordenar sem alterar conteudo nao produz linha nova', () => {
  assert.deepEqual(linhasIntroduzidas('a\nb', 'b\na'), []);
});

// ---------------------------------------------------------- detectores

test('o exemplo aprovado nao dispara nenhum detector', () => {
  const disparados = DETECTORES.filter((d) => CODIGO_APROVADO.split('\n').some((l) => d.padrao.test(l)));
  assert.deepEqual(
    disparados.map((d) => d.id),
    [],
    'nenhum detector pode acusar o baseline limpo',
  );
});

test('verificar acusa integro quando nada mudou', async () => {
  const r = await verificar(CODIGO_APROVADO, CODIGO_APROVADO);
  assert.equal(r.integro, true);
  assert.equal(r.severidade, 'ÍNTEGRO');
  assert.equal(r.achados.length, 0);
  assert.equal(r.hashAprovado, r.hashAtual);
});

test('verificar acusa CRITICO no exemplo adulterado, com os tres vetores', async () => {
  const r = await verificar(CODIGO_APROVADO, CODIGO_ADULTERADO);
  assert.equal(r.integro, false);
  assert.equal(r.severidade, 'CRÍTICO');
  const ids = r.achados.map((a) => a.id).sort();
  assert.deepEqual(ids, ['execucao', 'rede', 'segredo']);
});

test('cada achado carrega a linha exata que o disparou', async () => {
  const r = await verificar(CODIGO_APROVADO, CODIGO_ADULTERADO);
  for (const a of r.achados) {
    assert.ok(a.evidencia.length > 0);
    assert.ok(a.padrao.test(a.evidencia), `evidencia de ${a.id} precisa casar com o proprio padrao`);
    assert.ok(CODIGO_ADULTERADO.includes(a.evidencia), 'evidencia precisa existir no codigo analisado');
  }
});

test('mudanca inocente diverge mas nao vira achado', async () => {
  const r = await verificar(CODIGO_APROVADO, CODIGO_APROVADO.replace('private final', 'private'));
  assert.equal(r.integro, false);
  assert.equal(r.achados.length, 0);
  assert.equal(r.severidade, 'A CLASSIFICAR');
});

test('rota nova em permitAll e acusada', async () => {
  const antes = 'http.authorizeRequests()\n  .antMatchers("/publico").permitAll()';
  const depois = 'http.authorizeRequests()\n  .antMatchers("/publico", "/interno/saldo").permitAll()';
  const r = await verificar(antes, depois);
  assert.ok(
    r.achados.some((a) => a.id === 'acesso'),
    'abrir uma rota nova precisa acusar controle de acesso',
  );
});

test('arredondamento trocado para baixo e acusado', async () => {
  const r = await verificar(
    'valor.setScale(2, RoundingMode.HALF_UP);',
    'valor.setScale(2, RoundingMode.FLOOR);',
  );
  assert.ok(r.achados.some((a) => a.id === 'arredondamento'));
});

test('detecta segredo pelo formato, mesmo com nome de variavel inocente', async () => {
  const r = await verificar('String x = "abc";', 'String x = "sk_live_EXEMPLOFICTICIO123456";');
  assert.ok(r.achados.some((a) => a.id === 'segredo'));
});

// ------------------------------------------------------------ mascara

test('mascarar esconde o miolo do segredo mas mantem o prefixo reconhecivel', () => {
  const saida = mascarar('String apiKey = "sk_live_EXEMPLOFICTICIO123456";');
  assert.ok(saida.includes('sk_live_'));
  assert.ok(!saida.includes('EXEMPLOFICTICIO123456'));
});

test('mascarar nao altera linha sem segredo', () => {
  const linha = 'return montarSaldo(repository.findById(cartaoId));';
  assert.equal(mascarar(linha), linha);
});

// --------------------------------------------------------- severidade

test('severidade escolhe sempre o pior nivel presente', () => {
  assert.equal(severidadeDe([]), 'A CLASSIFICAR');
  assert.equal(severidadeDe([achado('alto')]), 'ALTO');
  assert.equal(severidadeDe([achado('alto'), achado('critico')]), 'CRÍTICO');
});

// ------------------------------------------------------ regressao/UX

test('todo detector tem titulo e explicacao acentuados e legiveis', () => {
  for (const d of DETECTORES) {
    assert.ok(d.titulo.length > 3, `detector ${d.id} sem titulo`);
    assert.ok(d.explicacao.length > 40, `detector ${d.id} sem explicacao util`);
    assert.equal(d.titulo, d.titulo.normalize('NFC'), `titulo de ${d.id} precisa estar em NFC`);
    assert.equal(d.explicacao, d.explicacao.normalize('NFC'), `explicacao de ${d.id} precisa estar em NFC`);
  }
});

test('os padroes nao usam flag global, que carregaria estado entre chamadas', () => {
  for (const d of DETECTORES) {
    assert.equal(d.padrao.global, false, `detector ${d.id} nao pode usar /g`);
  }
});
