/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import CienciaDelasSection from "./components/CienciaDelasSection";
import ScheduleSection from "./components/ScheduleSection";
import SpeakersSection from "./components/SpeakersSection";
import NewsSection from "./components/NewsSection";
import PartnersSection from "./components/PartnersSection";
import FaqSection from "./components/FaqSection";
import LocationSection from "./components/LocationSection";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import BookmarksDrawer from "./components/BookmarksDrawer";
import { Speaker, ALL_SPEAKERS } from "./data/scheduleData";
import { Check, Mail, X } from "lucide-react";

export default function App() {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("unitins_mostra_bookmarks_2026");
      return saved ? JSON.parse(saved) : ["act-1", "act-10"];
    } catch {
      return ["act-1", "act-10"];
    }
  });

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [activeSpeakerModal, setActiveSpeakerModal] = useState<Speaker | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("unitins_mostra_bookmarks_2026", JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error("Failed to save bookmarks to localStorage", e);
    }
  }, [bookmarkedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
      showToast("Atividade removida do seu roteiro");
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
      showToast("Atividade salva no seu roteiro!");
    }
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds([]);
    showToast("Todas as atividades foram removidas do seu roteiro");
  };

  const handleSelectSpeaker = (speaker: Speaker) => {
    setActiveSpeakerModal(speaker);
  };

  const handleExploreSchedule = () => {
    const el = document.getElementById("programacao");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-[#38B6FF]/30 selection:text-[#083D77]">
      {/* Top Header */}
      <Header
        bookmarkedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onExploreSchedule={handleExploreSchedule}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />
        <About />
        <CienciaDelasSection
          onExploreCienciaDelas={handleExploreSchedule}
        />
        <ScheduleSection
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectSpeaker={handleSelectSpeaker}
        />
        <SpeakersSection
          onSelectActivityFromSpeaker={(activityId) => {
            const el = document.getElementById("programacao");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <NewsSection />
        <PartnersSection />
        <FaqSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Bookmarks / Personal Itinerary Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedIds={bookmarkedIds}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Speaker Details Modal */}
      {activeSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95">
            <button
              type="button"
              onClick={() => setActiveSpeakerModal(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4 mb-4">
              <img
                src={activeSpeakerModal.photoUrl}
                alt={activeSpeakerModal.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#083D77] block mb-0.5">
                  Palestrante / Mediador
                </span>
                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  {activeSpeakerModal.name}
                </h3>
                <p className="text-xs text-[#083D77] font-semibold">
                  {activeSpeakerModal.role}
                </p>
                <p className="text-[11px] text-slate-500">
                  {activeSpeakerModal.institution}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {activeSpeakerModal.email ? (
                <a
                  href={`mailto:${activeSpeakerModal.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#083D77] font-semibold hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{activeSpeakerModal.email}</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400">Palestrante Oficial</span>
              )}

              <button
                type="button"
                onClick={() => setActiveSpeakerModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium py-3 px-4 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
