import { Sparkles, HeartPulse, Scale, Trees, Lightbulb, Users, Calendar, ArrowRight, Award, Compass } from "lucide-react";

interface CienciaDelasSectionProps {
  onExploreCienciaDelas: () => void;
}

export default function CienciaDelasSection({ onExploreCienciaDelas }: CienciaDelasSectionProps) {
  const axes = [
    {
      icon: HeartPulse,
      title: "Saúde & Prática Clínica",
      accent: "from-pink-500 to-rose-600",
      bgLight: "bg-pink-50 border-pink-200 text-pink-700",
      description:
        "Fortalecimento da liderança feminina em enfermagem intensiva, medicina diagnóstica, manejo de doenças raras e na consolidação do Complexo de Ciências da Saúde da Unitins no SUS.",
      highlights: [
        "Manejo de doenças raras e oncologia",
        "Biomonitoramento genotóxico ambiental",
        "Simulação realística e controle de infecções (IRAS)"
      ]
    },
    {
      icon: Scale,
      title: "Justiça & Direitos das Mulheres",
      accent: "from-purple-500 to-indigo-600",
      bgLight: "bg-purple-50 border-purple-200 text-purple-700",
      description:
        "Instrumentos normativos de combate à violência de gênero, defesa dos direitos fundamentais, protocolo judiciário com perspectiva de gênero e acesso democrático à cidadania.",
      highlights: [
        "Oficina 'Direito em Movimento: Mulheres e Cidadania'",
        "Diagnóstico territorial participativo em Augustinópolis",
        "Diálogo jurídico com comunidades e escolas públicas"
      ]
    },
    {
      icon: Trees,
      title: "Gestão & Saberes Tradicionais",
      accent: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50 border-emerald-200 text-emerald-700",
      description:
        "Reflexão crítica sobre o conceito de terricídio de Moira Millán, valorização das matrizes culturais e epistemologias das mulheres ribeirinhas, quilombolas e quebradeiras de coco babaçu.",
      highlights: [
        "Oficina 'Terricídio: mulheres, território e resistência'",
        "Jogos ancestrais e resgate da memória no Bico",
        "Sustentabilidade e justiça socioambiental no Tocantins"
      ]
    },
    {
      icon: Lightbulb,
      title: "Inovação & Iniciação Científica",
      accent: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50 border-amber-200 text-amber-700",
      description:
        "Incentivo sistemático para que alunas da educação básica e da graduação ingressem em programas de iniciação científica, proteção intelectual via NIT e publicação com ferramentas contemporâneas.",
      highlights: [
        "Patentes e interfaces regulatórias com o NIT/UNITINS",
        "Escrita científica de alto nível em LaTeX com Overleaf",
        "Inserção acadêmica na Plataforma Lattes (CNPq)"
      ]
    }
  ];

  return (
    <section id="ciencia-delas" className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 via-[#072448] to-[#083D77] text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>Tema Central da 23ª SNCT & X Mostra Unitins</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            “Ciência Delas”
            <span className="block text-xl sm:text-2xl font-medium text-pink-200 mt-2">
              Meninas e Mulheres na Ciência: Integrando Saúde, Justiça, Gestão e Inovação para Transformar o Bico do Papagaio
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
            A X Mostra de Ciência e Tecnologia da Unitins coloca no centro do debate a potência transformadora das pesquisadoras, docentes, estudantes e lideranças comunitárias femininas que constroem soluções científicas para a região do Bico do Papagaio.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {axes.map((axis, idx) => {
            const Icon = axis.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-pink-300/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${axis.accent} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="font-bold text-lg text-white mb-2 group-hover:text-pink-200 transition-colors">
                    {axis.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {axis.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-pink-300 tracking-wider block">
                    Destaques no evento:
                  </span>
                  {axis.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-200">
                      <span className="text-pink-400 mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Highlight Spotlight: Abertura & Encerramento Cultural */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Opening Roundtable Spotlight */}
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
                  Mesa-Redonda Inaugural
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-pink-300" />
                  28/10 às 19h · Auditório Central
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Mulheres na Ciência: Integrando Saúde, Justiça, Gestão e Inovação para Transformar o Bico do Papagaio
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                Conferência magna de abertura reunindo pesquisadoras pioneiras da Amazônia tocantinense e paraense para debater a interiorização da ciência, os desafios de permanência de mulheres em carreiras STEM e o papel da universidade pública na redução de desigualdades.
              </p>

              {/* Speakers in the Roundtable */}
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src="/palestrantes/maria-pantoja.jpg"
                    alt="Maria Pantoja Moreira de Sena"
                    className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Maria Pantoja</p>
                    <p className="text-[10px] text-pink-300 truncate">UNIFESSPA</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src="/palestrantes/eliana-farencena.jpg"
                    alt="Eliana Zellmer Poerschke Farencena"
                    className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Eliana Farencena</p>
                    <p className="text-[10px] text-pink-300 truncate">Assessoria FAPT</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <img
                    src="/palestrantes/andyara-correia.jpg"
                    alt="Profa. Ma. Andyara Letícia de Salles Correia"
                    className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Profa. Andyara</p>
                    <p className="text-[10px] text-pink-300 truncate">Mediadora · UNITINS</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-300">
                Atividade 10 no roteiro oficial · Aberta a toda a comunidade
              </span>
              <button
                type="button"
                onClick={onExploreCienciaDelas}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-md hover:shadow-lg transition-all"
              >
                <span>Filtrar Atividades “Ciência Delas”</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Cultural Presentation & Youth Spotlight */}
          <div className="lg:col-span-5 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-slate-900/60 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>Expressão Artística & Juventude</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Grupo Girls OCM Dance
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                No encerramento oficial da Mostra (29/10 às 19h30), as alunas da <strong className="text-white">Escola Estadual Oneide Cruz Mousinho</strong> trazem ao palco do Auditório Central uma coreografia autoral que simboliza a força, os sonhos e o empoderamento das jovens do Bico do Papagaio na ciência e na sociedade.
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>Protagonismo Jovem Escolar</span>
                  <span className="text-cyan-300 font-bold">100% Meninas</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 h-full w-full rounded-full" />
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  "Meninas hoje, cientistas, juristas e médicas amanhã no Tocantins."
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center gap-3">
              <Compass className="w-5 h-5 text-pink-300 shrink-0" />
              <p className="text-[11px] text-pink-100 leading-snug">
                Organizado pela <strong>UNITINS</strong> por meio da <strong>Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp)</strong> com fomento CNPq/MCTI e SNCT.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
