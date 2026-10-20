export interface Speaker {
  id: string;
  name: string;
  role: string;
  institution?: string;
  email?: string;
  photoUrl: string;
}

export interface Activity {
  id: string;
  code: string; // "Atividade 1", "Atividade 2", etc. (ordem cronológica estrita)
  order: number;
  title: string;
  shortDescription?: string;
  description: string;
  type: 'oficina' | 'abertura' | 'apresentacao' | 'encerramento';
  typeLabel: string;
  date: string; // '2026-10-28' | '2026-10-29'
  dateLabel: string; // 'Quarta-feira, 28/10' | 'Quinta-feira, 29/10'
  period: 'manha' | 'tarde' | 'noite';
  time: string; // ex: '14h–16h'
  duration: string; // ex: '2h'
  location: string;
  campus: 'Augustinópolis' | 'Araguatins' | 'Online';
  organizer: string;
  capacity: string;
  targetAudience?: string;
  requirements?: string;
  meetLink?: string;
  isCienciaDelas?: boolean;
  speakers: Speaker[];
}

export interface OfficialProgramCard {
  id: string;
  order: number;
  day: '2026-10-28' | '2026-10-29';
  dayLabel: string;
  title: string;
  periodLabel: string;
  timeRange: string;
  imageUrl: string;
  activityCodes: string[];
  activityIds: string[];
  description: string;
  locationSummary: string;
  speakersSummary: string;
}

