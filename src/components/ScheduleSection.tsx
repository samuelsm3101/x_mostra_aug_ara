import { useState, useMemo } from "react";
import { 
  SCHEDULE_ACTIVITIES, 
  Activity, 
  Speaker,
  OFFICIAL_REGISTRATION_URL
} from "../data/scheduleData";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  ExternalLink, 
  Filter, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Video,
  AlertCircle
} from "lucide-react";

interface ScheduleSectionProps {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectSpeaker?: (speaker: Speaker) => void;
}

export default function ScheduleSection({
  bookmarkedIds,
  onToggleBookmark,
  onSelectSpeaker,
}: ScheduleSectionProps) {
  const [selectedDay, setSelectedDay] = useState<"all" | "2026-10-28" | "2026-10-29">("all");
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "manha" | "tarde" | "noite">("all");
  const [selectedCampus, setSelectedCampus] = useState<"all" | "Augustinópolis" | "Araguatins" | "Online">("all");
  const [selectedType, setSelectedType] = useState<"all" | "oficina" | "abertura" | "apresentacao" | "encerramento">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter activities
  const filteredActivities = useMemo(() => {
    return SCHEDULE_ACTIVITIES.filter((act) => {
      // Day filter
      if (selectedDay !== "all" && act.date !== selectedDay) return false;
      // Period filter
      if (selectedPeriod !== "all" && act.period !== selectedPeriod) return false;
      // Campus filter
      if (selectedCampus !== "all" && act.campus !== selectedCampus) return false;
      // Type filter
      if (selectedType !== "all" && act.type !== selectedType) return false;
      // Bookmarks filter
      if (showOnlyBookmarks && !bookmarkedIds.includes(act.id)) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = act.title.toLowerCase().includes(query);
        const inCode = act.code.toLowerCase().includes(query);
        const inDesc = act.description.toLowerCase().includes(query);
        const inLocation = act.location.toLowerCase().includes(query);
        const inOrganizer = act.organizer.toLowerCase().includes(query);
        const inSpeakers = act.speakers.some((s) => s.name.toLowerCase().includes(query));
        if (!inTitle && !inCode && !inDesc && !inLocation && !inOrganizer && !inSpeakers) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDay, selectedPeriod, selectedCampus, selectedType, showOnlyBookmarks, bookmarkedIds, searchQuery]);

  const handleCopyDetails = (activity: Activity) => {
    const text = `[${activity.code}] ${activity.title}\nData: ${activity.dateLabel} às ${activity.time}\nLocal: ${activity.location} (${activity.campus})\nOrganização: ${activity.organizer}\nPalestrantes: ${activity.speakers.map(s => s.name).join(", ") || "Apresentação Geral"}`;
    navigator.clipboard.writeText(text);
    setCopiedId(activity.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadIcs = (activity: Activity) => {
    // Generate .ics calendar file for the activity
    const isDay1 = activity.date === "2026-10-28";
    const startHour = activity.time.includes("14h") ? "14" : activity.time.includes("16h") ? "16" : activity.time.includes("19h") ? "19" : activity.time.includes("9h") ? "09" : "15";
    const endHour = activity.time.includes("16h") && startHour === "14" ? "16" : activity.time.includes("17h") ? "17" : activity.time.includes("18h") ? "18" : activity.time.includes("22h") ? "22" : "18";
    
    const dayStr = isDay1 ? "20261028" : "20261029";
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//UNITINS//X Mostra Ciencia Tecnologia//PT",
      "BEGIN:VEVENT",
      `SUMMARY:${activity.title}`,
      `DESCRIPTION:${activity.description.replace(/\n/g, " ")}`,
      `LOCATION:${activity.location} - UNITINS Câmpus ${activity.campus}`,
      `DTSTART:${dayStr}T${startHour}0000`,
      `DTEND:${dayStr}T${endHour}0000`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activity.id}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="programacao" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
              Grade de Atividades · Edição 2026
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Programação da X Mostra de Ciência e Tecnologia
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Consulte os horários, laboratórios, palestrantes e vagas das oficinas simultâneas e atividades plenárias em Augustinópolis e Araguatins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={OFFICIAL_REGISTRATION_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg shadow-2xs transition-colors"
            >
              <span>Inscrever-se no Evento</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/assets/aistudio/Programa__o___X_Mostra_de_Ci_ncia_e_Tecnologia_da_Unitins_382808db.pdf"
              download="Programacao_X_Mostra_Ciencia_Tecnologia_Unitins_2026.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#083D77] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PDF Oficial</span>
            </a>

            <button
              type="button"
              onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                showOnlyBookmarks
                  ? "bg-[#083D77] text-white border-[#083D77]"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Meu Roteiro ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4 mb-8">
          
          {/* Top row: Days tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Day segmented tabs */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg max-w-fit">
              <button
                type="button"
                onClick={() => setSelectedDay("all")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedDay === "all"
                    ? "bg-white text-[#083D77] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Todos os Dias (18)
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay("2026-10-28")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedDay === "2026-10-28"
                    ? "bg-white text-[#083D77] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Quarta, 28/10 (Tarde e Noite)
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay("2026-10-29")}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedDay === "2026-10-29"
                    ? "bg-white text-[#083D77] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Quinta, 29/10 (Manhã, Tarde e Noite)
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por tema, palestrante, sala ou curso..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77] focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Limpar
                </button>
              )}
            </div>

          </div>

          {/* Secondary filter chips row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filtrar por:
            </span>

            {/* Period selector */}
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#083D77]"
            >
              <option value="all">Turno: Todos</option>
              <option value="manha">Manhã (9h)</option>
              <option value="tarde">Tarde (14h / 15h / 16h)</option>
              <option value="noite">Noite (19h / 19h30)</option>
            </select>

            {/* Campus selector */}
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value as any)}
              className="py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#083D77]"
            >
              <option value="all">Câmpus: Todos</option>
              <option value="Augustinópolis">Câmpus Augustinópolis</option>
              <option value="Araguatins">Câmpus Araguatins</option>
              <option value="Online">Online (Google Meet)</option>
            </select>

            {/* Type selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="py-1 px-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-[#083D77]"
            >
              <option value="all">Tipo: Todos</option>
              <option value="oficina">Oficinas Práticas</option>
              <option value="abertura">Abertura Solene</option>
              <option value="apresentacao">Apresentação de Resumos</option>
              <option value="encerramento">Encerramento & Premiação</option>
            </select>

            {(selectedDay !== "all" || selectedPeriod !== "all" || selectedCampus !== "all" || selectedType !== "all" || searchQuery || showOnlyBookmarks) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDay("all");
                  setSelectedPeriod("all");
                  setSelectedCampus("all");
                  setSelectedType("all");
                  setSearchQuery("");
                  setShowOnlyBookmarks(false);
                }}
                className="ml-auto text-xs text-rose-600 hover:underline font-medium"
              >
                Resetar Filtros
              </button>
            )}
          </div>

        </div>

        {/* Results summary count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Mostrando <strong>{filteredActivities.length}</strong> de {SCHEDULE_ACTIVITIES.length} atividades cadastradas
          </span>
          {showOnlyBookmarks && (
            <span className="text-[#083D77] font-semibold">
              Filtro ativo: apenas atividades salvas no seu roteiro
            </span>
          )}
        </div>

        {/* Activities List */}
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              Nenhuma atividade encontrada com os filtros selecionados
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tente redefinir os filtros de turno, câmpus ou termo de busca para visualizar as demais atividades da Mostra de Ciência e Tecnologia.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDay("all");
                setSelectedPeriod("all");
                setSelectedCampus("all");
                setSelectedType("all");
                setSearchQuery("");
                setShowOnlyBookmarks(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-[#083D77] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivities.map((act) => {
              const isBookmarked = bookmarkedIds.includes(act.id);
              const isExpanded = expandedId === act.id;

              return (
                <article
                  key={act.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-2xs hover:shadow-xs ${
                    isBookmarked ? "border-[#083D77]/40 ring-1 ring-[#083D77]/20" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      
                      {/* Left: Time and Location details */}
                      <div className="flex-1 space-y-2.5">
                        {/* Clean unboxed metadata with separators */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                          <span className="font-bold text-[#083D77]">{act.code}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="font-semibold text-slate-800">{act.dateLabel}</span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="flex items-center gap-1 text-slate-700">
                            <Clock className="w-3.5 h-3.5 text-[#083D77]" />
                            {act.time} ({act.duration})
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="flex items-center gap-1 text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-[#083D77]" />
                            {act.location} · {act.campus}
                          </span>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-emerald-700 font-semibold">{act.capacity}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                          {act.title}
                        </h3>

                        {/* Short Description */}
                        {act.shortDescription && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {act.shortDescription}
                          </p>
                        )}

                        {/* Organizer line */}
                        <div className="text-xs text-slate-500 font-medium">
                          {act.organizer}
                        </div>

                        {/* Speakers snippet if any */}
                        {act.speakers.length > 0 && (
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <span className="text-xs text-slate-400 font-medium">Ministrante(s):</span>
                            {act.speakers.map((spk) => (
                              <button
                                key={spk.id}
                                type="button"
                                onClick={() => onSelectSpeaker && onSelectSpeaker(spk)}
                                className="inline-flex items-center gap-2 text-xs text-slate-700 hover:text-[#083D77] bg-slate-50 hover:bg-slate-100 p-1 pr-2.5 rounded-full border border-slate-200 transition-colors"
                              >
                                <img
                                  src={spk.photoUrl}
                                  alt={spk.name}
                                  className="w-5 h-5 rounded-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="font-medium">{spk.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(act.id)}
                            className={`p-2 rounded-lg border transition-colors ${
                              isBookmarked
                                ? "bg-[#083D77] text-white border-[#083D77]"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                            title={isBookmarked ? "Remover do meu roteiro" : "Salvar no meu roteiro"}
                            aria-label={isBookmarked ? "Remover atividade salva" : "Salvar atividade"}
                          >
                            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadIcs(act)}
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#083D77] hover:bg-slate-50 transition-colors"
                            title="Adicionar ao Calendário (.ics)"
                            aria-label="Exportar para calendário"
                          >
                            <Calendar className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyDetails(act)}
                            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#083D77] hover:bg-slate-50 transition-colors"
                            title="Copiar dados da atividade"
                            aria-label="Copiar detalhes"
                          >
                            {copiedId === act.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? null : act.id)}
                          className="text-xs font-semibold text-[#083D77] hover:text-[#062c57] inline-flex items-center gap-1 py-1"
                        >
                          <span>{isExpanded ? "Ocultar detalhes" : "Mais detalhes"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                    </div>

                    {/* Expandable Details Area */}
                    {isExpanded && (
                      <div className="mt-5 pt-5 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-700 bg-slate-50/70 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 sm:p-6">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Ementa e Conteúdo Programático:</h4>
                          <p className="leading-relaxed text-slate-600">{act.description}</p>
                        </div>

                        {act.targetAudience && (
                          <div>
                            <span className="font-bold text-slate-900">Público-alvo: </span>
                            <span className="text-slate-600">{act.targetAudience}</span>
                          </div>
                        )}

                        {act.requirements && (
                          <div className="flex items-start gap-2 text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Requisitos / Orientações: </span>
                              <span>{act.requirements}</span>
                            </div>
                          </div>
                        )}

                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <a
                            href={OFFICIAL_REGISTRATION_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors"
                          >
                            <span>Inscrever-se no Portal UNITINS (3200)</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {act.meetLink && (
                            <a
                              href={act.meetLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Acessar Sala Virtual (Google Meet)</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        {act.speakers.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <h4 className="font-bold text-slate-900">Informações do(s) Palestrante(s):</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {act.speakers.map((spk) => (
                                <div key={spk.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-3">
                                  <img
                                    src={spk.photoUrl}
                                    alt={spk.name}
                                    className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                  <div className="text-xs space-y-0.5">
                                    <p className="font-bold text-slate-900">{spk.name}</p>
                                    <p className="text-slate-500">{spk.role}</p>
                                    <p className="text-[11px] text-slate-400">{spk.institution}</p>
                                    {spk.email && (
                                      <a href={`mailto:${spk.email}`} className="text-[#083D77] hover:underline font-medium block pt-0.5">
                                        {spk.email}
                                      </a>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
