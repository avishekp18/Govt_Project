import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Menu, X, Volume2 } from 'lucide-react';

function Header() {
    const { language, toggleLanguage } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = {
        hi: {
            title: 'MGNREGA डैशबोर्ड',
            langBtn: 'English',
            voicePrompt: 'MGNREGA डैशबोर्ड। भाषा बदलने के लिए बटन दबाएँ।'
        },
        en: {
            title: 'MGNREGA Dashboard',
            langBtn: 'हिन्दी',
            voicePrompt: 'MGNREGA Dashboard. Press button to change language.'
        }
    };

    const speak = () => {
        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(t[language].voicePrompt);
            utter.lang = language === 'hi' ? 'hi-IN' : 'en-US';
            window.speechSynthesis.speak(utter);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

                {/* === Logo + Title === */}
                <Link
                    to="/"
                    className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
                    onClick={speak}
                    aria-label={t[language].voicePrompt}
                >
                    {/* MGNREGA Logo (SVG) */}
                    <div className="bg-white/20 p-2 rounded-full">
                        <svg
                            className="w-7 h-7"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M12 2L2 7v10c0 5.55 4.48 10.91 10 12 5.52-1.09 10-6.45 10-12V7l-10-5z" />
                            <path d="M12 8v8m-4-4h8" />
                        </svg>
                    </div>

                    <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                        {t[language].title}
                    </h1>
                </Link>

                {/* === Desktop Nav === */}
                <nav className="hidden items-center gap-4 md:flex">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Change language"
                    >
                        <span>{t[language].langBtn}</span>
                        <Volume2 className="w-4 h-4" />
                    </button>
                </nav>

                {/* === Mobile Menu Button === */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* === Mobile Menu Dropdown === */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-white/20 bg-gradient-to-b from-indigo-700 to-blue-800">
                    <div className="container mx-auto px-4 py-3">
                        <button
                            onClick={() => {
                                toggleLanguage();
                                setIsMenuOpen(false);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            <span>{t[language].langBtn}</span>
                            <Volume2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;