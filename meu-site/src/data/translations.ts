export type Language = 'pt' | 'es' | 'en'

export type TranslationKey = 
  | 'nav_home'
  | 'nav_services'
  | 'nav_showcase'
  | 'nav_about'
  | 'nav_process'
  | 'nav_contact'
  | 'hero_subtext'
  | 'hero_tag'
  | 'hero_title'
  | 'hero_btn_portfolio'
  | 'hero_btn_hire'
  | 'hero_exp'
  | 'hero_exp_sub'
  | 'services_title_line1'
  | 'services_title_line2_first'
  | 'services_title_line2_rest'
  | 'service_1_title'
  | 'service_1_desc'
  | 'service_2_title'
  | 'service_2_desc'
  | 'service_3_title'
  | 'service_3_desc'
  | 'showcase_title'
  | 'showcase_explore'
  | 'cat_events'
  | 'cat_ecommerce'
  | 'cat_food'
  | 'cat_health'
  | 'cat_realestate'
  | 'cat_beauty'
  | 'cat_wellness'
  | 'project_1_name'
  | 'project_1_desc'
  | 'project_2_name'
  | 'project_2_desc'
  | 'project_3_name'
  | 'project_3_desc'
  | 'project_4_name'
  | 'project_4_desc'
  | 'project_5_name'
  | 'project_5_desc'
  | 'project_6_name'
  | 'project_6_desc'
  | 'project_7_name'
  | 'project_7_desc'
  | 'project_8_name'
  | 'project_8_desc'
  | 'project_9_name'
  | 'project_9_desc'
  | 'project_10_name'
  | 'project_10_desc'
  | 'project_11_name'
  | 'project_11_desc'
  | 'project_12_name'
  | 'project_12_desc'
  | 'card_link'
  | 'about_subtitle'
  | 'about_desc_1'
  | 'about_desc_2'
  | 'about_tag_1'
  | 'about_tag_2'
  | 'about_tag_3'
  | 'about_cta'
  | 'about_service_1'
  | 'about_service_2'
  | 'about_service_3'
  | 'process_subtitle'
  | 'process_title'
  | 'process_desc'
  | 'step_1_title'
  | 'step_1_desc'
  | 'step_2_title'
  | 'step_2_desc'
  | 'step_3_title'
  | 'step_3_desc'
  | 'step_4_title'
  | 'step_4_desc'
  | 'faq_subtitle'
  | 'faq_title'
  | 'faq_desc'
  | 'faq_tags'
  | 'faq_1'
  | 'faq_1_answer'
  | 'faq_2'
  | 'faq_2_answer'
  | 'faq_3'
  | 'faq_3_answer'
  | 'faq_4'
  | 'faq_4_answer'
  | 'faq_5'
  | 'faq_5_answer'
  | 'faq_6'
  | 'faq_6_answer'
  | 'faq_cta_text'
  | 'faq_cta_btn'
  | 'stat_1'
  | 'stat_2'
  | 'stat_3'
  | 'stat_4'
  | 'footer_desc'
  | 'footer_cta_title_gold'
  | 'footer_cta_title_rest'
  | 'footer_cta_desc'
  | 'footer_cta_btn'
  | 'footer_nav_title'
  | 'footer_nav_home'
  | 'footer_nav_services'
  | 'footer_nav_showcase'
  | 'footer_nav_about'
  | 'footer_nav_faq'
  | 'footer_services_title'
  | 'footer_services_1'
  | 'footer_services_2'
  | 'footer_services_3'
  | 'footer_services_4'
  | 'footer_contact_title'
  | 'footer_location_label'
  | 'footer_location'
  | 'footer_copyright'
  | 'footer_privacy'
  | 'footer_terms'
  | 'contact_wa_label'
  | 'contact_wa'
  | 'contact_email_label'
  | 'contact_email'
  | 'contact_social_label'
  | 'contact_social'

type Translations = Record<Language, Record<TranslationKey, string>>

