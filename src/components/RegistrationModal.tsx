import { useState } from "react";
import { X, CheckCircle2, Ticket, ExternalLink, ArrowRight, ShieldCheck, Calendar, BookOpen } from "lucide-react";
import { SCHEDULE_ACTIVITIES, OFFICIAL_REGISTRATION_URL } from "../data/scheduleData";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    affiliation: "aluno_unitins",
    campus: "augustinopolis",
    selectedActivities: [] as string[],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Generate random ticket code
    const randomCode = "UNITINS-3200-" + Math.floor(1000 + Math.random() * 9000);
    setTicketId(randomCode);
    setIsSubmitted(true);
  };

  const toggleActivitySelection = (id: string) => {
    setFormData((prev) => {
      const exists = prev.selectedActivities.includes(id);
      return {
        ...prev,
        selectedActivities: exists
          ? prev.selectedActivities.filter((a) => a !== id)
          : [...prev.selectedActivities, id],
      };
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      document: "",
      affiliation: "aluno_unitins",
      campus: "augustinopolis",
      selectedActivities: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#083D77] text-white p-6 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#38B6FF] block mb-1">
              Inscrição Oficial · Evento nº 3200
            </span>
            <h3 className="text-xl font-bold">
              X Mostra de Ciência e Tecnologia
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              Universidade Estadual do Tocantins (UNITINS)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Direct Portal Callout */}
        <div className="bg-blue-50/80 border-b border-blue-100 p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-700">
            <span className="font-bold text-[#083D77] block">Sistema Institucional de Inscrições:</span>
            <span>Acesse diretamente a página de inscrição oficial da UNITINS:</span>
          </div>
          <a
            href={OFFICIAL_REGISTRATION_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors shadow-xs shrink-0"
          >
            <span>Ir para Portal Unitins (3200)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-extrabold text-slate-900">
                  Pré-Credenciamento Gerado!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Para homologar oficialmente sua inscrição no sistema acadêmico da UNITINS e garantir a emissão do seu certificado pela Propesp, finalize o cadastro no link oficial do evento.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 bg-slate-50 rounded-xl border-2 border-dashed border-[#083D77]/30 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Prévia de Credencial</span>
                    <p className="font-mono text-lg font-extrabold text-[#083D77]">{ticketId}</p>
                  </div>
                  <Ticket className="w-6 h-6 text-[#083D77]" />
                </div>

                <div className="text-xs space-y-1">
                  <p><span className="text-slate-400">Participante:</span> <strong className="text-slate-800">{formData.name}</strong></p>
                  <p><span className="text-slate-400">E-mail:</span> <strong className="text-slate-800">{formData.email}</strong></p>
                  <p><span className="text-slate-400">Câmpus Principal:</span> <strong className="text-slate-800 capitalize">{formData.campus}</strong></p>
                  <p><span className="text-slate-400">Atividades Selecionadas:</span> <strong className="text-slate-800">{formData.selectedActivities.length} oficina(s)</strong></p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={OFFICIAL_REGISTRATION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Concluir no Portal Oficial da UNITINS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-slate-500 pb-1">
                Preencha os dados abaixo para simular seu roteiro e salvar suas oficinas preferidas, ou vá direto para o link oficial de inscrição:
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Maria Clara Santos"
                  className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77] focus:bg-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    E-mail Institucional ou Pessoal *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@unitins.br"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    CPF ou Matrícula Unitins
                  </label>
                  <input
                    type="text"
                    value={formData.document}
                    onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Categoria de Vínculo
                  </label>
                  <select
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77]"
                  >
                    <option value="aluno_unitins">Acadêmico(a) UNITINS</option>
                    <option value="docente_unitins">Docente / Pesquisador UNITINS</option>
                    <option value="profissional_saude">Profissional da Saúde (Médico/Enfermeiro)</option>
                    <option value="aluno_externo">Estudante de outra IES</option>
                    <option value="comunidade">Comunidade Geral / Ensino Médio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Câmpus Principal de Participação
                  </label>
                  <select
                    value={formData.campus}
                    onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#083D77]"
                  >
                    <option value="augustinopolis">Câmpus Augustinópolis</option>
                    <option value="araguatins">Câmpus Araguatins</option>
                    <option value="online">Participação Remota / Meet</option>
                  </select>
                </div>
              </div>

              {/* Workshops selection in chronological order */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Selecione as Oficinas de Interesse (Ordem Cronológica):
                </label>
                <div className="max-h-36 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1 bg-slate-50">
                  {SCHEDULE_ACTIVITIES.filter(a => a.type === 'oficina').map((act) => {
                    const isChecked = formData.selectedActivities.includes(act.id);
                    return (
                      <label
                        key={act.id}
                        className="flex items-start gap-2 p-1.5 hover:bg-white rounded cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleActivitySelection(act.id)}
                          className="mt-0.5 rounded border-slate-300 text-[#083D77] focus:ring-[#083D77]"
                        />
                        <div>
                          <span className="font-semibold text-slate-900">{act.code}: </span>
                          <span className="text-slate-600">{act.title} ({act.dateLabel} · {act.time})</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={OFFICIAL_REGISTRATION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#083D77] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Link direto unitins.br/3200</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors shadow-xs"
                  >
                    Salvar e Gerar Credencial
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
