export function speakJapanese(text: string, slow = false): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = slow ? 0.78 : 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const jpVoice = voices.find(
      (v) => v.lang.includes('ja') || v.lang.includes('JP')
    );
    if (jpVoice) {
      utterance.voice = jpVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis errors on unsupported environments
  }
}
