export interface Message {
  sender: 'user' | 'stranger' | 'system';
  text: string;
  timestamp: string;
  location?: { country: string; flag: string; countryCode?: string };
  commonInterests?: string[];
  isMatchNotification?: boolean;
}
