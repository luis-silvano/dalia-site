import type { Metadata } from 'next';
import { DocumentoJuridico } from '@/components/DocumentoJuridico';
import { TERMOS } from '@/conteudo/juridico';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description:
    'Condições de uso do site da Dalia e da demonstração pública de verificação de integridade. O uso da plataforma é regido pelo contrato de cada cliente.',
  alternates: { canonical: '/termos/' },
};

export default function Termos() {
  return <DocumentoJuridico documento={TERMOS} />;
}
