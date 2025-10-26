import { useState } from "react";
import { Activity, Pill, BarChart3, User, LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import StatCard from "@/components/StatCard";
import MedicationCard from "@/components/MedicationCard";
import AddMedicationDialog from "@/components/AddMedicationDialog";
import AddMetricDialog from "@/components/AddMetricDialog";
import MetricChart from "@/components/MetricChart";
import EmptyState from "@/components/EmptyState";
import emptyMedImage from "@assets/generated_images/Empty_medication_list_illustration_050de3ea.png";
import emptyMetricImage from "@assets/generated_images/Empty_metrics_illustration_464528ed.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Activity },
  { title: "Medications", url: "/medications", icon: Pill },
  { title: "Health Metrics", url: "/metrics", icon: BarChart3 },
];

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Ibuprofen",
      dosage: "200mg",
      frequency: "Twice a day",
      instructions: "Take with food",
    },
    {
      id: "2",
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Once daily",
      instructions: "Take in the morning",
    },
  ]);

  const [metrics] = useState([
    { date: "Oct 22", value: 72 },
    { date: "Oct 23", value: 75 },
    { date: "Oct 24", value: 70 },
    { date: "Oct 25", value: 73 },
    { date: "Oct 26", value: 75 },
  ]);

  const handleLogout = () => {
    console.log('Logging out');
    setLocation("/");
  };

  const handleAddMedication = (medication: any) => {
    setMedications([...medications, { ...medication, id: Date.now().toString() }]);
  };

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const currentPage = location.split('/')[1] || 'dashboard';

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-6 border-b">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold font-serif">HealthTrack</span>
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        data-active={location === item.url}
                        className="data-[active=true]:bg-sidebar-accent"
                      >
                        <a href={item.url} onClick={(e) => { e.preventDefault(); setLocation(item.url); }}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="mt-auto p-4 border-t">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/profile" onClick={(e) => { e.preventDefault(); console.log('Profile clicked'); }}>
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} data-testid="button-logout">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-8">
            {currentPage === 'dashboard' && (
              <div className="max-w-7xl mx-auto space-y-8">
                <div>
                  <h1 className="text-4xl font-bold font-serif mb-2">Welcome back, John</h1>
                  <p className="text-muted-foreground">Here's your health overview for today</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Medications" value={medications.length} icon={Pill} description="Active prescriptions" />
                  <StatCard title="Heart Rate" value="75" icon={Activity} description="Last: Today" />
                  <StatCard title="Blood Pressure" value="120/80" icon={BarChart3} description="mmHg" />
                  <StatCard title="Metrics Tracked" value="12" icon={BarChart3} description="This month" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Recent Medications</h2>
                      <AddMedicationDialog onAdd={handleAddMedication} />
                    </div>
                    {medications.length > 0 ? (
                      <div className="space-y-4">
                        {medications.slice(0, 2).map((med) => (
                          <MedicationCard key={med.id} {...med} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        title="No medications yet"
                        description="Start tracking your medications"
                        image={emptyMedImage}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Heart Rate Trend</h2>
                      <AddMetricDialog onAdd={(metric) => console.log('Metric added:', metric)} />
                    </div>
                    {metrics.length > 0 ? (
                      <MetricChart title="" data={metrics} dataKey="value" />
                    ) : (
                      <EmptyState
                        title="No metrics recorded"
                        description="Start tracking your health metrics"
                        image={emptyMetricImage}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'medications' && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold font-serif mb-2">Medications</h1>
                    <p className="text-muted-foreground">Manage your prescriptions and dosages</p>
                  </div>
                  <AddMedicationDialog onAdd={handleAddMedication} />
                </div>

                {medications.length > 0 ? (
                  <div className="space-y-4">
                    {medications.map((med) => (
                      <MedicationCard 
                        key={med.id} 
                        {...med}
                        onEdit={() => console.log('Edit', med.id)}
                        onDelete={() => {
                          console.log('Delete', med.id);
                          setMedications(medications.filter(m => m.id !== med.id));
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No medications added yet"
                    description="Start tracking your medications by adding your first one"
                    image={emptyMedImage}
                    actionLabel="Add Medication"
                    onAction={() => console.log('Add medication')}
                  />
                )}
              </div>
            )}

            {currentPage === 'metrics' && (
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl font-bold font-serif mb-2">Health Metrics</h1>
                    <p className="text-muted-foreground">Track and visualize your vital signs</p>
                  </div>
                  <AddMetricDialog onAdd={(metric) => console.log('Metric added:', metric)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatCard title="Latest Heart Rate" value="75" icon={Activity} description="bpm • Today" />
                  <StatCard title="Latest Blood Pressure" value="120/80" icon={BarChart3} description="mmHg • Today" />
                </div>

                {metrics.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MetricChart title="Heart Rate History" data={metrics} dataKey="value" />
                    <MetricChart 
                      title="Blood Pressure Trend" 
                      data={[
                        { date: "Oct 22", value: 118 },
                        { date: "Oct 23", value: 120 },
                        { date: "Oct 24", value: 119 },
                        { date: "Oct 25", value: 121 },
                        { date: "Oct 26", value: 120 },
                      ]} 
                      dataKey="value"
                      color="hsl(var(--chart-2))"
                    />
                  </div>
                ) : (
                  <EmptyState
                    title="No metrics recorded yet"
                    description="Start tracking your health metrics like heart rate and blood pressure"
                    image={emptyMetricImage}
                    actionLabel="Add Metric"
                    onAction={() => console.log('Add metric')}
                  />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
