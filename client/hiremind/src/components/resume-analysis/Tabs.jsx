const tabs = [
  "Overview",
  "Skills",
  "Suggestions",
  "Feedback",
  "Matched Jobs",
];

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-8 border-b mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-4 font-medium transition ${
            activeTab === tab
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500 hover:text-purple-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}