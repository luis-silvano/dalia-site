import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  IDENTIFICACAO,
  PRIVACIDADE,
  TERMOS,
  qualificacao,
  type Documento,
  type Bloco,
} from '../conteudo/juridico.ts';

const DOCUMENTOS: [string, Documento][] = [
  ['política de privacidade', PRIVACIDADE],
  ['termos de uso', TERMOS],
];

/** Todo texto visível de um documento, achatado. */
function textos(doc: Documento): string[] {
  const deBloco = (b: Bloco): string[] => {
    if (b.tipo === 'paragrafo') return [b.texto];
    if (b.tipo === 'lista') return b.itens;
    return [b.legenda, ...b.colunas, ...b.linhas.flat()];
  };
  return [
    doc.titulo,
    doc.resumo,
    // doc.escopo fica de fora da checagem de maiuscula: e fragmento de frase
    // ("Aplica-se a este site..."), por isso comeca em minuscula de proposito.
    doc.atualizadoEm,
    doc.rodape.titulo,
    doc.rodape.texto,
    doc.rodape.linkRotulo,
    ...doc.secoes.flatMap((s) => [s.titulo, ...s.blocos.flatMap(deBloco)]),
  ];
}

// ------------------------------------------- o que nunca pode ir para o ar

test('nenhum documento publica placeholder de preenchimento', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    for (const texto of textos(doc)) {
      assert.ok(!texto.includes('{{'), `${nome}: placeholder "{{" vazou em: ${texto.slice(0, 70)}`);
      assert.ok(!/A_PREENCHER|TODO:|FIXME|lorem ipsum/i.test(texto), `${nome}: marcador de rascunho em: ${texto.slice(0, 70)}`);
    }
  }
});

test('a qualificação omite CNPJ e endereço enquanto não estiverem preenchidos', () => {
  const q = qualificacao();
  assert.ok(q.startsWith(IDENTIFICACAO.nome));
  if (!IDENTIFICACAO.cnpj) assert.ok(!/CNPJ/.test(q), 'não pode citar CNPJ sem ter o número');
  if (!IDENTIFICACAO.sede) assert.ok(!/com sede/.test(q), 'não pode citar sede sem ter o endereço');
});

test('quando o CNPJ existir, ele entra na qualificação', () => {
  const original = IDENTIFICACAO.cnpj;
  try {
    IDENTIFICACAO.cnpj = '00.000.000/0001-00';
    assert.ok(qualificacao().includes('00.000.000/0001-00'));
  } finally {
    IDENTIFICACAO.cnpj = original;
  }
});

// ------------------------------------------------------------- estrutura

test('todo documento tem índice navegável com âncoras únicas', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    const ids = doc.secoes.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, `${nome}: âncora repetida quebraria o índice`);
    for (const id of ids) {
      assert.match(id, /^[a-z0-9-]+$/, `${nome}: âncora "${id}" precisa ser um slug simples`);
    }
  }
});

test('nenhuma seção fica vazia', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    for (const secao of doc.secoes) {
      assert.ok(secao.titulo.length > 3, `${nome}: seção sem título`);
      assert.ok(secao.blocos.length > 0, `${nome}: seção "${secao.titulo}" sem conteúdo`);
    }
  }
});

test('toda tabela tem o mesmo número de células e colunas', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    for (const secao of doc.secoes) {
      for (const bloco of secao.blocos) {
        if (bloco.tipo !== 'tabela') continue;
        for (const linha of bloco.linhas) {
          assert.equal(
            linha.length,
            bloco.colunas.length,
            `${nome}/${secao.titulo}: linha com ${linha.length} células para ${bloco.colunas.length} colunas`,
          );
        }
      }
    }
  }
});

// ------------------------------------------------- exigências de conteúdo

test('a política cobre os pontos que a LGPD exige', () => {
  const corpo = textos(PRIVACIDADE).join(' ').toLowerCase();
  const obrigatorios = [
    'controladora',
    'operadora',
    'base legal',
    'legítimo interesse',
    'art. 18',
    'encarregado',
    'transferência internacional',
    'autoridade nacional de proteção de dados',
    'eliminação',
  ];
  for (const termo of obrigatorios) {
    assert.ok(corpo.includes(termo), `a política precisa tratar de "${termo}"`);
  }
});

test('a política afirma que o código do cliente não treina modelo', () => {
  const corpo = textos(PRIVACIDADE).join(' ').toLowerCase();
  assert.ok(corpo.includes('treinar modelos') || corpo.includes('treinamento'));
});

test('os termos deixam claro que o contrato do cliente prevalece', () => {
  const corpo = textos(TERMOS).join(' ').toLowerCase();
  assert.ok(corpo.includes('prevalece o contrato'));
});

test('os termos avisam que a demonstração não é auditoria', () => {
  const corpo = textos(TERMOS).join(' ').toLowerCase();
  assert.ok(corpo.includes('não é auditoria'));
});

// -------------------------------------------------------------- redação

test('todo texto visível está em NFC, para a acentuação não quebrar', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    for (const texto of textos(doc)) {
      assert.equal(texto, texto.normalize('NFC'), `${nome}: texto fora de NFC: ${texto.slice(0, 50)}`);
    }
  }
});

test('nenhum texto visível começa com letra minúscula', () => {
  for (const [nome, doc] of DOCUMENTOS) {
    for (const texto of textos(doc)) {
      const primeira = texto.trim()[0];
      if (!primeira || !/\p{L}/u.test(primeira)) continue;
      assert.equal(
        primeira,
        primeira.toUpperCase(),
        `${nome}: texto começando em minúscula: ${texto.slice(0, 50)}`,
      );
    }
  }
});
