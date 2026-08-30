'use client';

import { useState } from 'react';

const DESTINO = 'contato@dalia.tec.br';
const ENDPOINT = process.env.NEXT_PUBLIC_API_CONTATO || 'https://api.dalia.tec.br/public/contato';

const INTERESSES = [
  'Avaliação da plataforma',
  'Verificação de integridade',
  'Documentação para análise de fornecedor',
  'Outro assunto',
];

type Estado = 'parado' | 'enviando' | 'enviado' | 'erro';

export function FormularioContato() {
  const [estado, setEstado] = useState<Estado>('parado');

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const dados = new FormData(formulario);

    // Campo-armadilha: robo preenche, gente nao ve. O backend confere de novo.
    if (dados.get('empresa_confirmacao')) return;

    setEstado('enviando');

    try {
      const resposta = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: String(dados.get('nome') ?? '').trim(),
          empresa: String(dados.get('empresa') ?? '').trim(),
          email: String(dados.get('email') ?? '').trim(),
          interesse: String(dados.get('interesse') ?? '').trim(),
          mensagem: String(dados.get('mensagem') ?? '').trim(),
          empresa_confirmacao: '',
        }),
      });

      if (!resposta.ok) throw new Error(String(resposta.status));
      formulario.reset();
      setEstado('enviado');
    } catch {
      setEstado('erro');
    }
  }

  const rotulo = 'mb-1.5 block text-[0.88rem] font-semibold text-texto-2';
  const campo =
    'w-full rounded-lg border border-linha bg-fundo px-3.5 py-2.5 text-[0.98rem] text-texto placeholder:text-texto-3 focus:border-teal focus:outline-none disabled:opacity-60';
  const enviando = estado === 'enviando';

  if (estado === 'enviado') {
    return (
      <div className="cartao p-8" role="status">
        <p className="etiqueta">Mensagem enviada</p>
        <h2 className="mt-3 text-[1.4rem]">Recebemos o seu contato</h2>
        <p className="mt-3 text-[0.98rem] text-texto-2">
          Respondemos em até um dia útil, por uma pessoa. Se for urgente, escreva direto para{' '}
          <a href={`mailto:${DESTINO}`} className="text-teal underline-offset-4 hover:underline">
            {DESTINO}
          </a>
          .
        </p>
        <button type="button" className="botao botao-fantasma mt-6" onClick={() => setEstado('parado')}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} className="cartao flex flex-col gap-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={rotulo} htmlFor="nome">
            Nome
          </label>
          <input id="nome" name="nome" required autoComplete="name" disabled={enviando} className={campo} />
        </div>
        <div>
          <label className={rotulo} htmlFor="empresa">
            Empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            required
            autoComplete="organization"
            disabled={enviando}
            className={campo}
          />
        </div>
      </div>

      <div>
        <label className={rotulo} htmlFor="email">
          E-mail corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={enviando}
          className={campo}
        />
      </div>

      <div>
        <label className={rotulo} htmlFor="interesse">
          Sobre o que você quer falar
        </label>
        <select
          id="interesse"
          name="interesse"
          defaultValue={INTERESSES[0]}
          disabled={enviando}
          className={campo}
        >
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
          disabled={enviando}
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
        <button type="submit" className="botao botao-primario" disabled={enviando}>
          {enviando ? 'Enviando…' : 'Enviar mensagem'}
        </button>

        <p className="text-[0.85rem] text-texto-3" role={estado === 'erro' ? 'alert' : undefined}>
          {estado === 'erro' ? (
            <>
              Não conseguimos enviar agora. Tente de novo em instantes ou escreva para{' '}
              <a href={`mailto:${DESTINO}`} className="text-teal underline-offset-4 hover:underline">
                {DESTINO}
              </a>
              .
            </>
          ) : (
            'Usamos os seus dados apenas para responder a este contato.'
          )}
        </p>
      </div>
    </form>
  );
}
