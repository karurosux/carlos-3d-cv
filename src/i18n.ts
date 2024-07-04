import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './locales/en.ts';
import {es} from './locales/es.ts';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    es: {
      translation: es,
    },
  },
  lng: window.localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export {i18n};
