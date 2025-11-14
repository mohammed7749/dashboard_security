
import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ASSETS, VULNERABILITIES, ICONS } from './constants';
import { Vulnerability, Asset, Severity, Status } from './types';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/Card';
import { Button } from './components/ui/Button';

type View = 'dashboard' | 'vulnerabilities' | 'analysis';

const SEVERITY_COLORS: Record<Severity, string> = {
    [Severity.Critical]: '#ef4444', // red-500
    [Severity.High]: '#f97316', // orange-500
    [Severity.Medium]: '#eab308', // yellow-500
    [Severity.Low]: '#22c55e', // green-500
    [Severity.Informational]: '#3b82f6', // blue-500
};

// Define components inside the file but outside the main App component to prevent re-creation on re-renders.
const Sidebar: React.FC<{ activeView: View; setView: (view: View) => void }> = ({ activeView, setView }) => {
    const navItems = [
        { id: 'dashboard' as View, label: 'Dashboard', icon: ICONS.dashboard },
        { id: 'vulnerabilities' as View, label: 'Vulnerabilities', icon: ICONS.vulnerabilities },
    ];

    return (
        <aside className="w-16 lg:w-64 bg-card dark:bg-dark-card border-r border-border dark:border-dark-border flex flex-col transition-all duration-300">
            <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-border dark:border-dark-border">
                <div className="flex items-center gap-2">
                    <span className="text-primary dark:text-dark-primary">{ICONS.logo}</span>
                    <h1 className="hidden lg:block text-xl font-bold">SecureEye</h1>
                </div>
            </div>
            <nav className="flex-1 px-2 lg:px-4 py-4">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setView(item.id)}
                                className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                                    activeView === item.id 
                                    ? 'bg-secondary dark:bg-dark-secondary text-primary dark:text-dark-primary' 
                                    : 'text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary/50 dark:hover:bg-dark-secondary/50'
                                }`}
                            >
                                {item.icon}
                                <span className="hidden lg:inline">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

const Header: React.FC<{isDark: boolean; toggleTheme: () => void;}> = ({ isDark, toggleTheme }) => {
    return (
        <header className="h-16 flex items-center justify-between px-6 bg-card dark:bg-dark-card border-b border-border dark:border-dark-border">
            <h2 className="text-lg font-semibold">Welcome, Security Analyst</h2>
            <div>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDark ? ICONS.sun : ICONS.moon}
                </Button>
            </div>
        </header>
    );
};

const VulnerabilityTable: React.FC<{ vulnerabilities: Vulnerability[]; onAnalyze: (vuln: Vulnerability) => void }> = ({ vulnerabilities, onAnalyze }) => {
    const getSeverityBadge = (severity: Severity) => {
        const colorClasses: Record<Severity, string> = {
            [Severity.Critical]: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
            [Severity.High]: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
            [Severity.Medium]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
            [Severity.Low]: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
            [Severity.Informational]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        };
        return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[severity]}`}>{severity}</span>;
    };
    
    return (
         <Card>
            <CardHeader>
                <CardTitle>All Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground dark:text-dark-muted-foreground uppercase bg-secondary dark:bg-dark-secondary">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Severity</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Discovered At</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vulnerabilities.map(v => (
                                <tr key={v.id} className="border-b border-border dark:border-dark-border hover:bg-secondary/50 dark:hover:bg-dark-secondary/50">
                                    <td className="px-6 py-4 font-medium">{v.title}</td>
                                    <td className="px-6 py-4">{getSeverityBadge(v.severity)}</td>
                                    <td className="px-6 py-4">{v.status}</td>
                                    <td className="px-6 py-4">{new Date(v.discoveredAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <Button variant="outline" size="sm" onClick={() => onAnalyze(v)}>
                                            Analyze with AI
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}

const App: React.FC = () => {
    const [isDark, setIsDark] = useState(false);
    const [view, setView] = useState<View>('dashboard');
    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(VULNERABILITIES);
    const [assets, setAssets] = useState<Asset[]>(ASSETS);
    const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    const handleAnalyze = (vulnerability: Vulnerability) => {
        setSelectedVulnerability(vulnerability);
        setView('analysis');
    };

    const dashboardData = useMemo(() => {
        const openCount = vulnerabilities.filter(v => v.status === Status.Open).length;
        const closedCount = vulnerabilities.filter(v => v.status === Status.Closed).length;
        const inProgressCount = vulnerabilities.filter(v => v.status === Status.InProgress).length;
        
        const severityCounts = vulnerabilities.reduce((acc, v) => {
            acc[v.severity] = (acc[v.severity] || 0) + 1;
            return acc;
        }, {} as Record<Severity, number>);

        const chartData = Object.entries(severityCounts).map(([name, value]) => ({
            name,
            count: value,
        }));

        return { openCount, closedCount, inProgressCount, chartData };
    }, [vulnerabilities]);

    const renderContent = () => {
        switch (view) {
            case 'vulnerabilities':
                return <VulnerabilityTable vulnerabilities={vulnerabilities} onAnalyze={handleAnalyze} />;
            case 'analysis':
                if (selectedVulnerability) {
                    return (
                        <div>
                            <Button variant="outline" onClick={() => setView('vulnerabilities')} className="mb-4">
                                &larr; Back to Vulnerabilities
                            </Button>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <Card className="lg:col-span-1">
                                    <CardHeader>
                                        <CardTitle>{selectedVulnerability.title}</CardTitle>
                                        <CardDescription>Asset: {assets.find(a => a.id === selectedVulnerability.assetId)?.name}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Severity:</strong> <span style={{ color: SEVERITY_COLORS[selectedVulnerability.severity] }}>{selectedVulnerability.severity}</span></p>
                                            <p><strong>Status:</strong> {selectedVulnerability.status}</p>
                                            <p><strong>Discovered:</strong> {new Date(selectedVulnerability.discoveredAt).toLocaleString()}</p>
                                            <p className="mt-4 pt-4 border-t border-border dark:border-dark-border"><strong>Description:</strong> {selectedVulnerability.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <div className="lg:col-span-2 h-[75vh]">
                                    <GeminiAssistant vulnerability={selectedVulnerability} />
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            case 'dashboard':
            default:
                return (
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader><CardTitle>Open Vulnerabilities</CardTitle></CardHeader>
                                <CardContent><p className="text-4xl font-bold">{dashboardData.openCount}</p></CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>In Progress</CardTitle></CardHeader>
                                <CardContent><p className="text-4xl font-bold">{dashboardData.inProgressCount}</p></CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle>Resolved This Month</CardTitle></CardHeader>
                                <CardContent><p className="text-4xl font-bold">{dashboardData.closedCount}</p></CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Vulnerability Severity Distribution</CardTitle>
                                <CardDescription>Overview of all vulnerabilities by severity level.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dashboardData.chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                                        <YAxis stroke="hsl(var(--muted-foreground))" />
                                        <Tooltip
                                            cursor={{ fill: 'hsla(var(--accent))' }}
                                            contentStyle={{ 
                                                backgroundColor: 'hsl(var(--background))',
                                                borderColor: 'hsl(var(--border))'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="count" name="Count" >
                                            {dashboardData.chartData.map((entry, index) => (
                                                <Bar key={`cell-${index}`} fill={SEVERITY_COLORS[entry.name as Severity]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <VulnerabilityTable vulnerabilities={vulnerabilities.slice(0, 5)} onAnalyze={handleAnalyze} />
                    </div>
                );
        }
    };

    return (
        <div className={`flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground font-sans`}>
            <Sidebar activeView={view} setView={setView} />
            <div className="flex-1 flex flex-col">
                <Header isDark={isDark} toggleTheme={toggleTheme} />
                <main className="flex-1 p-6 overflow-y-auto bg-secondary/50 dark:bg-dark-secondary/50">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
