/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportacao estatica: o site vai para o Azure Static Web Apps sem servidor Node.
  output: 'export',
  // Static Web Apps serve /caminho/ como /caminho/index.html.
  trailingSlash: true,
  // Sem servidor nao ha otimizacao de imagem sob demanda; os assets ja vao otimizados.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
