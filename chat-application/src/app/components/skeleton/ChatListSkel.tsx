import React from 'react';

const ChatListSkel: React.FC = () => {
    return (
        <div className="animate-pulse space-y-4 p-4">
            {Array.from({ length: 1 }).map((_, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatListSkel;