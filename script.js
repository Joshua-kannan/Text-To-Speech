let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Function to speak the text
const speakText = () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
};

// Function to download the audio as an mp3 file
const downloadAudio = () => {
    // Create a new Blob containing the audio data
    const blob = new Blob([speech.text], { type: 'audio/mpeg' });

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);

    // Prompt the user for a file name
    const fileName = prompt("Enter a file name for the audio:", "audio.mp3");
    if (fileName !== null) {
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};

// Event listener for the Listen button
document.querySelector("button").addEventListener("click", speakText);

// Event listener for the Download Audio button
document.querySelector("#downloadAudio").addEventListener("click", downloadAudio);

// Event listener to populate voice options
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});
