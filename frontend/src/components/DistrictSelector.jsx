import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getStateDistricts } from '../services/api';
import Select from 'react-select';
import { Search, MapPin, Volume2 } from 'lucide-react';

// Language content
const content = {
    hi: {
        placeholder: 'अपना ज़िला चुनें...',
        label: 'ज़िला चुनें',
        searchPlaceholder: 'ज़िला खोजें...',
        noOptions: 'कोई ज़िला नहीं मिला',
        voicePrompt: 'ज़िला चुनने के लिए नीचे स्क्रॉल करें और टैप करें'
    },
    en: {
        placeholder: 'Select your district...',
        label: 'Select District',
        searchPlaceholder: 'Search district...',
        noOptions: 'No districts found',
        voicePrompt: 'Scroll and tap to select your district'
    }
};

function DistrictSelector() {
    const [districts, setDistricts] = useState([]);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const { language } = useContext(AppContext);
    const t = content[language];

    // Fetch districts
    useEffect(() => {
        const fetchDistricts = async () => {
            const districtList = await getStateDistricts("uttar-pradesh");
            const options = districtList.map(name => ({
                value: name,
                label: name
            }));
            setDistricts(options);
        };
        fetchDistricts();
    }, []);

    // Handle selection
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        if (selectedOption) {
            navigate(`/district/${selectedOption.value}`);
        }
    };

    // Voice prompt on focus
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    };

    // Custom styles for react-select with Tailwind-like feel
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '60px',
            borderRadius: '12px',
            border: state.isFocused ? '2px solid #4F46E5' : '2px solid #D1D5DB',
            boxShadow: state.isFocused ? '0 0 0 3px rgba(79, 70, 229, 0.1)' : 'none',
            fontSize: '1.125rem',
            fontWeight: '500',
            paddingLeft: '12px',
            transition: 'all 0.2s ease',
            '&:hover': {
                borderColor: '#4F46E5'
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#6B7280',
            fontSize: '1.1rem'
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: '1.125rem',
            color: '#1F2937'
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '12px',
            marginTop: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
        }),
        option: (provided, state) => ({
            ...provided,
            padding: '14px 16px',
            fontSize: '1.1rem',
            backgroundColor: state.isSelected ? '#4F46E5' : state.isFocused ? '#EEF2FF' : 'white',
            color: state.isSelected ? 'white' : '#1F2937',
            cursor: 'pointer'
        }),
        noOptionsMessage: (provided) => ({
            ...provided,
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#6B7280'
        })
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Header with Icon & Voice */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-100 p-3 rounded-full">
                        <MapPin className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {t.label}
                    </h2>
                </div>
                <button
                    onClick={() => speak(t.voicePrompt)}
                    className="p-3 bg-green-100 rounded-full hover:bg-green-200 transition-colors"
                    aria-label="Play voice instructions"
                >
                    <Volume2 className="w-6 h-6 text-green-600" />
                </button>
            </div>

            {/* Searchable Select */}
            <div className="relative">
                <Select
                    instanceId="district-select"
                    options={districts}
                    value={selected}
                    onChange={handleChange}
                    placeholder={t.placeholder}
                    isSearchable
                    styles={customStyles}
                    className="text-lg"
                    inputId="district-input"
                    aria-label={t.label}
                    noOptionsMessage={() => t.noOptions}
                    components={{
                        DropdownIndicator: () => (
                            <div className="pr-4">
                                <Search className="w-5 h-5 text-gray-500" />
                            </div>
                        ),
                        IndicatorSeparator: null
                    }}
                />
            </div>

            {/* Helper Text */}
            <p className="mt-4 text-center text-sm text-gray-600 font-medium">
                {language === 'hi'
                    ? 'अपने ज़िले का नाम टाइप करें या नीचे से चुनें'
                    : 'Type your district name or choose from below'
                }
            </p>
        </div>
    );
}

export default DistrictSelector;