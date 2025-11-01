import React, { useContext } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
} from 'recharts';
import { AppContext } from '../context/AppContext';

// ------------------------------------------------------------------
// Bilingual strings (fallback to Hindi)
// ------------------------------------------------------------------
const i18n = {
    hi: {
        noData: 'पिछले महीनों का कोई डेटा नहीं है।',
        tooltipLabel: 'महीना',
        legendWork: 'काम आवंटित',
        legendWomen: 'महिलाएँ',
        voicePrompt: (month, value, metric) =>
            `${month} में ${metric} ${value} था।`,
    },
    en: {
        noData: 'No data for past months.',
        tooltipLabel: 'Month',
        legendWork: 'Work Allotted',
        legendWomen: 'Women Participation',
        voicePrompt: (month, value, metric) =>
            `In ${month}, ${metric} was ${value}.`,
    },
};

// ------------------------------------------------------------------
// Color palette – accessible, high‑contrast, works in dark mode
// ------------------------------------------------------------------
const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B']; // indigo → violet → pink → amber

function ChartView({ data, title }) {
    const { language } = useContext(AppContext);
    const t = i18n[language] || i18n.hi;

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300">
                {t.noData}
            </div>
        );
    }

    // --------------------------------------------------------------
    // Extract metric keys (everything except "month")
    // --------------------------------------------------------------
    const metricKeys = Object.keys(data[0]).filter((k) => k !== 'month');

    // --------------------------------------------------------------
    // Voice helper – reads the bar when user taps the tooltip
    // --------------------------------------------------------------
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = language === 'hi' ? 'hi-IN' : 'en-US';
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        }
    };

    // Custom Tooltip – bilingual + voice on click
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const metric = payload[0].name;
            const value = payload[0].value;
            const prompt = t.voicePrompt(label, value, metric);
            return (
                <div
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
                    onClick={() => speak(prompt)}
                    role="button"
                    tabIndex={0}
                    aria-label={prompt}
                >
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {t.tooltipLabel}: {label}
                    </p>
                    {payload.map((entry, i) => (
                        <p
                            key={i}
                            className="text-sm"
                            style={{ color: entry.color }}
                        >{`${entry.name}: ${entry.value}`}</p>
                    ))}
                    <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
                        Tap to listen
                    </p>
                </div>
            );
        }
        return null;
    };

    // --------------------------------------------------------------
    // Render
    // --------------------------------------------------------------
    return (
        <div className="chart-wrapper bg-white rounded-2xl p-5 shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-gray-800">
                {title}
            </h3>

            <div className="w-full h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                    >
                        {/* Axes – high contrast */}
                        <XAxis
                            dataKey="month"
                            stroke="#4B5563"
                            tick={{ fontSize: 14 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />
                        <YAxis
                            stroke="#4B5563"
                            tick={{ fontSize: 14 }}
                            axisLine={{ stroke: '#D1D5DB' }}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,70,229,0.1)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '12px' }}
                            iconType="rect"
                        />

                        {/* One Bar per metric */}
                        {metricKeys.map((key, idx) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                fill={COLORS[idx % COLORS.length]}
                                radius={[8, 8, 0, 0]}
                                barSize={30}
                            >
                                {/* Optional: per‑bar gradient */}
                                {data.map((_, i) => (
                                    <Cell key={`cell-${i}`} fill={COLORS[idx % COLORS.length]} />
                                ))}
                            </Bar>
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Voice‑on‑chart hint (optional) */}
            <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                {language === 'hi'
                    ? 'टूलटिप पर टैप करके सुनें'
                    : 'Tap tooltip to listen'}
            </p>
        </div>
    );
}

export default ChartView;