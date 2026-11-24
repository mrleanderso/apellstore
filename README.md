# APELL — Experience Edition

Vitrine responsiva em HTML, CSS e JavaScript, com galeria cinematográfica, navegação por cores, páginas individuais de produto (rotas por hash), favoritos e sacola persistentes no navegador e checkout de solicitação via WhatsApp. Sem servidor, banco de dados, gateway ou cobrança online.

## Publicação
1. Extraia o ZIP e mantenha index.html, style.css, shop.js, config.js e img/ na raiz.
2. No GitHub, crie um repositório e envie os arquivos extraídos (não o ZIP).
3. Na Vercel, importe o repositório como projeto estático, framework Other, sem comando de build e diretório de saída padrão. Para operação comercial, confira o plano aplicável. Também funciona em hospedagem estática compatível.
4. O número oficial informado (5569992446925) já está configurado em config.js. O checkout abre o WhatsApp com a mensagem pronta para revisão e envio pelo comprador.
5. Confira preços e tamanhos em shop.js (valores demonstrativos), fotos e disponibilidade com a loja. Bonés têm referências recortadas da campanha; fotos individuais, valores e cadastro oficial precisam ser confirmados.

## Fluxo
Coleção → produto → cor/tamanho → sacola → checkout (nome, entrega com CEP e endereço completo ou consulta de retirada) → revisão → WhatsApp. A mensagem não registra venda nem reserva e o frete, estoque e pagamento devem ser confirmados pela loja. A consulta ViaCEP envia somente o CEP à API pública e permite preenchimento manual se indisponível. Não calcula frete. Nenhum dado do checkout é persistido; apenas favoritos, sacola e histórico de peças vistas ficam no localStorage do navegador. As fontes web são carregadas do Google Fonts quando disponíveis, com fallback local.

## Validação
Fluxo de demonstração testado com Chromium (320, 390 e 1440 px) em HTML autônomo, sem navegação externa. Envio real pelo WhatsApp, publicação, tabela oficial de medidas, preços, estoque e políticas comerciais dependem de validação pelo cliente.

## Domínio
O subdomínio vercel.app pode ser mantido sem compra de domínio próprio; uso comercial na Vercel requer plano Pro ou Enterprise.

## Experience
Editorial com pontos clicáveis, combinação de conjunto e camiseta com tamanhos independentes, guia ilustrado sem recomendação automática, ampliação de fotos existentes, histórico local apagável, edição de quantidades no checkout e links de atendimento. Não há fotos de detalhes de tecido, tabela oficial de medidas ou estoque em tempo real.

## Campanha de dezembro
- Bonés: três referências visuais recortadas da arte enviada (preto, cinza e branco), sem preços inventados. Consulta via WhatsApp; não entram na sacola até a loja informar preços e variações oficiais.
- Sorteio: pop-up na página inicial, uma vez por sessão, reabertura pelo topo, fecha por X, Escape, clique fora ou botão secundário. Expira em 11/12/2026 00h (UTC−4). Link direciona ao perfil oficial, pois a URL da publicação não foi fornecida. Confirmar regras/autorizações com a marca antes de publicar.

## Atualização da jornada de compra
- Bonés entram na sacola com valor sob consulta (sem preço fictício); o subtotal dos produtos com preço é identificado separadamente.
- O botão de finalizar só é habilitado após abrir o WhatsApp; o visitante confirma manualmente que enviou. O site não comprova envio ou recebimento.
- A sacola anterior pode ser recuperada por sete dias no mesmo navegador. Somente itens e referência são armazenados; nome e endereço ficam em memória até a finalização.
- Resumo PDF gerado localmente, referência aleatória, sem banco de dados ou e-mail.
- Pop-up com largura limitada ao viewport.

## Editorial atualizado
Quatro cenas na galeria, com campanha de camisetas e bonés geradas como referências editoriais a partir da identidade da APELL. Os modelos e as marcas bordadas são ilustrativos; valide com a marca. A logo oficial do site, as imagens originais do catálogo, as referências dos bonés e a arte oficial do sorteio permanecem intactas.

## Revisão fotográfica
- Primeira cena preservada; segunda cena com modelos em verde profundo e azul royal, terceira com camiseta verde-oliva em uso, quarta com os bonés da campanha anterior.
- Fotografia editorial ameixa diferente na seção de looks; pontos clicáveis reposicionados. Categorias usam composições de produtos distintas da galeria.
- Novas referências editoriais geradas por IA são ilustrativas, não fotos oficiais de pessoas vestindo as peças reais. Imagens reais do catálogo, logotipo e sorteio preservados. Valide cor, corte, marca e acabamento com a loja antes de publicar.

## Catálogo editorial — atualização final
- 12 novas referências de vestibilidade para os oito conjuntos e quatro camisetas. As imagens do catálogo são identificadas como ilustrativas; cada página de produto abre na foto original e permite alternar para a foto no corpo.
- A logo original do site permanece idêntica. Nas camisetas geradas, aplicação ilustrativa do desenho da marca original, com posição e proporção aproximadas.
- Três referências de bonés receberam ajuste de nitidez e resolução de apresentação; os recortes originais permanecem disponíveis. Não são fotografias novas nem detalhes de bordado confirmados.
- As imagens geradas devem ser aprovadas pela APELL quanto a corte, cor, caimento e acabamento.

### Revisão de marca e fotografia
- Catálogo 4:5 com logo original aplicada nas referências ilustrativas; três bonés recriados em estúdio, mantendo as fotos anteriores para consulta. Validar as imagens ilustrativas com a marca antes de publicar.
