import { useState, useMemo } from "react";
import { ALL_SPEAKERS, Speaker, SCHEDULE_ACTIVITIES } from "../data/scheduleData";
import { Mail, GraduationCap, Building2, Calendar, Search } from "lucide-react";

interface SpeakersSectionProps {
  onSelectActivityFromSpeaker?: (activityId: string) => void;
}

export default function SpeakersSection({ onSelectActivityFromSpeaker }: SpeakersSectionProps) {
  const [filterArea, setFilterArea] = useState<"all" | "saude" | "direito" | "pedagogia" | "nit" | "convidados">("all");
  const [search, setSearch] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const filteredSpeakers = useMemo(() => {
    return ALL_SPEAKERS.filter((speaker) => {
      // Area filter
      if (filterArea === "saude") {
        const isHealth = speaker.role.includes("Medicina") || speaker.role.includes("Enfermagem") || speaker.role.includes("Cirurgia") || speaker.role.includes("SCIH") || speaker.role.includes("Doenças Raras");
        if (!isHealth) return false;
      }
      if (filterArea === "direito") {
        const isLaw = speaker.role.includes("Direito");
        if (!isLaw) return false;
      }
      if (filterArea === "pedagogia") {
        const isPed = speaker.role.includes("Pedagogia");
        if (!isPed) return false;
      }
      if (filterArea === "nit") {
        const isNit = speaker.role.includes("NIT") || Boolean(speaker.institution?.includes("NIT"));
        if (!isNit) return false;
      }
      if (filterArea === "convidados") {
        const isExternal = Boolean(
          speaker.institution?.includes("UNIFESSPA") ||
          speaker.institution?.includes("FAPT") ||
          speaker.institution?.includes("Hospital")
        );
        if (!isExternal) return false;
      }

      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          speaker.name.toLowerCase().includes(q) ||
          speaker.role.toLowerCase().includes(q) ||
          Boolean(speaker.institution?.toLowerCase().includes(q)) ||
          Boolean(speaker.email?.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [filterArea, search]);

  const getSpeakerActivities = (speakerId: string) => {
    return SCHEDULE_ACTIVITIES.filter((act) => act.speakers.some((s) => s.id === speakerId));
  };

  return (
    <section id="palestrantes" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
            Corpo Docente & Pesquisadores
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Palestrantes e Mediadores
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Conheça os doutores, mestres, especialistas e acadêmicos responsáveis pelas oficinas práticas, mesas-redondas e mentorias desta edição.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setFilterArea("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "all" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todos ({ALL_SPEAKERS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterArea("saude")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "saude" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Saúde & Medicina
            </button>
            <button
              type="button"
              onClick={() => setFilterArea("direito")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "direito" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Direito & Justiça
            </button>
            <button
              type="button"
              onClick={() => setFilterArea("pedagogia")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "pedagogia" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Educação & Saberes
            </button>
            <button
              type="button"
              onClick={() => setFilterArea("nit")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "nit" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inovação (NIT)
            </button>
            <button
              type="button"
              onClick={() => setFilterArea("convidados")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                filterArea === "convidados" ? "bg-white text-[#083D77] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Convidados Externos
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por nome ou curso..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#083D77]"
            />
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpeakers.map((speaker) => {
            const activities = getSpeakerActivities(speaker.id);
            return (
              <div
                key={speaker.id}
                className="bg-slate-50/70 hover:bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 transition-all shadow-2xs hover:shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200 shadow-2xs">
                      <img
                        src={speaker.photoUrl}
                        alt={speaker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 leading-snug">
                        {speaker.name}
                      </h3>
                      <p className="text-xs text-[#083D77] font-semibold mt-1 leading-snug">
                        {speaker.role}
                      </p>
                      {speaker.institution && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {speaker.institution}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/80 space-y-2">
                  {speaker.email && (
                    <a
                      href={`mailto:${speaker.email}`}
                      className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-[#083D77] transition-colors truncate max-w-full font-medium"
                      title={`Enviar e-mail para ${speaker.email}`}
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">{speaker.email}</span>
                    </a>
                  )}

                  {activities.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Atividade vinculada:
                      </span>
                      {activities.map((act) => (
                        <a
                          key={act.id}
                          href="#programacao"
                          onClick={() => onSelectActivityFromSpeaker && onSelectActivityFromSpeaker(act.id)}
                          className="text-xs text-[#083D77] hover:underline font-semibold block line-clamp-1"
                        >
                          {act.code}: {act.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
