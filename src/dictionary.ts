/**
 * Словарь языка — то, что требуется по заданию
 *
 * Функциональные требования:
 *   addWords(list)  — добавить список слов
 *   addWord(word)   — добавить одно слово
 *   has(word)       — проверить, есть ли слово
 *
 */

import { readFileSync } from 'node:fs';
import { Trie } from './trie.js';

export class Dictionary {
    private readonly trie = new Trie();

    /** Количество слов */
    get size(): number {
        return this.trie.size;
    }

    /** Количество узлов дерева */
    get nodeCount(): number {
        return this.trie.nodeCount;
    }

    /** Добавить одно слово O(L) */
    addWord(word: string): void {
        this.trie.addWord(word);
    }

    /** Добавить список слов O(N) */
    addWords(words: Iterable<string>): void {
        this.trie.addWords(words);
    }

    /** Проверить, есть ли слово в словаре O(L) */
    has(word: string): boolean {
        return this.trie.has(word);
    }

    /** Есть ли хотя бы одно слово с таким префиксом O(L) */
    hasPrefix(prefix: string): boolean {
        return this.trie.hasPrefix(prefix);
    }
}


export function loadWords(path = new URL('../../data/words.txt', import.meta.url)): string[] {
    return readFileSync(path, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
}
