import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  IncidentReport,
  UserRole,
  ActiveTab,
  SchoolConfig,
  LearnerProgress,
  ReportStatus,
  ReportCategory,
  UrgencyLevel,
  InterventionNote,
  AuditLog,
  AccessCode,
  SchoolSupportContact,
  SystemAnnouncement,
  SystemActivityLog,
  AuthSession,
  ThemeMode,
} from '../types';
import {
  INITIAL_REPORTS,
  INITIAL_SCHOOL_CONFIG,
  INITIAL_ACCESS_CODES,
  INITIAL_SUPPORT_CONTACTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ACTIVITY_LOGS,
  ADMIN_CREDENTIALS,
} from '../data/initialData';

interface TugonContextType {
  // Theme
  themeMode: ThemeMode;
  toggleThemeMode: () => void;

  // Navigation & Role Access
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  authSession: AuthSession;
  userRole: UserRole;

  // Authentication
  loginAsAdmin: (password: string, email?: string) => { success: boolean; error?: string };
  loginAsCPC: (email: string, accessCode: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Access Codes Management (Admin)
  accessCodes: AccessCode[];
  generateAccessCode: (data: {
    holderName: string;
    registeredEmail: string;
    role: 'CPC' | 'SSLG';
    assignedTitle: string;
    notes?: string;
  }) => string;
  updateAccessCodeStatus: (id: string, status: 'active' | 'deactivated' | 'revoked') => void;
  deleteAccessCode: (id: string) => void;

  // School Support Contacts Management (Admin & Directory)
  supportContacts: SchoolSupportContact[];
  addSupportContact: (contact: Omit<SchoolSupportContact, 'id'>) => void;
  updateSupportContact: (contact: SchoolSupportContact) => void;
  deleteSupportContact: (id: string) => void;

  // Announcements Management (Admin)
  announcements: SystemAnnouncement[];
  addAnnouncement: (ann: Omit<SystemAnnouncement, 'id' | 'date'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Activity Logs (Admin Audit Trail)
  activityLogs: SystemActivityLog[];
  logSystemActivity: (action: string, details: string) => void;

  // Reports
  reports: IncidentReport[];
  addReport: (
    newReport: Omit<
      IncidentReport,
      'id' | 'referenceNumber' | 'status' | 'interventionNotes' | 'auditLogs' | 'createdAt' | 'updatedAt'
    >
  ) => string;
  updateReportStatus: (reportId: string, status: ReportStatus, note?: string) => void;
  addInterventionNote: (reportId: string, note: Omit<InterventionNote, 'id' | 'timestamp'>) => void;
  assignReport: (reportId: string, assigneeName: string, role: string) => void;
  getReportByRef: (refNumber: string) => IncidentReport | undefined;

  // School configuration
  schoolConfig: SchoolConfig;
  updateSchoolConfig: (config: SchoolConfig) => void;

  // Learner Learning Progress
  progress: LearnerProgress;
  markModuleCompleted: (moduleId: string) => void;
  recordQuizScore: (moduleId: string, score: number) => void;
  saveCertificateName: (name: string) => void;

  // Modals
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  isTrackModalOpen: boolean;
  setIsTrackModalOpen: (open: boolean) => void;
  isEmergencyModalOpen: boolean;
  setIsEmergencyModalOpen: (open: boolean) => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
  selectedReportForView: IncidentReport | null;
  setSelectedReportForView: (report: IncidentReport | null) => void;

  // Utilities
  resetDemoData: () => void;
}

const TugonContext = createContext<TugonContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'project_tugon_theme_v2',
  REPORTS: 'project_tugon_reports_v2',
  CONFIG: 'project_tugon_config_v2',
  PROGRESS: 'project_tugon_progress_v2',
  ACCESS_CODES: 'project_tugon_access_codes_v2',
  CONTACTS: 'project_tugon_contacts_v2',
  ANNOUNCEMENTS: 'project_tugon_announcements_v2',
  ACTIVITY_LOGS: 'project_tugon_activity_logs_v2',
  AUTH: 'project_tugon_auth_v2',
};

export const TugonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: defaults to 'light' for first-time visitors as specified!
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return 'light';
  });

  // Auth Session state: defaults to STUDENT
  const [authSession, setAuthSession] = useState<AuthSession>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isAuthenticated: false,
      role: 'STUDENT',
    };
  });

  const userRole = authSession.role;

  // Navigation
  const [activeTab, setActiveTabState] = useState<ActiveTab>('home');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedReportForView, setSelectedReportForView] = useState<IncidentReport | null>(null);

  // Core Data States with localStorage persistence
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_REPORTS;
  });

  const [accessCodes, setAccessCodes] = useState<AccessCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCESS_CODES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ACCESS_CODES;
  });

  const [supportContacts, setSupportContacts] = useState<SchoolSupportContact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SUPPORT_CONTACTS;
  });

  const [announcements, setAnnouncements] = useState<SystemAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ANNOUNCEMENTS;
  });

  const [activityLogs, setActivityLogs] = useState<SystemActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ACTIVITY_LOGS;
  });

  const [schoolConfig, setSchoolConfig] = useState<SchoolConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SCHOOL_CONFIG;
  });

  const [progress, setProgress] = useState<LearnerProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      completedModuleIds: ['mod-ra10627'],
      quizScores: { 'mod-ra10627': 100 },
      certificateName: 'Juan Dela Cruz',
      certificateEarnedDate: '2026-11-05',
    };
  });

  // Apply theme class to HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, themeMode);
    } catch (e) {}
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(authSession));
    } catch (e) {}
  }, [authSession]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {}
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_CODES, JSON.stringify(accessCodes));
    } catch (e) {}
  }, [accessCodes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(supportContacts));
    } catch (e) {}
  }, [supportContacts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
    } catch (e) {}
  }, [announcements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(activityLogs));
    } catch (e) {}
  }, [activityLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(schoolConfig));
    } catch (e) {}
  }, [schoolConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (e) {}
  }, [progress]);

  // Activity logger
  const logSystemActivity = (action: string, details: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const actor = authSession.user?.email || 'Student/Public';
    const actorRole = authSession.role;

    const newLog: SystemActivityLog = {
      id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: nowStr,
      actor,
      actorRole: actorRole === 'STUDENT' ? 'SYSTEM' : actorRole,
      action,
      details,
    };

    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Secure Route / View Enforcement
  const setActiveTab = (targetTab: ActiveTab) => {
    // Backend/State Level Permission Guarding:
    // Students can access 'home', 'report', 'prevent', 'support'.
    // Students must NOT access 'respond', 'admin', or confidential monitoring.
    if (userRole === 'STUDENT') {
      if (targetTab === 'respond') {
        alert('Access Denied: TUGON: RESPOND contains confidential case records and is restricted to verified Child Protection Committee (CPC) personnel.');
        setIsAuthModalOpen(true);
        return;
      }
      if (targetTab === 'admin') {
        alert('Access Denied: Administrator Dashboard requires System Administrator authentication.');
        setIsAuthModalOpen(true);
        return;
      }
    }

    if (userRole === 'CPC') {
      if (targetTab === 'admin') {
        alert('Access Denied: Only the System Administrator can manage access codes, user accounts, and system settings.');
        return;
      }
    }

    setActiveTabState(targetTab);
  };

  // Authentication Handlers
  const loginAsAdmin = (password: string, emailInput?: string): { success: boolean; error?: string } => {
    const email = emailInput?.trim() || ADMIN_CREDENTIALS.email;

    if (password !== ADMIN_CREDENTIALS.password) {
      logSystemActivity('Failed Admin Login Attempt', `Invalid password entered for ${email}`);
      return { success: false, error: 'Invalid administrator credentials. Access denied.' };
    }

    const session: AuthSession = {
      isAuthenticated: true,
      role: 'ADMIN',
      user: {
        name: ADMIN_CREDENTIALS.name,
        email: ADMIN_CREDENTIALS.email,
        title: ADMIN_CREDENTIALS.title,
      },
      sessionToken: `adm-token-${Date.now()}`,
    };

    setAuthSession(session);
    setActiveTabState('admin');
    setIsAuthModalOpen(false);

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newLog: SystemActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: nowStr,
      actor: ADMIN_CREDENTIALS.email,
      actorRole: 'ADMIN',
      action: 'Admin Session Authenticated',
      details: 'Administrator logged into system management workspace',
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    return { success: true };
  };

  const loginAsCPC = (email: string, accessCodeInput: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = accessCodeInput.trim().toUpperCase();

    const matchedCode = accessCodes.find(
      (c) => c.registeredEmail.toLowerCase() === cleanEmail && c.code.toUpperCase() === cleanCode
    );

    if (!matchedCode) {
      logSystemActivity('Failed CPC Login Attempt', `Unmatched code or email: ${cleanEmail}`);
      return {
        success: false,
        error: 'Authentication failed. Please verify that your registered DepEd email matches your assigned access code.',
      };
    }

    if (matchedCode.status === 'revoked') {
      logSystemActivity('Revoked Access Code Attempt', `Attempt with revoked code ${matchedCode.code} by ${cleanEmail}`);
      return {
        success: false,
        error: 'This access code has been REVOKED by the Administrator. Access terminated under school security policy.',
      };
    }

    if (matchedCode.status === 'deactivated') {
      logSystemActivity('Deactivated Access Code Attempt', `Attempt with deactivated code ${matchedCode.code} by ${cleanEmail}`);
      return {
        success: false,
        error: 'This account or access code is currently DEACTIVATED. Please contact the System Administrator to reactivate.',
      };
    }

    // Role check: SSLG members must NOT access confidential case records
    if (matchedCode.role === 'SSLG') {
      logSystemActivity('SSLG Case Access Blocked', `SSLG representative ${cleanEmail} attempted to access confidential records`);
      return {
        success: false,
        error: 'SSLG Student Representative Notice: Student council members are not authorized to access confidential case records under DepEd Child Protection Policy.',
      };
    }

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Update last login date
    setAccessCodes((prev) =>
      prev.map((c) => (c.id === matchedCode.id ? { ...c, lastLoginDate: nowStr } : c))
    );

    const session: AuthSession = {
      isAuthenticated: true,
      role: 'CPC',
      user: {
        name: matchedCode.holderName,
        email: matchedCode.registeredEmail,
        title: matchedCode.assignedTitle,
        accessCodeId: matchedCode.id,
      },
      sessionToken: `cpc-token-${Date.now()}`,
    };

    setAuthSession(session);
    setActiveTabState('respond');
    setIsAuthModalOpen(false);

    const newLog: SystemActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: nowStr,
      actor: matchedCode.registeredEmail,
      actorRole: 'CPC',
      action: 'CPC Session Authenticated',
      details: `Authorized login using access code ${matchedCode.code} (${matchedCode.assignedTitle})`,
    };
    setActivityLogs((prev) => [newLog, ...prev]);

    return { success: true };
  };

  const logout = () => {
    const actor = authSession.user?.email || 'User';
    const actorRole = authSession.role;

    setAuthSession({
      isAuthenticated: false,
      role: 'STUDENT',
    });
    setActiveTabState('home');

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newLog: SystemActivityLog = {
      id: `act-${Date.now()}`,
      timestamp: nowStr,
      actor,
      actorRole: actorRole === 'STUDENT' ? 'SYSTEM' : actorRole,
      action: 'Session Terminated',
      details: 'User logged out and returned to student public view',
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Access Code Management by Administrator
  const generateAccessCode = (data: {
    holderName: string;
    registeredEmail: string;
    role: 'CPC' | 'SSLG';
    assignedTitle: string;
    notes?: string;
  }): string => {
    const prefix = data.role === 'CPC' ? 'CPC' : 'SSLG';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const codeString = `${prefix}-${randomDigits}-RNHS-${year}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newCode: AccessCode = {
      id: `code-${Date.now()}`,
      code: codeString,
      registeredEmail: data.registeredEmail.trim().toLowerCase(),
      holderName: data.holderName.trim(),
      role: data.role,
      assignedTitle: data.assignedTitle.trim(),
      status: 'active',
      issuedDate: nowStr.split(' ')[0],
      notes: data.notes?.trim() || undefined,
    };

    setAccessCodes((prev) => [newCode, ...prev]);
    logSystemActivity(
      'Access Code Generated',
      `Issued ${codeString} to ${data.registeredEmail} (${data.assignedTitle})`
    );

    return codeString;
  };

  const updateAccessCodeStatus = (id: string, status: 'active' | 'deactivated' | 'revoked') => {
    setAccessCodes((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        logSystemActivity(
          `Access Code ${status.toUpperCase()}`,
          `Access code ${c.code} for ${c.registeredEmail} was marked ${status}`
        );
        return { ...c, status };
      })
    );
  };

  const deleteAccessCode = (id: string) => {
    const target = accessCodes.find((c) => c.id === id);
    if (target) {
      logSystemActivity(
        'Access Code Deleted',
        `Deleted access code record ${target.code} (${target.registeredEmail})`
      );
    }
    setAccessCodes((prev) => prev.filter((c) => c.id !== id));
  };

  // Support Contacts Management
  const addSupportContact = (contactData: Omit<SchoolSupportContact, 'id'>) => {
    const newContact: SchoolSupportContact = {
      ...contactData,
      id: `cont-${Date.now()}`,
    };
    setSupportContacts((prev) => [...prev, newContact]);
    logSystemActivity('Support Contact Added', `Added ${contactData.name} (${contactData.roleTitle})`);
  };

  const updateSupportContact = (contact: SchoolSupportContact) => {
    setSupportContacts((prev) => prev.map((c) => (c.id === contact.id ? contact : c)));
    logSystemActivity('Support Contact Updated', `Updated details for ${contact.name}`);
  };

  const deleteSupportContact = (id: string) => {
    const target = supportContacts.find((c) => c.id === id);
    if (target) {
      logSystemActivity('Support Contact Removed', `Deleted directory entry for ${target.name}`);
    }
    setSupportContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Announcements Management
  const addAnnouncement = (annData: Omit<SystemAnnouncement, 'id' | 'date'>) => {
    const nowStr = new Date().toISOString().split('T')[0];
    const newAnn: SystemAnnouncement = {
      ...annData,
      id: `ann-${Date.now()}`,
      date: nowStr,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    logSystemActivity('Announcement Published', `Title: ${annData.title}`);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    logSystemActivity('Announcement Removed', `Removed announcement id ${id}`);
  };

  // Report Handling
  const addReport = (
    newReportData: Omit<
      IncidentReport,
      'id' | 'referenceNumber' | 'status' | 'interventionNotes' | 'auditLogs' | 'createdAt' | 'updatedAt'
    >
  ): string => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const refNumber = `TUGON-2026-${randomDigits}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const initialAudit: AuditLog = {
      timestamp: nowStr,
      action: newReportData.isAnonymous ? 'Anonymous Report submitted' : 'Confidential Report submitted',
      user: 'Public Web Portal',
    };

    const newReport: IncidentReport = {
      ...newReportData,
      id: `rep-${Date.now()}`,
      referenceNumber: refNumber,
      status: 'new',
      interventionNotes: [],
      auditLogs: [initialAudit],
      createdAt: nowStr,
      updatedAt: nowStr,
    };

    setReports((prev) => [newReport, ...prev]);
    logSystemActivity(
      'New Grievance Submitted',
      `Reference ${refNumber} logged in category ${newReportData.category}`
    );

    return refNumber;
  };

  const updateReportStatus = (reportId: string, newStatus: ReportStatus, noteText?: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const actor = authSession.user?.name || (userRole === 'ADMIN' ? 'Administrator' : 'CPC Officer');

    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;

        const updatedAudit: AuditLog = {
          timestamp: nowStr,
          action: `Status changed to ${newStatus.replace('_', ' ').toUpperCase()}`,
          user: actor,
        };

        const updatedNotes = [...r.interventionNotes];
        if (noteText) {
          updatedNotes.push({
            id: `note-${Date.now()}`,
            timestamp: nowStr,
            author: actor,
            authorRole: userRole,
            actionType: 'assessment',
            note: noteText,
          });
        }

        return {
          ...r,
          status: newStatus,
          updatedAt: nowStr,
          interventionNotes: updatedNotes,
          auditLogs: [updatedAudit, ...r.auditLogs],
        };
      })
    );

    logSystemActivity(
      'Report Status Updated',
      `Case ${reportId} updated to ${newStatus} by ${actor}`
    );
  };

  const addInterventionNote = (
    reportId: string,
    noteData: Omit<InterventionNote, 'id' | 'timestamp'>
  ) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newNote: InterventionNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      timestamp: nowStr,
    };

    const newAudit: AuditLog = {
      timestamp: nowStr,
      action: `Intervention log recorded (${noteData.actionType.replace('_', ' ')})`,
      user: noteData.author,
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        return {
          ...r,
          interventionNotes: [...r.interventionNotes, newNote],
          auditLogs: [newAudit, ...r.auditLogs],
          updatedAt: nowStr,
        };
      })
    );

    logSystemActivity(
      'Case Intervention Documented',
      `Case ${reportId}: ${noteData.actionType} by ${noteData.author}`
    );
  };

  const assignReport = (reportId: string, assigneeName: string, roleTitle: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const actor = authSession.user?.name || 'Case Officer';

    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== reportId) return r;
        const newAudit: AuditLog = {
          timestamp: nowStr,
          action: `Assigned case to ${assigneeName} (${roleTitle})`,
          user: actor,
        };
        return {
          ...r,
          assignedTo: assigneeName,
          assignedRole: roleTitle,
          status: r.status === 'new' ? 'under_assessment' : r.status,
          updatedAt: nowStr,
          auditLogs: [newAudit, ...r.auditLogs],
        };
      })
    );

    logSystemActivity('Case Assigned', `Case ${reportId} assigned to ${assigneeName}`);
  };

  const getReportByRef = (refNumber: string) => {
    const clean = refNumber.trim().toUpperCase();
    return reports.find((r) => r.referenceNumber.toUpperCase() === clean);
  };

  const updateSchoolConfig = (newConfig: SchoolConfig) => {
    setSchoolConfig(newConfig);
    logSystemActivity('School Settings Modified', `Updated school credentials and CPC leadership`);
  };

  const markModuleCompleted = (moduleId: string) => {
    setProgress((prev) => {
      if (prev.completedModuleIds.includes(moduleId)) return prev;
      return {
        ...prev,
        completedModuleIds: [...prev.completedModuleIds, moduleId],
      };
    });
  };

  const recordQuizScore = (moduleId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      completedModuleIds: prev.completedModuleIds.includes(moduleId)
        ? prev.completedModuleIds
        : [...prev.completedModuleIds, moduleId],
      quizScores: {
        ...prev.quizScores,
        [moduleId]: score,
      },
    }));
  };

  const saveCertificateName = (name: string) => {
    const today = new Date().toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setProgress((prev) => ({
      ...prev,
      certificateName: name,
      certificateEarnedDate: today,
    }));
  };

  const resetDemoData = () => {
    setReports(INITIAL_REPORTS);
    setSchoolConfig(INITIAL_SCHOOL_CONFIG);
    setAccessCodes(INITIAL_ACCESS_CODES);
    setSupportContacts(INITIAL_SUPPORT_CONTACTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setProgress({
      completedModuleIds: ['mod-ra10627'],
      quizScores: { 'mod-ra10627': 100 },
      certificateName: 'Juan Dela Cruz',
      certificateEarnedDate: '2026-11-05',
    });
    setAuthSession({
      isAuthenticated: false,
      role: 'STUDENT',
    });
    setActiveTabState('home');
    localStorage.clear();
  };

  return (
    <TugonContext.Provider
      value={{
        themeMode,
        toggleThemeMode,
        activeTab,
        setActiveTab,
        authSession,
        userRole,
        loginAsAdmin,
        loginAsCPC,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        accessCodes,
        generateAccessCode,
        updateAccessCodeStatus,
        deleteAccessCode,
        supportContacts,
        addSupportContact,
        updateSupportContact,
        deleteSupportContact,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        activityLogs,
        logSystemActivity,
        reports,
        addReport,
        updateReportStatus,
        addInterventionNote,
        assignReport,
        getReportByRef,
        schoolConfig,
        updateSchoolConfig,
        progress,
        markModuleCompleted,
        recordQuizScore,
        saveCertificateName,
        isQrModalOpen,
        setIsQrModalOpen,
        isTrackModalOpen,
        setIsTrackModalOpen,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isConfigModalOpen,
        setIsConfigModalOpen,
        selectedReportForView,
        setSelectedReportForView,
        resetDemoData,
      }}
    >
      {children}
    </TugonContext.Provider>
  );
};

export const useTugon = () => {
  const context = useContext(TugonContext);
  if (!context) {
    throw new Error('useTugon must be used within a TugonProvider');
  }
  return context;
};
