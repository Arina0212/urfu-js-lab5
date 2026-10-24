import { Dictionary, loadWords } from './dictionary.js';

console.log('Небольшой словарь:');
const small = new Dictionary();
small.addWords(['кот', 'кота', 'котик', 'книга', 'крот']);
small.addWord('кошка');

console.log('слов в словаре:', small.size, '| узлов в дереве:', small.nodeCount);
for (const word of ['кот', 'кошка', 'котики', 'книг', 'собака']) {
    console.log(`  has("${word}") =`, small.has(word));
}
console.log('  hasPrefix("книг") =', small.hasPrefix('книг'));

console.log('\nСловарь из файла:');
const words = loadWords();
const totalChars = words.reduce((sum, word) => sum + word.length, 0);

const dictionary = new Dictionary();
dictionary.addWords(words);

console.log('слов (W):', dictionary.size.toLocaleString('ru-RU'));
console.log('суммарная длина слов (N):', totalChars.toLocaleString('ru-RU'), 'символов');
console.log('узлов в дереве (V):', dictionary.nodeCount.toLocaleString('ru-RU'));
console.log('V / N =', (dictionary.nodeCount / totalChars).toFixed(3), '— узлов на символ словаря');

console.log('\nпроверка слов:');
for (const word of [words[0], words[50_000], words.at(-1) as string, 'ъъъ', 'несуществующееслово']) {
    console.log(`  has("${word}") =`, dictionary.has(word));
}

console.log('\nдобавление слова в готовый словарь:');
console.log('  has("абвгдейка") =', dictionary.has('абвгдейка'));
dictionary.addWord('абвгдейка');
console.log('  добавили, has("абвгдейка") =', dictionary.has('абвгдейка'));
console.log('  слов стало:', dictionary.size.toLocaleString('ru-RU'));
