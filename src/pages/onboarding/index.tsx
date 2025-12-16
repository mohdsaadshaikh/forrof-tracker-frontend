import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  useGetOnboardingData,
  useCompleteOnboarding,
} from "@/hooks/useOnboarding";
import AboutTab from "./tabs/AboutTab";
import PersonalTab from "./tabs/PersonalTab";
import ExperienceTab from "./tabs/ExperienceTab";
import SkillsTab from "./tabs/SkillsTab";
import EducationTab from "./tabs/EducationTab";
import { Loader2, User, Briefcase, Code, GraduationCap } from "lucide-react";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { data: onboardingData, isLoading } = useGetOnboardingData();
  const { mutate: completeOnboarding, isPending: isCompleting } =
    useCompleteOnboarding();
  const [activeTab, setActiveTab] = useState("personal");
  const [isCurrentTabValid, setIsCurrentTabValid] = useState(false);

  const handleCompleteOnboarding = () => {
    completeOnboarding(undefined, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-brand" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Tab configuration with icons
  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "about", label: "About", icon: Briefcase },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const progressPercentage = ((currentTabIndex + 1) / tabs.length) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to Forrof
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's complete your professional profile. This helps us better
            connect you with opportunities and team members.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-brand">
              Step {currentTabIndex + 1} of {tabs.length}
            </span>
            <span className="text-sm font-semibold text-brand">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-linear-to-r from-brand/60 to-brand/90 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Enhanced Tab List */}
            <div className="border-b bg-linear-to-r from-brand/5 to-brand/10 ">
              <TabsList className="grid w-full grid-cols-5 gap-1 bg-transparent h-auto px-3 py-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? "text-brand"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Tab Contents with padding */}
            <div className="p-8 min-h-96">
              <TabsContent value="personal" className="mt-0">
                <PersonalTab onValidationChange={setIsCurrentTabValid} />
              </TabsContent>

              <TabsContent value="about" className="mt-0">
                <AboutTab
                  data={onboardingData}
                  onValidationChange={setIsCurrentTabValid}
                />
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <ExperienceTab
                  data={onboardingData}
                  onValidationChange={setIsCurrentTabValid}
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                <SkillsTab
                  data={onboardingData}
                  onValidationChange={setIsCurrentTabValid}
                />
              </TabsContent>

              <TabsContent value="education" className="mt-0">
                <EducationTab
                  data={onboardingData}
                  onValidationChange={setIsCurrentTabValid}
                />
              </TabsContent>
            </div>
          </Tabs>

          {/* Enhanced Navigation Buttons */}
          <div className="flex justify-between px-8 py-6 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={() => {
                const prevIdx = currentTabIndex - 1;
                if (prevIdx >= 0) {
                  setActiveTab(tabs[prevIdx].id);
                }
              }}
              disabled={activeTab === "personal"}
              className="font-medium"
            >
              ← Previous
            </Button>

            <div className="text-center text-xs text-gray-500">
              {tabs.map((tab) => (
                <span
                  key={tab.id}
                  className={`inline-block w-2 h-2 rounded-full mx-1 transition-colors ${
                    activeTab === tab.id ? "bg-brand" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {activeTab !== "education" ? (
              <Button
                onClick={() => {
                  const nextIdx = currentTabIndex + 1;
                  if (nextIdx < tabs.length) {
                    setActiveTab(tabs[nextIdx].id);
                  }
                }}
                disabled={!isCurrentTabValid}
              >
                Next →
              </Button>
            ) : (
              <Button
                onClick={handleCompleteOnboarding}
                disabled={isCompleting}
                className="bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-medium"
              >
                {isCompleting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Completing...
                  </>
                ) : (
                  "✓ Complete Profile"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
