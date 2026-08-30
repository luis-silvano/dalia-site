'use client';

import { useState } from 'react';

const DESTINO = 'contato@dalia.tec.br';

const INTERESSES = [
  'Piloto de 30 dias',
  'Verificação de integridade',
  'Documentação para análise de fornecedor',
  'Outro assunto',
];

/**
 * Sem servidor por tras: o formulario monta a mensagem e abre o cliente de
 * e-mail do visitante. Substituir por POST na API da Dalia quando o endpoint
 * publico existir — o corpo montado aqui ja e o payload desejado.
 */
export function FormularioContato() {
  const [enviado, setEnviado] = useState(false);

  function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    // Campo-armadilha: robo preenche, gente nao ve.
    if (dados.get('empresa_confirmacao')) return;

    const nome = String(dados.get('nome') ?? '').trim();
    const empresa = String(dados.get('empresa') ?? '').trim();
    const email = String(dados.get('email') ?? '').trim();
    const interesse = String(dados.get('interesse') ?? '').trim();
    const mensagem = String(dados.get('mensagem') ?? '').trim();

    const corpo = [
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `E-mail: ${email}`,
      `Interesse: ${interesse}`,
      '',
      mensagem,
    ].join('\n');

    const assunto = `[Site] ${interesse} — ${empresa || nome}`;
    window.location.href = `mailto:${DESTINO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
  }

  const rotulo = 'mb-1.5 block text-[0.88rem] font-semibold text-texto-2';
  const campo =
    'w-full rounded-lg border border-linha bg-fundo px-3.5 py-2.5 text-[0.98rem] text-texto placeholder:text-texto-3 focus:border-teal focus:outline-none';

  return (
    <form onSubmit={aoEnviar} className="cartao flex flex-col gap-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={rotulo} htmlFor="nome">
            Nome
          </label>
          <input id="nome" name="nome" required autoComplete="name" className={campo} />
        </div>
        <div>
          <label className={rotulo} htmlFor="empresa">
            Empresa
          </label>
          <input id="empresa" name="empresa" required autoComplete="organization" className={campo} />
        </div>
      </div>

      <div>
        <label className={rotulo} htmlFor="email">
          E-mail corporativo
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={campo} />
      </div>

      <div>
        <label className={rotulo} htmlFor="interesse">
          Sobre o que você quer falar
        </label>
        <select id="interesse" name="interesse" className={campo} defaultValue={INTERESSES[0]}>
          {INTERESSES.map((opcao) => (
            <option key={opcao} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={rotulo} htmlFor="mensagem">
          Contexto <span className="font-normal text-texto-3">(opcional)</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          className={campo + ' resize-y'}
          placeholder="Linguagens principais, se usam Git, o que motivou o contato…"
        />
      </div>

      {/* Armadilha para robo: fora da tela, sem foco, sem leitura por leitor de tela. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="empresa_confirmacao">Não preencha este campo</label>
        <input id="empresa_confirmacao" name="empresa_confirmacao" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="botao botao-primario">
          Abrir e-mail com a mensagem
        </button>
        <p className="text-[0.85rem] text-texto-3">
          {enviado
            ? 'Abrimos o seu cliente de e-mail. Se nada acontecer, escreva direto para ' + DESTINO + '.'
            : 'O formulário monta a mensagem e abre o seu cliente de e-mail — nada é enviado a servidores nossos.'}
        </p>
      </div>
    </form>
  );
}
