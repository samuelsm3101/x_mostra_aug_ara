import { HeartPulse, Lightbulb, Scale, GraduationCap, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: HeartPulse,
      title: "Saúde & Práticas Clínicas",
      department: "Medicina & Enfermagem",
      description: "Oficinas em laboratórios de simulação avançada (CCS): intubação orotraqueal, traqueostomia cirúrgica, controle de infecções (IRAS), resistência a antimicrobianos e doenças raras.",
    },
    {
      icon: Lightbulb,
      title: "Inovação Tecnológica & SUS",
      department: "NIT - Unitins",
      description: "Capacitação sobre patentes, registro de propriedade intelectual e Parcerias para o Desenvolvimento Produtivo (PDPs) como ponte entre o Direito e o Sistema Único de Saúde.",
    },
    {
      icon: Scale,
      title: "Justiça, Gênero & Cidadania",
      department: "Curso de Direito",
      description: "Diagnóstico territorial participativo em Augustinópolis e formação sobre direitos das mulheres, enfrentamento à violência e garantias de cidadania no Bico do Papagaio.",
    },
    {
      icon: GraduationCap,
      title: "Saberes Ancestrais & Ciência",
      department: "Curso de Pedagogia",
      description: "Diálogos sobre jogos ancestrais dos povos originários, pensamento decolonial de Moira Millán contra o terricídio, e oficina prática de escrita em Overleaf/LaTeX.",
    },
  ];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
            Sobre a Edição 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Uma década fomentando a ciência e a inovação no Bico do Papagaio
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A <strong>X Mostra de Ciência e Tecnologia da Universidade Estadual do Tocantins (UNITINS)</strong>, organizada pela <strong>Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp)</strong> e Direção dos Câmpus Augustinópolis e Araguatins (Edital nº 07/2026), é uma ação alinhada à <strong>XXXIII Jornada de Iniciação Científica</strong> e à <strong>23ª Semana Nacional de Ciência e Tecnologia (SNCT/MCTI)</strong>.
          </p>
        </div>

        {/* Storytelling Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              Em sua 10ª edição histórica, o evento se une à campanha nacional com o tema central <strong className="text-[#083D77]">“Ciência Delas: Meninas e Mulheres na Ciência: Integrando Saúde, Justiça, Gestão e Inovação para Transformar o Bico do Papagaio”</strong>.
            </p>
            <p>
              Durante os dias 28 e 29 de outubro de 2026, estudantes de graduação, pós-graduandos, docentes, pesquisadores e a comunidade regional têm acesso a laboratórios equipados, oficinas de alta densidade técnica, momentos culturais, debates interdisciplinares e à tradicional sessão de apresentação de trabalhos e pôsteres científicos.
            </p>
            
            <div className="pt-2 grid sm:grid-cols-2 gap-3 text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Simulações em laboratórios do CCS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Intercâmbio Augustinópolis e Araguatins</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Apresentação de pôsteres e anais</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <span>Participação de hospitais de referência</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
                Informações Gerais da Edição
              </div>
              
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-slate-500 font-medium">Período de Realização</dt>
                  <dd className="font-semibold text-slate-900">28 e 29 de Outubro de 2026</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 font-medium">Sede Principal</dt>
                  <dd className="font-semibold text-slate-900">Câmpus Augustinópolis (Rua Planalto, 601)</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 font-medium">Polo Integrado</dt>
                  <dd className="font-semibold text-slate-900">Câmpus Araguatins (Salas e LABIN)</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 font-medium">Modalidades</dt>
                  <dd className="font-semibold text-slate-900">Presencial + Transmissão Online (Google Meet)</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500 font-medium">Certificação</dt>
                  <dd className="font-semibold text-emerald-700">Emitida pela Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp/UNITINS)</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 4 Thematic Pillars Bento-style Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-50 hover:bg-white rounded-xl p-6 border border-slate-200/80 hover:border-slate-300 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-100/80 text-[#083D77] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-[#083D77] mb-1">
                    {pillar.department}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
