
interface Locale {
    [key: string]: string;
}
import nl from '@locales/nl.json';
import en from '@locales/en.json';
import de from '@locales/de.json';
import es from '@locales/es.json';
import hr from '@locales/hr.json';
import fr from '@locales/fr.json';

// Get language from HTML lang attribute for client-side, fallback to env for server-side
const getLang = (): string => {
    if (typeof document !== 'undefined') {
        return document.documentElement.lang || import.meta.env.WEBSITE_LANGUAGE || 'en';
    }
    return import.meta.env.WEBSITE_LANGUAGE || 'en';
};

export const t = (field: string): string => {
    const lang = getLang();
    const translations: Record<string, Locale>  = {
        en: en,
        nl: nl,
        es: es,
        de: de,
        hr: hr,
        fr: fr,
    };

    if (translations[lang] && translations[lang][field]) {
        return translations[lang][field];
    }

    if (translations['en'] && translations['en'][field]) {
        return translations['en'][field];
    }

    return field;
};