export const OFFICIAL_PROGRAM_CARDS: OfficialProgramCard[] = [
  {
    id: "card-1",
    order: 1,
    day: "2026-10-28",
    dayLabel: "28 de Outubro · Quarta-feira",
    title: "Oficinas da Tarde I",
    periodLabel: "14h · Oficinas Práticas",
    timeRange: "14h às 17h",
    imageUrl: "/programacao-cards/card-01-dia28-14h-oficinas.jpeg",
    activityCodes: ["Atividade 1", "Atividade 2", "Atividade 3"],
    activityIds: ["act-1", "act-2", "act-3"],
    locationSummary: "Sala 17, Lab. Microscopia e Lab. Simulação I (CCS)",
    speakersSummary: "Prof. Caio Barcelos, Prof. Dr. Bruno Crispim, Janayla Santos e Dr. Breno Galvão",
    description: "Patentes e Parcerias no SUS (Sala 17); Morcegos como sentinelas da saúde ambiental (Lab. Microscopia); Intubação orotraqueal (Lab. Simulação I)."
  },
  {
    id: "card-2",
    order: 2,
    day: "2026-10-28",
    dayLabel: "28 de Outubro · Quarta-feira",
    title: "Oficinas da Tarde II",
    periodLabel: "14h · Práticas Cirúrgicas e Laboratoriais",
    timeRange: "14h às 18h",
    imageUrl: "/programacao-cards/card-02-dia28-14h-oficinas.jpeg",
    activityCodes: ["Atividade 4", "Atividade 5", "Atividade 6"],
    activityIds: ["act-4", "act-5", "act-6"],
    locationSummary: "Lab. Práticas Cirúrgicas, Lab. Microbiologia e Sala 14 (CCS)",
    speakersSummary: "Dr. Rodrigo Santiago da Costa, Prof. Dr. Kleverson Oliveira, Dra. Hellen Pinheiro e Prof. Dr. Lucas dos Santos",
    description: "Traqueostomia (Lab. Práticas Cirúrgicas); Antimicrobianos na prática (Lab. Microbiologia); Estudos epidemiológicos transversais (Sala 14)."
  },
  {
    id: "card-3",
    order: 3,
    day: "2026-10-28",
    dayLabel: "28 de Outubro · Quarta-feira",
    title: "Oficinas da Tarde III & Visitação Científica",
    periodLabel: "14h e 16h · Simulação, Doenças Raras e Pôsteres",
    timeRange: "14h às 19h",
    imageUrl: "/programacao-cards/card-03-dia28-14h-16h-oficinas-visitacao.jpeg",
    activityCodes: ["Atividade 7", "Atividade 8", "Atividade 9"],
    activityIds: ["act-7", "act-8", "act-9"],
    locationSummary: "Sala 16, Sala 18 e Câmpus Augustinópolis",
    speakersSummary: "Lucas Ribeiro Araújo e Keyla Santos de Sousa",
    description: "Simulação em Controle de IRAS (Sala 16); Desafios no Manejo de Doenças Raras (Sala 18); Visitação aos resumos de Ciências Sociais e Humanas (16h)."
  },
  {
    id: "card-4",
    order: 4,
    day: "2026-10-28",
    dayLabel: "28 de Outubro · Quarta-feira",
    title: "Abertura Oficial & Roda de Conversa “Ciência Delas”",
    periodLabel: "19h · Conferência Magna Central",
    timeRange: "19h às 22h",
    imageUrl: "/programacao-cards/card-04-dia28-19h-roda-ciencia-delas.jpeg",
    activityCodes: ["Atividade 10"],
    activityIds: ["act-10"],
    locationSummary: "Auditório Central – Câmpus Augustinópolis",
    speakersSummary: "Profa. Ma. Andyara Letícia (Mediadora), Maria Pantoja (UNIFESSPA) e Eliana Farencena (FAPT)",
    description: "Roda de conversa “Ciência Delas”: Meninas e Mulheres na Ciência – integrando saúde, justiça, gestão e inovação para transformar o Bico do Papagaio."
  },
  {
    id: "card-5",
    order: 5,
    day: "2026-10-29",
    dayLabel: "29 de Outubro · Quinta-feira",
    title: "Oficinas Manhã e Tarde I",
    periodLabel: "9h, 14h e 15h · Saberes, Território e Lattes",
    timeRange: "09h às 17h",
    imageUrl: "/programacao-cards/card-05-dia29-09h-14h-15h-oficinas.jpeg",
    activityCodes: ["Atividade 11", "Atividade 12", "Atividade 13"],
    activityIds: ["act-11", "act-12", "act-13"],
    locationSummary: "Câmpus Araguatins (9h), Sala 17 (14h) e Lab. Informática Augustinópolis (15h)",
    speakersSummary: "Profa. Ma. Amanda Ribeiro Miranda, Profa. Ma. Andyara Letícia e Prof. Me. Paulo Cesar Duarte Farias",
    description: "Jogos Ancestrais e inovação (Câmpus Araguatins); Diagnóstico Territorial Participativo (Sala 17); Currículo Lattes (Lab. Informática)."
  },
  {
    id: "card-6",
    order: 6,
    day: "2026-10-29",
    dayLabel: "29 de Outubro · Quinta-feira",
    title: "Oficinas da Tarde II",
    periodLabel: "15h · Sessões Simultâneas",
    timeRange: "15h às 17h",
    imageUrl: "/programacao-cards/card-06-dia29-15h-oficinas.jpeg",
    activityCodes: ["Atividade 14", "Atividade 15", "Atividade 16"],
    activityIds: ["act-14", "act-15", "act-16"],
    locationSummary: "Sala 14 (Augustinópolis), Lab. Informática (Araguatins) e Google Meet (Online)",
    speakersSummary: "Prof. Dr. Raimundo Carvalho Moura Filho, Prof. Me. José Filho Ferreira Nobre e Profa. Dra. Fernanda Miler Lima Pinto",
    description: "Terricídio e pensamento de Moira Millán (Sala 14); Overleaf – Escrita científica (Araguatins); Direito em movimento: mulheres e cidadania (Online - Google Meet)."
  },
  {
    id: "card-7",
    order: 7,
    day: "2026-10-29",
    dayLabel: "29 de Outubro · Quinta-feira",
    title: "Visitação Científica, Encerramento e Premiação",
    periodLabel: "16h e 19h30 · Pôsteres de Saúde e Cerimônia Cultural",
    timeRange: "16h às 22h30",
    imageUrl: "/programacao-cards/card-07-dia29-16h-19h30-visitacao-encerramento.jpeg",
    activityCodes: ["Atividade 17", "Atividade 18"],
    activityIds: ["act-17", "act-18"],
    locationSummary: "Câmpus Augustinópolis (Átrio e Auditório Central)",
    speakersSummary: "Comissão Científica Propesp & Apresentação do Grupo Girls OCM Dance",
    description: "Apreciação dos resumos de Ciências da Saúde (16h); Cerimônia Oficial de Encerramento e Premiação dos Melhores Trabalhos (19h30) com Grupo Girls OCM Dance."
  }
];

