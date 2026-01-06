export const UI_TEXT = {
  en: {
    appName: 'Panchayat Worker Connector',
    findWorkers: 'Find Workers',
    registerWorker: 'Register as Worker',
    pricing: 'Pricing',
    verification: 'Verification',
    support: 'Support',
    about: 'About',
    adminDashboard: 'Panchayat Dashboard',
    userDashboard: 'User Dashboard',
    lowData: 'Low Data',
    language: 'Language',
    english: 'English',
    hindi: 'हिंदी',
    viewProfile: 'View Profile',
    saved: 'Saved',
    saveWorker: 'Save worker',
    unsaveWorker: 'Unsave worker',
  },
  hi: {
    appName: 'पंचायत वर्कर कनेक्टर',
    findWorkers: 'कामगार खोजें',
    registerWorker: 'कामगार पंजीकरण',
    pricing: 'मूल्य',
    verification: 'सत्यापन',
    support: 'सहायता',
    about: 'हमारे बारे में',
    adminDashboard: 'पंचायत डैशबोर्ड',
    userDashboard: 'यूज़र डैशबोर्ड',
    lowData: 'लो डेटा',
    language: 'भाषा',
    english: 'English',
    hindi: 'हिंदी',
    viewProfile: 'प्रोफ़ाइल देखें',
    saved: 'सेव हो गया',
    saveWorker: 'कामगार सेव करें',
    unsaveWorker: 'सेव हटाएँ',
  },
}

export function t(language, key) {
  const langPack = UI_TEXT[language] || UI_TEXT.en
  return langPack[key] || UI_TEXT.en[key] || key
}
