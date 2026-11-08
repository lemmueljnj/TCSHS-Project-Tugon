export type UserRole = 'ADMIN' | 'CPC' | 'STUDENT';

export type ThemeMode = 'light' | 'dark';

export type ReportCategory = 
  | 'bullying' 
  | 'cyberbullying' 
  | 'physical_violence' 
  | 'verbal_harassment' 
  | 'school_safety';

export type ReportStatus = 
  | 'new' 
  | 'under_assessment' 
  | 'referred' 
  | 'for_followup' 
  | 'resolved' 
  | 'closed';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface InterventionNote {
  id: string;
  timestamp: string;
  author: string;
  authorRole: string;
  actionType: 'assessment' | 'counseling' | 'parent_conference' | 'peer_mediation' | 'referral' | 'safety_plan' | 'resolution';
  note: string;
}

export interface AuditLog {
  timestamp: string;
  action: string;
  user: string;
}

export interface IncidentReport {
  id: string;
  referenceNumber: string;
  category: ReportCategory;
  urgency: UrgencyLevel;
  incidentDate: string;
  incidentTime: string;
  location: string;
  description: string;
  personsInvolved?: string;
  witnesses?: string;
  isAnonymous: boolean;
  reporterName?: string;
  reporterContact?: string;
  reporterGradeSection?: string;
  reporterRole?: 'victim' | 'bystander' | 'parent_guardian' | 'concerned_peer';
  evidenceFiles?: string[];
  status: ReportStatus;
  assignedTo?: string;
  assignedRole?: string;
  interventionNotes: InterventionNote[];
  auditLogs: AuditLog[];
  createdAt: string;
  updatedAt: string;
}

export interface AccessCode {
  id: string;
  code: string;
  registeredEmail: string;
  holderName: string;
  role: 'CPC' | 'SSLG';
  assignedTitle: string;
  status: 'active' | 'deactivated' | 'revoked';
  issuedDate: string;
  lastLoginDate?: string;
  notes?: string;
}

export interface SchoolSupportContact {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  email: string;
  phone: string;
  roomLocation: string;
  isCPC: boolean;
}

export interface SystemAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'advisory' | 'training' | 'alert';
  body: string;
  author: string;
  isPinned: boolean;
}

export interface SystemActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: 'ADMIN' | 'CPC' | 'SYSTEM';
  action: string;
  details: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  role: UserRole;
  user?: {
    name: string;
    email: string;
    title: string;
    accessCodeId?: string;
  };
  sessionToken?: string;
}

export interface SchoolConfig {
  schoolName: string;
  schoolId: string;
  division: string;
  region: string;
  schoolAddress: string;
  contactNumber: string;
  emergencyHotline: string;
  schoolEmail: string;
  guidanceOfficeLocation: string;
  cpcChairperson: string;
  guidanceCounselor: string;
  prefectOfDiscipline: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ScenarioChoice {
  text: string;
  feedback: string;
  isUpstander: boolean;
}

export interface InteractiveScenario {
  id: string;
  title: string;
  category: string;
  premise: string;
  choices: ScenarioChoice[];
}

export interface PreventionModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  badge: string;
  summary: string;
  contentSections: {
    heading: string;
    body: string[];
    tips?: string[];
  }[];
  quiz: QuizQuestion[];
  scenario?: InteractiveScenario;
}

export interface LearnerProgress {
  completedModuleIds: string[];
  quizScores: Record<string, number>;
  certificateName?: string;
  certificateEarnedDate?: string;
}

export type ActiveTab = 'home' | 'report' | 'respond' | 'prevent' | 'support' | 'monitor' | 'admin';
