export function calculateSimilarityScore(str1: string, str2: string): number {
    const text1 = str1.toString().toLowerCase();
    const text2 = str2.toString().toLowerCase();

    // Jaccard similarity
    const set1 = new Set(text1.split(' '));
    const set2 = new Set(text2.split(' '));
    const jaccardScore = intersection(set1, set2).size / union(set1, set2).size;

    // Levenshtein distance
    const maxLength = Math.max(text1.length, text2.length);
    const levenshteinScore = 1 - levenshteinDistance(text1, text2) / maxLength;

    // Cosine similarity
    const cosineScore = cosineSimilarity(text1, text2);

    // Jaro-Winkler similarity
    const jaroWinklerScore = jaroWinklerSimilarity(text1, text2);

    // N-gram similarity
    const ngramScore = ngramSimilarity(text1, text2, 2);

    // Vector space model similarity
    const vectorSpaceScore = vectorSpaceModelSimilarity(text1, text2);

    // Calculate the average of all scores
    const scores = [
        jaccardScore,
        levenshteinScore,
        cosineScore,
        jaroWinklerScore,
        ngramScore,
        vectorSpaceScore,
    ].compact();

    const sumScore = scores.reduce((acc, score) => (acc += score), 0);
    const averageScore = sumScore / scores.length;

    return averageScore;
}

export function levenshteinDistance(s: string, t: string): number {
    const m: number = s.length;
    const n: number = t.length;
    const d: number[][] = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0),
    );

    for (let i = 0; i <= m; i++) {
        d[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }

    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (s[i - 1] === t[j - 1]) {
                d[i][j] = d[i - 1][j - 1];
            } else {
                d[i][j] =
                    Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + 1;
            }
        }
    }

    return d[m][n];
}

export function cosineSimilarity(text1: string, text2: string): number {
    // Convert the strings to arrays of words
    const words1: string[] = text1.toLowerCase().split(' ');
    const words2: string[] = text2.toLowerCase().split(' ');

    // Calculate the word frequency of both arrays
    const frequency1: Map<string, number> = calculateFrequency(words1);
    const frequency2: Map<string, number> = calculateFrequency(words2);

    // Create a set of all unique words in both arrays
    const allWords: Set<string> = new Set([
        ...frequency1.keys(),
        ...frequency2.keys(),
    ]);

    // Calculate the dot product of the two frequency vectors
    let dotProduct = 0;
    for (const word of allWords) {
        const frequency1Value: number = frequency1.get(word) || 0;
        const frequency2Value: number = frequency2.get(word) || 0;
        dotProduct += frequency1Value * frequency2Value;
    }

    // Calculate the magnitudes of the frequency vectors
    const magnitude1: number = calculateMagnitude(frequency1);
    const magnitude2: number = calculateMagnitude(frequency2);

    // Calculate the cosine similarity score
    const cosineSimilarity: number = dotProduct / (magnitude1 * magnitude2);

    return cosineSimilarity;
}

export function jaroWinklerSimilarity(text1: string, text2: string): number {
    const jaroDistanceComputed: number = jaroDistance(text1, text2);
    const prefixLength: number = calculatePrefixLength(text1, text2);

    const jaroWinklerSimilarity: number =
        jaroDistanceComputed + prefixLength * 0.1 * (1 - jaroDistanceComputed);

    return jaroWinklerSimilarity;
}

export function jaroDistance(text1: string, text2: string): number {
    const matchDistance: number =
        Math.floor(Math.max(text1.length, text2.length) / 2) - 1;

    const text1Matches: boolean[] = new Array(text1.length).fill(false);
    const text2Matches: boolean[] = new Array(text2.length).fill(false);

    let matches = 0;
    for (let i = 0; i < text1.length; i++) {
        const start: number = Math.max(0, i - matchDistance);
        const end: number = Math.min(i + matchDistance + 1, text2.length);

        for (let j = start; j < end; j++) {
            if (!text2Matches[j] && text1[i] === text2[j]) {
                text1Matches[i] = true;
                text2Matches[j] = true;
                matches++;
                break;
            }
        }
    }

    if (matches === 0) {
        return 0;
    }

    let transpositions = 0;
    let k = 0;
    for (let i = 0; i < text1.length; i++) {
        if (text1Matches[i]) {
            while (!text2Matches[k]) {
                k++;
            }
            if (text1[i] !== text2[k]) {
                transpositions++;
            }
            k++;
        }
    }

    const jaroDistance: number =
        (matches / text1.length +
            matches / text2.length +
            (matches - transpositions / 2) / matches) /
        3;

    return jaroDistance;
}

