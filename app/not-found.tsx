import Link from 'next/link';

export default function NaoEncontrada() {
  return (
    <section className="pb-[110px] pt-24">
      <div className="envolve max-w-[60ch]">
        <p className="sobrancelha">Erro 404</p>
        <h1 className="mt-3.5 text-[clamp(2rem,4vw,3rem)]">Esta página não existe</h1>
        <p className="chamada mt-5">
          O endereço pode ter mudado quando reconstruímos o site. Os caminhos antigos foram redirecionados, mas este
          escapou.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/" className="botao botao-primario">
            Ir para a página inicial
          </Link>
          <Link href="/integridade/" className="botao botao-fantasma">
            Verificar integridade
          </Link>
        </div>
      </div>
    </section>
  );
}
