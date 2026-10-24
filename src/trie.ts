/**
 * Префиксное дерево (trie, бор)
 *
 * Каждое ребро помечено буквой, путь от корня до узла — это префикс.
 * Узел помечен флагом isWord, если путь до него образует слово из словаря.
 * Общие префиксы хранятся один раз: «кот», «кота», «котик» делят первые три узла.
 *
 * Дети хранятся в Map<string, TrieNode>, то есть память тратится только на
 * реально существующие рёбра
 *
 * Обозначения для анализа:
 *   W — количество слов в словаре,
 *   L — средняя длина слова, Lmax — максимальная,
 *   N = W * L — суммарная длина всех слов (объём входных данных),
 *   V — количество узлов в дереве (V <= N + 1).
 *
 * Сложность:
 *   addWord(word)      O(L)  — спускаемся по одной букве
 *   addWords(list)     O(N)  — сумма по всем словам
 *   has(word)          O(L)  — не зависит от количества слов W
 *   hasPrefix(prefix)  O(L)
 *   память             O(V), V < N за счёт общих префиксов
 */

class TrieNode {
    readonly children = new Map<string, TrieNode>();
    isWord = false;
}

export class Trie {
    private readonly root = new TrieNode();
    private words = 0;
    private nodes = 1;

    /** Количество слов в словаре */
    get size(): number {
        return this.words;
    }

    /** Количество узлов дерева */
    get nodeCount(): number {
        return this.nodes;
    }

    /** Добавить одно слово O(L) */
    addWord(word: string): void {
        const key = normalize(word);
        if (key.length === 0) return;

        let node = this.root;

        for (const char of key) {
            let next = node.children.get(char);

            if (next === undefined) {
                next = new TrieNode();
                node.children.set(char, next);
                this.nodes++;
            }

            node = next;
        }

        if (!node.isWord) {
            node.isWord = true;
            this.words++;
        }
    }

    /** Добавить список слов O(N) */
    addWords(words: Iterable<string>): void {
        for (const word of words) {
            this.addWord(word);
        }
    }

    /** Есть ли такое слово в словаре O(L) */
    has(word: string): boolean {
        const node = this.find(normalize(word));
        return node !== undefined && node.isWord;
    }

    /** Есть ли в словаре хотя бы одно слово с таким префиксом O(L) */
    hasPrefix(prefix: string): boolean {
        return this.find(normalize(prefix)) !== undefined;
    }

    private find(key: string): TrieNode | undefined {
        let node: TrieNode | undefined = this.root;

        for (const char of key) {
            node = node.children.get(char);
            if (node === undefined) return undefined;
        }

        return node;
    }
}

function normalize(word: string): string {
    return word.trim().toLowerCase();
}
