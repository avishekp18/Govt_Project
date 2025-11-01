// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import useUserLocation from '../hooks/useUserLocation';
// import { getDistrictFromCoords } from '../services/api';
// import DistrictSelector from '../components/DistrictSelector';

// function Home() {
//     const navigate = useNavigate();
//     const { setError } = useContext(AppContext);
//     const { getLocation } = useUserLocation();

//     const handleLocationClick = async () => {
//         try {
//             // 1. Get coords from the browser
//             const { latitude, longitude } = await getLocation();

//             // 2. Send coords to backend to get district name
//             const { districtName } = await getDistrictFromCoords(latitude, longitude);

//             // 3. Navigate to the dashboard for that district
//             navigate(`/district/${districtName}`);

//         } catch (err) {
//             console.error(err);
//             // Error is already set by the hook or API service
//             setError(err.message || 'लोकेशन से ज़िला नहीं मिल सका।');
//         }
//     };

//     return (
//         <div className="home-page">
//             <h2>MGNREGA प्रदर्शन</h2>
//             <p>अपने ज़िले की रिपोर्ट देखने के लिए, कृपया अपनी लोकेशन बताएँ या सूची से चुनें।</p>

//             <button className="location-button" onClick={handleLocationClick}>
//                 📍 मेरी लोकेशन का उपयोग करें
//             </button>

//             <div className="or-divider">--- या ---</div>

//             <DistrictSelector />
//         </div>
//     );
// }

// export default Home;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; // Import context
import useUserLocation from '../hooks/useUserLocation';
import { getDistrictFromCoords } from '../services/api';
import DistrictSelector from '../components/DistrictSelector';

// 1. Define all text in both languages
const content = {
    hi: {
        title: 'MGNREGA प्रदर्शन',
        subtitle: 'अपने ज़िले की रिपोर्ट देखने के लिए, कृपया अपनी लोकेशन बताएँ या सूची से चुनें।',
        locationButton: '📍 मेरी लोकेशन का उपयोग करें',
        divider: '--- या ---',
        error: 'लोकेशन से ज़िला नहीं मिल सका।'
    },
    en: {
        title: 'MGNREGA Performance',
        subtitle: 'To see your district\'s report, please use your location or select from the list.',
        locationButton: '📍 Use My Location',
        divider: '--- OR ---',
        error: 'Could not find district from location.'
    }
};

function Home() {
    const navigate = useNavigate();
    // 2. Get 'language' from context
    const { setError, language } = useContext(AppContext);
    const { getLocation } = useUserLocation();

    const handleLocationClick = async () => {
        try {
            // 1. Get coords from the browser
            const { latitude, longitude } = await getLocation();

            // 2. Send coords to backend to get district name
            const { districtName } = await getDistrictFromCoords(latitude, longitude);

            // 3. Navigate to the dashboard for that district
            navigate(`/district/${districtName}`);

        } catch (err) {
            console.error(err);
            // Error is already set by the hook or API service
            // 3. Use language-specific error message
            setError(err.message || content[language].error);
        }
    };

    // 4. Get the correct text based on the current language
    const pageText = content[language];

    return (
        <div className="home-page">
            {/* 5. Use variables for all text */}
            <h2>{pageText.title}</h2>
            <p>{pageText.subtitle}</p>

            <button className="location-button" onClick={handleLocationClick}>
                {pageText.locationButton}
            </button>

            <div className="or-divider">{pageText.divider}</div>

            {/* This component will also need to be updated to show */}
            {/* the placeholder text in the correct language. */}
            <DistrictSelector />
        </div>
    );
}

export default Home;