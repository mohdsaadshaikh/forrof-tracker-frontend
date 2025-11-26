import ImportantLinks from "@/components/setting/ImportantLinks";
import TermsCondition from "@/components/setting/Terms&Condition";
import { useState } from "react";

export default function Sitting() {
  const tabs = [
    { id: 1, label: "Terms and Conditions" },
    { id: 2, label: "Important Links" },
    { id: 3, label: "Report Issue" },
  ];

  const [active, setActive] = useState(2);

  return (
    <div className="w-full">
    
      <div className="relative border-b border-gray-200 w-[60%]">
        <div className="flex items-center gap-8 px-2">
          {tabs.map((tab) => (
           <button
  key={tab.id}
  onClick={() => setActive(tab.id)}
  className={`py-3 text-sm transition-colors ${
    active === tab.id
      ? "text-blue-900 font-semibold underline decoration-blue-900 underline-offset-17 decoration-2"
      : "text-gray-600"
  }`}
>
  {tab.label}
</button>
          
          ))}
        </div>

      
        
      </div>

      {/* Page Content */}
      <div className="mt-6 text-gray-700">
        {active === 1 && <p><TermsCondition/></p>}
        {active === 2 && <p><ImportantLinks/></p>}
        {active === 3 && <p>Report Issue Content…</p>}
      </div>
    </div>
  );
}
