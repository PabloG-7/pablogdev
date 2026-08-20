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
  // CHAVES DO SHOWCASE
  | 'showcase_title_part1'
  | 'showcase_title_part2'
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
  | 'assistant_greeting'
  | 'assistant_option_site'
  | 'assistant_option_system'
  | 'assistant_option_idea'
  | 'assistant_option_improve'
  | 'assistant_request_site'
  | 'assistant_request_system'
  | 'assistant_request_idea'
  | 'assistant_request_improve'
  | 'assistant_request_placeholder'
  | 'assistant_name_question'
  | 'assistant_name_placeholder'
  | 'assistant_name_required'
  | 'assistant_final_message'
  | 'assistant_send_whatsapp'
  | 'assistant_later'
  | 'assistant_opening_whatsapp'
  | 'assistant_later_response'
  | 'assistant_invalid_option'
  | 'assistant_restart_aria'
  | 'assistant_close_aria'
  | 'assistant_dialog_aria'
  | 'assistant_open_aria'
  | 'assistant_typing_indicator'

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
    // SHOWCASE - PT
    showcase_title_part1: "Exemplos que você",
    showcase_title_part2: "pode explorar",
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
    project_8_name: "Order.uk - Food Delivery",
    project_8_desc: "Plataforma completa de delivery de comida com carrinho, filtros e múltiplos idiomas",
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
    process_desc: "Do início à entrega, sem complicação.",
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
    faq_1_answer: "Cada projeto tem um valor diferente, de acordo com a complexidade e funcionalidades. Faço um orçamento personalizado após entender o que você precisa.",
    faq_2: "Quanto tempo leva para o projeto ficar pronto?",
    faq_2_answer: "Em projetos simples, como landing pages e sites institucionais, a entrega pode acontecer em 3 a 4 dias. O prazo varia conforme a complexidade e o conteúdo do projeto.",
    faq_3: "O site funciona em celular e computador?",
    faq_3_answer: "Sim! Todos os sites são 100% responsivos e se adaptam a celulares, tablets e computadores.",
    faq_4: "Depois da entrega, você oferece suporte?",
    faq_4_answer: "Sim! Ofereço suporte para ajustes, correções e dúvidas após a entrega. Também posso realizar manutenções e atualizações quando necessário.",
    faq_5: "Você também desenvolve sistemas personalizados?",
    faq_5_answer: "Sim! Desenvolvo sistemas sob medida para necessidades específicas, como clientes, estoque, agendamentos, finanças e outros processos.",
    faq_6: "Meu site aparecerá no Google?",
    faq_6_answer: "Sim! Os sites são desenvolvidos com boas práticas de SEO, estrutura adequada e carregamento rápido para melhorar sua presença nos mecanismos de busca.",
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
    contact_social: "Siga nas redes →",
    assistant_greeting: "Olá! Sou a assistente da PabloG.Dev.\nComo posso te ajudar?",
    assistant_option_site: "Quero um site",
    assistant_option_system: "Preciso de um sistema",
    assistant_option_idea: "Tenho uma ideia",
    assistant_option_improve: "Quero melhorar algo",
    assistant_request_site: "Perfeito! Me conta que tipo de site você precisa.",
    assistant_request_system: "Perfeito! Me conta que tipo de sistema você precisa.",
    assistant_request_idea: "Legal! Me conta um pouco sobre sua ideia.",
    assistant_request_improve: "Beleza! Me conta o que você gostaria de melhorar.",
    assistant_request_placeholder: "Conte sua necessidade...",
    assistant_name_question: "Ótimo! Qual é o seu nome?",
    assistant_name_placeholder: "Digite seu nome...",
    assistant_name_required: "Por favor, me diga seu nome.",
    assistant_final_message: "Perfeito! Já tenho todas as informações necessárias.\n\nQuer enviar seu pedido para o Pablo pelo WhatsApp?",
    assistant_send_whatsapp: "Enviar pelo WhatsApp",
    assistant_later: "Agora não",
    assistant_opening_whatsapp: "Abrindo WhatsApp...",
    assistant_later_response: "Tudo certo! Quando quiser entrar em contato, estarei por aqui.",
    assistant_invalid_option: "Desculpe, não entendi. Escolha uma das opções abaixo:",
    assistant_restart_aria: "Reiniciar conversa",
    assistant_close_aria: "Fechar assistente",
    assistant_dialog_aria: "Assistente virtual",
    assistant_open_aria: "Abrir assistente virtual",
    assistant_typing_indicator: "Digitando..."
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
    // SHOWCASE - ES
    showcase_title_part1: "Ejemplos que",
    showcase_title_part2: "puedes explorar",
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
    project_8_name: "Order.uk - Food Delivery",
    project_8_desc: "Plataforma completa de delivery de comida con carrito, filtros y múltiples idiomas",
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
    process_desc: "Del inicio a la entrega, sin complicaciones.",
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
    faq_1_answer: "Cada proyecto tiene un valor diferente según su complejidad y funcionalidades. Creo un presupuesto personalizado después de entender lo que necesitas.",
    faq_2: "¿Cuánto tiempo tarda el proyecto?",
    faq_2_answer: "En proyectos simples, como landing pages y sitios institucionales, la entrega puede realizarse en 3 a 4 días. El plazo varía según la complejidad y el contenido del proyecto.",
    faq_3: "¿El sitio funciona en celular y computadora?",
    faq_3_answer: "¡Sí! Todos los sitios son 100% responsivos y se adaptan a celulares, tablets y computadoras.",
    faq_4: "¿Después de la entrega, ofreces soporte?",
    faq_4_answer: "¡Sí! Ofrezco soporte para ajustes, correcciones y dudas después de la entrega. También puedo realizar mantenimiento y actualizaciones cuando sea necesario.",
    faq_5: "¿También desarrollas sistemas personalizados?",
    faq_5_answer: "¡Sí! Desarrollo sistemas a medida para necesidades específicas, como clientes, inventario, agendamientos, finanzas y otros procesos.",
    faq_6: "¿Mi sitio aparecerá en Google?",
    faq_6_answer: "¡Sí! Los sitios se desarrollan con buenas prácticas de SEO, estructura adecuada y carga rápida para mejorar tu presencia en los buscadores.",
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
    contact_social: "Sígueme en las redes →",
    assistant_greeting: "¡Hola! Soy la asistente de PabloG.Dev.\n¿Cómo puedo ayudarte?",
    assistant_option_site: "Quiero un sitio web",
    assistant_option_system: "Necesito un sistema",
    assistant_option_idea: "Tengo una idea",
    assistant_option_improve: "Quiero mejorar algo",
    assistant_request_site: "¡Perfecto! Cuéntame qué tipo de sitio web necesitas.",
    assistant_request_system: "¡Perfecto! Cuéntame qué tipo de sistema necesitas.",
    assistant_request_idea: "¡Genial! Cuéntame un poco sobre tu idea.",
    assistant_request_improve: "¡Bien! Cuéntame qué te gustaría mejorar.",
    assistant_request_placeholder: "Cuéntame tu necesidad...",
    assistant_name_question: "¡Excelente! ¿Cuál es tu nombre?",
    assistant_name_placeholder: "Escribe tu nombre...",
    assistant_name_required: "Por favor, dime tu nombre.",
    assistant_final_message: "¡Perfecto! Ya tengo toda la información necesaria.\n\n¿Quieres enviar tu solicitud a Pablo por WhatsApp?",
    assistant_send_whatsapp: "Enviar por WhatsApp",
    assistant_later: "Ahora no",
    assistant_opening_whatsapp: "Abriendo WhatsApp...",
    assistant_later_response: "¡De acuerdo! Cuando quieras contactarme, estaré aquí.",
    assistant_invalid_option: "Lo siento, no entendí. Elige una de las siguientes opciones:",
    assistant_restart_aria: "Reiniciar conversación",
    assistant_close_aria: "Cerrar asistente",
    assistant_dialog_aria: "Asistente virtual",
    assistant_open_aria: "Abrir asistente virtual",
    assistant_typing_indicator: "Escribiendo..."
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
    // SHOWCASE - EN
    showcase_title_part1: "Examples you",
    showcase_title_part2: "can explore",
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
    project_8_name: "Order.uk - Food Delivery",
    project_8_desc: "Complete food delivery platform with cart, filters and multiple languages",
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
    process_desc: "From start to delivery, without complications.",
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
    faq_1_answer: "Each project has a different price depending on its complexity and features. I create a custom quote after understanding what you need.",
    faq_2: "How long does the project take?",
    faq_2_answer: "For simple projects, such as landing pages and institutional websites, delivery can take 3 to 4 days. The timeframe varies depending on the project's complexity and content.",
    faq_3: "Does the site work on mobile and desktop?",
    faq_3_answer: "Yes! All websites are 100% responsive and adapt to mobile phones, tablets, and computers.",
    faq_4: "Do you offer support after delivery?",
    faq_4_answer: "Yes! I provide support for adjustments, fixes, and questions after delivery. Maintenance and updates are also available when needed.",
    faq_5: "Do you also develop custom systems?",
    faq_5_answer: "Yes! I develop custom systems for specific needs, such as clients, inventory, scheduling, finances, and other processes.",
    faq_6: "Will my site appear on Google?",
    faq_6_answer: "Yes! Websites are built with SEO best practices, proper structure, and fast loading to improve your presence in search engines.",
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
    contact_social: "Follow on socials →",
    assistant_greeting: "Hi! I'm the assistant at PabloG.Dev.\nHow can I help you?",
    assistant_option_site: "I want a website",
    assistant_option_system: "I need a system",
    assistant_option_idea: "I have an idea",
    assistant_option_improve: "I want to improve something",
    assistant_request_site: "Perfect! Tell me what kind of website you need.",
    assistant_request_system: "Perfect! Tell me what kind of system you need.",
    assistant_request_idea: "Cool! Tell me a bit about your idea.",
    assistant_request_improve: "Great! Tell me what you'd like to improve.",
    assistant_request_placeholder: "Tell me your need...",
    assistant_name_question: "Great! What's your name?",
    assistant_name_placeholder: "Type your name...",
    assistant_name_required: "Please tell me your name.",
    assistant_final_message: "Perfect! I have all the necessary information.\n\nDo you want to send your request to Pablo via WhatsApp?",
    assistant_send_whatsapp: "Send via WhatsApp",
    assistant_later: "Not now",
    assistant_opening_whatsapp: "Opening WhatsApp...",
    assistant_later_response: "All good! Whenever you want to get in touch, I'll be here.",
    assistant_invalid_option: "Sorry, I didn't understand. Choose one of the options below:",
    assistant_restart_aria: "Restart conversation",
    assistant_close_aria: "Close assistant",
    assistant_dialog_aria: "Virtual assistant",
    assistant_open_aria: "Open virtual assistant",
    assistant_typing_indicator: "Typing..."
  }
}