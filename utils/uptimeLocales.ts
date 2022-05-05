export interface ILocaleReductions {
  y: string;
    m: string,
    d: string,
    h: string,
    min: string,
    s: string
}

export interface ILocales {
  en: ILocaleReductions;
  ru: ILocaleReductions;
  tr: ILocaleReductions;
  es: ILocaleReductions;
}

const locales: ILocales = {
  en: {
    y: 'y',
    m: 'm',
    d: 'd',
    h: 'h',
    min: 'min',
    s: 's'
  },
  ru: {
    y: 'г',
    m: 'м',
    d: 'д',
    h: 'ч',
    min: 'мин',
    s: 'с'
  },
  tr: {
    y: 'y',
    m: 'a',
    d: 'g',
    h: 's',
    min: 'd',
    s: 's'
  },
  es: {
    y: 'a',
    m: 'm',
    d: 'd',
    h: 'h',
    min: 'm',
    s: 's'
  }
}

export default locales