export const translations: Translations = {
  pt: {
    nav_home: "Início",
    nav_services: "Serviços",
    nav_showcase: "Exemplos",
    nav_about: "Sobre",
    nav_process: "Processo",
    nav_contact: "Contato",
    hero_subtext: "Crio sites, sistemas e integrações com WhatsApp que organizam seu negócio e geram vendas reais. Código limpo e suporte que não acaba.",
    hero_tag: "Feito para o seu negócio",
    hero_title: "Sites e Sistemas<br>que <span>vendem</span> pra você",
    hero_btn_portfolio: "Ver Projetos ↗",
    hero_btn_hire: "Falar comigo",
    hero_exp: "300+",
    hero_exp_sub: "Projetos Entregues",
    services_title_line1: "MEUS",
    services_title_line2_first: "S",
    services_title_line2_rest: "ERVIÇOS",
    service_1_title: "Sites que Passam Confiança",
    service_1_desc: "Páginas modernas para apresentar seu negócio, mostrar serviços e levar o cliente direto para o WhatsApp. Funciona perfeitamente no celular.",
    service_2_title: "Sistemas Personalizados",
    service_2_desc: "Painéis sob medida para controlar clientes, pedidos, reservas, serviços e informações importantes. Mais produtividade e dados organizados.",
    service_3_title: "Agendamentos Online",
    service_3_desc: "Uma experiência simples para o cliente escolher horário e enviar os dados. Integração automática com WhatsApp. Ideal para serviços.",
    showcase_title: "Exemplos",
    showcase_explore: "Ver Todos →",
    cat_events: "Eventos",
    cat_ecommerce: "E-commerce",
    cat_food: "Alimentação",
    cat_health: "Saúde",
    cat_realestate: "Imobiliário",
    cat_beauty: "Beleza",
    cat_wellness: "Bem-Estar",
    project_1_name: "Casamentos & Eventos",
    project_1_desc: "Sites elegantes para cerimônias e celebrações",
    project_2_name: "Moda e Vestuário",
    project_2_desc: "Catálogos e lojas para marcas de moda",
    project_3_name: "Alimentação e Docerias",
    project_3_desc: "Cardápios atrativos para restaurantes e confeitarias",
    project_4_name: "Saúde e Bem-Estar",
    project_4_desc: "Páginas profissionais para médicos e clínicas",
    project_5_name: "E-commerce de Moda",
    project_5_desc: "Lojas virtuais completas e modernas",
    project_6_name: "Imobiliárias e Corretores",
    project_6_desc: "Portais imobiliários com busca avançada",
    project_7_name: "Chilliz - Sorvetes Artesanais",
    project_7_desc: "Página para marcas de sorveteria com design vibrante",
    project_8_name: "Yoga e Qualidade de Vida",
    project_8_desc: "Plataformas para práticas e bem-estar",
    project_9_name: "Virtz - Moda Streetwear",
    project_9_desc: "Loja virtual de roupas com design moderno e destacado",
    project_10_name: "Barbearias e Salões",
    project_10_desc: "Agendamentos e portfólios para profissionais",
    project_11_name: "Avora Mart - E-commerce Premium",
    project_11_desc: "UI Concept de e-commerce moderno com design premium e responsivo",
    project_12_name: "MUSE Hair Atelier",
    project_12_desc: "Site institucional para salão de beleza com design clean, agendamento integrado e dashboard administrativo",
    card_link: "👁 Visualizar Projeto",
    about_subtitle: "SOBRE",
    about_desc_1: "Desenvolvedor especializado em criar <strong>soluções digitais</strong> para empresas que desejam crescer na internet.",
    about_desc_2: "Desenvolvo sites profissionais, sistemas personalizados e agendamentos online, sempre com foco em desempenho, design moderno e uma experiência que transforma <strong>visitantes em clientes</strong>.",
    about_tag_1: "💻 Código limpo",
    about_tag_2: "📱 100% Responsivo",
    about_tag_3: "🚀 Entrega Ágil",
    about_cta: "Vamos conversar →",
    about_service_1: "Sites Profissionais",
    about_service_2: "Sistemas Personalizados",
    about_service_3: "Agendamentos Online",
    process_subtitle: "COMO EU TRABALHO",
    process_title: "Meu Processo",
    process_desc: "Um método simples e transparente para transformar seu projeto em realidade, sem surpresas e com total alinhamento.",
    step_1_title: "Conversa",
    step_1_desc: "Conversamos sobre sua ideia e seus objetivos. Entendo o que você precisa.",
    step_2_title: "Planejamento",
    step_2_desc: "Planejo a estrutura, os recursos e o cronograma do projeto.",
    step_3_title: "Design",
    step_3_desc: "Desenvolvo um visual moderno, intuitivo e alinhado à sua marca.",
    step_4_title: "Desenvolvimento",
    step_4_desc: "Transformo o projeto em um site rápido e 100% responsivo.",
    faq_subtitle: "DÚVIDAS",
    faq_title: "Perguntas Frequentes",
    faq_desc: "Tire suas dúvidas sobre meus serviços e processos de trabalho",
    faq_tags: "Orçamento · Prazos · Responsivo · Suporte",
    faq_1: "Quanto custa um site?",
    faq_1_answer: "Cada projeto é único, então o valor varia de acordo com a complexidade e funcionalidades. Faço um orçamento personalizado após entender suas necessidades. Entre em contato para uma análise gratuita.",
    faq_2: "Quanto tempo leva para o projeto ficar pronto?",
    faq_2_answer: "O prazo médio é de 10 a 30 dias, dependendo da complexidade do projeto. Sites institucionais simples ficam prontos em até 10 dias úteis. Sistemas mais complexos podem levar de 20 a 30 dias.",
    faq_3: "O site funciona em celular e computador?",
    faq_3_answer: "Sim! Todos os sites são 100% responsivos, ou seja, se adaptam automaticamente a qualquer tamanho de tela: celular, tablet, notebook ou desktop. Garantindo a melhor experiência para todos os usuários.",
    faq_4: "Depois da entrega, você oferece suporte?",
    faq_4_answer: "Com certeza! Ofereço suporte contínuo para ajustes, correções e dúvidas. Além disso, disponibilizo manutenção preventiva e atualizações para garantir que seu site esteja sempre seguro e funcionando perfeitamente.",
    faq_5: "Você também desenvolve sistemas personalizados?",
    faq_5_answer: "Sim! Desenvolvo sistemas sob medida para gerenciar clientes, estoque, agendamentos, finanças e muito mais. Tudo integrado com WhatsApp e com uma interface intuitiva para facilitar o dia a dia do seu negócio.",
    faq_6: "Meu site aparecerá no Google?",
    faq_6_answer: "Sim! Os sites são otimizados para SEO (Search Engine Optimization), com estrutura adequada, meta tags e carregamento rápido. Isso aumenta as chances de seu site aparecer nos resultados de busca do Google e outros mecanismos.",
    faq_cta_text: "Ainda tem dúvidas? Fale comigo no WhatsApp",
    faq_cta_btn: "Falar agora →",
    stat_1: "Clientes Satisfeitos",
    stat_2: "Projetos Entregues",
    stat_3: "Robôs WhatsApp",
    stat_4: "Xícaras de Café",
    footer_desc: "Transformo ideias em soluções digitais que realmente funcionam. Código limpo, 100% responsivo e suporte que não acaba na entrega.",
    footer_cta_title_gold: "Transforme",
    footer_cta_title_rest: "sua ideia em realidade",
    footer_cta_desc: "Vamos criar juntos a solução digital que seu negócio precisa.",
    footer_cta_btn: "Falar no WhatsApp",
    footer_nav_title: "Navegação",
    footer_nav_home: "Início",
    footer_nav_services: "Serviços",
    footer_nav_showcase: "Portfólio",
    footer_nav_about: "Sobre",
    footer_nav_faq: "FAQ",
    footer_services_title: "Serviços",
    footer_services_1: "Sites Profissionais",
    footer_services_2: "Sistemas Personalizados",
    footer_services_3: "Agendamentos Online",
    footer_services_4: "Integração WhatsApp",
    footer_contact_title: "Contato",
    footer_location_label: "Localização",
    footer_location: "Brasil",
    footer_copyright: "Todos os direitos reservados.",
    footer_privacy: "Política de Privacidade",
    footer_terms: "Termos de Uso",
    contact_wa_label: "WhatsApp",
    contact_wa: "Clique para conversar →",
    contact_email_label: "E-mail",
    contact_email: "pgdevsoftware@gmail.com",
    contact_social_label: "Redes Sociais",
    contact_social: "Siga nas redes →"
  },
  es: {
    nav_home: "Inicio",
    nav_services: "Servicios",
    nav_showcase: "Ejemplos",
    nav_about: "Sobre mí",
    nav_process: "Proceso",
    nav_contact: "Contacto",
    hero_subtext: "Creo sitios web, sistemas e integraciones con WhatsApp que organizan tu negocio y generan ventas reales. Código limpio y soporte que no termina.",
    hero_tag: "Hecho para tu negocio",
    hero_title: "Sitios y Sistemas<br>que <span>venden</span> por ti",
    hero_btn_portfolio: "Ver Proyectos ↗",
    hero_btn_hire: "Habla conmigo",
    hero_exp: "300+",
    hero_exp_sub: "Proyectos Entregados",
    services_title_line1: "MIS",
    services_title_line2_first: "S",
    services_title_line2_rest: "ERVICIOS",
    service_1_title: "Sitios que Transmiten Confianza",
    service_1_desc: "Páginas modernas para presentar tu negocio, mostrar servicios y llevar al cliente directo al WhatsApp. Funciona perfectamente en el celular.",
    service_2_title: "Sistemas Personalizados",
    service_2_desc: "Paneles a medida para controlar clientes, pedidos, reservas, servicios e información importante. Más productividad y datos organizados.",
    service_3_title: "Agendamientos Online",
    service_3_desc: "Una experiencia simple para que el cliente elija horario y envíe los datos. Integración automática con WhatsApp. Ideal para servicios.",
    showcase_title: "Ejemplos",
    showcase_explore: "Ver Todos →",
    cat_events: "Eventos",
    cat_ecommerce: "E-commerce",
    cat_food: "Alimentación",
    cat_health: "Salud",
    cat_realestate: "Inmobiliario",
    cat_beauty: "Belleza",
    cat_wellness: "Bienestar",
    project_1_name: "Bodas y Eventos",
    project_1_desc: "Sitios elegantes para ceremonias y celebraciones",
    project_2_name: "Moda y Vestimenta",
    project_2_desc: "Catálogos y tiendas para marcas de moda",
    project_3_name: "Alimentación y Repostería",
    project_3_desc: "Menús atractivos para restaurantes y pastelerías",
    project_4_name: "Salud y Bienestar",
    project_4_desc: "Páginas profesionales para médicos y clínicas",
    project_5_name: "E-commerce de Moda",
    project_5_desc: "Tiendas virtuales completas y modernas",
    project_6_name: "Inmobiliarias y Corredores",
    project_6_desc: "Portales inmobiliarios con búsqueda avanzada",
    project_7_name: "Chilliz - Helados Artesanales",
    project_7_desc: "Página para marcas de heladería con diseño vibrante",
    project_8_name: "Yoga y Calidad de Vida",
    project_8_desc: "Plataformas para prácticas y bienestar",
    project_9_name: "Virtz - Moda Streetwear",
    project_9_desc: "Tienda virtual de ropa con diseño moderno y destacado",
    project_10_name: "Barberías y Salones",
    project_10_desc: "Agendamientos y portafolios para profesionales",
    project_11_name: "Avora Mart - E-commerce Premium",
    project_11_desc: "UI Concept de e-commerce moderno con diseño premium y responsivo",
    project_12_name: "MUSE Hair Atelier",
    project_12_desc: "Sitio institucional para salón de belleza con diseño clean, agenda integrada y dashboard administrativo",
    card_link: "👁 Visualizar Proyecto",
    about_subtitle: "SOBRE",
    about_desc_1: "Desarrollador especializado en crear <strong>soluciones digitales</strong> para empresas que desean crecer en internet.",
    about_desc_2: "Desarrollo sitios profesionales, sistemas personalizados y agendamientos online, siempre con enfoque en rendimiento, diseño moderno y una experiencia que transforma <strong>visitantes en clientes</strong>.",
    about_tag_1: "💻 Código limpio",
    about_tag_2: "📱 100% Responsivo",
    about_tag_3: "🚀 Entrega Ágil",
    about_cta: "Hablemos →",
    about_service_1: "Sitios Profesionales",
    about_service_2: "Sistemas Personalizados",
    about_service_3: "Agendamientos Online",
    process_subtitle: "CÓMO TRABAJO",
    process_title: "Mi Proceso",
    process_desc: "Un método simple y transparente para transformar tu proyecto en realidad, sin sorpresas y con total alineación.",
    step_1_title: "Conversación",
    step_1_desc: "Conversamos sobre tu idea y tus objetivos. Entiendo lo que necesitas.",
    step_2_title: "Planificación",
    step_2_desc: "Planifico la estructura, los recursos y el cronograma del proyecto.",
    step_3_title: "Diseño",
    step_3_desc: "Desarrollo un visual moderno, intuitivo y alineado a tu marca.",
    step_4_title: "Desarrollo",
    step_4_desc: "Transformo el proyecto en un sitio rápido y 100% responsivo.",
    faq_subtitle: "DUDAS",
    faq_title: "Preguntas Frecuentes",
    faq_desc: "Resuelve tus dudas sobre mis servicios y procesos de trabajo",
    faq_tags: "Presupuesto · Plazos · Responsivo · Soporte",
    faq_1: "¿Cuánto cuesta un sitio?",
    faq_1_answer: "Cada proyecto es único, por lo que el valor varía según la complejidad y funcionalidades. Hago un presupuesto personalizado después de entender tus necesidades. Contáctame para un análisis gratuito.",
    faq_2: "¿Cuánto tiempo tarda el proyecto en estar listo?",
    faq_2_answer: "El plazo promedio es de 10 a 30 días, dependiendo de la complejidad del proyecto. Sitios institucionales simples quedan listos en hasta 10 días hábiles. Sistemas más complejos pueden llevar de 20 a 30 días.",
    faq_3: "¿El sitio funciona en celular y computadora?",
    faq_3_answer: "¡Sí! Todos los sitios son 100% responsivos, es decir, se adaptan automáticamente a cualquier tamaño de pantalla: celular, tablet, notebook o desktop. Garantizando la mejor experiencia para todos los usuarios.",
    faq_4: "¿Después de la entrega, ofreces soporte?",
    faq_4_answer: "¡Claro que sí! Ofrezco soporte continuo para ajustes, correcciones y dudas. Además, dispongo de mantenimiento preventivo y actualizaciones para garantizar que tu sitio esté siempre seguro y funcionando perfectamente.",
    faq_5: "¿También desarrollas sistemas personalizados?",
    faq_5_answer: "¡Sí! Desarrollo sistemas a medida para gestionar clientes, inventario, agendamientos, finanzas y mucho más. Todo integrado con WhatsApp y con una interfaz intuitiva para facilitar el día a día de tu negocio.",
    faq_6: "¿Mi sitio aparecerá en Google?",
    faq_6_answer: "¡Sí! Los sitios están optimizados para SEO (Search Engine Optimization), con estructura adecuada, meta tags y carga rápida. Esto aumenta las posibilidades de que tu sitio aparezca en los resultados de búsqueda de Google y otros motores.",
    faq_cta_text: "¿Aún tienes dudas? Háblame por WhatsApp",
    faq_cta_btn: "Hablar ahora →",
    stat_1: "Clientes Satisfechos",
    stat_2: "Proyectos Entregados",
    stat_3: "Robots WhatsApp",
    stat_4: "Tazas de Café",
    footer_desc: "Transformo ideas en soluciones digitales que realmente funcionan. Código limpio, 100% responsivo y soporte que no termina en la entrega.",
    footer_cta_title_gold: "Transforma",
    footer_cta_title_rest: "tu idea en realidad",
    footer_cta_desc: "Vamos a crear juntos la solución digital que tu negocio necesita.",
    footer_cta_btn: "Hablar por WhatsApp",
    footer_nav_title: "Navegación",
    footer_nav_home: "Inicio",
    footer_nav_services: "Servicios",
    footer_nav_showcase: "Portafolio",
    footer_nav_about: "Sobre mí",
    footer_nav_faq: "FAQ",
    footer_services_title: "Servicios",
    footer_services_1: "Sitios Profesionales",
    footer_services_2: "Sistemas Personalizados",
    footer_services_3: "Agendamientos Online",
    footer_services_4: "Integración WhatsApp",
    footer_contact_title: "Contacto",
    footer_location_label: "Ubicación",
    footer_location: "Brasil",
    footer_copyright: "Todos los derechos reservados.",
    footer_privacy: "Política de Privacidad",
    footer_terms: "Términos de Uso",
    contact_wa_label: "WhatsApp",
    contact_wa: "Haz clic para conversar →",
    contact_email_label: "E-mail",
    contact_email: "pgdevsoftware@gmail.com",
    contact_social_label: "Redes Sociales",
    contact_social: "Sígueme en las redes →"
  },
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_showcase: "Examples",
    nav_about: "About",
    nav_process: "Process",
    nav_contact: "Contact",
    hero_subtext: "I create websites, systems, and WhatsApp integrations that organize your business and generate real sales. Clean code and support that never ends.",
    hero_tag: "Made for your business",
    hero_title: "Websites & Systems<br>that <span>sell</span> for you",
    hero_btn_portfolio: "View Projects ↗",
    hero_btn_hire: "Talk to me",
    hero_exp: "300+",
    hero_exp_sub: "Projects Delivered",
    services_title_line1: "MY",
    services_title_line2_first: "S",
    services_title_line2_rest: "ERVICES",
    service_1_title: "Trustworthy Websites",
    service_1_desc: "Modern pages to present your business, showcase services, and take the client straight to WhatsApp. Works perfectly on mobile.",
    service_2_title: "Custom Systems",
    service_2_desc: "Tailor-made dashboards to control clients, orders, bookings, services, and important info. More productivity and organized data.",
    service_3_title: "Online Scheduling",
    service_3_desc: "A simple experience for the client to choose a time and send their info. Auto-integration with WhatsApp. Ideal for services.",
    showcase_title: "Examples",
    showcase_explore: "See All →",
    cat_events: "Events",
    cat_ecommerce: "E-commerce",
    cat_food: "Food",
    cat_health: "Health",
    cat_realestate: "Real Estate",
    cat_beauty: "Beauty",
    cat_wellness: "Wellness",
    project_1_name: "Weddings & Events",
    project_1_desc: "Elegant sites for ceremonies and celebrations",
    project_2_name: "Fashion & Clothing",
    project_2_desc: "Catalogs and stores for fashion brands",
    project_3_name: "Food & Bakeries",
    project_3_desc: "Attractive menus for restaurants and bakeries",
    project_4_name: "Health & Wellness",
    project_4_desc: "Professional pages for doctors and clinics",
    project_5_name: "Fashion E-commerce",
    project_5_desc: "Complete and modern virtual stores",
    project_6_name: "Real Estate & Brokers",
    project_6_desc: "Real estate portals with advanced search",
    project_7_name: "Chilliz - Artisan Ice Cream",
    project_7_desc: "Vibrant landing page for ice cream brands",
    project_8_name: "Yoga & Quality of Life",
    project_8_desc: "Platforms for practice and wellness",
    project_9_name: "Virtz - Streetwear Fashion",
    project_9_desc: "Clothing e-commerce with bold and modern design",
    project_10_name: "Barbershops & Salons",
    project_10_desc: "Scheduling and portfolios for professionals",
    project_11_name: "Avora Mart - Premium E-commerce",
    project_11_desc: "Modern e-commerce UI Concept with premium and responsive design",
    project_12_name: "MUSE Hair Atelier",
    project_12_desc: "Institutional website for a beauty salon with clean design, integrated scheduling and admin dashboard",
    card_link: "👁 View Project",
    about_subtitle: "ABOUT",
    about_desc_1: "Developer specialized in creating <strong>digital solutions</strong> for businesses that want to grow on the internet.",
    about_desc_2: "I develop professional websites, custom systems, and online scheduling, always focusing on performance, modern design, and an experience that turns <strong>visitors into clients</strong>.",
    about_tag_1: "💻 Clean Code",
    about_tag_2: "📱 100% Responsive",
    about_tag_3: "🚀 Agile Delivery",
    about_cta: "Let's talk →",
    about_service_1: "Professional Websites",
    about_service_2: "Custom Systems",
    about_service_3: "Online Scheduling",
    process_subtitle: "HOW I WORK",
    process_title: "My Process",
    process_desc: "A simple and transparent method to turn your project into reality, without surprises and with full alignment.",
    step_1_title: "Talk",
    step_1_desc: "We talk about your idea and goals. I understand what you need.",
    step_2_title: "Planning",
    step_2_desc: "I plan the structure, resources, and project schedule.",
    step_3_title: "Design",
    step_3_desc: "I develop a modern, intuitive look aligned with your brand.",
    step_4_title: "Development",
    step_4_desc: "I turn the project into a fast, responsive website.",
    faq_subtitle: "QUESTIONS",
    faq_title: "Frequently Asked Questions",
    faq_desc: "Get answers about my services and work processes",
    faq_tags: "Budget · Deadlines · Responsive · Support",
    faq_1: "How much does a website cost?",
    faq_1_answer: "Each project is unique, so the price varies according to complexity and features. I create a custom quote after understanding your needs. Contact me for a free consultation.",
    faq_2: "How long does it take for the project to be ready?",
    faq_2_answer: "The average timeframe is 10 to 30 days, depending on project complexity. Simple institutional websites are ready in up to 10 business days. More complex systems may take 20 to 30 days.",
    faq_3: "Does the site work on mobile and desktop?",
    faq_3_answer: "Yes! All websites are 100% responsive, meaning they automatically adapt to any screen size: mobile, tablet, laptop, or desktop. Ensuring the best experience for all users.",
    faq_4: "After delivery, do you offer support?",
    faq_4_answer: "Absolutely! I offer ongoing support for adjustments, fixes, and questions. I also provide preventive maintenance and updates to ensure your website stays secure and running perfectly.",
    faq_5: "Do you also develop custom systems?",
    faq_5_answer: "Yes! I develop custom systems to manage clients, inventory, scheduling, finances, and much more. Everything integrated with WhatsApp and with an intuitive interface to make your daily operations easier.",
    faq_6: "Will my site appear on Google?",
    faq_6_answer: "Yes! Websites are SEO (Search Engine Optimization) optimized, with proper structure, meta tags, and fast loading. This increases the chances of your site appearing in Google and other search engine results.",
    faq_cta_text: "Still have doubts? Talk to me on WhatsApp",
    faq_cta_btn: "Talk now →",
    stat_1: "Happy Clients",
    stat_2: "Delivered Projects",
    stat_3: "WhatsApp Bots",
    stat_4: "Cups of Coffee",
    footer_desc: "I turn ideas into digital solutions that actually work. Clean code, 100% responsive, and support that doesn't end at delivery.",
    footer_cta_title_gold: "Transform",
    footer_cta_title_rest: "your idea into reality",
    footer_cta_desc: "Let's create together the digital solution your business needs.",
    footer_cta_btn: "Talk on WhatsApp",
    footer_nav_title: "Navigation",
    footer_nav_home: "Home",
    footer_nav_services: "Services",
    footer_nav_showcase: "Portfolio",
    footer_nav_about: "About",
    footer_nav_faq: "FAQ",
    footer_services_title: "Services",
    footer_services_1: "Professional Websites",
    footer_services_2: "Custom Systems",
    footer_services_3: "Online Scheduling",
    footer_services_4: "WhatsApp Integration",
    footer_contact_title: "Contact",
    footer_location_label: "Location",
    footer_location: "Brazil",
    footer_copyright: "All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",
    contact_wa_label: "WhatsApp",
    contact_wa: "Click to chat →",
    contact_email_label: "E-mail",
    contact_email: "pgdevsoftware@gmail.com",
    contact_social_label: "Social Media",
    contact_social: "Follow on socials →"
  }
}