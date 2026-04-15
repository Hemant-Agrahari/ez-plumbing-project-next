"use client"
import React, { useEffect, useState } from 'react'
import { RxSpeakerLoud, RxSpeakerOff } from 'react-icons/rx';

const TexttoSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        const handleSpeech = () => {
            if (isSpeaking) {
                const blogContent = document.querySelector('.blog-details'); // Select the specific element
                if (blogContent instanceof HTMLElement) { // Check if it's an HTMLElement
                    const textToSpeak = blogContent.innerText.trim();
                    const value = new SpeechSynthesisUtterance(textToSpeak);
                    value.rate = 0.5; // Adjust speech rate as needed
                    setUtterance(value);
                    window.speechSynthesis.speak(value);
                }
            } else {
                if (utterance) {
                    window.speechSynthesis.cancel();
                    setUtterance(null);
                }
            }
        };
        handleSpeech();

        // Cleanup function
        return () => {
            if (utterance) {
                window.speechSynthesis.cancel();
                setUtterance(null);
            }
        };
    }, [isSpeaking]);

    const toggleSpeech = () => {
        setIsSpeaking(!isSpeaking);
    };
    return (
        <>
            {isSpeaking ? <RxSpeakerOff className="sppker" size={32} onClick={toggleSpeech} /> : < RxSpeakerLoud className="sppker" size={32} onClick={toggleSpeech} />}
        </>
    )
}

export default TexttoSpeech