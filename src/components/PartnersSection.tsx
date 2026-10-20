import { ExternalLink } from "lucide-react";

export default function PartnersSection() {
  const partners = [
    {
      name: "UNITINS - Universidade Estadual do Tocantins",
      category: "Realização",
      logo: "/logos/logo-unitins.png",
      href: "https://www.unitins.br/",
    },
    {
      name: "Governo do Estado do Tocantins",
      category: "Apoio Institucional",
      logo: "/logos/logo-gov-to.png",
      href: "https://www.to.gov.br/",
    },
    {
      name: "MCTI - Ministério da Ciência, Tecnologia e Inovação",
      category: "Fomento Federal",
      logo: "/logos/logo-mcti.png",
      href: "https://www.gov.br/mcti/pt-br",
    },
    {
      name: "SNCT - Semana Nacional de Ciência e Tecnologia",
      category: "Programa Nacional",
      logo: "/logos/logo-snct.png",
      href: "https://semanact.mcti.gov.br/",
    },
    {
      name: "CNPq - Conselho Nacional de Desenvolvimento Científico",
      category: "Fomento à Pesquisa",
      logo: "/logos/logo-cnpq.png",
      href: "https://www.gov.br/cnpq/pt-br",
    },
    {
      name: "FAPT - Fundação de Amparo à Pesquisa do Tocantins",
      category: "Fomento Estadual",
      logo: "/logos/logo-fapt.png",
      href: "https://www.to.gov.br/fapt",
    },
    {
      name: "Pop Ciência - Popularização da Ciência",
      category: "Difusão Científica",
      logo: "/logos/logo-pop.png",
      href: "https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/popciencia",
    },
    {
      name: "Sebrae Tocantins",
      category: "Empreendedorismo",
      logo: "/logos/logo-sebrae.png",
      href: "https://sebrae.com.br/sites/PortalSebrae/ufs/to",
    },
    {
      name: "UAB - Universidade Aberta do Brasil",
      category: "Educação a Distância",
      logo: "/logos/logo-uab.png",
      href: "https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/educacao-a-distancia/universidade-aberta-do-brasil",
    },
  ];

  return (
    <section id="parceiros" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#083D77]">
            Realização & Apoio Institucional
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Instituições Parceiras e Órgãos de Fomento
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            A X Mostra de Ciência e Tecnologia é realizada pela Universidade Estadual do Tocantins com apoio de ministérios, agências e fundações de pesquisa.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="p-5 bg-slate-50/80 hover:bg-white rounded-xl border border-slate-200/90 hover:border-[#083D77]/40 transition-all flex flex-col items-center justify-center text-center group h-36"
              title={p.name}
            >
              <div className="h-14 w-full flex items-center justify-center mb-2">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-12 max-w-[130px] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-[#083D77] transition-colors">
                {p.category}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
