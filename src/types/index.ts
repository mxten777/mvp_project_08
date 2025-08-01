// 복지 정보 타입
export interface WelfareInfo {
  id: string;
  title: string;
  description: string;
  category: WelfareCategory;
  eligibility: string[];
  location: Location;
  contactInfo: ContactInfo;
  deadline?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type WelfareCategory = 
  | 'health' 
  | 'housing' 
  | 'food' 
  | 'transport' 
  | 'education' 
  | 'leisure' 
  | 'financial';

// 위치 정보 타입
export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  district: string;
  neighborhood: string;
}

// 연락처 정보 타입
export interface ContactInfo {
  phone: string;
  email?: string;
  website?: string;
  hours: string;
}

// 일정 정보 타입
export interface Schedule {
  id: string;
  title: string;
  description: string;
  category: ScheduleCategory;
  startDate: Date;
  endDate: Date;
  location: Location;
  capacity?: number;
  registered?: number;
  registrationRequired: boolean;
  contactInfo: ContactInfo;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ScheduleCategory = 
  | 'health_checkup' 
  | 'exercise' 
  | 'education' 
  | 'cultural' 
  | 'meal' 
  | 'counseling';

// 식단 정보 타입
export interface Menu {
  id: string;
  locationId: string;
  date: Date;
  mealType: MealType;
  items: MenuItem[];
  nutritionInfo?: NutritionInfo;
  specialNotes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MenuItem {
  name: string;
  description?: string;
  allergens?: string[];
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
}

// 사용자 정보 타입
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  birthDate?: Date;
  address?: string;
  location?: Location;
  preferences: UserPreferences;
  role: UserRole;
  guardians?: Guardian[];
  createdAt: Date;
  lastLoginAt: Date;
}

export type UserRole = 'senior' | 'guardian' | 'admin';

export interface UserPreferences {
  notifications: {
    welfare: boolean;
    schedule: boolean;
    menu: boolean;
    emergency: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    highContrast: boolean;
    voiceAssistant: boolean;
    reducedMotion: boolean;
  };
  location: {
    autoDetect: boolean;
    allowSharing: boolean;
  };
}

// 보호자 정보 타입
export interface Guardian {
  uid: string;
  displayName: string;
  relationship: string; // '자녀', '배우자', '형제자매' 등
  phoneNumber: string;
  email?: string;
  isEmergencyContact: boolean;
}

// 알림 타입
export interface Notification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  priority: NotificationPriority;
  targetUsers: string[]; // user IDs
  data?: Record<string, any>;
  scheduledAt?: Date;
  sentAt?: Date;
  readBy: string[]; // user IDs who read this notification
  createdAt: Date;
}

export type NotificationType = 
  | 'welfare_new' 
  | 'schedule_reminder' 
  | 'menu_update' 
  | 'emergency' 
  | 'system';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 위치 검색 결과 타입
export interface LocationSearchResult {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number; // 사용자로부터의 거리 (km)
}

// 음성 안내 설정 타입
export interface TTSSettings {
  enabled: boolean;
  voice: string;
  rate: number; // 0.1 ~ 10
  pitch: number; // 0 ~ 2
  volume: number; // 0 ~ 1
}
