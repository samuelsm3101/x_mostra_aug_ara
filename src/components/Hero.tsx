import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Download, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { OFFICIAL_REGISTRATION_URL } from "../data/scheduleData";

interface HeroProps {
  onExploreSchedule: () => void;
  onOpenRegister: () => void;
}

export default function Hero({ onExploreSchedule, onOpenRegister }: HeroProps) {
  // Event target: 2026-10-28 09:00:00 (Tocantins UTC-3)
  const eventDate = new Date("2026-10-28T09:00:00-03:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isLive: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <section id="inicio" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
      {/* Decorative gradient blur rings */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-tr from-[#38B6FF]/15 via-[#FFD43B]/10 to-[#FF4FA2]/15 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Prominent Ciência Delas Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/90 border border-pink-300 text-pink-900 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>Tema Central: “Ciência Delas”</span>
              <span aria-hidden="true" className="text-pink-300">·</span>
              <span className="text-pink-700 font-semibold">23ª SNCT & X Mostra UNITINS</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              X Mostra de <span className="text-[#083D77]">Ciência e Tecnologia</span> da UNITINS
            </h1>

            {/* Central Theme Highlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-pink-50/90 via-purple-50/70 to-blue-50/80 border border-pink-200/80 text-slate-800 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-700 block mb-1">
                Tema Oficial 2026
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                “Ciência Delas” – Meninas e Mulheres na Ciência:
                <span className="font-semibold text-[#083D77] block text-xs sm:text-sm mt-0.5">
                  Integrando Saúde, Justiça, Gestão e Inovação para Transformar o Bico do Papagaio
                </span>
              </p>
            </div>

            {/* Sub-headline description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              O maior encontro de iniciação científica, inovação tecnológica e saberes regionais do Bico do Papagaio, realizado pela <strong>Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp)</strong> da UNITINS. Dois dias de oficinas laboratoriais, simulações realísticas, sustentabilidade e protagonismo feminino na ciência.
            </p>

            {/* Meta details list (clean unboxed text with separators) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs sm:text-sm text-slate-600 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#083D77]" />
                <span>28 e 29 de Outubro de 2026</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#083D77]" />
                <span>Câmpus Augustinópolis & Araguatins</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Certificado de até 24h</span>
              </div>
            </div>

            {/* Live Event Countdown */}
            <div className="pt-2">
              <div className="inline-block p-4 sm:p-5 bg-white rounded-xl border border-slate-200/90 shadow-xs max-w-md w-full">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Contagem regressiva para o evento</span>
                  <span className="text-emerald-700 font-bold">28/10/2026</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-50 rounded-lg py-2 px-1 border border-slate-100">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums leading-none">
                      {timeLeft.days}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">Dias</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg py-2 px-1 border border-slate-100">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">Horas</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg py-2 px-1 border border-slate-100">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">Min</span>
                  </div>
                  <div className="bg-slate-50 rounded-lg py-2 px-1 border border-slate-100">
                    <span className="block text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums leading-none">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">Seg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs with Official Registration Link */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={OFFICIAL_REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#083D77] hover:bg-[#062c57] active:scale-[0.99] rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77]"
              >
                <span>Inscrever-se no Evento</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onExploreSchedule}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-300 rounded-lg transition-all shadow-xs"
              >
                <span>Ver Programação</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/assets/aistudio/Programa__o___X_Mostra_de_Ci_ncia_e_Tecnologia_da_Unitins_382808db.pdf"
                download="Programacao_X_Mostra_Ciencia_Tecnologia_Unitins_2026.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 hover:text-[#083D77] hover:bg-slate-100 rounded-lg transition-colors"
                title="Baixar PDF da Programação Oficial"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-semibold">Baixar PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column: Key Visual Poster Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Colored backdrop ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#083D77] via-[#38B6FF] to-[#FF4FA2] rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
              
              <div className="relative rounded-xl overflow-hidden bg-white shadow-xl border border-slate-200">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-15_at_13.28.39_390bc545.jpeg"
                  alt="Cartaz Oficial da X Mostra de Ciência e Tecnologia da Unitins - Ciência Delas"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                  loading="eager"
                />
                
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#083D77] uppercase tracking-wide">
                      Identidade Visual Oficial
                    </p>
                    <p className="text-[11px] text-slate-500">
                      23ª SNCT · Pop Ciência · CNPq · FAPT · MCTI
                    </p>
                  </div>
                  <a
                    href="/assets/aistudio/WhatsApp_Image_2026-10-15_at_13.28.39_390bc545.jpeg"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#083D77] hover:underline"
                  >
                    Ampliar cartaz
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column KPI strip in a full-width row below hero split */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white/70 rounded-xl border border-slate-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums">18</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Atividades Cronológicas</div>
          </div>
          <div className="p-4 bg-white/70 rounded-xl border border-slate-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums">2</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Câmpus Integrados</div>
          </div>
          <div className="p-4 bg-white/70 rounded-xl border border-slate-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums">18</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Pesquisadores & Docentes</div>
          </div>
          <div className="p-4 bg-white/70 rounded-xl border border-slate-100">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#083D77] tabular-nums">100%</div>
            <div className="text-xs font-medium text-slate-600 mt-1">Gratuito com Certificado</div>
          </div>
        </div>

        {/* Official Panoramic Banner with Theme Artwork & Partner Logos */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
          <img
            src="/programacao-cards/banner-oficial-x-mostra.jpeg"
            alt="X Mostra de Ciência e Tecnologia - Câmpus Araguatins & Augustinópolis - 23ª SNCT - Tema: Ciência Delas"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
}
