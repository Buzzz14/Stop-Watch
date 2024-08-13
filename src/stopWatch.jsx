import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const [laps, setLaps] = useState([]);

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = Date.now() - elapsedTime;
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === ' ') {
                stop();
            }
        }
        document.body.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    function start() {
        setIsRunning(true);
    }

    function stop() {
        setIsRunning(false);
    }

    function lap() {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000) % 60;
        let milliseconds = Math.floor(elapsedTime % (1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        const lapTime = `${minutes}:${seconds}:${milliseconds}`;

        if (isRunning) {
            setLaps([...laps, lapTime]);
        }
    }

    function reset() {
        setIsRunning(false);
        setElapsedTime(0);
        setLaps([]);
    }

    function formatTime() {
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000) % 60;
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');
        milliseconds = String(milliseconds).padStart(2, '0');

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <div className="min-h-screen flex flex-col gap-16 items-center justify-center">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12 max-w-lg rounded-3xl flex flex-col items-center justify-center shadow-lg">
                <div className="text-6xl font-mono mb-8">
                    {formatTime()}
                </div>
                <div className="flex space-x-4 mb-8">
                    <button onClick={start} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start</button>
                    <button onClick={stop} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Stop</button>
                    <button onClick={reset} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Reset</button>
                    <button onClick={lap} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <i className="fa-solid fa-flag"></i>
                    </button>
                </div>
            </div>

            <div className="min-h-10 w-full max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg shadow">
                {laps.map((lap, index) => (
                    <div key={index} className="py-2 border-b last:border-none">
                        {lap}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StopWatch;
