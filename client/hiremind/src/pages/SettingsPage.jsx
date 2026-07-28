import AccountSettings from "../components/settings/AccountSettings";
import PasswordSettings from "../components/settings/PasswordSettings";
import PreferenceSettings from "../components/settings/PreferenceSettings";
import DangerZone from "../components/settings/DangerZone";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

        <p className="mt-2 text-slate-500">
          Manage your account information and preferences.
        </p>
      </div>

      <AccountSettings />

      <PasswordSettings />

      <PreferenceSettings />

      <DangerZone />
    </div>
  );
};

export default SettingsPage;