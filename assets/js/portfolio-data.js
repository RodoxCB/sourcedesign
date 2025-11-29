/**
 * Portfolio Data - Estrutura completa dos projetos
 * Contém 17 projetos organizados por categoria
 */

const portfolioProjects = [
  // IDENTIDADE VISUAL - 12 PROJETOS
  {
    id: "suzano",
    title: "Suzano",
    subtitle: "Identidade Visual Corporativa",
    category: "print",
    categories: ["print", "digital"],
    type: "branding",
    description: "Projeto completo de identidade visual incluindo banners e materiais corporativos para Suzano",
    coverImage: "../assets/images/portfolio/suzano/banner 1.png",
    images: [
      { url: "../assets/images/portfolio/suzano/banner 1.png", alt: "Banner principal Suzano", caption: "Banner institucional principal" },
      { url: "../assets/images/portfolio/suzano/banner 2.png", alt: "Banner secundário Suzano", caption: "Banner secundário" },
      { url: "../assets/images/portfolio/suzano/1.png", alt: "Material corporativo 1", caption: "Material de comunicação 1" },
      { url: "../assets/images/portfolio/suzano/2.png", alt: "Material corporativo 2", caption: "Material de comunicação 2" },
      { url: "../assets/images/portfolio/suzano/3.png", alt: "Material corporativo 3", caption: "Material de comunicação 3" },
      { url: "../assets/images/portfolio/suzano/4.png", alt: "Material corporativo 4", caption: "Material de comunicação 4" },
      { url: "../assets/images/portfolio/suzano/5.png", alt: "Material corporativo 5", caption: "Material de comunicação 5" }
    ],
    tags: ["corporate", "banners", "branding"],
    year: "2024",
    client: "Suzano"
  },

  {
    id: "dona-flor",
    title: "Dona Flor",
    subtitle: "Identidade Visual Completa",
    category: "identity",
    categories: ["identity"],
    type: "complete-branding",
    description: "Projeto de identidade visual completo incluindo logomarca, materiais de comunicação e identidade corporativa",
    coverImage: "../assets/images/portfolio/dona_flor/DON4A FLOR.png",
    images: [
      { url: "../assets/images/portfolio/dona_flor/DON4A FLOR.png", alt: "Logomarca Dona Flor", caption: "Logomarca principal" },
      { url: "../assets/images/portfolio/dona_flor/DONA FLOR 1.png", alt: "Material 1 Dona Flor", caption: "Material de comunicação 1" },
      { url: "../assets/images/portfolio/dona_flor/DONA FLOR 2.png", alt: "Material 2 Dona Flor", caption: "Material de comunicação 2" },
      { url: "../assets/images/portfolio/dona_flor/DONA FLOR 3.png", alt: "Material 3 Dona Flor", caption: "Material de comunicação 3" },
      { url: "../assets/images/portfolio/dona_flor/DONA FLOR 5.png", alt: "Material 5 Dona Flor", caption: "Material de comunicação 5" },
      { url: "../assets/images/portfolio/dona_flor/DONA FLOR 6.png", alt: "Material 6 Dona Flor", caption: "Material de comunicação 6" }
    ],
    tags: ["logo", "branding", "print"],
    year: "2024",
    client: "Dona Flor"
  },

  {
    id: "preco-baixo",
    title: "Preço Baixo",
    subtitle: "Identidade Visual Corporativa",
    category: "print",
    categories: ["print", "digital"],
    type: "branding",
    description: "Projeto completo de identidade visual para rede de farmácias Preço Baixo",
    coverImage: "../assets/images/portfolio/PREÇO BAIXO/1.png",
    images: [
      { url: "../assets/images/portfolio/PREÇO BAIXO/1.png", alt: "Material principal Preço Baixo", caption: "Material institucional 1" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/2.png", alt: "Material 2 Preço Baixo", caption: "Material institucional 2" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/3.png", alt: "Material 3 Preço Baixo", caption: "Material institucional 3" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/4.png", alt: "Material 4 Preço Baixo", caption: "Material institucional 4" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/5.png", alt: "Material 5 Preço Baixo", caption: "Material institucional 5" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/6.png", alt: "Material 6 Preço Baixo", caption: "Material institucional 6" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/OUTROS/1.png", alt: "Material extra 1", caption: "Material promocional 1" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/OUTROS/2.png", alt: "Material extra 2", caption: "Material promocional 2" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/OUTROS/camisa.png", alt: "Camisa Preço Baixo", caption: "Brindes personalizados" },
      { url: "../assets/images/portfolio/PREÇO BAIXO/OUTROS/caneca.png", alt: "Caneca Preço Baixo", caption: "Brindes personalizados" }
    ],
    tags: ["pharmacy", "branding", "merchandise"],
    year: "2024",
    client: "Preço Baixo"
  },

  {
    id: "katsuki",
    title: "Katsuki",
    subtitle: "Campanha Publicitária Completa",
    category: "identity",
    categories: ["identity", "digital"],
    type: "campaign",
    description: "Campanha publicitária completa para restaurante Katsuki com identidade visual e materiais promocionais",
    coverImage: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 01.png",
    images: [
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 01.png", alt: "Campanha Katsuki 01", caption: "Material promocional 1" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 02.png", alt: "Campanha Katsuki 02", caption: "Material promocional 2" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 03.png", alt: "Campanha Katsuki 03", caption: "Material promocional 3" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 04.png", alt: "Campanha Katsuki 04", caption: "Material promocional 4" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 05.png", alt: "Campanha Katsuki 05", caption: "Material promocional 5" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 06.png", alt: "Campanha Katsuki 06", caption: "Material promocional 6" },
      { url: "../assets/images/portfolio/KATSUKI/Campanha Katsuki 07.png", alt: "Campanha Katsuki 07", caption: "Material promocional 7" }
    ],
    tags: ["restaurant", "campaign", "advertising"],
    year: "2024",
    client: "Katsuki"
  },

  {
    id: "abac",
    title: "ABAC",
    subtitle: "Identidade Visual Institucional",
    category: "digital",
    categories: ["digital"],
    type: "institutional",
    description: "Projeto de identidade visual institucional para ABAC",
    coverImage: "../assets/images/portfolio/ABAC/1.png",
    images: [
      { url: "../assets/images/portfolio/ABAC/1.png", alt: "Material principal ABAC", caption: "Material institucional 1" },
      { url: "../assets/images/portfolio/ABAC/2.png", alt: "Material 2 ABAC", caption: "Material institucional 2" },
      { url: "../assets/images/portfolio/ABAC/3.png", alt: "Material 3 ABAC", caption: "Material institucional 3" },
      { url: "../assets/images/portfolio/ABAC/4.png", alt: "Material 4 ABAC", caption: "Material institucional 4" }
    ],
    tags: ["institutional", "branding"],
    year: "2024",
    client: "ABAC"
  },

  {
    id: "360",
    title: "360",
    subtitle: "Identidade Visual e Cartão de Visita",
    category: "identity",
    categories: ["identity", "print"],
    type: "business-card",
    description: "Projeto de identidade visual completo incluindo cartão de visita personalizado",
    coverImage: "../assets/images/portfolio/360/1.png",
    images: [
      { url: "../assets/images/portfolio/360/1.png", alt: "Material principal 360", caption: "Material institucional 1" },
      { url: "../assets/images/portfolio/360/CARTAO DE VISITA.png", alt: "Cartão de visita 360", caption: "Cartão de visita personalizado" },
      { url: "../assets/images/portfolio/360/2.png", alt: "Material 2 360", caption: "Material institucional 2" }
    ],
    tags: ["business-card", "branding"],
    year: "2024",
    client: "360"
  },

  {
    id: "baile-voador",
    title: "Baile Voador",
    subtitle: "Identidade Visual e Cardápio",
    category: "print",
    categories: ["print", "digital"],
    type: "restaurant",
    description: "Identidade visual completa para restaurante Baile Voador incluindo cardápio personalizado",
    coverImage: "../assets/images/portfolio/BAILE VOADOR/1.png",
    images: [
      { url: "../assets/images/portfolio/BAILE VOADOR/1.png", alt: "Material principal Baile Voador", caption: "Material institucional 1" },
      { url: "../assets/images/portfolio/BAILE VOADOR/CARDÁPIO.png", alt: "Cardápio Baile Voador", caption: "Cardápio personalizado" },
      { url: "../assets/images/portfolio/BAILE VOADOR/2.png", alt: "Material 2 Baile Voador", caption: "Material institucional 2" },
      { url: "../assets/images/portfolio/BAILE VOADOR/3.png", alt: "Material 3 Baile Voador", caption: "Material institucional 3" }
    ],
    tags: ["restaurant", "menu", "branding"],
    year: "2024",
    client: "Baile Voador"
  },

  {
    id: "cafe-sitio",
    title: "Café Sítio",
    subtitle: "Identidade Visual Completa",
    category: "identity",
    categories: ["identity", "print"],
    type: "cafe",
    description: "Projeto de identidade visual para cafeteria Café Sítio",
    coverImage: "../assets/images/portfolio/CAFÉ SITIO/1.png",
    images: [
      { url: "../assets/images/portfolio/CAFÉ SITIO/1.png", alt: "Material principal Café Sítio", caption: "Material institucional 1" },
      { url: "../assets/images/portfolio/CAFÉ SITIO/2.png", alt: "Material 2 Café Sítio", caption: "Material institucional 2" },
      { url: "../assets/images/portfolio/CAFÉ SITIO/3.png", alt: "Material 3 Café Sítio", caption: "Material institucional 3" }
    ],
    tags: ["cafe", "branding", "hospitality"],
    year: "2024",
    client: "Café Sítio"
  },

  {
    id: "bem-fit",
    title: "Bem Fit",
    subtitle: "Folheto e Logomarca",
    category: "identity",
    categories: ["identity"],
    type: "fitness",
    description: "Projeto de identidade visual para academia Bem Fit incluindo folheto informativo",
    coverImage: "../assets/images/portfolio/Folheto e logo Bem fit/1.png",
    images: [
      { url: "../assets/images/portfolio/Folheto e logo Bem fit/1.png", alt: "Material principal Bem Fit", caption: "Logomarca e folheto" },
      { url: "../assets/images/portfolio/Folheto e logo Bem fit/2.png", alt: "Material 2 Bem Fit", caption: "Material promocional" }
    ],
    tags: ["fitness", "brochure", "logo"],
    year: "2024",
    client: "Bem Fit"
  },

  {
    id: "jujuba",
    title: "Jujuba",
    subtitle: "Campanha de Banners",
    category: "print",
    categories: ["print", "digital"],
    type: "banners",
    description: "Campanha de banners promocionais para Jujuba",
    coverImage: "../assets/images/portfolio/JUJUBA/banner 1.png",
    images: [
      { url: "../assets/images/portfolio/JUJUBA/banner 1.png", alt: "Banner principal Jujuba", caption: "Banner promocional 1" },
      { url: "../assets/images/portfolio/JUJUBA/banner 1 (2).png", alt: "Banner 2 Jujuba", caption: "Banner promocional 2" },
      { url: "../assets/images/portfolio/JUJUBA/banner 1 (3).png", alt: "Banner 3 Jujuba", caption: "Banner promocional 3" }
    ],
    tags: ["banners", "advertising", "campaign"],
    year: "2024",
    client: "Jujuba"
  },

  {
    id: "viver-nas-ferias",
    title: "Viver nas Férias",
    subtitle: "Identidade Visual Turística",
    category: "identity",
    categories: ["identity", "digital"],
    type: "tourism",
    description: "Projeto de identidade visual para empresa de turismo Viver nas Férias",
    coverImage: "../assets/images/portfolio/VIVER NAS FÉRIAS/1.png",
    images: [
      { url: "../assets/images/portfolio/VIVER NAS FÉRIAS/1.png", alt: "Material principal Viver nas Férias", caption: "Material turístico 1" },
      { url: "../assets/images/portfolio/VIVER NAS FÉRIAS/2.png", alt: "Material 2 Viver nas Férias", caption: "Material turístico 2" },
      { url: "../assets/images/portfolio/VIVER NAS FÉRIAS/3.png", alt: "Material 3 Viver nas Férias", caption: "Material turístico 3" },
      { url: "../assets/images/portfolio/VIVER NAS FÉRIAS/4.png", alt: "Material 4 Viver nas Férias", caption: "Material turístico 4" }
    ],
    tags: ["tourism", "travel", "branding"],
    year: "2024",
    client: "Viver nas Férias"
  },

  {
    id: "folder-brasilne",
    title: "Folder Brasiline",
    subtitle: "Material Institucional",
    category: "identity",
    categories: ["identity", "print"],
    type: "folder",
    description: "Projeto de folder institucional para Brasiline",
    coverImage: "../assets/images/portfolio/FOLDER BRASILINE/1.png",
    images: [
      { url: "../assets/images/portfolio/FOLDER BRASILINE/1.png", alt: "Folder Brasiline 1", caption: "Página frontal" },
      { url: "../assets/images/portfolio/FOLDER BRASILINE/2.png", alt: "Folder Brasiline 2", caption: "Página interna" }
    ],
    tags: ["folder", "institutional", "print"],
    year: "2024",
    client: "Brasiline"
  },

  // VÍDEOS - 5 PROJETOS
  {
    id: "video-institucional",
    title: "Vídeo Institucional",
    subtitle: "Produção Audiovisual",
    category: "video",
    categories: ["video"],
    type: "institutional",
    description: "Vídeo institucional profissional para apresentação de empresa e serviços",
    vimeoId: "410746288",
    thumbnail: "https://vumbnail.com/410746288.jpg",
    tags: ["video", "institutional", "production"],
    year: "2024"
  },

  {
    id: "video-corporativo",
    title: "Vídeo Corporativo",
    subtitle: "Comunicação Empresarial",
    category: "video",
    categories: ["video"],
    type: "corporate",
    description: "Vídeo corporativo destacando valores e missão da empresa",
    vimeoId: "410748388",
    thumbnail: "https://vumbnail.com/410748388.jpg",
    tags: ["video", "corporate", "communication"],
    year: "2024"
  },

  {
    id: "video-promocional",
    title: "Vídeo Promocional",
    subtitle: "Marketing Digital",
    category: "video",
    categories: ["video"],
    type: "promotional",
    description: "Vídeo promocional para lançamento de produtos e serviços",
    vimeoId: "311972532",
    thumbnail: "https://vumbnail.com/311972532.jpg",
    tags: ["video", "promotional", "marketing"],
    year: "2024"
  },

  {
    id: "video-empresarial",
    title: "Vídeo Institucional Empresarial",
    subtitle: "Apresentação Corporativa",
    category: "video",
    categories: ["video"],
    type: "business",
    description: "Apresentação completa da empresa, seus produtos e diferenciais no mercado",
    vimeoId: "507697509",
    thumbnail: "https://vumbnail.com/507697509.jpg",
    tags: ["video", "business", "presentation"],
    year: "2024"
  },

  {
    id: "video-apresentacao",
    title: "Vídeo de Apresentação",
    subtitle: "Comunicação Executiva",
    category: "video",
    categories: ["video"],
    type: "presentation",
    description: "Vídeo de apresentação profissional para eventos e reuniões corporativas",
    vimeoId: "311971499",
    thumbnail: "https://vumbnail.com/311971499.jpg",
    tags: ["video", "presentation", "executive"],
    year: "2024"
  }
];
