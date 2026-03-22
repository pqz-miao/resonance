import { Settings, History } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SettingsPanelHistory } from "./settings-panel-history";
import { SettingsPanelSettings } from "./settings-panel-settings";

const tabTriggerClassName =
  "flex-1 h-full gap-2 bg-transparent rounded-none border-x-0 border-t-0 border-b-px border-b-transparent shadow-none data-[state=active]:border-b-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none";

export const SettingsPanel = () => {
  return (
    <div className="hidden lg:flex flex-col w-105 min-h-0 border-l">
      <Tabs
        defaultValue="settings"
        className="flex flex-col h-full min-h-0 gap-y-0"
      >
        <TabsList className="w-full bg-transparent rounded-none border-b h-12 group-data-[orientation=horizontal]/tabs:h-12 p-0">
          <TabsTrigger value="settings" className={tabTriggerClassName}>
            <Settings className="size-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="history" className={tabTriggerClassName}>
            <History className="size-4" />
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="settings"
          className="flex-1 flex flex-col mt-0 min-h-0 overflow-y-auto"
        >
          <SettingsPanelSettings />
        </TabsContent>
        <TabsContent
          value="history"
          className="flex-1 flex flex-col mt-0 min-h-0 overflow-y-auto"
        >
          <SettingsPanelHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};
