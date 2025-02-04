import { useState } from "react"

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('add');

    return (
        <>
            <div role="tablist" className="tabs tabs-boxed tabs-xl">
                <a
                    role="tab"
                    className={`tab ${selectedTab === 'add' ? 'tab-active font-bold' : ''}`}
                    onClick={() => setSelectedTab('add')}
                >Add Entry</a>
                <a role="tab"
                    className={`tab ${selectedTab === 'entries' ? 'tab-active font-bold' : ''}`}
                    onClick={() => setSelectedTab('entries')}
                >Journal Entries</a>
            </div>
        </>
    )

}

export default Tabs