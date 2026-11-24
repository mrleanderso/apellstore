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

## Fotografia integral e editorial rotativo
A exibição utiliza encaixe integral (contain), fundos neutros, espaçamento para fotos reais e não aplica zoom automático que recorte as peças. O carrossel de campanha alterna a cada 8 s quando visível; Compre o look apresenta cinco variações com foto editorial e foto real correspondente, alterna a cada 12 s e lembra a última cena na sessão para variar ao recarregar. Ambos permitem pausar, navegar manualmente, respeitam movimento reduzido e suspendem a rotação enquanto há foco, interação, diálogo aberto ou página oculta. Não há edição dos arquivos fotográficos originais; recortes já presentes na fonte permanecem.

## Identidade APELL — categorias e tipografia
Três novas imagens editoriais ilustrativas, separadas em WebP de 960 × 720, com símbolo e nome APELL representados nas peças. As fotos de categoria antigas e as fotografias reais de produto permanecem no repositório. A tipografia dos títulos utiliza Manrope com fallback DM Sans, inspirada na geometria do wordmark, sem se apresentar como a fonte oficial da marca. As páginas de produto foram regeneradas. A representação da marca e do corte nas imagens geradas é aproximada e deve ser validada pelo lojista.

## Acabamento e revisão crítica
Menu compacto com grupos e contagens, navegação direta por categoria (inclusive links recarregáveis), botão com geometria sutil inspirada na marca, cards com informação reduzida, lista de categorias até 480 px, ações de 44–48 px e foco/rolagem ajustados. As imagens de categoria foram inspecionadas: nome e símbolo APELL aparecem, porém o bordado gerado por IA é aproximado e as margens já estão no arquivo. Mantivemos a identificação ilustrativa e o enquadramento integral. Sacola e resumo usam recortes originais para bonés. Nenhum preço ou ativo foi alterado. Testes estáticos e de roteamento isolado não substituem auditoria visual e acessibilidade em dispositivos reais.

## Simplificação final da vitrine
Página inicial com quatro seções: campanha, categorias, catálogo e editorial. Campanha inicia em modo manual, com reprodução automática opcional; editorial de looks sempre manual, mantendo variação por sessão. Montagem de look permanece disponível em controle expansível. Histórico recente foi transferido para o rodapé, recolhido por padrão; informações da marca incorporadas ao rodapé. Sorteio só abre mediante clique, mantendo o vencimento anterior. Seis produtos iniciais no filtro geral, com acesso às demais opções. Foram preservados ativos, catálogo, preços, sacola, rotas e checkout.

## Auditoria funcional de IHC
Fotos reais como padrão, referências de IA explicitamente identificadas; bonés agora têm página de produto, favoritos e histórico como as roupas. Filtros sincronizados com hash e histórico; links de entrada são normalizados para manter a navegação no mesmo documento. Checkout reúne revisão de itens, dados e envio ao WhatsApp, com copiar/PDF e limpeza da sacola opcionais. O envio não é verificado pelo site. Nome e CEP ficam apenas em memória (sem persistência após recarga); limpeza explícita também zera o estado em memória e remove chaves locais. Busca inclui sinônimos, cores e tamanhos indicativos, sem inferir estoque. Preços, medidas oficiais, disponibilidade e políticas permanecem dependentes da marca. Não foi adicionado chatbot nem serviço de IA em produção. Acessibilidade: alvos de toque, foco e movimento reduzido revisados; conformidade WCAG e testes com usuários ainda não demonstrados.

### Testes de regressão
Execute `node --test scripts/ihc-regression.test.mjs` na raiz. Os testes cobrem análise de sintaxe, referências de elementos, rotas isoladas, sinônimos e tamanhos, conteúdo de solicitação e páginas de entrada. Não simulam o DOM completo, o WhatsApp nem tecnologias assistivas.

## Calm Design — revisão da vitrine
Campanhas exclusivamente manuais, com quatro botões textuais e estado selecionado por sublinhado, navegação por teclado e gesto de deslizar preservados. Sem miniaturas, contadores, reprodução automática ou timer. Cards com nome, cor, preço e favorito; aviso de IA e de recorte original dos bonés mantido. Filtros textuais, contador único, sem progresso redundante, editorial compacto e sorteio acessível pelo rodapé. A faixa superior não promete entrega sem confirmação. Imagens, preços, catálogo, checkout e configurações preservados. Testes estáticos não substituem verificação visual em navegador.

## Vitrine fotográfica tranquila
As 15 variações usam as referências existentes em proporção 4:5, sem zoom automático, filtros de cor ou molduras internas: 8 conjuntos e 4 camisetas no corpo, 3 bonés isolados em estúdio. A vitrine não possui alternador global. Um aviso visível identifica as referências de IA; cada produto abre primeiro a referência ilustrativa e oferece a foto real em miniatura nomeada. Os originais permanecem intocados e acessíveis (bonés: recortes de campanha), inclusive para ampliação. O tratamento é de apresentação e enquadramento, não edição dos pixels nem aumento de resolução. As imagens ilustrativas não comprovam modelagem, cor, logotipo ou acabamento exatos.

## Vitrine essencial
A página inicial contém apenas campanha, categorias e coleção, seguidas do rodapé. Foram retirados Compre o look, Monte seu look e seus controles e inicialização JavaScript; links antigos #looks e #combine redirecionam à coleção. O menu não oferece mais o editorial separado. Espaçamentos entre seções e antes do rodapé aumentados de forma responsiva. Imagens e funções essenciais de compra preservadas.

## Direção autoral APELL
Aplicada a versão experimental aprovada: assinatura com símbolo original, linguagem de campanha, tratamento tipográfico, botão e ícones refinados. A camada css/autoral.css preserva a estrutura e o fluxo da loja. Fotografias de campanha, categorias, catálogo e detalhes usam enquadramento integral (contain), sem zoom de hover; no celular a campanha assume a proporção original. Imagens e dados comerciais intactos. Em desktop podem aparecer áreas neutras ao redor das imagens para preservar a composição completa.
