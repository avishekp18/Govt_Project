import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ICONS = {
    work: 'Farmer',
    payment: 'Rupee',
    women: 'Woman',
    default: 'Chart'
};

const content = {
    hi: {
        listen: 'सुनने के लिए टैप करें',
        playing: '...',
        ariaRead: 'पढ़ें',
        ariaTitle: 'शीर्षक',
        ariaValue: 'मान'
    },
    en: {
        listen: 'Tap to listen',
        playing: '...',
        ariaRead: 'Read',
        ariaTitle: 'Title',
        ariaValue: 'Value'
    }
};

function DistrictCard({ title, value, icon = 'default', audioText }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const { language } = useContext(AppContext);
    const t = content[language] || content.hi;

    // Speech helper
    const speak = (text) => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.9;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = utterance.onerror = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
    };

    const handleInteraction = () => speak(audioText);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${t.ariaRead}: ${t.ariaTitle} ${title}, ${t.ariaValue} ${value}`}
            className={`
        group relative flex flex-col items-center justify-center
        p-6 rounded-2xl bg-white shadow-lg
        transition-all duration-200 cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-indigo-200
        ${isPlaying ? 'ring-4 ring-indigo-500' : ''}
      `}
            onClick={handleInteraction}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleInteraction()}
        >
            {/* Icon */}
            <div className="mb-3 text-5xl">{ICONS[icon] || ICONS.default}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                {title}
            </h3>

            {/* Value */}
            <p className="mt-1 text-2xl font-bold text-indigo-600">{value}</p>

            {/* Voice Prompt */}
            <div
                className={`
          mt-3 flex items-center gap-2 text-sm font-medium
          ${isPlaying ? 'text-indigo-600' : 'text-gray-600'}
          group-hover:text-indigo-600 transition-colors
        `}
            >
                <span>{isPlaying ? t.playing : t.listen}</span>
                <svg
                    className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 12h14"
                    />
                </svg>
            </div>

            {/* Pulsing Indicator */}
            {isPlaying && (
                <div className="absolute inset-0 rounded-2xl border-4 border-indigo-500 animate-ping opacity-75 pointer-events-none" />
            )}
        </div>
    );
}

export default DistrictCard;