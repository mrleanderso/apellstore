# APELL 2.0 — Commerce Experience

Loja editorial estática, responsiva, com 15 variações, fotos reais e referências ilustrativas identificadas, galeria com zoom, favoritos, sacola e consulta de compra pelo WhatsApp. Sem servidor próprio, autenticação, banco de dados ou pagamento online.

## Organização
- `index.html`: página inicial e estrutura da aplicação.
- `css/style.css`: estilos e responsividade.
- `js/shop.js`: lógica de catálogo, galeria e atendimento.
- `data/products.json`: cadastro central (preços em centavos; bonés sob consulta). Preserve a ordem e os identificadores das variantes para compatibilidade com as sacolas salvas.
- `img/`: imagens originais e editoriais preservadas.
- `p/`: 15 páginas de entrada compartilháveis, geradas a partir do catálogo, com títulos, descrições e fotos específicas.
- `scripts/generate-pages.mjs`: execute `node scripts/generate-pages.mjs` após alterações no catálogo ou HTML; se houver domínio confirmado, configure APELL_PUBLIC_ORIGIN para metadados absolutos.
- `config.js`: WhatsApp oficial preservado.

## Desenvolvimento e publicação
Use um servidor HTTP estático na raiz (por exemplo `python -m http.server 8000`); não abra o HTML diretamente por file://, pois o catálogo utiliza fetch. A Vercel pode servir os arquivos diretamente, sem build. Mantenha toda a estrutura de pastas. Para uso comercial, verifique o plano da hospedagem.

## Compra e privacidade
Nome e CEP para consulta de frete, ou consulta de retirada. O ViaCEP é opcional e só recebe o CEP após clique. O endereço completo, estoque, pagamento e frete são combinados com a loja; nenhum pedido é cobrado ou confirmado automaticamente. Nome e CEP ficam em memória e só compõem a mensagem de WhatsApp preparada pelo cliente. Sacola, favoritos e histórico ficam no armazenamento local e podem ser limpos pelo menu de privacidade. A recuperação da última sacola permanece disponível por sete dias.

## Antes de operar comercialmente
Validar fotos ilustrativas, tabela oficial de medidas, valores, disponibilidade, políticas de entrega, troca e privacidade com a APELL. As fotos originais dos bonés são recortes de campanha, não fotos de estúdio oficiais. O site não inventa condições comerciais. O sorteio permanece com a data e arte da edição anterior. Sem rastreamento de terceiros adicionado; métricas agregadas dependem de configuração da loja e avaliação de privacidade. Verificar visualização e compartilhamento em dispositivos reais após o deploy.

## Revisão visual — Quiet Luxury
Camada `css/quiet.css` com escala tipográfica contida (abertura até 56 px, seções até 36 px, produtos até 44 px), composição fotográfica dominante, categorias rotuladas abaixo das imagens, menu mais sóbrio, chamadas diretas e controles de toque e foco visível preservados. As 15 páginas são regeneradas com a mesma estrutura. Nenhum ativo de imagem, preço ou fluxo comercial foi modificado nesta revisão. A inspeção estática não substitui testes de acessibilidade, navegador e dispositivos reais.
