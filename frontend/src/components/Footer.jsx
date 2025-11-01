import React, { useContext } from 'react'; // 1. Import useContext
import { AppContext } from '../context/AppContext'; // 2. Import the context

// 3. Define all text in both languages
const content = {
    hi: {
        text: 'डेटा data.gov.in से प्राप्त'
    },
    en: {
        text: 'Data sourced from data.gov.in'
    }
};

function Footer() {
    const currentYear = new Date().getFullYear();

    // 4. Get language from context
    const { language } = useContext(AppContext);
    const pageText = content[language] || content['en']; // Default to English

    return (

        <footer className="w-full bg-gray-100 p-4 text-center mt-auto">
            <p className="text-sm text-gray-600">
                &copy; {currentYear} | {pageText.text}
            </p>
            <a
                href="https://avishekpradhan.netlify.app/" // <-- THIS IS THE FIX
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer" // Security for new tabs
                className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-blue-700"
            >
                {language === 'hi' ? 'संपर्क' : 'My PortFolio'}
            </a>
        </footer>
    );
}

export default Footer;