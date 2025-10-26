import { useEffect } from "react";
import { Activity, Pill, BarChart3, User, LogOut, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import ThemeToggle from "@/components/ThemeToggle";
import StatCard from "@/components/StatCard";
import MedicationCard from "@/components/MedicationCard";
import AddMedicationDialog from "@/components/AddMedicationDialog";
import AddMetricDialog from "@/components/AddMetricDialog";
import MetricChart from "@/components/MetricChart";
import EmptyState from "@/components/EmptyState";
import { api, ApiError } from "@/lib/api";
import { logout, getAuthUser, isAuthenticated } from "@/lib/auth";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import emptyMedImage from "@assets/generated_images/Empty_medication_list_illustration_050de3ea.png";
import emptyMetricImage from "@assets/generated_images/Empty_metrics_illustration_464528ed.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Activity },
  { title: "Medications", url: "/medications", icon: Pill },
  { title: "Health Metrics", url: "/metrics", icon: BarChart3 },
];

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const user = getAuthUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation("/login");
    }
  }, [setLocation]);

  const { data: medicationsData, isLoading: medicationsLoading, error: medicationsError, refetch: refetchMedications } = useQuery({
    queryKey: ['medications'],
    queryFn: async () => {
      const response = await api.getMedications();
      return response.data || [];
    },
  });

  const { data: metricsData, isLoading: metricsLoading, error: metricsError, refetch: refetchMetrics } = useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await api.getMetrics();
      return response.data || [];
    },
  });

  const { data: metricHistoryData, error: historyError } = useQuery({
    queryKey: ['metrics-history'],
    queryFn: async () => {
      const response = await api.getMetricHistory();
      return response.data || {};
    },
  });

  const addMedicationMutation = useMutation({
    mutationFn: (data: any) => api.addMedication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      toast({
        title: "Medication added",
        description: "Your medication has been added successfully",
      });
    },
    onError: (error: any) => {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Failed to add medication",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addMetricMutation = useMutation({
    mutationFn: (data: any) => api.addMetric(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metrics'] });
      queryClient.invalidateQueries({ queryKey: ['metrics-history'] });
      toast({
        title: "Metric added",
        description: "Your health metric has been recorded",
      });
    },
    onError: (error: any) => {
      if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Failed to add metric",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleAddMedication = (medication: any) => {
    addMedicationMutation.mutate(medication);
  };

  const handleAddMetric = (metric: any) => {
    addMetricMutation.mutate(metric);
  };

  const formatChartData = (history: any, type: string) => {
    if (!history || !history[type]) return [];
    
    return history[type].map((item: any) => ({
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: item.value || item.systolic,
    })).slice(-7);
  };

  const medications = medicationsData || [];
  const metrics = metricsData || [];
  
  const heartRateHistory = formatChartData(metricHistoryData, 'heart-rate');
  const bloodPressureHistory = formatChartData(metricHistoryData, 'blood-pressure');

  const latestHeartRate = metrics.find((m: any) => m.type === 'heart-rate');
  const latestBloodPressure = metrics.find((m: any) => m.type === 'blood-pressure');

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const currentPage = location.split('/')[1] || 'dashboard';

  if (!isAuthenticated()) {
    return null;
  }

  const isAuthError = (error: any) => error instanceof ApiError && (error.status === 401 || error.status === 403);

  const ErrorAlert = ({ error, onRetry }: { error: any; onRetry: () => void }) => {
    if (isAuthError(error)) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your session has expired. Redirecting to login...
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Failed to load data: {error?.message || 'Unknown error'}</span>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  };

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
                  <h1 className="text-4xl font-bold font-serif mb-2">
                    Welcome back, {user?.name || 'User'}
                  </h1>
                  <p className="text-muted-foreground">Here's your health overview for today</p>
                </div>

                {(medicationsError || metricsError) && !isAuthError(medicationsError) && !isAuthError(metricsError) && (
                  <ErrorAlert 
                    error={medicationsError || metricsError} 
                    onRetry={() => {
                      if (medicationsError) refetchMedications();
                      if (metricsError) refetchMetrics();
                    }}
                  />
                )}

                {(isAuthError(medicationsError) || isAuthError(metricsError)) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your session has expired. Redirecting to login...
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard 
                    title="Medications" 
                    value={medicationsError ? "--" : medications.length} 
                    icon={Pill} 
                    description="Active prescriptions" 
                  />
                  <StatCard 
                    title="Heart Rate" 
                    value={metricsError ? "--" : latestHeartRate ? `${latestHeartRate.value}` : "--"} 
                    icon={Activity} 
                    description={latestHeartRate ? latestHeartRate.unit : "No data"} 
                  />
                  <StatCard 
                    title="Blood Pressure" 
                    value={metricsError ? "--" : latestBloodPressure ? `${latestBloodPressure.systolic}/${latestBloodPressure.diastolic}` : "--"} 
                    icon={BarChart3} 
                    description={latestBloodPressure ? latestBloodPressure.unit : "No data"} 
                  />
                  <StatCard 
                    title="Metrics Tracked" 
                    value={metricsError ? "--" : metrics.length} 
                    icon={BarChart3} 
                    description="Total records" 
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Recent Medications</h2>
                      <AddMedicationDialog onAdd={handleAddMedication} />
                    </div>
                    {medicationsLoading ? (
                      <div className="text-center py-12 text-muted-foreground">Loading...</div>
                    ) : isAuthError(medicationsError) ? (
                      <div className="text-center py-12 text-muted-foreground">
                        Session expired. Redirecting...
                      </div>
                    ) : medicationsError ? (
                      <div className="text-center py-12">
                        <p className="text-destructive mb-4">Failed to load medications</p>
                        <Button onClick={() => refetchMedications()}>Retry</Button>
                      </div>
                    ) : medications.length > 0 ? (
                      <div className="space-y-4">
                        {medications.slice(0, 2).map((med: any) => (
                          <MedicationCard 
                            key={med._id} 
                            name={med.name}
                            dosage={med.dosage}
                            frequency={med.frequency}
                            instructions={med.instructions}
                          />
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
                      <AddMetricDialog onAdd={handleAddMetric} />
                    </div>
                    {metricsLoading ? (
                      <div className="text-center py-12 text-muted-foreground">Loading...</div>
                    ) : isAuthError(metricsError) || isAuthError(historyError) ? (
                      <div className="text-center py-12 text-muted-foreground">
                        Session expired. Redirecting...
                      </div>
                    ) : metricsError || historyError ? (
                      <div className="text-center py-12">
                        <p className="text-destructive mb-4">Failed to load metrics</p>
                        <Button onClick={() => refetchMetrics()}>Retry</Button>
                      </div>
                    ) : heartRateHistory.length > 0 ? (
                      <MetricChart title="" data={heartRateHistory} dataKey="value" />
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

                {medicationsError && !isAuthError(medicationsError) && <ErrorAlert error={medicationsError} onRetry={refetchMedications} />}
                {isAuthError(medicationsError) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your session has expired. Redirecting to login...
                    </AlertDescription>
                  </Alert>
                )}

                {medicationsLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading medications...</div>
                ) : isAuthError(medicationsError) ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Session expired. Redirecting...
                  </div>
                ) : medicationsError ? (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">Failed to load medications</p>
                    <Button onClick={() => refetchMedications()}>Retry</Button>
                  </div>
                ) : medications.length > 0 ? (
                  <div className="space-y-4">
                    {medications.map((med: any) => (
                      <MedicationCard 
                        key={med._id} 
                        name={med.name}
                        dosage={med.dosage}
                        frequency={med.frequency}
                        instructions={med.instructions}
                        onEdit={() => console.log('Edit', med._id)}
                        onDelete={() => console.log('Delete', med._id)}
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
                  <AddMetricDialog onAdd={handleAddMetric} />
                </div>

                {metricsError && !isAuthError(metricsError) && <ErrorAlert error={metricsError} onRetry={refetchMetrics} />}
                {isAuthError(metricsError) && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your session has expired. Redirecting to login...
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StatCard 
                    title="Latest Heart Rate" 
                    value={metricsError ? "--" : latestHeartRate ? `${latestHeartRate.value}` : "--"} 
                    icon={Activity} 
                    description={latestHeartRate ? `${latestHeartRate.unit} • ${new Date(latestHeartRate.date).toLocaleDateString()}` : "No data"} 
                  />
                  <StatCard 
                    title="Latest Blood Pressure" 
                    value={metricsError ? "--" : latestBloodPressure ? `${latestBloodPressure.systolic}/${latestBloodPressure.diastolic}` : "--"} 
                    icon={BarChart3} 
                    description={latestBloodPressure ? `${latestBloodPressure.unit} • ${new Date(latestBloodPressure.date).toLocaleDateString()}` : "No data"} 
                  />
                </div>

                {metricsLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading metrics...</div>
                ) : isAuthError(metricsError) || isAuthError(historyError) ? (
                  <div className="text-center py-12 text-muted-foreground">
                    Session expired. Redirecting...
                  </div>
                ) : (metricsError || historyError) ? (
                  <div className="text-center py-12">
                    <p className="text-destructive mb-4">Failed to load metrics</p>
                    <Button onClick={() => refetchMetrics()}>Retry</Button>
                  </div>
                ) : (heartRateHistory.length > 0 || bloodPressureHistory.length > 0) ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {heartRateHistory.length > 0 && (
                      <MetricChart title="Heart Rate History" data={heartRateHistory} dataKey="value" />
                    )}
                    {bloodPressureHistory.length > 0 && (
                      <MetricChart 
                        title="Blood Pressure Trend" 
                        data={bloodPressureHistory} 
                        dataKey="value"
                        color="hsl(var(--chart-2))"
                      />
                    )}
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
