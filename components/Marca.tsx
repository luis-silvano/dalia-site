import Image from 'next/image';
import Link from 'next/link';

/**
 * Logotipo do cabecalho: simbolo + palavra, recortados do logotipo oficial.
 * A assinatura "Enterprise Semantic Risk Control" fica de fora de proposito —
 * a 30px de altura ela vira borrao. Ela aparece inteira na imagem de compartilhamento.
 */
export function Marca({ altura = 30 }: { altura?: number }) {
  return (
    <Link href="/" aria-label="DALIA — página inicial" className="inline-flex items-center">
      <Image
        src="/marca/lockup-branco.png"
        alt="DALIA"
        width={425}
        height={104}
        priority
        style={{ height: altura, width: 'auto' }}
      />
    </Link>
  );
}

/** Simbolo isolado, para rodape e usos compactos. */
export function Simbolo({ tamanho = 28 }: { tamanho?: number }) {
  return (
    <Image
      src="/marca/d-branco.png"
      alt=""
      aria-hidden
      width={192}
      height={192}
      style={{ height: tamanho, width: tamanho, objectFit: 'contain' }}
    />
  );
}
