import { useState, useMemo, useEffect } from "react";
import { 
  SCHEDULE_ACTIVITIES, 
  Activity, 
  Speaker,
  OFFICIAL_REGISTRATION_URL,
  OFFICIAL_PROGRAM_CARDS,
  OfficialProgramCard
} from "../data/scheduleData";
import { 
  Calendar, 
  Clock, 
  MapPin, 
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
  AlertCircle,
  Eye,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon,
  ListOrdered
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
  // View mode: 'cards' (official graphical cards), 'grade' (detailed interactive list), 'ambos' (both)
  const [viewMode, setViewMode] = useState<"cards" | "grade" | "ambos">("cards");
  
  // Day filter
  const [selectedDay, setSelectedDay] = useState<"all" | "2026-10-28" | "2026-10-29">("all");
  const [selectedPeriod, setSelectedPeriod] = useState<"all" | "manha" | "tarde" | "noite">("all");
  const [selectedCampus, setSelectedCampus] = useState<"all" | "Augustinópolis" | "Araguatins" | "Online">("all");
  const [selectedType, setSelectedType] = useState<"all" | "oficina" | "abertura" | "apresentacao" | "encerramento">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Lightbox Modal for Official Cards
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCardIndex === null) return;
      if (e.key === "Escape") {
        setActiveCardIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveCardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : OFFICIAL_PROGRAM_CARDS.length - 1));
      } else if (e.key === "ArrowRight") {
        setActiveCardIndex((prev) => (prev !== null && prev < OFFICIAL_PROGRAM_CARDS.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeCardIndex]);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return OFFICIAL_PROGRAM_CARDS.filter((card) => {
      if (selectedDay !== "all" && card.day !== selectedDay) return false;
      return true;
    });
  }, [selectedDay]);

  // Filtered Activities
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

  const openCardByActivityId = (actId: string) => {
    const cardIdx = OFFICIAL_PROGRAM_CARDS.findIndex((c) => c.activityIds.includes(actId));
    if (cardIdx !== -1) {
      setActiveCardIndex(cardIdx);
    }
  };

  const currentCard = activeCardIndex !== null ? OFFICIAL_PROGRAM_CARDS[activeCardIndex] : null;

  return (
    <section id="programacao" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#083D77]">
              <span>Grade de Atividades · Ordem Cronológica</span>
              <span className="text-slate-300">·</span>
              <span className="text-pink-600 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Tema: Ciência Delas
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Programação da X Mostra de Ciência e Tecnologia
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Acesse os <strong>cards oficiais de divulgação</strong> em ordem cronológica de realização das atividades (Atividades 1 a 18) ou consulte a grade detalhada com horários, palestrantes e inscrições.
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
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                if (viewMode === "cards") setViewMode("grade");
              }}
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

        {/* View Mode Switcher Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-white rounded-xl border border-slate-200 shadow-2xs mb-8">
          {/* View mode toggle */}
          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all ${
                viewMode === "cards"
                  ? "bg-[#083D77] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Cards Oficiais da Programação ({OFFICIAL_PROGRAM_CARDS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grade")}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all ${
                viewMode === "grade"
                  ? "bg-[#083D77] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>Grade Detalhada ({SCHEDULE_ACTIVITIES.length} Atividades)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("ambos")}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                viewMode === "ambos"
                  ? "bg-[#083D77] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Ambos</span>
            </button>
          </div>

          {/* Quick day switcher */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium mr-1 hidden sm:inline">Dia:</span>
            <button
              type="button"
              onClick={() => setSelectedDay("all")}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                selectedDay === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              Todos os Dias
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay("2026-10-28")}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                selectedDay === "2026-10-28"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              28/10 (Quarta)
            </button>
            <button
              type="button"
              onClick={() => setSelectedDay("2026-10-29")}
              className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
                selectedDay === "2026-10-29"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              29/10 (Quinta)
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* VIEW 1: OFFICIAL GRAPHICAL PROGRAM CARDS (CHRONOLOGICAL ORDER)   */}
        {/* ================================================================= */}
        {(viewMode === "cards" || viewMode === "ambos") && (
          <div className="space-y-8 mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#083D77]" />
                  <span>Cards Oficiais de Divulgação da Programação</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Clique em qualquer card para ampliar em tela cheia, dar zoom e baixar a imagem oficial em alta resolução.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-md self-start sm:self-auto">
                {filteredCards.length} {filteredCards.length === 1 ? "card exibido" : "cards exibidos"}
              </span>
            </div>

            {/* Grid of Official Program Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCards.map((card, idx) => {
                const cardIndexInAll = OFFICIAL_PROGRAM_CARDS.findIndex((c) => c.id === card.id);
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#083D77]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    {/* Card Image Header with Overlay Actions */}
                    <div 
                      onClick={() => setActiveCardIndex(cardIndexInAll)}
                      className="relative aspect-[4/5] bg-slate-900 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={card.imageUrl}
                        alt={`Card da programação oficial: ${card.title}`}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#083D77]/95 text-white shadow-md backdrop-blur-xs">
                          Card {card.order} de {OFFICIAL_PROGRAM_CARDS.length}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900 shadow-md">
                          {card.day === "2026-10-28" ? "28 de Outubro" : "29 de Outubro"}
                        </span>
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                        <button
                          type="button"
                          className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 hover:bg-slate-100 transition-colors pointer-events-none"
                        >
                          <Maximize2 className="w-4 h-4 text-[#083D77]" />
                          <span>Ampliar em Alta Definição</span>
                        </button>
                      </div>

                      {/* Bottom strip inside image */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 pt-8 text-white">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                          {card.periodLabel}
                        </div>
                        <h4 className="text-base font-bold leading-tight mt-0.5">
                          {card.title}
                        </h4>
                      </div>
                    </div>

                    {/* Card Content & Activity Mapping */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Activities included badges */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                            Atividades correspondentes:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {card.activityCodes.map((code, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#083D77]/10 text-[#083D77] border border-[#083D77]/20"
                              >
                                {code}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Location summary */}
                        <div className="flex items-start gap-1.5 text-xs text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-[#083D77] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{card.locationSummary}</span>
                        </div>

                        {/* Speakers summary */}
                        <div className="text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">Palestrantes: </span>
                          <span className="line-clamp-2">{card.speakersSummary}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveCardIndex(cardIndexInAll)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#083D77] hover:text-[#062c57] py-1.5"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver em Detalhes</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={card.imageUrl}
                            download={`Card_Programacao_X_Mostra_UNITINS_Card_${card.order}.jpeg`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Baixar imagem oficial deste card"
                          >
                            <Download className="w-4 h-4" />
                          </a>

                          <a
                            href={OFFICIAL_REGISTRATION_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            <span>Inscrever-se</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* VIEW 2: INTERACTIVE TIMETABLE (ALL 18 ACTIVITIES)                */}
        {/* ================================================================= */}
        {(viewMode === "grade" || viewMode === "ambos") && (
          <div className="space-y-6">
            
            {/* Detailed Grade Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ListOrdered className="w-5 h-5 text-[#083D77]" />
                  <span>Grade Completa de Atividades Cronológicas (1 a 18)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Busque por tema, laboratório, câmpus ou palestrante, salve no seu roteiro e exporte para sua agenda.
                </p>
              </div>
            </div>

            {/* Filter Controls Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
              
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
                    Quarta, 28/10 (Ativ. 1 a 10)
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
                    Quinta, 29/10 (Ativ. 11 a 18)
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
                            {/* Metadata */}
                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                              <span className="font-bold px-2 py-0.5 rounded-md bg-[#083D77] text-white">
                                {act.code}
                              </span>
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
                              
                              {act.isCienciaDelas && (
                                <>
                                  <span aria-hidden="true" className="text-slate-300">·</span>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-100 text-pink-800 font-bold text-[11px]">
                                    <Sparkles className="w-3 h-3 text-pink-600" />
                                    Ciência Delas
                                  </span>
                                </>
                              )}
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
                                    <span className="text-[10px] text-slate-400">({spk.role})</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Quick button to view in official card */}
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={() => openCardByActivityId(act.id)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#083D77] hover:underline"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                <span>Ver card gráfico oficial desta atividade</span>
                              </button>
                            </div>

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
        )}

      </div>

      {/* ================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL FOR OFFICIAL CARDS                      */}
      {/* ================================================================= */}
      {currentCard && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={() => setActiveCardIndex(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#083D77] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400 text-slate-900 rounded-full">
                  Card {currentCard.order} de {OFFICIAL_PROGRAM_CARDS.length}
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight">
                    {currentCard.title} · {currentCard.dayLabel}
                  </h3>
                  <p className="text-xs text-blue-200">
                    {currentCard.periodLabel} ({currentCard.timeRange})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={currentCard.imageUrl}
                  download={`Card_Oficial_X_Mostra_UNITINS_Card_${currentCard.order}.jpeg`}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Baixar imagem em alta resolução"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveCardIndex(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Fechar (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Image & Details */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid md:grid-cols-12 gap-6 items-start bg-slate-50">
              
              {/* Left Column: Image with navigation arrows (7 cols) */}
              <div className="md:col-span-7 relative flex flex-col items-center justify-center bg-slate-900 rounded-xl overflow-hidden shadow-inner group">
                <img
                  src={currentCard.imageUrl}
                  alt={currentCard.title}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />

                {/* Left arrow */}
                <button
                  type="button"
                  onClick={() => setActiveCardIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : OFFICIAL_PROGRAM_CARDS.length - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-[#083D77] text-white shadow-lg transition-colors"
                  title="Card Anterior (Seta Esquerda)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right arrow */}
                <button
                  type="button"
                  onClick={() => setActiveCardIndex((prev) => (prev !== null && prev < OFFICIAL_PROGRAM_CARDS.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-[#083D77] text-white shadow-lg transition-colors"
                  title="Próximo Card (Seta Direita)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Right Column: Activities description (5 cols) */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Atividades incluídas neste card:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {currentCard.activityCodes.map((code, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#083D77] text-white"
                      >
                        {code}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentCard.description}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                  <div>
                    <span className="font-bold text-slate-800">Localização:</span>
                    <p className="text-slate-600">{currentCard.locationSummary}</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Ministrantes:</span>
                    <p className="text-slate-600">{currentCard.speakersSummary}</p>
                  </div>
                </div>

                {/* Direct action links */}
                <div className="space-y-2 pt-2">
                  <a
                    href={OFFICIAL_REGISTRATION_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors shadow-2xs"
                  >
                    <span>Inscrever-se no Portal Oficial UNITINS (3200)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={currentCard.imageUrl}
                    download={`Card_Oficial_X_Mostra_UNITINS_Card_${currentCard.order}.jpeg`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-500" />
                    <span>Baixar Imagem deste Card (1080x1350)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("grade");
                      setActiveCardIndex(null);
                    }}
                    className="w-full text-center text-xs text-[#083D77] hover:underline font-semibold py-1"
                  >
                    Ver detalhes completos na grade de atividades
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer Thumbnails Bar */}
            <div className="px-4 py-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
              <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap hidden sm:inline">
                Navegar pelos cards:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {OFFICIAL_PROGRAM_CARDS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCardIndex(i)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-colors ${
                      i === activeCardIndex
                        ? "bg-[#083D77] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    Card {c.order}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
