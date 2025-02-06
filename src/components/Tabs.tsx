// Tabs.tsx - Enhanced with icons and better hover effects
import { useState } from "react";

interface Props {
    onSelectTab: (tab: string) => void;
}

const Tabs = ({ onSelectTab }: Props) => {
    const [selectedTab, setSelectedTab] = useState('add');

    const handleToggleTab = (selectedTab: string) => {
        setSelectedTab(selectedTab);
        onSelectTab(selectedTab);
    }

    return (
        <div className="tabs tabs-boxed bg-base-200 p-2 rounded-box mb-8">
            <button
                className={`tab tab-lg gap-2 ${selectedTab === 'add' ? 'tab-active !text-white bg-black-400' : ''}`}
                onClick={() => handleToggleTab('add')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Entry
            </button>
            <button
                className={`tab tab-lg gap-2 ${selectedTab === 'entries' ? 'tab-active !text-white' : ''}`}
                onClick={() => handleToggleTab('entries')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Entries
            </button>
        </div>
    );
};

export default Tabs;