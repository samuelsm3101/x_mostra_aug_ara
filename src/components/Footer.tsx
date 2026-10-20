import { Mail, MapPin, Globe, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Edition */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo-unitins-quadrada.png"
                alt="UNITINS"
                className="w-10 h-10 object-contain rounded"
              />
              <div>
                <h3 className="font-extrabold text-white text-base">
                  X Mostra de C&T
                </h3>
                <p className="text-xs text-slate-400">
                  Câmpus Augustinópolis & Araguatins
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              A Mostra de Ciência e Tecnologia da Universidade Estadual do Tocantins é uma ação integrada à 23ª Semana Nacional de Ciência e Tecnologia (SNCT) e à Jornada de Iniciação Científica.
            </p>

            <div className="pt-2 text-xs text-[#38B6FF] font-semibold">
              Tema 2026: Ciência Delas
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre a X Mostra
                </a>
              </li>
              <li>
                <a href="#programacao" className="hover:text-white transition-colors">
                  Grade de Programação 2026
                </a>
              </li>
              <li>
                <a href="#palestrantes" className="hover:text-white transition-colors">
                  Palestrantes & Docentes
                </a>
              </li>
              <li>
                <a href="#noticias" className="hover:text-white transition-colors">
                  Notícias e Comunicados
                </a>
              </li>
              <li>
                <a href="#parceiros" className="hover:text-white transition-colors">
                  Realização e Parceiros
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Dúvidas Frequentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">
                  Locais & Como Chegar
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contato Institucional
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#38B6FF] shrink-0 mt-0.5" />
                <span>
                  Rua Planalto, 601 – Centro<br />
                  Augustinópolis – TO, CEP 77960-000
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <a href="mailto:pesquisa@unitins.br" className="hover:text-white transition-colors">
                  pesquisa@unitins.br
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#38B6FF] shrink-0" />
                <a
                  href="https://www.unitins.br/nPortal/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.unitins.br
                </a>
              </div>
            </div>
          </div>

          {/* Realization & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Fomento & Realização
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evento promovido pela Universidade Estadual do Tocantins (UNITINS), Pró-Reitoria de Pesquisa e Pós-Graduação (Propesp), com apoio do Ministério da Ciência, Tecnologia e Inovação (MCTI), CNPq, FAPT e Governo do Estado do Tocantins.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://www.unitins.br/Eventos/Inscricao/3200"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] px-3 py-2 rounded-lg transition-colors shadow-xs"
              >
                <span>Inscrever-se (Evento nº 3200)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="/assets/aistudio/Programa__o___X_Mostra_de_Ci_ncia_e_Tecnologia_da_Unitins_382808db.pdf"
                download="Programacao_X_Mostra_Ciencia_Tecnologia_Unitins_2026.pdf"
                className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition-colors"
              >
                <span>Baixar Documento PDF</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 Universidade Estadual do Tocantins (UNITINS). Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido para a X Mostra de Ciência e Tecnologia</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
