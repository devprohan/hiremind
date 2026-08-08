const tabs = [
  "Overview",
  "Skills",
  "Suggestions",
  "Feedback",
];

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex w-full border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 px-6 pb-4 text-center font-medium transition ${
            activeTab === tab
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}