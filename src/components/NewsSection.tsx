import { useState } from "react";
import { Newspaper, ExternalLink, Calendar, ChevronRight } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  url: string;
  imageUrl: string;
}

export default function NewsSection() {
  const newsList: NewsArticle[] = [
    {
      id: "news-1",
      title: "UNITINS abre inscrições para as 18 oficinas da X Mostra de Ciência e Tecnologia em Augustinópolis e Araguatins",
      category: "Inscrições & Ensino",
      date: "15 de Outubro de 2026",
      summary: "Estudantes e profissionais da saúde, educação e ciências sociais já podem garantir vagas gratuitas para as atividades com simulação realística e laboratórios.",
      url: "https://www.unitins.br/nPortal/",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-2",
      title: "23ª Semana Nacional de Ciência e Tecnologia: 'Ciência Delas' pauta a abertura solene com pesquisadoras convidadas",
      category: "Pesquisa & Inovação",
      date: "12 de Outubro de 2026",
      summary: "Roda de conversa debaterá a integração de Saúde, Justiça e Inovação Territorial para transformar o Bico do Papagaio e valorizar mulheres cientistas.",
      url: "https://semanact.mcti.gov.br/",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-3",
      title: "Complexo de Ciências da Saúde (CCS) sedia oficinas avançadas de traqueostomia, intubação e combate a bactérias resistentes",
      category: "Saúde & Medicina",
      date: "10 de Outubro de 2026",
      summary: "Com manequins anatômicos e laboratórios de microbiologia, acadêmicos de Medicina e Enfermagem terão vivência prática intensiva de UTI e emergência.",
      url: "https://www.unitins.br/nPortal/",
      imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "news-4",
      title: "Propesp publica Edital nº 07/2026 de submissão de trabalhos para a X Mostra de Ciência e Tecnologia",
      category: "Edital & Submissão",
      date: "08 de Outubro de 2026",
      summary: "Normas para resumos simples e banners nas áreas de Ciências da Saúde, Sociais Aplicadas e Humanas, com publicação nos Anais oficiais e premiação de Destaque Científico.",
      url: "https://www.unitins.br/Concursos/Publico/Home/Categoria?c=Editais%20de%20Pesquisa",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="noticias" className="py-20 lg:py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
              Notícias & Comunicados
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Acompanhe as novidades da X Mostra
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Informações sobre ensalamento, credenciamento, horários de visitação aos pôsteres e cobertura institucional da UNITINS.
            </p>
          </div>

          <a
            href="https://www.unitins.br/nPortal/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#083D77] hover:underline"
          >
            <span>Ver Portal Unitins</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsList.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[11px] font-bold text-[#083D77]">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#083D77] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#083D77] hover:underline"
                >
                  <span>Ler notícia completa</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
