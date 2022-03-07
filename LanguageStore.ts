import flagUs from 'Assets/flags/us.svg';
import { makeAutoObservable } from 'mobx';
import vocabulary from 'Assets/generated/translations.json';

type TVocabulary = Record<TLanguage, Record<string, string>>;

class LaguageStore {
    _language: TLanguage = 'en_US';

    constructor() {
        makeAutoObservable(this);
    }

    setLanguage = (language?: TLanguage) => {
        this._language = language ?? 'en_US';
    };

    getLanguage = () => {
        return this._language;
    };
}

export const languageStore = new LaguageStore();

globalThis._ = (inputStr: string, ...values: (string | number)[]) => {
    let str = (vocabulary as TVocabulary)[languageStore.getLanguage()]?.[inputStr] ?? inputStr;
    return applyFormatting(str, values);
};

const applyFormatting = (str: string, values: (string | number)[]) =>
    values.reduce((acc: string, val) => acc.replace(typeof val === 'number' ? '%d' : '%s', String(val)), str);

export const languageData = [
    {
        state: 'usa',
        language: _('english'),
        flag: flagUs,
        vocId: 'en_US',
    },
] as const;

export type TLanguage = typeof languageData[number]['vocId'];
