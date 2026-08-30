'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CODIGO_APROVADO,
  CODIGO_ADULTERADO,
  ARQUIVO_EXEMPLO,
  VEREDITO_COM_ACHADOS,
  VEREDITO_SEM_ACHADOS,
  VEREDITO_INTEGRO,
} from '@/conteudo/exemplo';
import { linhasIntroduzidas, mascarar, sha256, verificar, type Resultado } from '@/lib/integridade';

const CURTO = (hash: string) => (hash ? hash.slice(0, 24) + '…' : '—');

type Estado = 'aprovado' | 'editado' | 'adulterado';

export function DemoIntegridade({ compacta = false }: { compacta?: boolean }) {
  const [codigo, setCodigo] = useState(CODIGO_APROVADO);
  const [estado, setEstado] = useState<Estado>('aprovado');
  const [hashAprovado, setHashAprovado] = useState('');
  const [hashAtual, setHashAtual] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [verificando, setVerificando] = useState(false);
  const [indisponivel, setIndisponivel] = useState(false);
  const painelRef = useRef<HTMLDivElement>(null);

  // O hash do baseline nunca muda; o atual acompanha cada tecla.
  useEffect(() => {
    sha256(CODIGO_APROVADO).then(setHashAprovado).catch(() => setIndisponivel(true));
  }, []);

  useEffect(() => {
    let ativo = true;
    sha256(codigo)
      .then((h) => ativo && setHashAtual(h))
      .catch(() => ativo && setIndisponivel(true));
    return () => {
      ativo = false;
    };
  }, [codigo]);

  const aoVerificar = useCallback(async () => {
    setVerificando(true);
    try {
      setResultado(await verificar(CODIGO_APROVADO, codigo));
    } catch {
      setIndisponivel(true);
    } finally {
      setVerificando(false);
    }
  }, [codigo]);

  const trocar = (novo: string, proximoEstado: Estado) => {
    setCodigo(novo);
    setEstado(proximoEstado);
    setResultado(null);
  };

  const novas = new Set(linhasIntroduzidas(CODIGO_APROVADO, codigo));

  return (
    <div className={compacta ? 'grid gap-5 lg:grid-cols-2' : 'grid gap-5 lg:grid-cols-[1.05fr_0.95fr]'}>
      {/* ---------------------------------------------------------- editor */}
      <div>
        <div className="cartao overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-linha bg-superficie-2 px-4 py-3">
            <span className="font-mono text-[0.82rem] text-texto-2">{ARQUIVO_EXEMPLO}</span>
            <span className="font-mono text-[0.78rem] text-texto-3">
              {estado === 'aprovado' ? 'versão aprovada' : estado === 'adulterado' ? 'produção adulterada' : 'editado por você'}
            </span>
          </div>

          <label htmlFor="editor-codigo" className="sr-only">
            Código do arquivo {ARQUIVO_EXEMPLO}, editável
          </label>
          <textarea
            id="editor-codigo"
            value={codigo}
            spellCheck={false}
            onChange={(e) => {
              setCodigo(e.target.value);
              setEstado('editado');
              setResultado(null);
            }}
            className="block h-[330px] w-full resize-y border-0 bg-superficie p-4 font-mono text-[0.78rem] leading-[1.75] text-[#c7d6e0] focus:outline-none"
          />

          <dl className="flex flex-wrap gap-x-6 gap-y-2 border-t border-linha bg-fundo-2 px-4 py-3 font-mono text-[0.74rem] text-texto-3">
            <div className="flex gap-2">
              <dt className="font-semibold text-texto-2">Aprovado:</dt>
              <dd>{CURTO(hashAprovado)}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-semibold text-texto-2">Atual:</dt>
              <dd className={hashAtual && hashAprovado && hashAtual !== hashAprovado ? 'text-[color:var(--critico-claro)]' : undefined}>
                {CURTO(hashAtual)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <button type="button" className="botao botao-primario" onClick={aoVerificar} disabled={verificando || indisponivel}>
            {verificando ? 'Verificando…' : 'Verificar integridade'}
          </button>
          <button type="button" className="botao botao-fantasma" onClick={() => trocar(CODIGO_ADULTERADO, 'adulterado')}>
            Simular alteração em produção
          </button>
          <button
            type="button"
            className="botao botao-fantasma"
            onClick={() => trocar(CODIGO_APROVADO, 'aprovado')}
            disabled={codigo === CODIGO_APROVADO}
          >
            Restaurar aprovado
          </button>
        </div>

        <p className="mt-3.5 text-[0.82rem] text-texto-3">
          O SHA-256 é calculado pelo seu próprio navegador e os padrões de risco rodam aqui, nesta página. Nada é
          enviado para servidor nenhum — pode colar o seu código à vontade.
        </p>
      </div>

      {/* -------------------------------------------------------- resultado */}
      <div className="cartao overflow-hidden" ref={painelRef} aria-live="polite">
        {indisponivel ? (
          <p className="px-5 py-10 text-center text-[0.95rem] text-texto-3">
            Este navegador não expõe a Web Crypto nesta página, então a verificação não pode rodar aqui. Em
            <span className="font-semibold text-texto-2"> dalia.tec.br</span> ela funciona normalmente.
          </p>
        ) : !resultado ? (
          <p className="px-5 py-10 text-center text-[0.95rem] text-texto-3">
            {estado === 'aprovado'
              ? 'Rode a verificação para comparar esta versão com o baseline aprovado.'
              : 'Código alterado. Rode a verificação para ver o que a Dalia encontra.'}
          </p>
        ) : resultado.integro ? (
          <>
            <p className="flex items-center gap-2.5 border-b border-linha bg-[rgba(39,189,176,0.10)] px-4 py-3.5 font-semibold text-teal">
              <span aria-hidden>✓</span> Íntegro — produção corresponde ao aprovado
            </p>
            <p className="px-4 py-4 text-[0.94rem] text-texto-2">{VEREDITO_INTEGRO}</p>
          </>
        ) : (
          <>
            <p className="flex items-center gap-2.5 border-b border-linha bg-[rgba(229,72,77,0.12)] px-4 py-3.5 font-semibold text-[color:var(--critico-claro)]">
              <span aria-hidden>⚠</span> Alterado fora do fluxo — severidade {resultado.severidade}
            </p>

            {resultado.achados.length === 0 ? (
              <p className="border-b border-linha-suave px-4 py-4 text-[0.92rem] text-texto-2">
                Nenhum padrão determinístico de ataque foi reconhecido nas {resultado.linhasNovas.length} linha(s)
                introduzida(s).
              </p>
            ) : (
              <ul>
                {resultado.achados.map((achado) => (
                  <li key={achado.id} className="border-b border-linha-suave px-4 py-3.5 last:border-0">
                    <p>
                      <span
                        className={
                          'mr-2 inline-block rounded-full border px-2 py-0.5 align-[2px] text-[0.68rem] font-bold tracking-[0.08em] ' +
                          (achado.nivel === 'critico'
                            ? 'border-[rgba(229,72,77,0.4)] bg-[rgba(229,72,77,0.16)] text-[color:var(--critico-claro)]'
                            : 'border-[rgba(226,162,75,0.38)] bg-[rgba(226,162,75,0.14)] text-ouro')
                        }
                      >
                        {achado.nivel === 'critico' ? 'CRÍTICO' : 'ALTO'}
                      </span>
                      <span className="font-semibold">{achado.titulo}</span>
                    </p>
                    <p className="mt-1.5 text-[0.9rem] text-texto-2">{achado.explicacao}</p>
                    <code className="mt-2 block overflow-x-auto rounded-md bg-fundo px-2.5 py-2 font-mono text-[0.74rem] text-[color:var(--critico-claro)]">
                      {mascarar(achado.evidencia)}
                    </code>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-linha bg-superficie-2 px-4 py-4">
              <p className="etiqueta">Veredito da análise</p>
              <p className="mt-2 text-[0.94rem]">
                {resultado.achados.length ? VEREDITO_COM_ACHADOS : VEREDITO_SEM_ACHADOS}
              </p>
              <p className="mt-3 text-[0.8rem] text-texto-3">
                Na plataforma este veredito é escrito por IA a partir do diff real, o achado vira relatório de
                evidência em PDF e o alerta chega à equipe de segurança por e-mail.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Diff das linhas introduzidas, so quando ha o que mostrar. */}
      {novas.size > 0 && (
        <div className="cartao overflow-hidden lg:col-span-2">
          <p className="border-b border-linha bg-superficie-2 px-4 py-3 text-[0.82rem] font-semibold text-texto-2">
            Linhas introduzidas em relação ao baseline aprovado
          </p>
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.76rem] leading-[1.8] text-[color:var(--critico-claro)]">
            {Array.from(novas)
              .map((linha) => '+ ' + mascarar(linha).trim())
              .join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
}
