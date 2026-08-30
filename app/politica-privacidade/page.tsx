import type { Metadata } from 'next';
import { DocumentoJuridico } from '@/components/DocumentoJuridico';
import { PRIVACIDADE } from '@/conteudo/juridico';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Quais dados pessoais a Dalia trata, para quê, com qual base legal da LGPD, com quem compartilha, por quanto tempo guarda e como você exerce os seus direitos.',
  alternates: { canonical: '/politica-privacidade/' },
};

export default function Privacidade() {
  return <DocumentoJuridico documento={PRIVACIDADE} />;
}
