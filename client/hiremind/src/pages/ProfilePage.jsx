import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfoCard from "../components/profile/ProfileInfoCard";

import RecentActivityCard from "../components/profile/RecentActivityCard";
import ResumeStatsCard from "../components/profile/ResumeStatsCard";
import StatsCard from "../components/profile/StatsCard";
import SkillsGapCard from "../components/profile/SkillsGapCard";

const profile = {
  name: "Ashwini Hedau",
  email: "ashwini@example.com",
  role: "Software Engineering Student",
  joined: "July 2026",
};

const stats = {
  resumes: 12,
  highestATS: 92,
  averageATS: 84,
  analyses: 15,
};

const ProfilePage = () => {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal information and resume statistics.
        </p>
      </div>

      <ProfileHeader profile={profile} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileInfoCard profile={profile} />
        <ResumeStatsCard stats={stats} />



       
      </div>
      <SkillsGapCard />
       <RecentActivityCard />
    </div>
  );
};

export default ProfilePage;