export const ALL_SPEAKERS: Speaker[] = [
  {
    id: "caio-barcelos",
    name: "Prof. Caio Barcelos",
    role: "Assessor do NIT",
    institution: "NIT · UNITINS",
    email: "caiobarcelos@unitins.br",
    photoUrl: "/palestrantes/caio-barcelos.jpg"
  },
  {
    id: "bruno-crispim",
    name: "Prof. Dr. Bruno do Amaral Crispim",
    role: "Docente do Curso de Enfermagem",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "bruno.ac@unitins.br",
    photoUrl: "/palestrantes/bruno-crispim.jpg"
  },
  {
    id: "janayla-santos",
    name: "Janayla Alves dos Santos",
    role: "Acadêmica de Enfermagem",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "janaylaalves@unitins.br",
    photoUrl: "/palestrantes/janayla-santos.jpg"
  },
  {
    id: "breno-galvao",
    name: "Dr. Breno Caíque Galvão Dias",
    role: "Docente do Curso de Medicina",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "breno.cg@unitins.br",
    photoUrl: "/palestrantes/breno-galvao.jpg"
  },
  {
    id: "rodrigo-santiago",
    name: "Dr. Rodrigo Santiago da Costa",
    role: "Médico Residente em Cirurgia Geral",
    institution: "UNITINS",
    email: "rodrigo.santiago.costa@outlook.com",
    photoUrl: "/palestrantes/rodrigo-santiago.jpg"
  },
  {
    id: "kleverson-oliveira",
    name: "Prof. Dr. Kleverson Wessel de Oliveira",
    role: "Docente do Curso de Medicina",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "kleverson.wo@unitins.br",
    photoUrl: "/palestrantes/kleverson-oliveira.jpg"
  },
  {
    id: "hellen-pinheiro",
    name: "Dra. Hellen Dayanny Ferreira da Silva Pinheiro",
    role: "Coordenadora do Curso de Medicina (Mediadora)",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "hellen.df@unitins.br",
    photoUrl: "/palestrantes/hellen-pinheiro.jpg"
  },
  {
    id: "lucas-santos",
    name: "Prof. Dr. Lucas dos Santos",
    role: "Docente dos Cursos de Enfermagem e Medicina",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "lucas.ds@unitins.br",
    photoUrl: "/palestrantes/lucas-santos.jpg"
  },
  {
    id: "lucas-araujo",
    name: "Lucas Ribeiro Araújo",
    role: "Enfermeiro · Supervisor do SCIH",
    institution: "Hospital Macrorregional Dra. Ruth Noleto",
    photoUrl: "/palestrantes/lucas-araujo.jpg"
  },
  {
    id: "keyla-sousa",
    name: "Keyla Santos de Sousa",
    role: "Enfermeira · Especialista em Doenças Raras",
    institution: "Hospital Macrorregional Dra. Ruth Noleto",
    email: "keylaenfer@gmail.com",
    photoUrl: "/palestrantes/keyla-sousa.jpg"
  },
  {
    id: "maria-pantoja",
    name: "Maria Pantoja Moreira de Sena",
    role: "Palestrante Convidada",
    institution: "UNIFESSPA",
    email: "mariapantojadesena@unifesspa.edu.br",
    photoUrl: "/palestrantes/maria-pantoja.jpg"
  },
  {
    id: "eliana-farencena",
    name: "Eliana Zellmer Poerschke Farencena",
    role: "Assessoria Técnica da FAPT · Palestrante",
    institution: "FAPT",
    email: "astec.fapt@tecnologia.to.gov.br",
    photoUrl: "/palestrantes/eliana-farencena.jpg"
  },
  {
    id: "andyara-correia",
    name: "Profa. Ma. Andyara Letícia de Salles Correia",
    role: "Docente do Curso de Direito · Mediadora",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "andyara.ls@unitins.br",
    photoUrl: "/palestrantes/andyara-correia.jpg"
  },
  {
    id: "amanda-miranda",
    name: "Profa. Ma. Amanda Ribeiro Miranda",
    role: "Docente do Curso de Pedagogia",
    institution: "UNITINS · Câmpus Araguatins",
    email: "amanda.rm@unitins.br",
    photoUrl: "/palestrantes/amanda-miranda.jpg"
  },
  {
    id: "paulo-farias",
    name: "Prof. Me. Paulo Cesar Duarte Farias",
    role: "Docente do Curso de Ciências Contábeis",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "paulo.cd@unitins.br",
    photoUrl: "/palestrantes/paulo-farias.jpg"
  },
  {
    id: "raimundo-moura",
    name: "Prof. Dr. Raimundo Carvalho Moura Filho",
    role: "Docente da UNITINS",
    institution: "UNITINS",
    email: "raimundo.cm@unitins.br",
    photoUrl: "/palestrantes/raimundo-moura.jpg"
  },
  {
    id: "jose-nobre",
    name: "Prof. Me. José Filho Ferreira Nobre",
    role: "Docente do Curso de Pedagogia",
    institution: "UNITINS · Câmpus Araguatins",
    email: "jose.ff@unitins.br",
    photoUrl: "/palestrantes/jose-nobre.jpg"
  },
  {
    id: "fernanda-pinto",
    name: "Profa. Dra. Fernanda Miler Lima Pinto",
    role: "Docente do Curso de Direito",
    institution: "UNITINS · Câmpus Augustinópolis",
    email: "fernanda.ml@unitins.br",
    photoUrl: "/palestrantes/fernanda-pinto.jpg"
  }
];