export function ngramSimilarity(text1: string, text2: string, n: number) {
    if (n < 1 || n > Math.min(text1.length, text2.length)) {
        return null;
    }

    // Create sets of N-grams for each text
    const set1: Set<string> = new Set();
    const set2: Set<string> = new Set();
    for (let i = 0; i < text1.length - n + 1; i++) {
        set1.add(text1.substring(i, i + n));
    }
    for (let i = 0; i < text2.length - n + 1; i++) {
        set2.add(text2.substring(i, i + n));
    }

    // Calculate the Jaccard similarity between the sets of N-grams
    const intersectionSize: number = new Set([...set1].filter(x => set2.has(x)))
        .size;
    const unionSize: number = set1.size + set2.size - intersectionSize;
    return intersectionSize / unionSize;
}

export function vectorSpaceModelSimilarity(text1: string, text2: string) {
    // Define uma função auxiliar para tokenizar o texto em palavras
    const tokenize = (text: string): string[] =>
        text.toLowerCase().match(/\b\w+\b/g) ?? [];

    // Tokeniza ambos os textos
    const words1 = tokenize(text1);
    const words2 = tokenize(text2);

    // Constrói um conjunto de todas as palavras distintas nos dois textos
    const allWords = [...new Set([...words1, ...words2])];

    // Define uma função auxiliar para contar o número de ocorrências de uma palavra em um texto
    const countOccurrences = (word: string, text: string): number =>
        tokenize(text).filter(w => w === word).length;

    // Calcula o vetor de frequências para cada texto
    const freq1 = allWords.map(word => countOccurrences(word, text1));
    const freq2 = allWords.map(word => countOccurrences(word, text2));

    // Calcula o produto escalar dos dois vetores
    const dotProduct = freq1.reduce((acc, freq, i) => acc + freq * freq2[i], 0);

    // Calcula o comprimento (norma) dos vetores
    const length1 = Math.sqrt(
        freq1.reduce((acc, freq) => acc + freq * freq, 0),
    );
    const length2 = Math.sqrt(
        freq2.reduce((acc, freq) => acc + freq * freq, 0),
    );

    // Calcula o score de similaridade usando a fórmula do cosseno
    return length1 === 0 || length2 === 0
        ? 0
        : dotProduct / (length1 * length2);
}

// Utilities
function intersection(set1: Set<string>, set2: Set<string>): Set<string> {
    return new Set([...set1].filter(x => set2.has(x)));
}

function union(set1: Set<string>, set2: Set<string>): Set<string> {
    return new Set([...set1, ...set2]);
}

function calculateFrequency(words: string[]): Map<string, number> {
    const frequency: Map<string, number> = new Map();

    for (const word of words) {
        const count: number = frequency.get(word) || 0;
        frequency.set(word, count + 1);
    }

    return frequency;
}

function calculateMagnitude(frequency: Map<string, number>): number {
    let magnitudeSquared = 0;

    for (const count of frequency.values()) {
        magnitudeSquared += count * count;
    }

    const magnitude: number = Math.sqrt(magnitudeSquared);

    return magnitude;
}

function calculatePrefixLength(text1: string, text2: string): number {
    const maxPrefixLength = 4;
    let prefixLength = 0;

    for (
        let i = 0;
        i < Math.min(maxPrefixLength, text1.length, text2.length);
        i++
    ) {
        if (text1[i] === text2[i]) {
            prefixLength++;
        } else {
            break;
        }
    }

    return prefixLength;
}
