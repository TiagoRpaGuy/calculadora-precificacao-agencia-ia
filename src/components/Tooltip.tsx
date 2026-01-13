import React, { ReactNode } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    content: string;
    children?: ReactNode;
    className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className = "" }) => {
    return (
        <div className={`relative group inline-flex items-center ${className}`}>
            {children ? children : <HelpCircle className="w-4 h-4 text-gray-400 cursor-help hover:text-purple-500 transition-colors" />}

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 z-50">
                <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs p-3 rounded-lg shadow-xl border border-white/10 relative">
                    {content}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900/90"></div>
                </div>
            </div>
        </div>
    );
};
