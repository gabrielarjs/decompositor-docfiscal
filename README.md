# 📊 Decompor Chave de Acesso de Documentos Fiscais Eletrônicos

Uma ferramenta online **gratuita** e **privada** para decompor e analisar chaves de acesso de documentos fiscais eletrônicos (NF-e, CT-e, MDF-e e outros).

## ✨ Recursos Principais

- 🔍 **Decomposição Completa**: Analisa todos os 44 dígitos da chave de acesso
- ✅ **Validação Automática**: Verifica o dígito verificador automaticamente
- 📷 **Leitura de Código de Barras**: Capture códigos de barras (QR codes) usando a câmera
- 🔒 **Privacidade Total**: Todo processamento ocorre no navegador
- 🎨 **Interface Moderna**: Design responsivo e intuitivo
- 📋 **Cópia Rápida**: Copie os resultados com um clique
- 💰 **Totalmente Gratuito**: Sem anúncios ou cobranças

## 📋 Estrutura da Chave de Acesso (44 dígitos)

| Posição | Campo | Descrição | Exemplo |
|---------|-------|-----------|---------|
| 1-2 | UF | Código do estado | 35 (SP) |
| 3-6 | AAMM | Ano e mês de emissão | 2501 (Jan/2025) |
| 7-20 | CNPJ | CNPJ do emitente | 12345678000195 |
| 21-22 | Modelo | Modelo do documento | 55 (NF-e) |
| 23-25 | Série | Série do documento | 001 |
| 26-34 | Número | Número do documento | 123456789 |
| 35 | Tipo de Emissão | Tipo de emissão | 1 (Normal) |
| 36-43 | Código Numérico | Código aleatório | 87654321 |
| 44 | DV | Dígito verificador | 7 |

## 🚀 Como Usar

### Método 1: Digitar a Chave
1. Acesse a ferramenta em [decompositor-docfiscal](https://seu-dominio.com)
2. Digite ou cole a chave de acesso (44 dígitos)
3. Clique em **"Decompor"** ou pressione Enter
4. Os resultados aparecem em uma tabela
5. Clique em **"Copiar Resultados"** para copiar todas as informações

### Método 2: Usar a Câmera (Novo!)
1. Clique no botão **"📷 Câmera"**
2. Permita o acesso à câmera do seu dispositivo
3. Posicione o código de barras na tela
4. A detecção é automática
5. Os resultados aparecem instantaneamente
6. Use **"✨ Nova Busca"** para fazer outra leitura

## 🔒 Privacidade & Segurança

- ✅ Nenhum dado é enviado para servidores externos
- ✅ Todo processamento ocorre **localmente** no navegador
- ✅ Suas chaves nunca deixam seu dispositivo
- ✅ Funciona offline após carregamento inicial
- ✅ Sem cookies ou rastreamento
- ✅ Código-aberto e transparente

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design com gradientes e animações
- **JavaScript**: Processamento puro
- **jsQR**: Detecção de códigos de barras
- **FontAwesome**: Ícones modernos
- **MediaDevices API**: Acesso à câmera

## 📱 Compatibilidade

| Navegador | Versão Mín. |
|-----------|------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14.1+ |
| Edge | 90+ |
| Android Browser | 5+ |

## 📖 Documentação

Para entender melhor como a ferramenta funciona, visite a página [Como Funciona](sobre.html).

## 📄 Licença

Este projeto está licenciado sob [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.pt_BR).

## 👤 Autor

**Gabriel Sousa** - 2025

## 💻 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/decompositor-docfiscal.git

# Abra no navegador
# Nenhuma dependência ou build necessário!
# Simplesmente abra o arquivo index.html
```

## 🎯 Funcionalidades Futuras

- [ ] Processamento em lote
- [ ] Exportar para PDF/Excel
- [ ] Histórico de buscas
- [ ] Suporte a mais idiomas
- [ ] Modo escuro
- [ ] API REST

## 🐛 Reportar Problemas

Encontrou um problema? [Abra uma issue](https://github.com/seu-usuario/decompositor-docfiscal/issues)

## 💡 Sugestões

Tem uma ideia? Compartilhe conosco!

---

**Desenvolvido com ❤️ para facilitar a análise de documentos fiscais eletrônicos**


## Ultimas Atualizações

- Ajustes de responsividade para dispositivos móveis.
- Adicionando botão de copiar para facilitar a cópia das informações exibidas.S