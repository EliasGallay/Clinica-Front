import { Tab, Tabs } from '@mui/material';

export default function ContentCard({
  tabs,
  selectedTabIndex,
  onTabChange,
  children,
}: {
  tabs: { key: string; label: string }[];
  selectedTabIndex?: number;
  onTabChange?: (index: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 my-6">
      <div>
        <Tabs
          value={selectedTabIndex || 0}
          onChange={(_event, value) => onTabChange?.(value)}
          aria-label="content card tabs"
          sx={{ borderBottom: 1, borderColor: 'divider', '& .MuiTabs-list': { gap: 2 } }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} label={tab.label} />
          ))}
        </Tabs>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
