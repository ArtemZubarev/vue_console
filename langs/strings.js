const { promises, existsSync, mkdirSync } = require('fs');
const Papa = require('papaparse');
const path = require('path');
const allowedLangs = require('./allowedLangs');

const distDir = path.join(process.cwd(), 'langs', 'dist');
const translationsFile = path.join(
  process.cwd(),
  'langs',
  'translationsBase.csv',
);

const clearDist = async () => {
  try {
    const files = await promises.readdir(distDir);

    files.forEach(async (file) => {
      await promises.unlink(path.join(distDir, file));
    });
  } catch (err) {
    console.error(err);
  }
};

const readCsv = async (file = translationsFile) => {
  const csv = await promises.readFile(file, 'utf8');
  const result = Papa.parse(csv, { delimiter: ',' }).data;

  return result;
};

const getMessages = async () => {
  // [key: string]: [key, ru, en, de, tr][]
  const base = await readCsv();

  base.splice(0, 1);

  const normalizedBase = base.map((row) => {
    const copyRow = [...row];

    return copyRow.map((item) => item
      .trim()
      .replace(/\n/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim());
  });

  const messages = {};

  allowedLangs.forEach((l) => {
    messages[l] = {};
  });

  normalizedBase.forEach((row) => {
    allowedLangs.forEach((l, index) => {
      const value = row[index + 1];
      if (value) {
        messages[l][row[0]] = value;
      }
    });
  });

  return messages;
};

const writeLangFile = async (key, value) => {
  const fileContent = `/* eslint-disable */\nexport default ${value}`;

  try {
    await promises.writeFile(path.join(distDir, key), fileContent, 'utf8');
  } catch (e) {
    console.error('что то пошло не так с сохраненим файла переводов', key);
  }
};

const generateFiles = async () => {
  const messages = await getMessages();

  // check if folder is exists
  if (!existsSync(distDir)) {
    mkdirSync(distDir);
  }

  await clearDist();

  const filesNames = allowedLangs.map((lang) => `${lang}.js`);

  await Promise.all(
    filesNames.map((key, i) => {
      const lang = allowedLangs[i];
      const currentMessages = messages[lang];
      const stringifiedMessages = JSON.stringify(currentMessages);

      return writeLangFile(key, stringifiedMessages);
    }),
  );
};

(async () => {
  await generateFiles();
})();
