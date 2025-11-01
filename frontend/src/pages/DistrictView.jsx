// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import useDistrictData from '../hooks/useDistrictData';
// import DistrictCard from '../components/DistrictCard';
// import ChartView from '../components/ChartView';

// // Mock function to format history data for the chart
// // Your backend should ideally do this
// const formatHistoryForChart = (history) => {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     return history.map(item => ({
//         month: monthNames[item.month - 1] || 'N/A',
//         "Work Allotted": item.workAllotted,
//         "Payment Delay (Days)": item.avgPaymentDelayDays
//     })).reverse(); // Show oldest first
// };


// function DistrictView() {
//     const { name } = useParams(); // Get district name from URL (e.g., "Lucknow")
//     const { data, loading, error } = useDistrictData(name);

//     if (loading || !data) {
//         return null; // The global loader in App.jsx will handle this
//     }

//     if (error) {
//         return (
//             <div style={{ textAlign: 'center' }}>
//                 <p>डेटा लोड करने में विफल।</p>
//                 <Link to="/">वापस जाएँ</Link>
//             </div>
//         );
//     }

//     const { latest, history } = data;
//     const chartData = formatHistoryForChart(history);

//     // Format data for display
//     const workDemandValue = `${latest.workAllotted.toLocaleString('en-IN')} / ${latest.workDemanded.toLocaleString('en-IN')}`;

//     // Create the text for the audio player
//     const workDemandAudio = `काम की मांग: ${latest.workDemanded} लोगों ने काम मांगा, ${latest.workAllotted} लोगों को काम मिला।`;
//     const paymentDelayAudio = `पैसे का भुगतान: औसतन ${latest.avgPaymentDelayDays} दिन की देरी हुई।`;
//     const womenAudio = `महिलाओं की भागीदारी: कुल काम में ${latest.womenParticipationPercent} प्रतिशत महिलाएं थीं।`;

//     return (
//         <div className="district-view">
//             <div className="district-header">
//                 <h1>{latest.districtName}</h1>
//                 <h2>{latest.month} / {latest.year} की रिपोर्ट</h2>
//             </div>

//             {/* --- Key Metric Cards --- */}
//             <div className="card-grid">
//                 <DistrictCard
//                     title="काम की मांग (लोगों को मिला)"
//                     value={workDemandValue}
//                     icon="work"
//                     audioText={workDemandAudio}
//                 />
//                 <DistrictCard
//                     title="पैसे का भुगतान (औसत देरी)"
//                     value={`${latest.avgPaymentDelayDays} दिन`}
//                     icon="payment"
//                     audioText={paymentDelayAudio}
//                 />
//                 <DistrictCard
//                     title="महिलाओं की भागीदारी"
//                     value={`${latest.womenParticipationPercent}%`}
//                     icon="women"
//                     audioText={womenAudio}
//                 />
//             </div>

//             {/* --- Historical Chart --- */}
//             <ChartView
//                 data={chartData}
//                 title="पिछले 6 महीनों का प्रदर्शन"
//             />
//         </div>
//     );
// }

// export default DistrictView;

import React, { useContext } from 'react'; // Import useContext
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import the context
import useDistrictData from '../hooks/useDistrictData';
import DistrictCard from '../components/DistrictCard';
import ChartView from '../components/ChartView';

// 1. Create a content object for all text
const content = {
    hi: {
        error: 'डेटा लोड करने में विफल।',
        backLink: 'वापस जाएँ',
        report: 'की रिपोर्ट',
        card1Title: 'काम की मांग (लोगों को मिला)',
        card2Title: 'पैसे का भुगतान (औसत देरी)',
        card3Title: 'महिलाओं की भागीदारी',
        chartTitle: 'पिछले 6 महीनों का प्रदर्शन'
    },
    en: {
        error: 'Failed to load data.',
        backLink: 'Go Back',
        report: 'Report',
        card1Title: 'Work Demand (Allotted)',
        card2Title: 'Payment Delay (Avg)',
        card3Title: 'Women\'s Participation',
        chartTitle: 'Last 6 Months Performance'
    }
};

// Mock function (no changes)
const formatHistoryForChart = (history) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return history.map(item => ({
        month: monthNames[item.month - 1] || 'N/A',
        "Work Allotted": item.workAllotted,
        "Payment Delay (Days)": item.avgPaymentDelayDays
    })).reverse();
};

function DistrictView() {
    const { name } = useParams();
    const { data, loading, error } = useDistrictData(name);

    // 2. Get the language from the global context
    const { language } = useContext(AppContext);

    // 3. Select the correct text based on language
    const pageText = content[language];

    if (loading || !data) {
        return null;
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center' }}>
                {/* 4. Use language variable for text */}
                <p>{pageText.error}</p>
                <Link to="/">{pageText.backLink}</Link>
            </div>
        );
    }

    const { latest, history } = data;
    const chartData = formatHistoryForChart(history);

    const workDemandValue = `${latest.workAllotted.toLocaleString('en-IN')} / ${latest.workDemanded.toLocaleString('en-IN')}`;

    // 5. Create dynamic audio text for both languages
    const workDemandAudio = language === 'hi'
        ? `काम की मांग: ${latest.workDemanded} लोगों ने काम मांगा, ${latest.workAllotted} लोगों को काम मिला।`
        : `Work Demand: ${latest.workDemanded} people demanded work, ${latest.workAllotted} received work.`;

    const paymentDelayAudio = language === 'hi'
        ? `पैसे का भुगतान: औसतन ${latest.avgPaymentDelayDays} दिन की देरी हुई।`
        : `Payment Delay: An average delay of ${latest.avgPaymentDelayDays} days.`;

    const womenAudio = language === 'hi'
        ? `महिलाओं की भागीदारी: कुल काम में ${latest.womenParticipationPercent} प्रतिशत महिलाएं थीं।`
        : `Women's Participation: ${latest.womenParticipationPercent} percent of the total work was by women.`;

    return (
        <div className="district-view">
            <div className="district-header">
                <h1>{latest.districtName}</h1>
                {/* 6. Use language variables for headers */}
                <h2>{latest.month} / {latest.year} {pageText.report}</h2>
            </div>

            <div className="card-grid">
                <DistrictCard
                    title={pageText.card1Title}
                    value={workDemandValue}
                    icon="work"
                    audioText={workDemandAudio}
                    lang={language} // 7. Pass the language to the card
                />
                <DistrictCard
                    title={pageText.card2Title}
                    value={language === 'hi' ? `${latest.avgPaymentDelayDays} दिन` : `${latest.avgPaymentDelayDays} Days`}
                    icon="payment"
                    audioText={paymentDelayAudio}
                    lang={language} // 7. Pass the language to the card
                />
                <DistrictCard
                    title={pageText.card3Title}
                    value={`${latest.womenParticipationPercent}%`}
                    icon="women"
                    audioText={womenAudio}
                    lang={language} // 7. Pass the language to the card
                />
            </div>

            <ChartView
                data={chartData}
                title={pageText.chartTitle} // 8. Use language variable for chart
            />
        </div>
    );
}

export default DistrictView;