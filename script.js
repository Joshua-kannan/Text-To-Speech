const speech = new SpeechSynthesisUtterance();
const voices = [];
const voiceSelect = document.querySelector("select");
const speakButton = document.querySelector("button");
const downloadButton = document.getElementById("downloadAudio");

// Function to speak the text
const speakText = () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
};

// Function to download the audio as an mp3 file
const downloadAudio = () => {
    const textToConvert = document.querySelector("textarea").value;

    // Make an API call to Google Text-to-Speech to generate the audio
    fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCjSG8frFYXpDf_LmHlUWFqec1Zjq4yKyI`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            input: {
                text: textToConvert,
            },
            voice: {
                languageCode: 'en-US',
                name: 'en-US-Wavenet-D',
            },
            audioConfig: {
                audioEncoding: 'MP3',
            },
        }),
    })
    .then(response => response.arrayBuffer())
    .then(audioData => {
        const blob = new Blob([audioData], { type: 'audio/mp3' });

        // Prompt the user for a file name
        const fileName = prompt("Enter a file name for the audio:", "audio.mp3");
        if (fileName !== null) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
};

// Event listener for the Listen button
speakButton.addEventListener("click", speakText);

// Event listener for the Download Audio button
downloadButton.addEventListener("click", downloadAudio);

// Event listener to populate voice options
window.speechSynthesis.onvoiceschanged = () => {
    voices.length = 0; // Clear the existing voices
    voices.push(...window.speechSynthesis.getVoices());
    voiceSelect.innerHTML = ""; // Clear the select box options

    voices.forEach((voice, i) => {
        const option = new Option(voice.name, i);
        voiceSelect.add(option);
    });

    speech.voice = voices[0]; // Set the initial voice
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});
