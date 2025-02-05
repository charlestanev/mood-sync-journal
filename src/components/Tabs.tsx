import { useState } from "react";

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('add');

    return (
        <div role="tablist" className="tabs tabs-bordered mb-6 flex justify-center">
            <button
                role="tab"
                className={`tab px-6 py-2 rounded-md text-lg ${selectedTab === 'add' ? 'tab-active font-semibold bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedTab('add')}
            >
                Add Entry
            </button>
            <button
                role="tab"
                className={`tab px-6 py-2 rounded-md text-lg ${selectedTab === 'entries' ? 'tab-active font-semibold bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedTab('entries')}
            >
                Journal Entries
            </button>
        </div>
    );
};

export default Tabs;
