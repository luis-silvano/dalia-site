# dalia.tec.br

Site institucional da DALIA. Aplicação Next.js exportada como site estático e
hospedada no Azure Static Web Apps.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em <http://localhost:3000>.

## Antes de publicar

```bash
npm run verifica
```

Roda, nesta ordem: checagem de tipos, testes unitários e build. Não publique com
qualquer um dos três vermelho.

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Textos da home | `conteudo/home.ts` |
| Código de exemplo e vereditos da demo | `conteudo/exemplo.ts` |
| Detectores de risco da demo | `lib/integridade.ts` |
| Menu e rodapé | `components/Cabecalho.tsx`, `components/Rodape.tsx` |
| Uma página inteira | `app/<pagina>/page.tsx` |
| Cores e fontes | `app/globals.css` (tokens no `:root`) |
| Redirects e cabeçalhos HTTP | `public/staticwebapp.config.json` |

Textos longos ficam em `conteudo/` justamente para permitir editar prosa sem
encostar em componente. Toda alteração ainda passa por commit e publicação.

## Verificação de integridade da página pública

`lib/integridade.ts` reimplementa em TypeScript, para rodar no navegador do
visitante, o que a plataforma faz no servidor: SHA-256 do conteúdo normalizado e
detectores determinísticos de padrão de risco.

Nada é enviado para servidor nenhum — é o que a página promete ao visitante, e é
o motivo de a demonstração não custar nada nem expor a API.

Se um detector for alterado na plataforma, vale espelhar aqui. Os testes em
`testes/integridade.test.ts` cobrem hash, normalização, cada detector e a
ausência de falso-positivo no baseline limpo.

## Marca

Os arquivos em `public/marca/` são gerados a partir da pasta de identidade
oficial. O logotipo do cabeçalho (`lockup-branco.png`) é o logotipo oficial com a
assinatura recortada — a 30px de altura ela vira borrão ilegível. A assinatura
completa aparece na imagem de compartilhamento (`og.png`).

## Publicação

```bash
npm run verifica
npx @azure/static-web-apps-cli deploy ./out --deployment-token "$SWA_TOKEN" --env production
```

O token sai de:

```bash
az staticwebapp secrets list --name swa-dalia-site --resource-group rg-dalia-prod-brazilsouth --query "properties.apiKey" -o tsv
```

## Pendências conhecidas

- **Formulário de contato** abre o cliente de e-mail do visitante. Trocar por
  `POST` num endpoint público da API da Dalia quando ele existir — o corpo já
  montado em `components/FormularioContato.tsx` é o payload desejado.
- **Política de privacidade** foi migrada do site anterior com correções de
  redação. O texto de origem era genérico; merece revisão jurídica, ainda mais
  agora que existe DPA assinado com clientes.
- **Analytics**: nenhum instalado. Se entrar, preferir uma opção sem cookie para
  não precisar de banner de consentimento.

## Ambiente publicado

- **Validação:** <https://kind-sea-0c331d50f.7.azurestaticapps.net>
- Recurso: `swa-dalia-site` (Free) em `rg-dalia-prod-brazilsouth`, região East US 2
- `dalia.tec.br` ainda aponta para o Webflow. A troca de DNS é o último passo.

### Cuidado com redirect permanente

A primeira publicação levou `"trailingSlash": "always"` na configuração do SWA,
que emitia 301 permanente até para arquivo (`/a.css` → `/a.css/`). Navegadores
que carregaram o site nessa janela guardaram o 301 e passaram a entrar em loop
depois da correção — a página aparece sem estilo.

Se acontecer: `Ctrl+Shift+R`. O servidor está correto; o cache é que não.
Lição: 301 é permanente de verdade. Em dúvida, use 302 até ter certeza.
