import { useState, useEffect } from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out',
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
                    style={{
                        transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '1s',
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
                    style={{
                        transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
                        transition: 'transform 0.3s ease-out',
                        animationDelay: '2s',
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center max-w-2xl">
                {/* 404 Number */}
                <div className="relative mb-8">
                    <h1
                        className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 select-none"
                        style={{
                            transform: `perspective(500px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
                            transition: 'transform 0.1s ease-out',
                        }}
                    >
                        404
                    </h1>
                    <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-600 opacity-20 blur-sm select-none">
                        404
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        The page you're looking for seems to have wandered off into the digital void.
                        Let's get you back on track.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        onClick={() => window.location.href = '/'}
                    >
                        <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Go Home
                    </button>

                    <button
                        className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>

            </div>

            <div className="absolute top-10 right-10 w-16 h-16 border-4 border-blue-400 rounded-lg opacity-20 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-20 left-10 w-12 h-12 border-4 border-blue-500 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute top-1/2 right-20 w-8 h-8 bg-blue-300 rounded-full opacity-30 animate-ping" />
        </div>
    );
}