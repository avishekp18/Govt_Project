/**
 * Speaks a given text using the browser's Speech Synthesis.
 * @param {string} text - The text to be spoken.
 * @param {string} lang - The language code (e.g., 'hi-IN' for Hindi).
 */
export const speak = (text, lang = "hi-IN") => {
  // Stop any speech that is already in progress
  window.speechSynthesis.cancel();

  // Create a new speech utterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Set the language
  utterance.lang = lang;

  // Set other properties (optional)
  utterance.volume = 1; // 0 to 1
  utterance.rate = 1; // 0.1 to 10
  utterance.pitch = 1; // 0 to 2

  // Speak the text
  window.speechSynthesis.speak(utterance);
};
