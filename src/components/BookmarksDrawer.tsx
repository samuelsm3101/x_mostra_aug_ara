import { X, Calendar, Clock, MapPin, Trash2, Download, Printer } from "lucide-react";
import { SCHEDULE_ACTIVITIES, Activity } from "../data/scheduleData";

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: string[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export default function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedIds,
  onRemoveBookmark,
  onClearAll,
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  const bookmarkedActivities = SCHEDULE_ACTIVITIES.filter((a) =>
    bookmarkedIds.includes(a.id)
  );

  const handleExportAllIcs = () => {
    if (bookmarkedActivities.length === 0) return;

    let eventsIcs = "";
    bookmarkedActivities.forEach((activity) => {
      const isDay1 = activity.date === "2026-10-28";
      const startHour = activity.time.includes("14h") ? "14" : activity.time.includes("16h") ? "16" : activity.time.includes("19h") ? "19" : activity.time.includes("9h") ? "09" : "15";
      const endHour = activity.time.includes("16h") && startHour === "14" ? "16" : activity.time.includes("17h") ? "17" : activity.time.includes("18h") ? "18" : activity.time.includes("22h") ? "22" : "18";
      const dayStr = isDay1 ? "20261028" : "20261029";

      eventsIcs += [
        "BEGIN:VEVENT",
        `SUMMARY:${activity.title}`,
        `DESCRIPTION:${activity.description.replace(/\n/g, " ")}`,
        `LOCATION:${activity.location} - UNITINS Câmpus ${activity.campus}`,
        `DTSTART:${dayStr}T${startHour}0000`,
        `DTEND:${dayStr}T${endHour}0000`,
        "STATUS:CONFIRMED",
        "END:VEVENT\r\n"
      ].join("\r\n");
    });

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//UNITINS//Meu Roteiro X Mostra//PT",
      eventsIcs,
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Meu_Roteiro_X_Mostra_Unitins_2026.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#083D77] text-white flex items-center justify-center font-bold text-xs">
              {bookmarkedActivities.length}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Meu Roteiro Personalizado</h3>
              <p className="text-[11px] text-slate-500">Atividades salvas para acompanhar no evento</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {bookmarkedActivities.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-sm font-medium text-slate-600">Nenhuma atividade salva ainda</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Navegue pela programação e clique no ícone de marcador para montar seu roteiro personalizado da Mostra de Ciência e Tecnologia.
              </p>
            </div>
          ) : (
            bookmarkedActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-slate-500 font-medium">
                    <span className="font-bold text-[#083D77]">{act.code}</span> · {act.dateLabel}
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(act.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Remover do roteiro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {act.title}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{act.location}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {bookmarkedActivities.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
            <a
              href="https://www.unitins.br/Eventos/Inscricao/3200"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors shadow-xs"
            >
              <span>Inscrever-se no Evento (Edição 3200)</span>
            </a>

            <button
              type="button"
              onClick={handleExportAllIcs}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Roteiro para Calendário (.ics)</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir roteiro</span>
              </button>

              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:underline font-medium"
              >
                Limpar tudo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
