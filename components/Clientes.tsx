import Image from 'next/image';

/**
 * Faixa de clientes. Sao dois — entao nada de mural de logos, que so
 * evidenciaria o vazio. Duas marcas, centradas, com uma linha de contexto.
 */
const CLIENTES = [
  {
    nome: 'MB Labs',
    site: 'https://mblabs.com.br/',
    arquivo: '/clientes/mblabs.png',
    largura: 467,
    altura: 96,
  },
  {
    nome: 'Noorden',
    site: 'https://www.noorden.com.br/',
    arquivo: '/clientes/noorden.png',
    largura: 435,
    altura: 96,
  },
];

export function Clientes() {
  return (
    <section className="border-y border-linha-suave py-10">
      <div className="envolve flex flex-col items-center gap-7 text-center">
        <p className="sobrancelha">Confiam na Dalia</p>

        <ul className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {CLIENTES.map((cliente) => (
            <li key={cliente.nome}>
              <a
                href={cliente.site}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${cliente.nome} — abre o site em nova aba`}
                className="block opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
              >
                <Image
                  src={cliente.arquivo}
                  alt={cliente.nome}
                  width={cliente.largura}
                  height={cliente.altura}
                  style={{ height: 30, width: 'auto' }}
                />
              </a>
            </li>
          ))}
        </ul>

        <p className="max-w-[58ch] text-[0.92rem] text-texto-3">
          Empresas de tecnologia que colocaram o próprio código sob a Dalia.
        </p>
      </div>
    </section>
  );
}
