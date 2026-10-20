import { useState } from "react";
import { MapPin, Navigation, Bus, ExternalLink, Building2 } from "lucide-react";

export default function LocationSection() {
  const [activeCampus, setActiveCampus] = useState<"augustinopolis" | "araguatins">("augustinopolis");

  const venues = {
    augustinopolis: {
      name: "UNITINS – Câmpus Augustinópolis",
      badge: "Sede Principal do Evento",
      address: "Rua Planalto, 601 – Centro",
      city: "Augustinópolis – TO, CEP: 77960-000",
      description: "Auditório Central, Complexo de Ciências da Saúde (CCS), Laboratórios de Microscopia, Microbiologia, Simulação I e Salas 14 a 18.",
      mapsLink: "https://maps.google.com/?q=Unitins+-+Câmpus+Augustinópolis",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.6989372912744!2d-47.88626812501549!3d-5.462573194517036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c511ce70754147%3A0xf90c64fa514879f7!2sUnitins%20-%20C%C3%A2mpus%20Augustin%C3%B3polis!5e0!3m2!1spt-BR!2sbr!4v1761308618393!5m2!1spt-BR!2sbr",
    },
    araguatins: {
      name: "UNITINS – Câmpus Araguatins",
      badge: "Polo das Oficinas Pedagógicas",
      address: "Rua Tenente Siqueira Campos, 682 – Centro",
      city: "Araguatins – TO, CEP: 77950-000",
      description: "Laboratório de Informática (LABIN) e Salas Multiuso do Curso de Pedagogia (Oficinas de Jogos Ancestrais e Overleaf).",
      mapsLink: "https://maps.app.goo.gl/sJzSGkeqhF1BP5B48",
      embedUrl: "https://maps.google.com/maps?q=-5.6514057,-48.126062&hl=pt-BR&z=17&output=embed",
    },
  };

  return (
    <section id="localizacao" className="py-20 lg:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
            Locais de Realização
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como Chegar aos Câmpus da Unitins
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            As atividades presenciais acontecem nos Câmpus Augustinópolis e Araguatins, integrando a comunidade do Bico do Papagaio.
          </p>
        </div>

        {/* 2-Column Split: Info cards & Interactive Map */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Venue Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Primary Venue: Augustinópolis */}
            <div
              onClick={() => setActiveCampus("augustinopolis")}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                activeCampus === "augustinopolis"
                  ? "bg-blue-50/50 border-[#083D77] ring-1 ring-[#083D77]/20 shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#083D77] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#083D77] block">
                    {venues.augustinopolis.badge}
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    {venues.augustinopolis.name}
                  </h3>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pl-12 mt-3">
                <p className="font-medium text-slate-800">
                  {venues.augustinopolis.address}
                </p>
                <p>{venues.augustinopolis.city}</p>
                <p className="text-slate-500 pt-1">
                  <strong>Locais internos:</strong> {venues.augustinopolis.description}
                </p>
              </div>

              <div className="pt-3 pl-12 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCampus("augustinopolis");
                  }}
                  className={`font-semibold ${
                    activeCampus === "augustinopolis" ? "text-[#083D77] underline" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Ver no mapa integrado
                </button>
                <a
                  href={venues.augustinopolis.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#083D77] hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>

            {/* Secondary Venue: Araguatins (with confirmed exact address) */}
            <div
              onClick={() => setActiveCampus("araguatins")}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                activeCampus === "araguatins"
                  ? "bg-emerald-50/50 border-emerald-700 ring-1 ring-emerald-700/20 shadow-xs"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    {venues.araguatins.badge}
                  </span>
                  <h3 className="font-bold text-base text-slate-900">
                    {venues.araguatins.name}
                  </h3>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pl-12 mt-3">
                <p className="font-medium text-slate-800">
                  {venues.araguatins.address}
                </p>
                <p>{venues.araguatins.city}</p>
                <p className="text-slate-500 pt-1">
                  <strong>Locais internos:</strong> {venues.araguatins.description}
                </p>
              </div>

              <div className="pt-3 pl-12 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCampus("araguatins");
                  }}
                  className={`font-semibold ${
                    activeCampus === "araguatins" ? "text-emerald-700 underline" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Ver no mapa integrado
                </button>
                <a
                  href={venues.araguatins.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps (Link Direto)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Travel and logistics tip */}
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-3 text-xs text-slate-700">
              <Bus className="w-4 h-4 text-[#083D77] shrink-0 mt-0.5" />
              <p>
                <strong>Transporte intermunicipal:</strong> Há linhas de vans e ônibus regulares ligando Augustinópolis e Araguatins (aprox. 35 km de distância).
              </p>
            </div>

          </div>

          {/* Right: Interactive Google Map with Campus Switcher */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[420px] bg-slate-100">
            {/* Top switcher bar */}
            <div className="bg-white p-3 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveCampus("augustinopolis")}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeCampus === "augustinopolis"
                      ? "bg-white text-[#083D77] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Câmpus Augustinópolis
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCampus("araguatins")}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    activeCampus === "araguatins"
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Câmpus Araguatins
                </button>
              </div>

              <a
                href={venues[activeCampus].mapsLink}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#083D77] hover:underline inline-flex items-center gap-1 shrink-0 px-2"
              >
                <span>Rotas no Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Map Frame */}
            <div className="flex-1 relative min-h-[360px]">
              <iframe
                key={activeCampus}
                src={venues[activeCampus].embedUrl}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa: ${venues[activeCampus].name}`}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
