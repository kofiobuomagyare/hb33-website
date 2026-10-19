import type { DictionaryPatch } from "../dictionaries";

/**
 * Portuguese (Português, pt-PT) — full UI translation. Long-form product
 * copy lives in `lib/products.ts` and currently falls back to English/French.
 */
const pt: DictionaryPatch = {
  meta: {
    siteName: "HB33",
    homeTitle: "HB33 — Cacau, soja e cocopeat a granel da África Ocidental",
    homeDescription:
      "A HB33 fornece faves de cacau, cascas, manteiga, nibs, potássio, torta, soja e cocopeat a granel a fabricantes e compradores por grosso em todo o mundo. Encomendas em contentores, verificadas na origem.",
    productsTitle: "Produtos — Matérias-primas agrícolas a granel",
    productsDescription:
      "Explore o catálogo a granel da HB33: faves de cacau, cascas, manteiga, nibs, potássio, torta, soja e cocopeat. Pedido mínimo um contentor marítimo.",
    aboutTitle: "Sobre a HB33",
    aboutDescription:
      "A HB33 é um fornecedor de matérias-primas agrícolas da África Ocidental que serve fabricantes, transformadores e compradores por grosso com embarques a granel verificados.",
    howTitle: "Como funciona — Processo de encomenda a granel",
    howDescription:
      "Como comprar a granel à HB33: explore o catálogo, peça orçamento, confirme a disponibilidade e embarque FOB ou CIF. Mínimo um contentor.",
    quoteTitle: "Pedir orçamento — Pedido a granel",
    quoteDescription:
      "Envie um pedido a granel à HB33. Pedido mínimo um contentor marítimo. Confirmamos disponibilidade, preços e embarque.",
    contactTitle: "Contactar a HB33",
    contactDescription:
      "Contacte a HB33 para pedidos a granel por e-mail ou WhatsApp. Respondemos com especificações, preços e prazos.",
    privacyTitle: "Política de Privacidade",
    privacyDescription:
      "A HB33 recolhe o mínimo de dados pessoais — apenas o que nos envia nos pedidos de orçamento e mensagens de contacto — para responder ao seu pedido. Sem contas, sem newsletters, sem rastreadores publicitários.",
    termsTitle: "Termos de Utilização",
    termsDescription:
      "O envio de um pedido de orçamento ou mensagem não cria um contrato, não confirma stock nem fixa um preço. Pedido mínimo: um contentor marítimo. Os termos aplicam-se apenas a pedidos a granel genuínos.",
  },
  nav: {
    home: "Início",
    products: "Produtos",
    about: "Sobre nós",
    howItWorks: "Como funciona",
    contact: "Contacto",
    requestQuote: "Pedir orçamento",
    exploreProducts: "Ver produtos",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
    languageGroups: {
      global: "Global",
      europe: "Europa",
      asia: "Ásia",
      "middle-east": "Médio Oriente",
      ghana: "Gana",
      nigeria: "Nigéria",
      "east-africa": "África Oriental",
      francophone: "África Ocidental francófona",
    },
  },
  common: {
    learnMore: "Saber mais",
    viewProduct: "Ver produto",
    viewAllProducts: "Ver todos os produtos",
    backToProducts: "Voltar aos produtos",
    relatedProducts: "Produtos relacionados",
    send: "Enviar",
    sending: "A enviar…",
    submitInquiry: "Enviar pedido",
    submitting: "A enviar…",
    required: "Obrigatório",
    optional: "Opcional",
    containers: "contentores",
    container: "contentor",
    tonnageNote:
      "A tonelagem final depende da densidade do produto e do tipo de contentor — confirmada antes do embarque.",
    allRightsReserved: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    placeholderNote:
      "Os dados marcados como “a confirmar” serão verificados com a HB33 antes de qualquer embarque.",
  },
  moq: {
    short: "Pedido mínimo: 1 contentor marítimo. Apenas grandes quantidades.",
    long: "Pedido mínimo: 1 contentor marítimo. Trabalhamos apenas com grandes quantidades. Contacte-nos para confirmar o tipo de contentor, a capacidade de carga, a disponibilidade e o embarque.",
    badge: "MOQ: 1 contentor",
  },
  topbar: {
    message: "Apenas exportação a granel — mínimo de um contentor por pedido.",
  },
  hero: {
    eyebrow: "Cacau e matérias-primas da África Ocidental, verificados na origem",
    title: "Um mau embarque pode custar mais do que dinheiro.",
    lead: "A HB33 entrega cacau premium, soja e cocopeat a granel nos mercados mundiais — inspecionados antes de cada embarque.",
    primary: "Ver Produtos",
    secondary: "Pedir Orçamento",
    stats: [
      { value: "1 000 TM", label: "Capacidade mensal" },
      { value: "8", label: "Produtos a granel" },
      { value: "3", label: "Continentes servidos" },
      { value: "FOB / CIF", label: "Embarque mundial" },
    ],
  },
  trust: {
    eyebrow: "Porquê a HB33",
    title: "Feita para compradores que não podem ter uma semana má.",
    items: [
      {
        title: "Verificação primeiro",
        text: "Inspeção independente antes de cada embarque. Humidade verificada na origem, nunca à chegada.",
      },
      {
        title: "Sem intermediários",
        text: "Relações diretas com quintas e cooperativas da África Ocidental. Somos donos da cadeia — não apenas a ligamos.",
      },
      {
        title: "Não ficamos em silêncio",
        text: "Atualizações reais após o acordo. Documentação, carregamento e marcos de embarque em que pode agir.",
      },
    ],
  },
  homeProducts: {
    eyebrow: "Os nossos produtos",
    title: "Oito matérias-primas a granel. Um só padrão.",
    lead: "Produtos de cacau, oleaginosas e produto de coco — embalados para contentores e verificados lote a lote.",
    cta: "Ver o catálogo completo",
  },
  founder: {
    eyebrow: "Da mesa do fundador",
    title: "Bem-vindo à",
    titleAccent: "HB33.",
    imageAlt: "Hugo Obed, fundador da HB33",
    paragraphs: [
      "A HB33 nasceu de uma convicção simples: os fabricantes em todo o mundo merecem embarques em que possam confiar.",
      "Essa convicção nasceu da experiência. No início do meu percurso, um parceiro logístico alterou rotas de embarque sem o meu conhecimento para reduzir custos. O resultado foi devastador. A chuva danificou o embarque e suportei todo o prejuízo. Foi uma lição difícil, mas transformou a minha forma de encarar o negócio de exportação.",
      "Essa experiência ensinou-me que a qualidade, por si só, não basta. O aprovisionamento fiável tem de ser sustentado por logística fiável, documentação clara e comunicação transparente. É por isso que cada embarque que tratamos é verificado, documentado e inspecionado pela SGS antes de sair do porto.",
      "Hoje, a HB33 serve fabricantes na Ásia, na Europa e no Médio Oriente, fornecendo a granel faves de cacau, cascas, manteiga, nibs, potássio e torta provenientes de quintas de confiança da África Ocidental.",
      "Na HB33, não acreditamos em embarcar e esperar. Acreditamos em planear, verificar e entregar com confiança.",
      "Obrigado por nos confiar como parceiro de aprovisionamento. Esperamos ajudar o seu negócio a crescer com confiança.",
    ],
    name: "Hugo Obed",
    role: "Fundador, HB33",
  },
  processPreview: {
    eyebrow: "Como funciona",
    title: "Da quinta até à sua fábrica.",
    steps: [
      { title: "Ver e pedir", text: "Escolha os produtos e indique volumes e destino." },
      { title: "Confirmar condições", text: "Confirmamos disponibilidade, especificações, preços e embarque FOB/CIF." },
      { title: "Embarque verificado", text: "Inspecionado, documentado e embarcado em contentores completos." },
    ],
    cta: "Ver o processo completo",
  },
  logistics: {
    eyebrow: "Embalagem e logística",
    title: "Embalado para contentores. Documentado para a alfândega.",
    items: [
      { title: "Em contentores", text: "Carregamentos de 20 e 40 pés. Capacidade final confirmada por produto e tipo de contentor." },
      { title: "Documentação de exportação", text: "Certificado fitossanitário, certificado de origem e conhecimento de embarque em cada remessa." },
      { title: "FOB / CIF", text: "As suas condições, o seu porto — com atualizações em que pode agir." },
    ],
  },
  faqPreview: {
    eyebrow: "Perguntas frequentes",
    title: "O que os compradores perguntam antes do primeiro embarque.",
    cta: "Como encomendar",
  },
  homeFaqs: [
    {
      q: "O que fornece a HB33?",
      a: "Faves de cacau, cascas, manteiga, nibs, potássio e torta a granel, além de soja e cocopeat — tudo em quantidades de contentor para fabricantes, transformadores e compradores por grosso.",
    },
    {
      q: "Qual é o pedido mínimo?",
      a: "Um contentor marítimo completo por pedido. Trabalhamos apenas com grandes quantidades e confirmamos consigo o tamanho de contentor e a capacidade de carga antes do embarque.",
    },
    {
      q: "Embarcam FOB ou CIF?",
      a: "Ambos. Cotamos FOB ou CIF conforme o que for melhor para a sua operação, porto e cadeia de abastecimento.",
    },
    {
      q: "Como obtenho preços e especificações?",
      a: "Envie um pedido de orçamento com o produto, o volume e o destino. Respondemos com especificações, preços e prazos — não com um discurso de vendas.",
    },
  ],
  homeCta: {
    title: "O seu próximo embarque não deve ser uma aposta.",
    lead: "Diga-nos o que precisa. Confirmamos disponibilidade, especificações e embarque — por escrito.",
    primary: "Pedir Orçamento",
    secondary: "Contactar-nos",
  },
  productsPage: {
    eyebrow: "Catálogo",
    title: "Catálogo a granel",
    lead: "Pesquise e filtre oito matérias-primas para contentores. Cada pedido começa num contentor completo.",
    searchLabel: "Pesquisar produtos",
    searchPlaceholder: "Pesquisar cacau, soja, cocopeat…",
    categoryLabel: "Categoria",
    allCategories: "Todas as categorias",
    categories: {
      cocoa: "Produtos de cacau",
      oilseeds: "Oleaginosas",
      "growing-media": "Produto de coco",
    },
    sortLabel: "Ordenar",
    sortOptions: {
      featured: "Destaques",
      nameAsc: "Nome A–Z",
      nameDesc: "Nome Z–A",
    },
    results: "produtos",
    result: "produto",
    showing: "A mostrar",
    emptyTitle: "Nenhum produto corresponde aos filtros.",
    emptyText: "Tente outro termo ou categoria — ou envie-nos o seu pedido diretamente.",
    emptyCta: "Pedir Orçamento",
    quoteAction: "Pedir Orçamento",
  },
  productDetail: {
    overview: "Resumo",
    background: "Origens e importância comercial",
    educationalNote:
      "As informações gerais sobre matérias-primas abaixo são educativas. Os detalhes específicos do lote da HB33 são confirmados por pedido.",
    uses: "Usos e aplicações",
    specs: "Especificações",
    specsNote:
      "Especificações indicativas. Grau, humidade e embalagem finais são confirmados por lote e verificados antes do embarque.",
    quality: "Qualidade, manuseamento e armazenamento",
    packaging: "Embalagem e embarque a granel",
    buyers: "Compradores e indústrias",
    moqTitle: "Quantidade mínima",
    faq: "Perguntas sobre o produto",
    quoteCta: "Pedir orçamento para este produto",
    quoteButton: "Pedir Orçamento",
    whatsappButton: "Perguntar no WhatsApp",
    whatsappUnavailable:
      "O pedido por WhatsApp ainda não está configurado — utilize o formulário de orçamento ou o e-mail para recebermos o seu pedido de forma fiável.",
    toBeConfirmed: "A confirmar por lote",
  },
  aboutPage: {
    eyebrow: "Sobre a HB33",
    title: "Um parceiro de aprovisionamento, não apenas um fornecedor.",
    lead: "A HB33 nasceu de uma convicção simples: os fabricantes em todo o mundo merecem embarques de cacau e matérias-primas em que possam confiar.",
    storyTitle: "A nossa história",
    story: [
      "A HB33 nasceu da experiência em primeira mão do que pode correr mal no comércio de matérias-primas — um parceiro logístico alterou uma vez as rotas de embarque sem aviso para reduzir custos, e a chuva danificou o embarque inteiro. O custo dessa lição moldou tudo na forma como operamos hoje.",
      "A qualidade, por si só, não basta. O aprovisionamento fiável tem de ser sustentado por logística fiável, documentação clara e comunicação transparente. É por isso que cada embarque da HB33 é verificado, documentado e inspecionado antes de sair do porto.",
      "Hoje, a HB33 fornece produtos de cacau a granel, soja e cocopeat provenientes de quintas e cooperativas de confiança da África Ocidental a fabricantes na Ásia, na Europa e no Médio Oriente.",
    ],
    valuesEyebrow: "Os nossos valores",
    valuesTitle: "Aquilo em que acreditamos",
    values: [
      { title: "Verificação primeiro", text: "Inspeção e controlo de humidade na origem — antes do ensacamento e do carregamento, não à chegada." },
      { title: "Aprovisionamento direto", text: "Relações duradouras com quintas e cooperativas que conhecemos pelo nome." },
      { title: "Comunicação transparente", text: "Confirmações por escrito, atualizações reais de embarque e documentação em cada contentor." },
    ],
    factsEyebrow: "Em resumo",
    factsTitle: "Dados do negócio",
    factsNote:
      "Aqui só são listados factos verificados. Certificações, destinos e capacidades são confirmados por pedido — nunca presumidos.",
    facts: [
      { label: "Base", value: "África Ocidental" },
      { label: "Produtos", value: "8 SKUs a granel" },
      { label: "Capacidade mensal", value: "Até 1 000 TM" },
      { label: "Condições", value: "FOB / CIF" },
      { label: "Pedido mínimo", value: "1 contentor marítimo" },
    ],
    ctaTitle: "Trabalhe com a HB33",
    ctaText: "Diga-nos os seus volumes e destino — responderemos com especificações, preços e prazos.",
    ctaPrimary: "Pedir Orçamento",
    ctaSecondary: "Contactar-nos",
  },
  howPage: {
    eyebrow: "Como funciona",
    title: "Cinco passos para um contentor verificado.",
    lead: "Enviar um pedido não confirma automaticamente uma encomenda, a disponibilidade de stock ou um preço final. Cada encomenda é confirmada por escrito antes de qualquer embarque.",
    steps: [
      {
        title: "Explore o catálogo",
        text: "Veja produtos, especificações e embalagem. Tudo é vendido em quantidades de contentor completo.",
      },
      {
        title: "Escolha matéria-prima e quantidade",
        text: "Escolha os produtos e o número de contentores. O mínimo é um contentor marítimo por encomenda.",
      },
      {
        title: "Envie o seu pedido",
        text: "Envie os dados de contacto, entrega e requisitos pelo formulário de orçamento, e-mail ou WhatsApp.",
      },
      {
        title: "Confirmamos as condições",
        text: "A HB33 confirma disponibilidade, preços, especificações, carregamento, embarque e pagamento.",
      },
      {
        title: "Execução e acompanhamento",
        text: "Inspeção, documentação e embarque — com atualizações em cada marco até à entrega.",
      },
    ],
    noteTitle: "Atenção",
    noteText:
      "Um pedido é um pedido, não uma encomenda. Disponibilidade, preços finais, especificações, carregamento, embarque e condições de pagamento são acordados com a HB33 antes de qualquer compromisso.",
    cta: "Começar com um pedido de orçamento",
  },
  quotePage: {
    eyebrow: "Pedido de compra a granel",
    title: "Pedir Orçamento",
    lead: "Diga-nos o que precisa e para onde vai. Respondemos com disponibilidade, especificações, preços e embarque.",
    form: {
      fullName: "Nome completo",
      company: "Empresa",
      email: "E-mail profissional",
      countryCode: "Indicativo",
      selectCode: "Escolher indicativo",
      phone: "Telefone",
      country: "País",
      searchCountryPlaceholder: "Comece a escrever um país…",
      noCountryMatch: "Nenhum país correspondente — continue a escrever.",
      destination: "Destino / porto",
      timeframe: "Prazo de entrega previsto",
      timeframeOptions: {
        asap: "O mais rápido possível",
        oneMonth: "Dentro de 1 mês",
        oneToThree: "1–3 meses",
        flexible: "Flexível / em planeamento",
      },
      packaging: "Embalagem preferida",
      packagingPlaceholder: "ex. sacos de juta 60 kg, sacos PP 25 kg, a granel…",
      items: "Produtos e quantidades",
      product: "Produto",
      selectProduct: "Escolher produto…",
      quantityContainers: "Contentores",
      addProduct: "Adicionar produto",
      removeProduct: "Remover",
      notes: "Requisitos adicionais",
      notesPlaceholder: "Especificações, grau, humidade, condições (FOB/CIF)…",
      atLeastOne: "Adicione pelo menos um produto.",
      submit: "Enviar pedido",
      submitting: "A enviar…",
    },
    errors: {
      required: "Este campo é obrigatório.",
      email: "Introduza um e-mail válido.",
      phone: "Introduza um número válido com indicativo.",
      minContainers: "Mínimo 1 contentor por produto — apenas grandes quantidades.",
      selectProduct: "Escolha um produto ou remova esta linha.",
    },
    successTitle: "Pedido recebido.",
    successLead: "Obrigado — o seu pedido a granel foi registado.",
    reference: "O seu número de referência",
    nextStepsTitle: "O que se segue",
    nextSteps: [
      "A HB33 confirma a disponibilidade para os seus volumes.",
      "Recebe preços finais e especificações do lote.",
      "Acordam-se carga, embalagem e embarque FOB/CIF.",
      "Confirmam-se as condições de pagamento antes da execução.",
    ],
    emailStatusOn: "Foi enviada uma cópia à nossa equipa comercial por e-mail.",
    emailStatusOff:
      "O reenvio por e-mail não está ativado neste ambiente, por isso, para uma resposta mais rápida, envie também o seu pedido por e-mail ou WhatsApp através dos botões abaixo — inclua o seu número de referência.",
    sendEmail: "Enviar por e-mail",
    sendWhatsapp: "Continuar no WhatsApp",
    newInquiry: "Novo pedido",
    failTitle: "Ocorreu um problema.",
    failText: "Não foi possível enviar o seu pedido. Tente novamente — ou contacte-nos diretamente por e-mail.",
  },
  contactPage: {
    eyebrow: "Contacto",
    title: "Fale com a HB33.",
    lead: "Para pedidos a granel, orçamentos e especificações — escreva-nos e responderemos com prazos, não com publicidade.",
    formTitle: "Enviar mensagem",
    form: {
      name: "Nome completo",
      email: "E-mail",
      subject: "Assunto",
      message: "Mensagem",
      messagePlaceholder: "Produto, volumes, destino…",
      submit: "Enviar mensagem",
      sent: "Mensagem enviada.",
    },
    errors: {
      required: "Este campo é obrigatório.",
      email: "Introduza um e-mail válido.",
      messageShort: "Escreva uma mensagem com pelo menos 10 caracteres.",
    },
    sentTitle: "Mensagem recebida.",
    sentText: "Obrigado — responderemos em breve.",
    channelsTitle: "Canais diretos",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    whatsappHint: "O mais rápido para pedidos ativos — mencione o seu número de referência, se tiver.",
    whatsappUnavailable:
      "O WhatsApp ainda não está configurado. Contacte-nos por e-mail — respondemos com especificações, preços e prazos.",
    locationLabel: "Base",
    responseNote: "Respondemos a pedidos a granel em 1–2 dias úteis.",
    failText: "Não foi possível enviar a sua mensagem. Tente novamente ou envie-nos um e-mail diretamente.",
  },
  privacyPage: {
    eyebrow: "Legal",
    title: "Política de Privacidade",
    updated: "Última atualização",
    intro:
      "A HB33 recolhe o mínimo possível de dados pessoais: apenas o que nos envia quando pede um orçamento ou nos contacta, para que possamos responder. Não há contas, newsletters nem rastreadores publicitários neste site.",
    sections: [
      {
        title: "Informações que nos fornece",
        text: "Pedidos de orçamento: nome, empresa, e-mail, telefone, país, destino de entrega, prazo, preferência de embalagem, produtos e quantidades de contentores, e quaisquer notas que acrescente. Mensagens de contacto: nome, e-mail, assunto e mensagem. Não recolhemos mais nada — não há contas nem funcionalidades de comentários ou newsletters.",
      },
      {
        title: "Como as utilizamos",
        text: "Exclusivamente para responder ao seu pedido: confirmar disponibilidade e preços, preparar especificações e embarque, e comunicar sobre o seu pedido. Não vendemos dados pessoais e não enviamos e-mails de marketing.",
      },
      {
        title: "Armazenamento e partilha",
        text: "As submissões são registadas no registo do servidor do site para que nenhum pedido se perca. Quando configurado, é reenviada uma cópia para a caixa de vendas da HB33 por e-mail ou para um webhook privado — o ecrã de confirmação diz-lhe sempre, com honestidade, se o reenvio por e-mail está ativo. Os botões de e-mail e WhatsApp atuam dentro das suas próprias aplicações: recebemos apenas o que escolher enviar.",
      },
      {
        title: "Cookies e análise",
        text: "Por predefinição, este site não define cookies nem executa análise ou rastreamento. Se a análise for alguma vez ativada, só é carregada depois de a aceitar no banner de consentimento, e a sua escolha é guardada localmente no seu navegador.",
      },
      {
        title: "Conservação e os seus direitos",
        text: "Os registos de pedidos são conservados para fins legítimos de negócio e de arquivo. Pode pedir a qualquer momento uma cópia, correção ou eliminação dos seus dados através do e-mail de contacto deste site.",
      },
      {
        title: "Aviso de conteúdo provisório",
        text: "Esta política descreve os fluxos de dados reais do site, mas deve ainda ser revista pelo departamento jurídico da HB33 antes de qualquer uso comercial, incluindo a lei aplicável, os papéis de tratamento de dados e quaisquer especificidades de alojamento ou de fornecedor de e-mail.",
      },
    ],
  },
  termsPage: {
    eyebrow: "Legal",
    title: "Termos de Utilização",
    updated: "Última atualização",
    intro:
      "Ao utilizar este site, concorda com os seguintes termos. Se não concordar, não utilize o site.",
    sections: [
      {
        title: "Os pedidos não são encomendas",
        text: "O envio de um pedido de orçamento ou mensagem não cria um contrato, não confirma a disponibilidade de stock nem fixa um preço. Não há checkout nem pagamento neste site. Todas as encomendas são confirmadas separadamente por escrito com especificações, carregamento, embarque e condições de pagamento.",
      },
      {
        title: "Pedido mínimo",
        text: "A HB33 trabalha apenas com grandes quantidades, com um mínimo de um contentor marítimo completo por encomenda. Os pedidos abaixo deste limite não podem ser satisfeitos.",
      },
      {
        title: "Informações sobre os produtos",
        text: "As especificações apresentadas neste site são indicativas. Grau, humidade, embalagem e carregamento finais são confirmados por lote e verificados antes do embarque.",
      },
      {
        title: "Utilização aceitável",
        text: "Utilize os formulários de pedido com honestidade e apenas para necessidades a granel genuínas. Não submeta spam, dados falsos, conteúdo ilícito ou submissões automáticas em massa que abusem do serviço.",
      },
      {
        title: "Conteúdo e responsabilidade",
        text: "O texto e o design do site pertencem à HB33; a fotografia dos produtos pertence a terceiros creditados nas páginas relevantes. Na medida permitida por lei, a HB33 não é responsável por decisões tomadas com base em conteúdo indicativo do site — as condições escritas confirmadas regem cada encomenda.",
      },
      {
        title: "Aviso de conteúdo provisório",
        text: "Este é conteúdo inicial e deve ser revisto pelo departamento jurídico da HB33 antes de qualquer uso comercial, incluindo lei aplicável, limites de responsabilidade e cláusulas de resolução de litígios.",
      },
    ],
  },
  notFound: {
    eyebrow: "404",
    title: "Esta página não entrou no contentor.",
    text: "A página procurada não existe ou foi movida.",
    home: "Voltar ao início",
    products: "Ver produtos",
  },
  consent: {
    title: "Consentimento para cookies e análise",
    text: "Utilizamos análise respeitadora da privacidade para melhorar o site. Só é carregada se aceitar. Se recusar, nada é rastreado.",
    accept: "Aceitar análise",
    decline: "Recusar",
  },
  footer: {
    tagline: "Cacau, soja e cocopeat a granel — verificados na origem, embarcados para todo o mundo.",
    shop: "Catálogo",
    company: "Empresa",
    legal: "Legal",
    privacy: "Privacidade",
    terms: "Termos de utilização",
    contactTitle: "Contacto",
    language: "Idioma",
    minOrder: "Pedido mínimo: 1 contentor marítimo.",
    photoCredit: "Fotografia via Wikimedia Commons — consulte os créditos nas páginas dos produtos.",
  },
};

export default pt;
