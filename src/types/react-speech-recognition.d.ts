declare module 'react-speech-recognition' {
  export interface SpeechRecognitionConfig {
    continuous?: boolean;
    language?: string;
    onResult?: (transcript: string) => void;
    onError?: (error: { error: string; message: string }) => void;
  }

  export function useSpeechRecognition(config?: SpeechRecognitionConfig): {
    transcript: string;
    resetTranscript: () => void;
    listening: boolean;
  };

  export function startListening(arg0: {
    continuous: boolean;
    language: string;
  }) {
    throw new Error('Function not implemented.');
  }

  export function stopListening() {
    throw new Error('Function not implemented.');
  }

  export function browserSupportsSpeechRecognition(): boolean {
    throw new Error('Function not implemented.');
  }
}
