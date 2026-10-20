import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Como faço para me inscrever no evento e nas oficinas?",
      a: "As inscrições são 100% gratuitas e podem ser realizadas online pelo Portal de Eventos da UNITINS ou pelo formulário de credenciamento nesta página. Para oficinas práticas em laboratórios com vagas limitadas (ex: 15 a 30 vagas), a confirmação ocorre por ordem de inscrição.",
    },
    {
      q: "Quem pode participar da X Mostra de Ciência e Tecnologia?",
      a: "O evento é aberto a acadêmicos de graduação e pós-graduação da Unitins, professores, pesquisadores, discentes de outras instituições de ensino superior, profissionais da rede de saúde, docentes da educação básica e toda a comunidade do Tocantins, Pará e Maranhão.",
    },
    {
      q: "As oficinas práticas de Medicina e Enfermagem exigem EPIs?",
      a: "Sim. Para as atividades no Complexo de Ciências da Saúde (CCS) — como a oficina de Antimicrobianos no Laboratório de Microbiologia e Biomonitoramento Genotóxico no Laboratório de Microscopia —, é obrigatório o uso de Equipamentos de Proteção Individual: jaleco de manga longa, máscara e calçado totalmente fechado.",
    },
    {
      q: "Haverá emissão de certificados com horas complementares?",
      a: "Sim. Todos os participantes com presença confirmada no credenciamento e nas oficinas receberão certificados digitais emitidos pela Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp/UNITINS), válidos para atividades complementares de graduação (até 24 horas).",
    },
    {
      q: "Onde ocorrem as atividades nos dias 28 e 29 de outubro?",
      a: "A programação principal acontece no Câmpus Augustinópolis (Rua Planalto, 601), incluindo o Auditório Central, salas de aula e os laboratórios do CCS. O Câmpus Araguatins sedia a oficina de Jogos Ancestrais e a oficina de Overleaf no LABIN. Haverá também oficinas transmitidas ao vivo via Google Meet.",
    },
    {
      q: "Como funcionam as sessões de visitação aos resumos científicos?",
      a: "As visitações ocorrem nos dias 28/10 (Ciências Sociais Aplicadas e Humanas) e 29/10 (Ciências da Saúde), sempre das 16h às 19h. Os pesquisadores apresentarão seus trabalhos em banners, avaliados pelas bancas examinadoras. A visitação é aberta e gratuita para todo o público.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
            Dúvidas Frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes sobre a Mostra
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Encontre respostas rápidas sobre inscrições, certificados, laboratórios e normas de participação.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#083D77] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#083D77]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact helper */}
        <div className="mt-10 p-5 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-600">
          Ainda com dúvidas? Entre em contato com a Comissão Organizadora pelo e-mail{" "}
          <a href="mailto:pesquisa@unitins.br" className="text-[#083D77] font-bold hover:underline">
            pesquisa@unitins.br
          </a>{" "}
          ou na secretaria acadêmica do seu câmpus.
        </div>

      </div>
    </section>
  );
}
