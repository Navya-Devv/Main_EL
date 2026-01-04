"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useRef } from "react";
import { Mic, StopCircle, Loader2, Camera, CameraOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({ 
  mockInterviewQuestion, 
  activeQuestionIndex, 
  interviewData, 
  onAnswerSave,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const [faceConfidence, setFaceConfidence] = useState(0);
  
  // NEW: Track if models are actually loaded so we can trigger the loop
  const [modelsLoaded, setModelsLoaded] = useState(false);
  
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState(null);
  const [detectionActive, setDetectionActive] = useState(false);
  const rafRef = useRef(null);
  const smoothWindow = useRef([]);
  const detectIntervalRef = useRef(null);

  useEffect(() => {
    // Speech recognition setup
    if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      const recognition = recognitionRef.current;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript.trim()) {
          setUserAnswer(prev => (prev + ' ' + finalTranscript).trim());
        }
      };

      recognition.onerror = (event) => {
        // Ignore "no-speech" errors as they are common when pausing
        if (event.error !== 'no-speech') {
             toast.error(`Speech recognition error: ${event.error}`);
        }
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setIsRecording(false);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const EnableWebcam = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      setWebcamEnabled(true);
      toast.success("Webcam enabled successfully");
    } catch (error) {
      toast.error("Failed to enable webcam", {
        description: "Please check your camera permissions"
      });
      console.error("Webcam error:", error);
    }
  };

  const DisableWebcam = () => {
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
    setStream(null);
    setWebcamEnabled(false);
    
    // Cleanup detection
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
      detectIntervalRef.current = null;
    }
    setDetectionActive(false);
  };

  // Attach stream to the video element
  useEffect(() => {
    if (webcamEnabled && stream && webcamRef.current) {
      try {
        webcamRef.current.srcObject = stream;
        webcamRef.current.play().catch(() => {});
      } catch (err) {
        console.error("Failed to attach stream:", err);
      }
    }
  }, [webcamEnabled, stream]);

  // Load models
  useEffect(() => {
    let mounted = true;
    const loadModels = async () => {
      // Only load if not already loaded
      if (modelRef.current) {
        setModelsLoaded(true);
        return;
      }

      setModelLoading(true);
      try {
        const faceapi = await import('face-api.js');
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
        
        if (mounted) {
            modelRef.current = faceapi;
            setModelsLoaded(true); // FIX: Trigger the detection loop
            setModelLoading(false);
        }
      } catch (err) {
        if (mounted) {
            setModelLoading(false);
            setModelError(err?.message || String(err));
            console.error('Failed to load face-api models:', err);
        }
      }
    };

    if (webcamEnabled) {
      loadModels();
    }
    return () => { mounted = false; };
  }, [webcamEnabled]);

  // Detection Loop (Fix: Added modelsLoaded to dependency array)
  useEffect(() => {
    const detectOnce = async () => {
      try {
        if (!webcamEnabled || !webcamRef.current || !modelRef.current) return;
        
        const video = webcamRef.current;
        if (video.readyState < 2 || video.videoWidth === 0) return;

        // FIX: Increased inputSize to 320 for better detection
        const options = new modelRef.current.TinyFaceDetectorOptions({ 
            inputSize: 320, 
            scoreThreshold: 0.35 
        });
        
        const detections = await modelRef.current.detectAllFaces(video, options).withFaceLandmarks(true);

        const prob = (detections && detections.length > 0)
          ? detections[0].detection.score
          : 0;

        // Smoothing logic
        smoothWindow.current.push(prob);
        if (smoothWindow.current.length > 6) smoothWindow.current.shift();
        const avg = smoothWindow.current.reduce((a, b) => a + b, 0) / smoothWindow.current.length;
        
        setFaceConfidence(Number.isFinite(avg) ? avg : 0);

      } catch (err) {
        console.error('Face detect error:', err);
      }
    };

    // Only start if models are explicitly loaded
    if (webcamEnabled && modelsLoaded && stream) {
      // Run once immediately
      detectOnce();
      // Then run interval
      detectIntervalRef.current = setInterval(detectOnce, 300);
      setDetectionActive(true);
    }

    return () => {
      if (detectIntervalRef.current) {
        clearInterval(detectIntervalRef.current);
        detectIntervalRef.current = null;
      }
      setDetectionActive(false);
    };
  }, [webcamEnabled, stream, modelsLoaded]); // FIX: Re-run when modelsLoaded becomes true

  const StartStopRecording = () => {
    if (!recognitionRef.current) {
      toast.error("Speech-to-text not supported");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      toast.info("Recording stopped");
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info("Recording started");
    }
  };

  const UpdateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      toast.error("Please provide an answer");
      return;
    }

    setLoading(true);

    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating out of 10 and feedback on improvement in JSON format { "rating": <number>, "feedback": <text> }`;
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response.text().replace(/```json|```/g, '').trim();
      const JsonfeedbackResp = JSON.parse(mockJsonResp);

      const answerRecord = {
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonfeedbackResp?.feedback,
        rating: JsonfeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      };

      await db.insert(UserAnswer).values(answerRecord);

      onAnswerSave?.(answerRecord);

      toast.success("Answer recorded successfully");
      
      setUserAnswer("");
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } catch (error) {
      toast.error("Failed to save answer", {
        description: error.message
      });
      console.error("Answer save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col relative">
      {loading && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex flex-col justify-center items-center">
          <Loader2 className="h-16 w-16 animate-spin text-white mb-4" />
          <p className="text-white text-lg">Saving your answer...</p>
        </div>
      )}
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        {webcamEnabled ? (
          <video 
            ref={webcamRef} 
            autoPlay 
            muted // Added muted to ensure autoplay works reliably
            playsInline 
            className="w-[200px] h-[200px] object-cover rounded-lg"
          />
        ) : (
          <div className="w-[200px] h-[200px] flex justify-center items-center bg-gray-200 rounded-lg">
            <p className="text-gray-500">Webcam Disabled</p>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={webcamEnabled ? DisableWebcam : EnableWebcam}
        >
          {webcamEnabled ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Disable Webcam
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Enable Webcam
            </>
          )}
        </Button>

        {/* Confidence meter */}
        <div className="w-[200px] mt-3">
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, Math.round(faceConfidence * 100)))}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <span className="text-gray-200">Face confidence</span>
            <span className="font-medium">{Math.round(faceConfidence * 100)}%</span>
          </div>
          
          <div className="mt-2 text-xs">
            {modelLoading && <div className="text-yellow-300">Loading face model...</div>}
            {modelError && <div className="text-red-400">Model error: {modelError}</div>}
            {detectionActive ? (
                <div className="text-green-300">Detection running</div>
            ) : (
                webcamEnabled && !modelLoading && (
                    <div className="text-gray-400">Initializing detection...</div>
                )
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>

      <textarea
        className="w-full h-32 p-4 mt-4 border rounded-md text-gray-800"
        placeholder="Your answer will appear here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
    
      <Button
        className="mt-4"
        onClick={UpdateUserAnswer}
        disabled={loading || !userAnswer.trim()}
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
        ) : (
          "Save Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;