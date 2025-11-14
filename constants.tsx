
import { Asset, Vulnerability, Severity, Status } from './types';

export const ASSETS: Asset[] = [
  { id: 'asset-1', name: 'api.secureeye.com', type: 'Domain' },
  { id: 'asset-2', name: 'Prod-DB-Server-01', type: 'Server' },
  { id: 'asset-3', name: 'Customer Portal', type: 'Application' },
  { id: 'asset-4', name: 'auth.secureeye.com', type: 'Domain' },
];

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'vuln-1',
    title: 'SQL Injection in Login Form',
    description: 'The user login form at /login is vulnerable to SQL injection via the `username` parameter. An attacker can bypass authentication by providing a crafted payload like `\' OR 1=1 --`.',
    severity: Severity.Critical,
    status: Status.Open,
    assetId: 'asset-4',
    discoveredAt: '2024-07-20T10:00:00Z',
  },
  {
    id: 'vuln-2',
    title: 'Cross-Site Scripting (XSS) in Search Results',
    description: 'The search functionality reflects user input without proper sanitization, leading to a stored XSS vulnerability. A malicious script can be injected into the search query, which then executes in the browsers of other users who view the search results page.',
    severity: Severity.High,
    status: Status.InProgress,
    assetId: 'asset-3',
    discoveredAt: '2024-07-18T14:30:00Z',
  },
  {
    id: 'vuln-3',
    title: 'Outdated Nginx Version on Web Server',
    description: 'The web server running on api.secureeye.com is using Nginx 1.18.0, which has several known security vulnerabilities (e.g., CVE-2021-23017). It should be updated to the latest stable version.',
    severity: Severity.Medium,
    status: Status.Open,
    assetId: 'asset-1',
    discoveredAt: '2024-07-15T09:00:00Z',
  },
  {
    id: 'vuln-4',
    title: 'Verbose Error Messages Reveal Internal Paths',
    description: 'When an unhandled exception occurs in the Customer Portal, the full stack trace, including internal file paths, is revealed to the user. This information could be useful to an attacker for further reconnaissance.',
    severity: Severity.Low,
    status: Status.Resolved,
    assetId: 'asset-3',
    discoveredAt: '2024-07-10T11:45:00Z',
  },
  {
    id: 'vuln-5',
    title: 'Missing Security Headers',
    description: 'The main domain is missing important security headers like Content-Security-Policy (CSP) and Strict-Transport-Security (HSTS), making it more susceptible to clickjacking and man-in-the-middle attacks.',
    severity: Severity.Medium,
    status: Status.Closed,
    assetId: 'asset-1',
    discoveredAt: '2024-06-25T16:00:00Z',
  },
];


export const ICONS = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    vulnerabilities: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 3.5c.3.3.5.7.5 1.1v1.4c0 .4-.2.8-.5 1.1l-1.5 1.5c-.6.6-1.5.6-2.1 0l-5.6-5.6c-.6-.6-.6-1.5 0-2.1l1.5-1.5c.3-.3.7-.5 1.1-.5h1.4c.4 0 .8.2 1.1.5l3.6 3.6z"/><path d="m10.5 9.5 6 6"/><path d="M19 12c-3.3 0-6 2.7-6 6v1a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-1c0-3.3-2.7-6-6-6zm-8 8h.5"/><path d="M8.5 20c-3.3 0-6-2.7-6-6v-1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1c0 3.3-2.7 6-6 6zm-2-8h.5"/></svg>,
    add: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
    assistant: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
    sun: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
    moon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
    logo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    send: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    spinner: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
};