export const SCHEDULE_ACTIVITIES: Activity[] = [
  // =========================================================================
  // DIA 1: QUARTA-FEIRA, 28/10/2026 – TARDE (A partir das 14h)
  // =========================================================================
  {
    id: "act-1",
    order: 1,
    code: "Atividade 1",
    title: "Oficina: Patentes e Parcerias para o Desenvolvimento Produtivo no SUS: uma interface entre o Direito e a Saúde",
    shortDescription: "Compreensão de direitos de patentes, marcos regulatórios e transferências de tecnologia em PDPs voltadas ao SUS.",
    description: "Uma imersão técnica sobre o marco de patentes farmacêuticas e biomédicas no Brasil, os instrumentos jurídicos das Parcerias para o Desenvolvimento Produtivo (PDPs) e como o Núcleo de Inovação Tecnológica (NIT) atua na proteção do conhecimento gerado na academia.",
    type: "oficina",
    typeLabel: "Oficina Prática",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–16h",
    duration: "2 horas",
    location: "Sala 17",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo NIT (Núcleo de Inovação Tecnológica)",
    capacity: "30 vagas",
    speakers: [ALL_SPEAKERS.find(s => s.id === "caio-barcelos")!]
  },
  {
    id: "act-2",
    order: 2,
    code: "Atividade 2",
    title: "Oficina: Morcegos como sentinelas da saúde ambiental – do ambiente ao microscópio: uma introdução à análise de micronúcleos aplicada ao biomonitoramento genotóxico",
    shortDescription: "Análise microscópica de bioindicadores da fauna regional para avaliação de impacto ambiental e genotoxicidade.",
    description: "Abordagem teórico-prática demonstrando como os morcegos atuam como sentinelas ecológicas no Tocantins. Os participantes realizam lâminas citológicas e contagem de micronúcleos em microscópios ópticos de alta resolução para detecção de danos ao DNA provocados por poluentes ambientais.",
    type: "oficina",
    typeLabel: "Oficina Laboratorial",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–17h",
    duration: "3 horas",
    location: "Laboratório de Microscopia – CCS (Complexo de Ciências da Saúde)",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Enfermagem",
    capacity: "15 vagas",
    targetAudience: "Estudantes e profissionais de Enfermagem, Medicina e Ciências Biológicas",
    requirements: "Uso de jaleco e sapatos fechados",
    speakers: [
      ALL_SPEAKERS.find(s => s.id === "bruno-crispim")!,
      ALL_SPEAKERS.find(s => s.id === "janayla-santos")!
    ]
  },
  {
    id: "act-3",
    order: 3,
    code: "Atividade 3",
    title: "Oficina: Intubação orotraqueal",
    shortDescription: "Treinamento prático em manequins de via aérea difícil com técnicas modernas de laringoscopia.",
    description: "Capacitação clínica com manequins anatômicos de simulação avançada. Foco nas técnicas de posicionamento, escolha do tubo, sequência rápida de intubação (SRI), uso do bougie, confirmação do posicionamento e conduta frente a via aérea difícil.",
    type: "oficina",
    typeLabel: "Oficina Médica / Simulação",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–17h",
    duration: "3 horas",
    location: "Laboratório de Simulação I - CCS – Unitins",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Medicina",
    capacity: "20 vagas",
    targetAudience: "Estudantes de Medicina e Enfermagem dos períodos clínicos",
    requirements: "Jaleco e material de anotação clínica",
    speakers: [ALL_SPEAKERS.find(s => s.id === "breno-galvao")!]
  },
  {
    id: "act-4",
    order: 4,
    code: "Atividade 4",
    title: "Oficina de Traqueostomia",
    shortDescription: "Procedimento cirúrgico de acesso às vias aéreas, anatomia cirúrgica e cuidados pós-operatórios.",
    description: "Oficina direcionada ao aprendizado técnico e cirúrgico da traqueostomia eletiva e de emergência. Inclui delimitação de referências anatômicas cervicais, técnica cirúrgica aberta, manuseio da cânula com balonete e manejo de complicações imediatas.",
    type: "oficina",
    typeLabel: "Oficina Práticas Cirúrgicas",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–17h",
    duration: "3 horas",
    location: "Laboratório de Práticas Cirúrgicas - CCS – Unitins",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Medicina",
    capacity: "20 vagas",
    targetAudience: "Acadêmicos e internos de Medicina",
    requirements: "Vestimenta cirúrgica/paramentação e jaleco",
    speakers: [ALL_SPEAKERS.find(s => s.id === "rodrigo-santiago")!]
  },
  {
    id: "act-5",
    order: 5,
    code: "Atividade 5",
    title: "Oficina: Antimicrobianos na Prática: Uso Racional, Resistência e Experiência Laboratorial",
    shortDescription: "Interpretação de antibiogramas, antibióticos de uso hospitalar e combate a superbactérias.",
    description: "Análise in loco de placas de cultura bacteriana, teste de suscetibilidade a antimicrobianos (Kirby-Bauer), interpretação de pontos de corte (BrCAST/EUCAST) e estratégias de Stewardship no ambiente hospitalar.",
    type: "oficina",
    typeLabel: "Oficina Laboratorial",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–17h",
    duration: "3 horas",
    location: "CCS – Laboratório de Microbiologia",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Medicina",
    capacity: "15 vagas",
    targetAudience: "Estudantes da área da saúde",
    requirements: "Uso obrigatório de EPIs (Jaleco manga longa, luvas, máscara)",
    speakers: [
      ALL_SPEAKERS.find(s => s.id === "kleverson-oliveira")!,
      ALL_SPEAKERS.find(s => s.id === "hellen-pinheiro")!
    ]
  },
  {
    id: "act-6",
    order: 6,
    code: "Atividade 6",
    title: "Oficina: Introdução aos Estudos Epidemiológicos Transversais",
    shortDescription: "Delineamento de inquéritos de saúde, cálculo amostral, viés de aferição e análise estatística básica.",
    description: "Fundamentação dos estudos de corte transversal no contexto da saúde pública regional. Os participantes aprendem a construir questionários validados, estimar prevalências, calcular razões de prevalência e estruturar artigos para publicação.",
    type: "oficina",
    typeLabel: "Oficina Metodológica",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–18h",
    duration: "4 horas",
    location: "Sala 14",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Enfermagem",
    capacity: "30 vagas",
    targetAudience: "Acadêmicos e pesquisadores de todas as áreas da saúde",
    speakers: [ALL_SPEAKERS.find(s => s.id === "lucas-santos")!]
  },
  {
    id: "act-7",
    order: 7,
    code: "Atividade 7",
    title: "Oficina: Curso imersivo em simulação realística em Controle de Infecções Relacionadas à Assistência à Saúde (IRAS) no Paciente Intensivo",
    shortDescription: "Cenários de UTI de alta fidelidade para protocolos de prevenção de PAV, IPCS e ITU-AC.",
    description: "Treinamento intensivo baseado em simulação realística e debriefing estruturado. Os alunos enfrentam cenários simulados de beira de leito em Unidade de Terapia Intensiva com pacientes críticos, praticando bundles de prevenção de infecção e higienização das mãos segundo diretrizes da ANVISA.",
    type: "oficina",
    typeLabel: "Oficina de Simulação Realística",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–18h",
    duration: "4 horas",
    location: "Câmpus Augustinópolis – Sala 16",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Enfermagem",
    capacity: "25 vagas",
    targetAudience: "Profissionais de saúde; acadêmicos de Enfermagem e Medicina; discentes de residências médicas e multiprofissionais",
    speakers: [ALL_SPEAKERS.find(s => s.id === "lucas-araujo")!]
  },
  {
    id: "act-8",
    order: 8,
    code: "Atividade 8",
    title: "Oficina: Desafios no Manejo de Doenças Raras: da Investigação Diagnóstica ao Tratamento Especializado",
    shortDescription: "Linha de cuidado, acolhimento familiar e rede de apoio para pacientes com patologias raras.",
    description: "Discussão aprofundada da jornada diagnóstica dos pacientes com condições raras na região do Bico do Papagaio e Maranhão, acesso a medicamentos de alto custo, genética médica na atenção básica e atuação multiprofissional humanizada.",
    type: "oficina",
    typeLabel: "Oficina Clínica / Especializada",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "14h–18h",
    duration: "4 horas",
    location: "Sala 18",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Enfermagem",
    capacity: "25 vagas",
    targetAudience: "Acadêmicos e profissionais de Enfermagem, Medicina e áreas afins",
    speakers: [ALL_SPEAKERS.find(s => s.id === "keyla-sousa")!]
  },
  {
    id: "act-9",
    order: 9,
    code: "Atividade 9",
    title: "Visitação para apreciação dos resumos de Ciências Sociais Aplicadas e Humanas",
    shortDescription: "Apresentação e avaliação dos trabalhos de iniciação científica, extensão e pesquisas acadêmicas.",
    description: "Exposição de banners e comunicações orais com pesquisas desenvolvidas nos cursos de Direito, Pedagogia, Ciências Contábeis e áreas afins da UNITINS e instituições convidadas. Avaliação por banca docente.",
    type: "apresentacao",
    typeLabel: "Sessão Científica / Pôsteres",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "tarde",
    time: "16h–19h",
    duration: "3 horas",
    location: "Câmpus Augustinópolis - Corredores e Átrio Central",
    campus: "Augustinópolis",
    organizer: "Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp/UNITINS)",
    capacity: "Ilimitadas",
    speakers: []
  },

  // =========================================================================
  // DIA 1: QUARTA-FEIRA, 28/10/2026 – NOITE (19h)
  // =========================================================================
  {
    id: "act-10",
    order: 10,
    code: "Atividade 10",
    title: "Abertura Oficial – Roda de conversa “Ciências Delas”: Meninas e Mulheres na Ciência: Integrando Saúde, Justiça, Gestão e Inovação para Transformar o Bico do Papagaio",
    shortDescription: "Conferência inaugural celebrando o protagonismo feminino na produção científica e tecnológica do Tocantins.",
    description: "Sessão solene de abertura da X Mostra de Ciência e Tecnologia. Reúne pesquisadoras renomadas da região Norte para debater trajetórias de mulheres na academia, incentivo a jovens cientistas em escolas públicas e o impacto socioeconômico da ciência feminina no Bico do Papagaio.",
    type: "abertura",
    typeLabel: "Mesa Redonda / Abertura Solene",
    date: "2026-10-28",
    dateLabel: "Quarta-feira, 28/10",
    period: "noite",
    time: "19h–22h",
    duration: "3 horas",
    location: "Auditório Central – Câmpus Augustinópolis",
    campus: "Augustinópolis",
    organizer: "Comissão Geral da X Mostra de Ciência e Tecnologia",
    capacity: "Vagas Ilimitadas (Auditório presencial + transmissão)",
    isCienciaDelas: true,
    speakers: [
      ALL_SPEAKERS.find(s => s.id === "maria-pantoja")!,
      ALL_SPEAKERS.find(s => s.id === "eliana-farencena")!,
      ALL_SPEAKERS.find(s => s.id === "andyara-correia")!
    ]
  },

  // =========================================================================
  // DIA 2: QUINTA-FEIRA, 29/10/2026 – MANHÃ (9h)
  // =========================================================================
  {
    id: "act-11",
    order: 11,
    code: "Atividade 11",
    title: "Oficina: Jogos Ancestrais e inovação: um diálogo possível no contexto do Bico do Papagaio",
    shortDescription: "Resgate de brincadeiras e ludicidade dos povos originários e quilombolas articulados à tecnologia educacional.",
    description: "Vivência formativa sobre as matrizes lúdicas indígenas e afro-brasileiras presentes no território do Bico do Papagaio. Como integrar saberes ancestrais à tecnologia social e currículo contemporâneo na educação básica e superior.",
    type: "oficina",
    typeLabel: "Oficina Pedagógica",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "manha",
    time: "9h–12h",
    duration: "3 horas",
    location: "Câmpus Araguatins - Sala Multiuso",
    campus: "Araguatins",
    organizer: "Ofertada pelo Curso de Pedagogia",
    capacity: "30 vagas",
    targetAudience: "Acadêmicos da Unitins, docentes da rede escolar pública/privada e comunidade local",
    speakers: [ALL_SPEAKERS.find(s => s.id === "amanda-miranda")!]
  },

  // =========================================================================
  // DIA 2: QUINTA-FEIRA, 29/10/2026 – TARDE (14h, 15h, 16h)
  // =========================================================================
  {
    id: "act-12",
    order: 12,
    code: "Atividade 12",
    title: "Oficina de Capacitação em Diagnóstico Territorial Participativo: ciência, tecnologia social e direitos em Augustinópolis/TO",
    shortDescription: "Cartografia social, levantamento de demandas comunitárias e instrumentos jurídicos de defesa cidadã.",
    description: "Metodologias participativas para coleta de dados territoriais, escuta das comunidades locais e formulação de relatórios técnicos que subsidiam políticas públicas municipais e ações judiciais afirmativas.",
    type: "oficina",
    typeLabel: "Oficina Jurídica e Social",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "14h–18h",
    duration: "4 horas",
    location: "Sala 17",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Direito",
    capacity: "40 vagas",
    speakers: [ALL_SPEAKERS.find(s => s.id === "andyara-correia")!]
  },
  {
    id: "act-13",
    order: 13,
    code: "Atividade 13",
    title: "Oficina: Do primeiro cadastro à visibilidade acadêmica: Currículo Lattes",
    shortDescription: "Preenchimento correto, inclusão de produções técnicas e visibilidade nas agências de fomento.",
    description: "Passo a passo no Laboratório de Informática para cadastramento, estruturação e alimentação da Plataforma Lattes (CNPq). Boas práticas na inserção de projetos de pesquisa, monitoria, resumos em anais e artigos científicos.",
    type: "oficina",
    typeLabel: "Oficina Prática de Informática",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "15h–17h",
    duration: "2 horas",
    location: "Laboratório de Informática – Câmpus Augustinópolis",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Ciências Contábeis",
    capacity: "25 vagas",
    targetAudience: "Alunos iniciantes na iniciação científica e acadêmicos em geral",
    speakers: [ALL_SPEAKERS.find(s => s.id === "paulo-farias")!]
  },
  {
    id: "act-14",
    order: 14,
    code: "Atividade 14",
    title: "Oficina: Terricídio: mulheres, território e resistência – o pensamento de Moira Millán",
    shortDescription: "Reflexão crítica sobre ecocídio, direitos bioculturais e resistência indígena liderada por mulheres.",
    description: "Análise da categoria 'terricídio' cunhada pela líder indígena Moira Millán e sua ressonância no contexto ecológico e agrário do Tocantins. Discussão de textos, depoimentos e epistemologias do Sul global.",
    type: "oficina",
    typeLabel: "Oficina Teórico-Crítica",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "15h–17h",
    duration: "2 horas",
    location: "Sala 14",
    campus: "Augustinópolis",
    organizer: "Ofertada pelo Curso de Pedagogia",
    capacity: "30 vagas",
    isCienciaDelas: true,
    speakers: [ALL_SPEAKERS.find(s => s.id === "raimundo-moura")!]
  },
  {
    id: "act-15",
    order: 15,
    code: "Atividade 15",
    title: "Oficina: Overleaf – Escrita científica em ambiente adequado",
    shortDescription: "Uso colaborativo do LaTeX/Overleaf para redação ágil de monografias, TCCs e artigos para periódicos.",
    description: "Treinamento prático direto nos computadores do LABIN em Araguatins: criação de projetos no Overleaf, formatação de fórmulas matemáticas, tabelas complexas, figuras e gestão de referências bibliográficas via BibTeX.",
    type: "oficina",
    typeLabel: "Oficina Tecnológica",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "15h–17h",
    duration: "2 horas",
    location: "LABIN – Câmpus Araguatins",
    campus: "Araguatins",
    organizer: "Ofertada pelo Curso de Pedagogia",
    capacity: "30 vagas",
    targetAudience: "Acadêmicos em geral da Unitins ou de outras universidades",
    speakers: [ALL_SPEAKERS.find(s => s.id === "jose-nobre")!]
  },
  {
    id: "act-16",
    order: 16,
    code: "Atividade 16",
    title: "Oficina: Direito em movimento: mulheres e a construção da cidadania",
    shortDescription: "Formação remota sobre instrumentos normativos de proteção contra violência e igualdade de gênero.",
    description: "Debate interativo via Google Meet abordando avanços e desafios da Lei Maria da Penha, protocolo com perspectiva de gênero do CNJ, acesso à justiça no interior do estado e garantias fundamentais para meninas e mulheres.",
    type: "oficina",
    typeLabel: "Oficina Online (Google Meet)",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "15h–17h",
    duration: "2 horas",
    location: "Online – Google Meet",
    campus: "Online",
    organizer: "Ofertada pelo Curso de Direito",
    capacity: "60 vagas",
    targetAudience: "Estudantes do ensino médio, acadêmicos(as) de graduação e comunidade em geral",
    meetLink: "https://meet.google.com/x-mostra-direito-mulheres",
    isCienciaDelas: true,
    speakers: [ALL_SPEAKERS.find(s => s.id === "fernanda-pinto")!]
  },
  {
    id: "act-17",
    order: 17,
    code: "Atividade 17",
    title: "Visitação para apreciação dos resumos de Ciências da Saúde",
    shortDescription: "Apresentação e avaliação dos trabalhos científicos das áreas de Medicina, Enfermagem e Saúde Coletiva.",
    description: "Sessão de pôsteres e apresentações de temas livres cobrindo pesquisas epidemiológicas, relatos de casos clínicos, intervenções comunitárias de saúde da família e pesquisas de bancada laboratorial.",
    type: "apresentacao",
    typeLabel: "Sessão Científica / Pôsteres",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "tarde",
    time: "16h–19h",
    duration: "3 horas",
    location: "Câmpus Augustinópolis - Corredores e Átrio Central",
    campus: "Augustinópolis",
    organizer: "Cursos de Medicina e Enfermagem / Propesp",
    capacity: "Ilimitadas",
    speakers: []
  },

  // =========================================================================
  // DIA 2: QUINTA-FEIRA, 29/10/2026 – NOITE (19h30)
  // =========================================================================
  {
    id: "act-18",
    order: 18,
    code: "Atividade 18",
    title: "Encerramento e Premiação dos Melhores Trabalhos Científicos",
    shortDescription: "Cerimônia de premiação aos resumos de maior destaque, homenagens e apresentação cultural.",
    description: "Solenidade oficial de encerramento da X Mostra de Ciência e Tecnologia. Anúncio dos vencedores por área do conhecimento (Humanas, Sociais Aplicadas e Saúde), entrega de menções honrosas e espetáculo de dança do Grupo Girls OCM Dance.",
    type: "encerramento",
    typeLabel: "Sessão Solene & Cultural",
    date: "2026-10-29",
    dateLabel: "Quinta-feira, 29/10",
    period: "noite",
    time: "19h30–22h30",
    duration: "3 horas",
    location: "Auditório Central – Câmpus Augustinópolis",
    campus: "Augustinópolis",
    organizer: "Diretoria dos Câmpus Augustinópolis e Araguatins & Propesp",
    capacity: "Vagas Ilimitadas",
    isCienciaDelas: true,
    requirements: "Apresentação cultural especial: Grupo Girls OCM Dance – grupo de dança da Escola Oneide Cruz Mousinho",
    speakers: []
  }
];

export const OFFICIAL_REGISTRATION_URL = "https://www.unitins.br/Eventos/Inscricao/3200";
