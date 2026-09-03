export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionType {
    id: number;
    topic: string;
    subTopic: string;
    difficulty: Difficulty;
    q: string;
    options: string[];
    ans: string;
    hint: string;
}

export const QUESTIONS: Record<number, QuestionType[]> = {
    "5": [
        {
            "id": 1,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "4",
                "6",
                "5"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 2,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "8",
                "7",
                "6"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 3,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "8",
                "9",
                "10",
                "11"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 4,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "10",
                "12",
                "13",
                "11"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 5,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "12",
                "15",
                "14",
                "13"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 6,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "16",
                "15",
                "14"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 7,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "18",
                "17",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 8,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "18",
                "20",
                "19"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 9,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "22",
                "20",
                "23"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 10,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "24",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 11,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "40",
                "41",
                "39",
                "42"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 12,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "42",
                "43",
                "41",
                "44"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 13,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "43",
                "45",
                "44",
                "46"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 14,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "48",
                "47",
                "45"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 15,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "48",
                "49",
                "47",
                "50"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 16,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "49",
                "52",
                "51"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 17,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "51",
                "53",
                "52"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 18,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "56",
                "53",
                "55"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 19,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "57",
                "56",
                "55",
                "58"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 20,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "57",
                "60",
                "59"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 21,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "84",
                "86",
                "87",
                "85"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 22,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "88",
                "86",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 23,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "90",
                "91",
                "88"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 24,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "91",
                "92",
                "90"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 25,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "94",
                "95",
                "93",
                "92"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 26,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "96",
                "94",
                "97"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 27,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "99",
                "98",
                "97"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 28,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "101",
                "100",
                "99",
                "98"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 29,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "101",
                "102",
                "100",
                "103"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 30,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılar",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "105",
                "104",
                "102"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 31,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "6",
                "4",
                "7",
                "5"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 32,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "6",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 33,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "8",
                "10",
                "9",
                "11"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 34,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 35,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "14",
                "12",
                "15"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 36,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "16",
                "14",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 37,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "18",
                "19",
                "17"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 38,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 39,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "22",
                "20",
                "23"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 40,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "22",
                "25",
                "24",
                "23"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 41,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "40",
                "42",
                "41",
                "39"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 42,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "41",
                "43",
                "42",
                "44"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 43,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "45",
                "43",
                "44",
                "46"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 44,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "45",
                "47",
                "46",
                "48"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 45,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "48",
                "49",
                "47"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 46,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "52",
                "51",
                "49"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 47,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "53",
                "51",
                "54"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 48,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "56",
                "53",
                "55",
                "54"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 49,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "56",
                "57",
                "55"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 50,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "59",
                "57",
                "60"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 51,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "85",
                "87",
                "86",
                "84"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 52,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "86",
                "88",
                "87",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 53,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "90",
                "88",
                "91"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 54,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "90",
                "92",
                "91"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 55,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "95",
                "94",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 56,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "94",
                "97",
                "95",
                "96"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 57,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "97",
                "98",
                "96",
                "99"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 58,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "99",
                "101",
                "100"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 59,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "101",
                "100",
                "102"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 60,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "105",
                "102",
                "104",
                "103"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 61,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "4/6 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "3/3",
                "3/2",
                "2/3",
                "2/4"
            ],
            "ans": "2/3",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 62,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "6/8 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/3",
                "4/4",
                "3/4",
                "3/5"
            ],
            "ans": "3/4",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 63,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "8/10 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/5",
                "5/5",
                "5/4",
                "4/6"
            ],
            "ans": "4/5",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 64,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "10/12 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/6",
                "6/6",
                "6/5",
                "5/7"
            ],
            "ans": "5/6",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 65,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "12/14 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "7/6",
                "6/7",
                "7/7",
                "6/8"
            ],
            "ans": "6/7",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 66,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "14/16 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "7/8",
                "8/8",
                "8/7",
                "7/9"
            ],
            "ans": "7/8",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 67,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "16/18 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/8",
                "8/9",
                "9/9",
                "8/10"
            ],
            "ans": "8/9",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 68,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "18/20 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/10",
                "10/10",
                "9/11",
                "10/9"
            ],
            "ans": "9/10",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 69,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "20/22 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "10/11",
                "11/10",
                "11/11",
                "10/12"
            ],
            "ans": "10/11",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 70,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "easy",
            "q": "22/24 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/12",
                "12/11",
                "12/12",
                "11/13"
            ],
            "ans": "11/12",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 71,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "44/36 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "22/18",
                "22/19",
                "23/18",
                "18/22"
            ],
            "ans": "22/18",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 72,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "46/38 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "19/23",
                "23/20",
                "24/19",
                "23/19"
            ],
            "ans": "23/19",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 73,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "48/40 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "20/24",
                "24/21",
                "25/20",
                "24/20"
            ],
            "ans": "24/20",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 74,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "50/42 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "25/22",
                "25/21",
                "26/21",
                "21/25"
            ],
            "ans": "25/21",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 75,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "52/44 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "26/22",
                "27/22",
                "26/23",
                "22/26"
            ],
            "ans": "26/22",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 76,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "54/46 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "23/27",
                "27/24",
                "28/23",
                "27/23"
            ],
            "ans": "27/23",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 77,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "56/48 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "28/24",
                "29/24",
                "28/25",
                "24/28"
            ],
            "ans": "28/24",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 78,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "58/50 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "29/26",
                "30/25",
                "25/29",
                "29/25"
            ],
            "ans": "29/25",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 79,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "60/52 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "30/26",
                "26/30",
                "31/26",
                "30/27"
            ],
            "ans": "30/26",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 80,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "medium",
            "q": "62/54 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/31",
                "31/28",
                "32/27",
                "31/27"
            ],
            "ans": "31/27",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 81,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "94/76 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/38",
                "48/38",
                "47/39",
                "38/47"
            ],
            "ans": "47/38",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 82,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "96/78 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "39/48",
                "48/40",
                "49/39",
                "48/39"
            ],
            "ans": "48/39",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 83,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "98/80 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "40/49",
                "49/41",
                "50/40",
                "49/40"
            ],
            "ans": "49/40",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 84,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "100/82 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "41/50",
                "50/42",
                "51/41",
                "50/41"
            ],
            "ans": "50/41",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 85,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "102/84 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "51/42",
                "42/51",
                "52/42",
                "51/43"
            ],
            "ans": "51/42",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 86,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "104/86 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "52/43",
                "53/43",
                "52/44",
                "43/52"
            ],
            "ans": "52/43",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 87,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "106/88 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "53/44",
                "54/44",
                "53/45",
                "44/53"
            ],
            "ans": "53/44",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 88,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "108/90 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "45/54",
                "54/45",
                "55/45",
                "54/46"
            ],
            "ans": "54/45",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 89,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "110/92 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "46/55",
                "55/46",
                "56/46",
                "55/47"
            ],
            "ans": "55/46",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 90,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirler",
            "difficulty": "hard",
            "q": "112/94 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/56",
                "56/48",
                "57/47",
                "56/47"
            ],
            "ans": "56/47",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 91,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "4/6 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "2/3",
                "3/2",
                "3/3",
                "2/4"
            ],
            "ans": "2/3",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 92,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "6/8 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/3",
                "3/5",
                "4/4",
                "3/4"
            ],
            "ans": "3/4",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 93,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "8/10 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/4",
                "4/6",
                "5/5",
                "4/5"
            ],
            "ans": "4/5",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 94,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "10/12 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/6",
                "6/6",
                "5/7",
                "6/5"
            ],
            "ans": "5/6",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 95,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "12/14 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "6/7",
                "7/7",
                "6/8",
                "7/6"
            ],
            "ans": "6/7",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 96,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "14/16 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "7/8",
                "8/7",
                "8/8",
                "7/9"
            ],
            "ans": "7/8",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 97,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "16/18 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/8",
                "8/10",
                "9/9",
                "8/9"
            ],
            "ans": "8/9",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 98,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "18/20 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/11",
                "10/10",
                "10/9",
                "9/10"
            ],
            "ans": "9/10",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 99,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "20/22 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/10",
                "10/12",
                "11/11",
                "10/11"
            ],
            "ans": "10/11",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 100,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "22/24 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/12",
                "11/13",
                "12/12",
                "12/11"
            ],
            "ans": "11/12",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 101,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "44/36 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "18/22",
                "22/19",
                "23/18",
                "22/18"
            ],
            "ans": "22/18",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 102,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "46/38 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "23/20",
                "24/19",
                "23/19",
                "19/23"
            ],
            "ans": "23/19",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 103,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "48/40 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "24/20",
                "25/20",
                "24/21",
                "20/24"
            ],
            "ans": "24/20",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 104,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "50/42 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "25/21",
                "26/21",
                "25/22",
                "21/25"
            ],
            "ans": "25/21",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 105,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "52/44 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/22",
                "26/22",
                "26/23",
                "22/26"
            ],
            "ans": "26/22",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 106,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "54/46 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/24",
                "28/23",
                "23/27",
                "27/23"
            ],
            "ans": "27/23",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 107,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "56/48 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "28/25",
                "29/24",
                "24/28",
                "28/24"
            ],
            "ans": "28/24",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 108,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "58/50 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "29/25",
                "25/29",
                "30/25",
                "29/26"
            ],
            "ans": "29/25",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 109,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "60/52 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "31/26",
                "30/26",
                "26/30",
                "30/27"
            ],
            "ans": "30/26",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 110,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "62/54 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "31/28",
                "27/31",
                "32/27",
                "31/27"
            ],
            "ans": "31/27",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 111,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "94/76 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "38/47",
                "47/38",
                "48/38",
                "47/39"
            ],
            "ans": "47/38",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 112,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "96/78 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "39/48",
                "48/40",
                "49/39",
                "48/39"
            ],
            "ans": "48/39",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 113,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "98/80 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "49/40",
                "50/40",
                "49/41",
                "40/49"
            ],
            "ans": "49/40",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 114,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "100/82 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "50/41",
                "41/50",
                "51/41",
                "50/42"
            ],
            "ans": "50/41",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 115,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "102/84 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "51/42",
                "42/51",
                "52/42",
                "51/43"
            ],
            "ans": "51/42",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 116,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "104/86 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "53/43",
                "52/43",
                "52/44",
                "43/52"
            ],
            "ans": "52/43",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 117,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "106/88 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/44",
                "53/44",
                "53/45",
                "44/53"
            ],
            "ans": "53/44",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 118,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "108/90 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/45",
                "55/45",
                "54/46",
                "45/54"
            ],
            "ans": "54/45",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 119,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "110/92 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "55/46",
                "56/46",
                "46/55",
                "55/47"
            ],
            "ans": "55/46",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 120,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "112/94 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/56",
                "56/48",
                "57/47",
                "56/47"
            ],
            "ans": "56/47",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 121,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "2/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "1.2",
                "2.0",
                "0.02",
                "0.2"
            ],
            "ans": "0.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 122,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "3/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "3.0",
                "0.3",
                "0.03",
                "1.3"
            ],
            "ans": "0.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 123,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "4/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "4.0",
                "0.04",
                "0.4",
                "1.4"
            ],
            "ans": "0.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 124,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "5/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.5",
                "5.0",
                "0.05",
                "1.5"
            ],
            "ans": "0.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 125,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "6/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "6.0",
                "0.06",
                "0.6",
                "1.6"
            ],
            "ans": "0.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 126,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "7/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.7",
                "0.07",
                "1.7",
                "7.0"
            ],
            "ans": "0.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 127,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "8/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "1.8",
                "0.08",
                "8.0",
                "0.8"
            ],
            "ans": "0.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 128,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "9/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "9.0",
                "0.9",
                "0.09",
                "1.9"
            ],
            "ans": "0.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 129,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "10/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "10.0",
                "2.0",
                "1.0",
                "0.10"
            ],
            "ans": "1.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 130,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "11/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.1",
                "0.11",
                "11.0",
                "1.1"
            ],
            "ans": "1.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 131,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "22/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.2",
                "3.2",
                "22.0",
                "0.22"
            ],
            "ans": "2.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 132,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "23/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "3.3",
                "23.0",
                "0.23",
                "2.3"
            ],
            "ans": "2.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 133,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "24/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "24.0",
                "3.4",
                "0.24",
                "2.4"
            ],
            "ans": "2.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 134,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "25/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.25",
                "2.5",
                "3.5",
                "25.0"
            ],
            "ans": "2.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 135,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "26/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.6",
                "26.0",
                "0.26",
                "3.6"
            ],
            "ans": "2.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 136,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "27/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "27.0",
                "3.7",
                "0.27",
                "2.7"
            ],
            "ans": "2.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 137,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "28/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "28.0",
                "3.8",
                "0.28",
                "2.8"
            ],
            "ans": "2.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 138,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "29/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "29.0",
                "3.9",
                "0.29",
                "2.9"
            ],
            "ans": "2.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 139,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "30/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "4.0",
                "0.30",
                "3.0",
                "30.0"
            ],
            "ans": "3.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 140,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "31/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "3.1",
                "0.31",
                "4.1",
                "31.0"
            ],
            "ans": "3.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 141,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "47/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.7",
                "4.7",
                "0.47",
                "47.0"
            ],
            "ans": "4.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 142,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "48/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "48.0",
                "5.8",
                "0.48",
                "4.8"
            ],
            "ans": "4.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 143,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "49/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "4.9",
                "49.0",
                "0.49",
                "5.9"
            ],
            "ans": "4.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 144,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "50/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "50.0",
                "6.0",
                "5.0",
                "0.50"
            ],
            "ans": "5.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 145,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "51/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.51",
                "5.1",
                "6.1",
                "51.0"
            ],
            "ans": "5.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 146,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "52/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.2",
                "0.52",
                "52.0",
                "6.2"
            ],
            "ans": "5.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 147,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "53/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "6.3",
                "0.53",
                "5.3",
                "53.0"
            ],
            "ans": "5.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 148,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "54/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.4",
                "6.4",
                "54.0",
                "0.54"
            ],
            "ans": "5.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 149,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "55/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "55.0",
                "6.5",
                "0.55",
                "5.5"
            ],
            "ans": "5.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 150,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "56/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.6",
                "56.0",
                "0.56",
                "6.6"
            ],
            "ans": "5.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 151,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "20 sayısının %10'u kaçtır?",
            "options": [
                "4",
                "2",
                "10",
                "12"
            ],
            "ans": "2",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 152,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "30 sayısının %10'u kaçtır?",
            "options": [
                "6",
                "13",
                "15",
                "3"
            ],
            "ans": "3",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 153,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "40 sayısının %10'u kaçtır?",
            "options": [
                "4",
                "14",
                "8",
                "20"
            ],
            "ans": "4",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 154,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "50 sayısının %10'u kaçtır?",
            "options": [
                "5",
                "15",
                "25",
                "10"
            ],
            "ans": "5",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 155,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "60 sayısının %10'u kaçtır?",
            "options": [
                "16",
                "12",
                "30",
                "6"
            ],
            "ans": "6",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 156,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "70 sayısının %10'u kaçtır?",
            "options": [
                "35",
                "17",
                "14",
                "7"
            ],
            "ans": "7",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 157,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "80 sayısının %10'u kaçtır?",
            "options": [
                "8",
                "40",
                "16",
                "18"
            ],
            "ans": "8",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 158,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "90 sayısının %10'u kaçtır?",
            "options": [
                "9",
                "18",
                "45",
                "19"
            ],
            "ans": "9",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 159,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "100 sayısının %10'u kaçtır?",
            "options": [
                "20",
                "50",
                "20",
                "10"
            ],
            "ans": "10",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 160,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "110 sayısının %10'u kaçtır?",
            "options": [
                "11",
                "55",
                "21",
                "22"
            ],
            "ans": "11",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 161,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "220 sayısının %10'u kaçtır?",
            "options": [
                "22",
                "44",
                "110",
                "32"
            ],
            "ans": "22",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 162,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "230 sayısının %10'u kaçtır?",
            "options": [
                "33",
                "46",
                "23",
                "115"
            ],
            "ans": "23",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 163,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "240 sayısının %10'u kaçtır?",
            "options": [
                "120",
                "34",
                "48",
                "24"
            ],
            "ans": "24",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 164,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "250 sayısının %10'u kaçtır?",
            "options": [
                "25",
                "50",
                "35",
                "125"
            ],
            "ans": "25",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 165,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "260 sayısının %10'u kaçtır?",
            "options": [
                "36",
                "130",
                "52",
                "26"
            ],
            "ans": "26",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 166,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "270 sayısının %10'u kaçtır?",
            "options": [
                "54",
                "27",
                "37",
                "135"
            ],
            "ans": "27",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 167,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "280 sayısının %10'u kaçtır?",
            "options": [
                "56",
                "38",
                "28",
                "140"
            ],
            "ans": "28",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 168,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "290 sayısının %10'u kaçtır?",
            "options": [
                "145",
                "29",
                "39",
                "58"
            ],
            "ans": "29",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 169,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "300 sayısının %10'u kaçtır?",
            "options": [
                "150",
                "40",
                "60",
                "30"
            ],
            "ans": "30",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 170,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "310 sayısının %10'u kaçtır?",
            "options": [
                "31",
                "155",
                "62",
                "41"
            ],
            "ans": "31",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 171,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "470 sayısının %10'u kaçtır?",
            "options": [
                "47",
                "94",
                "57",
                "235"
            ],
            "ans": "47",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 172,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "480 sayısının %10'u kaçtır?",
            "options": [
                "240",
                "48",
                "96",
                "58"
            ],
            "ans": "48",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 173,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "490 sayısının %10'u kaçtır?",
            "options": [
                "49",
                "98",
                "245",
                "59"
            ],
            "ans": "49",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 174,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "500 sayısının %10'u kaçtır?",
            "options": [
                "100",
                "250",
                "50",
                "60"
            ],
            "ans": "50",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 175,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "510 sayısının %10'u kaçtır?",
            "options": [
                "102",
                "255",
                "51",
                "61"
            ],
            "ans": "51",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 176,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "520 sayısının %10'u kaçtır?",
            "options": [
                "52",
                "260",
                "104",
                "62"
            ],
            "ans": "52",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 177,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "530 sayısının %10'u kaçtır?",
            "options": [
                "53",
                "265",
                "106",
                "63"
            ],
            "ans": "53",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 178,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "540 sayısının %10'u kaçtır?",
            "options": [
                "54",
                "108",
                "270",
                "64"
            ],
            "ans": "54",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 179,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "550 sayısının %10'u kaçtır?",
            "options": [
                "65",
                "55",
                "275",
                "110"
            ],
            "ans": "55",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 180,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "560 sayısının %10'u kaçtır?",
            "options": [
                "56",
                "112",
                "66",
                "280"
            ],
            "ans": "56",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 181,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "5",
                "6",
                "4"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 182,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "8",
                "6",
                "9"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 183,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "8",
                "10",
                "11",
                "9"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 184,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "10",
                "11",
                "12",
                "13"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 185,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "12",
                "14",
                "13"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 186,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "16",
                "17",
                "14"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 187,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "18",
                "16",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 188,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "18",
                "20",
                "19",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 189,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "20",
                "22",
                "21"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 190,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "24",
                "23",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 191,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "39",
                "42",
                "41",
                "40"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 192,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "44",
                "43",
                "42",
                "41"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 193,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "44",
                "45",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 194,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "47",
                "48",
                "45"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 195,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "47",
                "49",
                "48"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 196,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "51",
                "50",
                "49",
                "52"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 197,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "54",
                "53",
                "51"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 198,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "55",
                "54",
                "53",
                "56"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 199,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "57",
                "58",
                "55",
                "56"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 200,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "60",
                "57",
                "59",
                "58"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 201,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "86",
                "84",
                "85",
                "87"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 202,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "88",
                "87",
                "89",
                "86"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 203,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "88",
                "90",
                "91",
                "89"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 204,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "90",
                "92",
                "91"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 205,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "93",
                "92",
                "94"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 206,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "97",
                "94",
                "96"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 207,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "97",
                "98",
                "96"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 208,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "100",
                "98",
                "101"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 209,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "101",
                "102",
                "100"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 210,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Temel Geometrik Kavramlar ve Çizimler",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "105",
                "104",
                "102"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 211,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 2 cm ve 3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "4",
                "8",
                "10",
                "6"
            ],
            "ans": "6",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (2 x 3)."
        },
        {
            "id": 212,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 3 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "12",
                "14",
                "10",
                "16"
            ],
            "ans": "12",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (3 x 4)."
        },
        {
            "id": 213,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 4 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "24",
                "18",
                "22",
                "20"
            ],
            "ans": "20",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (4 x 5)."
        },
        {
            "id": 214,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 5 cm ve 6 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "30",
                "32",
                "28",
                "34"
            ],
            "ans": "30",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (5 x 6)."
        },
        {
            "id": 215,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 6 cm ve 7 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "46",
                "42",
                "44",
                "40"
            ],
            "ans": "42",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (6 x 7)."
        },
        {
            "id": 216,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 7 cm ve 8 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "60",
                "56",
                "58",
                "54"
            ],
            "ans": "56",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (7 x 8)."
        },
        {
            "id": 217,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 8 cm ve 9 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "76",
                "70",
                "74",
                "72"
            ],
            "ans": "72",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (8 x 9)."
        },
        {
            "id": 218,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 9 cm ve 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "94",
                "88",
                "92",
                "90"
            ],
            "ans": "90",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (9 x 10)."
        },
        {
            "id": 219,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 10 cm ve 11 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "110",
                "108",
                "114",
                "112"
            ],
            "ans": "110",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (10 x 11)."
        },
        {
            "id": 220,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 11 cm ve 12 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "132",
                "134",
                "130",
                "136"
            ],
            "ans": "132",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (11 x 12)."
        },
        {
            "id": 221,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 22 cm ve 18 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "396",
                "398",
                "394",
                "400"
            ],
            "ans": "396",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (22 x 18)."
        },
        {
            "id": 222,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 23 cm ve 19 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "437",
                "441",
                "439",
                "435"
            ],
            "ans": "437",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (23 x 19)."
        },
        {
            "id": 223,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 24 cm ve 20 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "478",
                "482",
                "480",
                "484"
            ],
            "ans": "480",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (24 x 20)."
        },
        {
            "id": 224,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 25 cm ve 21 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "525",
                "523",
                "527",
                "529"
            ],
            "ans": "525",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (25 x 21)."
        },
        {
            "id": 225,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 26 cm ve 22 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "576",
                "570",
                "574",
                "572"
            ],
            "ans": "572",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (26 x 22)."
        },
        {
            "id": 226,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 27 cm ve 23 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "621",
                "625",
                "623",
                "619"
            ],
            "ans": "621",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (27 x 23)."
        },
        {
            "id": 227,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 28 cm ve 24 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "672",
                "674",
                "670",
                "676"
            ],
            "ans": "672",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (28 x 24)."
        },
        {
            "id": 228,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 29 cm ve 25 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "727",
                "723",
                "729",
                "725"
            ],
            "ans": "725",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (29 x 25)."
        },
        {
            "id": 229,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 30 cm ve 26 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "784",
                "780",
                "782",
                "778"
            ],
            "ans": "780",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (30 x 26)."
        },
        {
            "id": 230,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 31 cm ve 27 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "837",
                "839",
                "835",
                "841"
            ],
            "ans": "837",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (31 x 27)."
        },
        {
            "id": 231,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 47 cm ve 38 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1786",
                "1788",
                "1784",
                "1790"
            ],
            "ans": "1786",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (47 x 38)."
        },
        {
            "id": 232,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 48 cm ve 39 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1872",
                "1874",
                "1876",
                "1870"
            ],
            "ans": "1872",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (48 x 39)."
        },
        {
            "id": 233,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 49 cm ve 40 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1964",
                "1962",
                "1960",
                "1958"
            ],
            "ans": "1960",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (49 x 40)."
        },
        {
            "id": 234,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 50 cm ve 41 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2052",
                "2050",
                "2048",
                "2054"
            ],
            "ans": "2050",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (50 x 41)."
        },
        {
            "id": 235,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 51 cm ve 42 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2140",
                "2144",
                "2146",
                "2142"
            ],
            "ans": "2142",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (51 x 42)."
        },
        {
            "id": 236,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 52 cm ve 43 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2234",
                "2238",
                "2236",
                "2240"
            ],
            "ans": "2236",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (52 x 43)."
        },
        {
            "id": 237,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 53 cm ve 44 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2336",
                "2330",
                "2334",
                "2332"
            ],
            "ans": "2332",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (53 x 44)."
        },
        {
            "id": 238,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 54 cm ve 45 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2430",
                "2432",
                "2428",
                "2434"
            ],
            "ans": "2430",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (54 x 45)."
        },
        {
            "id": 239,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 55 cm ve 46 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2532",
                "2530",
                "2534",
                "2528"
            ],
            "ans": "2530",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (55 x 46)."
        },
        {
            "id": 240,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler ve Dörtgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 56 cm ve 47 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2634",
                "2632",
                "2636",
                "2630"
            ],
            "ans": "2632",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (56 x 47)."
        },
        {
            "id": 241,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "5",
                "6",
                "7",
                "4"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 242,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "6",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 243,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "10",
                "11",
                "8",
                "9"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 244,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 245,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "13",
                "12",
                "14"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 246,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "16",
                "14",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 247,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "18",
                "16",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 248,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "18",
                "20",
                "19"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 249,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "22",
                "23",
                "20",
                "21"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 250,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "22",
                "25",
                "24",
                "23"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 251,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "40",
                "41",
                "42",
                "39"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 252,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "42",
                "43",
                "41",
                "44"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 253,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "44",
                "45",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 254,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "47",
                "45",
                "48"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 255,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "47",
                "49",
                "48"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 256,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "50",
                "51",
                "49"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 257,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "53",
                "52",
                "51"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 258,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "53",
                "55",
                "56",
                "54"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 259,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "56",
                "58",
                "57",
                "55"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 260,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "57",
                "59",
                "60",
                "58"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 261,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "85",
                "87",
                "86",
                "84"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 262,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "88",
                "86",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 263,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "90",
                "91",
                "88"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 264,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "93",
                "91",
                "90"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 265,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "94",
                "95",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 266,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "97",
                "96",
                "95",
                "94"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 267,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "98",
                "99",
                "97"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 268,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "101",
                "100",
                "99"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 269,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "100",
                "102",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 270,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Uzunluk ve Zaman Ölçme",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "105",
                "104",
                "102",
                "103"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 271,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 2 cm ve 3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "6",
                "8",
                "10",
                "4"
            ],
            "ans": "6",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (2 x 3)."
        },
        {
            "id": 272,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 3 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "10",
                "16",
                "12",
                "14"
            ],
            "ans": "12",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (3 x 4)."
        },
        {
            "id": 273,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 4 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "18",
                "22",
                "20",
                "24"
            ],
            "ans": "20",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (4 x 5)."
        },
        {
            "id": 274,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 5 cm ve 6 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "30",
                "32",
                "28",
                "34"
            ],
            "ans": "30",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (5 x 6)."
        },
        {
            "id": 275,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 6 cm ve 7 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "42",
                "44",
                "40",
                "46"
            ],
            "ans": "42",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (6 x 7)."
        },
        {
            "id": 276,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 7 cm ve 8 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "60",
                "56",
                "58",
                "54"
            ],
            "ans": "56",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (7 x 8)."
        },
        {
            "id": 277,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 8 cm ve 9 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "76",
                "70",
                "74",
                "72"
            ],
            "ans": "72",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (8 x 9)."
        },
        {
            "id": 278,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 9 cm ve 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "94",
                "88",
                "92",
                "90"
            ],
            "ans": "90",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (9 x 10)."
        },
        {
            "id": 279,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 10 cm ve 11 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "114",
                "112",
                "108",
                "110"
            ],
            "ans": "110",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (10 x 11)."
        },
        {
            "id": 280,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 11 cm ve 12 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "132",
                "130",
                "136",
                "134"
            ],
            "ans": "132",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (11 x 12)."
        },
        {
            "id": 281,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 22 cm ve 18 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "396",
                "398",
                "394",
                "400"
            ],
            "ans": "396",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (22 x 18)."
        },
        {
            "id": 282,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 23 cm ve 19 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "435",
                "439",
                "441",
                "437"
            ],
            "ans": "437",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (23 x 19)."
        },
        {
            "id": 283,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 24 cm ve 20 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "480",
                "482",
                "478",
                "484"
            ],
            "ans": "480",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (24 x 20)."
        },
        {
            "id": 284,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 25 cm ve 21 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "529",
                "525",
                "527",
                "523"
            ],
            "ans": "525",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (25 x 21)."
        },
        {
            "id": 285,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 26 cm ve 22 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "572",
                "574",
                "570",
                "576"
            ],
            "ans": "572",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (26 x 22)."
        },
        {
            "id": 286,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 27 cm ve 23 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "621",
                "625",
                "623",
                "619"
            ],
            "ans": "621",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (27 x 23)."
        },
        {
            "id": 287,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 28 cm ve 24 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "670",
                "674",
                "676",
                "672"
            ],
            "ans": "672",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (28 x 24)."
        },
        {
            "id": 288,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 29 cm ve 25 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "725",
                "729",
                "727",
                "723"
            ],
            "ans": "725",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (29 x 25)."
        },
        {
            "id": 289,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 30 cm ve 26 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "780",
                "782",
                "778",
                "784"
            ],
            "ans": "780",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (30 x 26)."
        },
        {
            "id": 290,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 31 cm ve 27 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "841",
                "835",
                "839",
                "837"
            ],
            "ans": "837",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (31 x 27)."
        },
        {
            "id": 291,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 47 cm ve 38 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1784",
                "1788",
                "1786",
                "1790"
            ],
            "ans": "1786",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (47 x 38)."
        },
        {
            "id": 292,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 48 cm ve 39 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1870",
                "1872",
                "1876",
                "1874"
            ],
            "ans": "1872",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (48 x 39)."
        },
        {
            "id": 293,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 49 cm ve 40 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1964",
                "1960",
                "1962",
                "1958"
            ],
            "ans": "1960",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (49 x 40)."
        },
        {
            "id": 294,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 50 cm ve 41 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2050",
                "2052",
                "2048",
                "2054"
            ],
            "ans": "2050",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (50 x 41)."
        },
        {
            "id": 295,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 51 cm ve 42 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2142",
                "2140",
                "2144",
                "2146"
            ],
            "ans": "2142",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (51 x 42)."
        },
        {
            "id": 296,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 52 cm ve 43 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2240",
                "2234",
                "2238",
                "2236"
            ],
            "ans": "2236",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (52 x 43)."
        },
        {
            "id": 297,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 53 cm ve 44 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2334",
                "2336",
                "2330",
                "2332"
            ],
            "ans": "2332",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (53 x 44)."
        },
        {
            "id": 298,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 54 cm ve 45 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2432",
                "2434",
                "2430",
                "2428"
            ],
            "ans": "2430",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (54 x 45)."
        },
        {
            "id": 299,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 55 cm ve 46 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2534",
                "2528",
                "2532",
                "2530"
            ],
            "ans": "2530",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (55 x 46)."
        },
        {
            "id": 300,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 56 cm ve 47 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2632",
                "2630",
                "2636",
                "2634"
            ],
            "ans": "2632",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (56 x 47)."
        },
        {
            "id": 301,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 2 cm, 3 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "12",
                "17",
                "18",
                "6"
            ],
            "ans": "12",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 302,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 3 cm, 4 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "24",
                "36",
                "29",
                "12"
            ],
            "ans": "24",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 303,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 4 cm, 5 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "40",
                "60",
                "20",
                "45"
            ],
            "ans": "40",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 304,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 5 cm, 6 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "30",
                "90",
                "65",
                "60"
            ],
            "ans": "60",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 305,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 6 cm, 7 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "42",
                "126",
                "84",
                "89"
            ],
            "ans": "84",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 306,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 7 cm, 8 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "168",
                "112",
                "56",
                "117"
            ],
            "ans": "112",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 307,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 8 cm, 9 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "144",
                "216",
                "72",
                "149"
            ],
            "ans": "144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 308,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 9 cm, 10 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "180",
                "270",
                "90",
                "185"
            ],
            "ans": "180",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 309,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 10 cm, 11 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "220",
                "225",
                "330",
                "110"
            ],
            "ans": "220",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 310,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 11 cm, 12 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "396",
                "264",
                "269",
                "132"
            ],
            "ans": "264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 311,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 22 cm, 18 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "797",
                "792",
                "1188",
                "396"
            ],
            "ans": "792",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 312,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 23 cm, 19 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "874",
                "879",
                "437",
                "1311"
            ],
            "ans": "874",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 313,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 24 cm, 20 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "480",
                "1440",
                "965",
                "960"
            ],
            "ans": "960",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 314,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 25 cm, 21 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1050",
                "1055",
                "1575",
                "525"
            ],
            "ans": "1050",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 315,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 26 cm, 22 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "572",
                "1716",
                "1144",
                "1149"
            ],
            "ans": "1144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 316,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 27 cm, 23 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "621",
                "1247",
                "1863",
                "1242"
            ],
            "ans": "1242",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 317,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 28 cm, 24 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1344",
                "2016",
                "1349",
                "672"
            ],
            "ans": "1344",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 318,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 29 cm, 25 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "725",
                "1450",
                "1455",
                "2175"
            ],
            "ans": "1450",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 319,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 30 cm, 26 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1565",
                "780",
                "2340",
                "1560"
            ],
            "ans": "1560",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 320,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 31 cm, 27 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1679",
                "837",
                "2511",
                "1674"
            ],
            "ans": "1674",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 321,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 47 cm, 38 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3572",
                "1786",
                "5358",
                "3577"
            ],
            "ans": "3572",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 322,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 48 cm, 39 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3749",
                "1872",
                "5616",
                "3744"
            ],
            "ans": "3744",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 323,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 49 cm, 40 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1960",
                "3920",
                "5880",
                "3925"
            ],
            "ans": "3920",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 324,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 50 cm, 41 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2050",
                "6150",
                "4105",
                "4100"
            ],
            "ans": "4100",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 325,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 51 cm, 42 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2142",
                "4289",
                "6426",
                "4284"
            ],
            "ans": "4284",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 326,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 52 cm, 43 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4477",
                "2236",
                "4472",
                "6708"
            ],
            "ans": "4472",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 327,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 53 cm, 44 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4664",
                "6996",
                "4669",
                "2332"
            ],
            "ans": "4664",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 328,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 54 cm, 45 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4860",
                "2430",
                "7290",
                "4865"
            ],
            "ans": "4860",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 329,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 55 cm, 46 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5060",
                "7590",
                "2530",
                "5065"
            ],
            "ans": "5060",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 330,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 56 cm, 47 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2632",
                "5269",
                "7896",
                "5264"
            ],
            "ans": "5264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        }
    ],
    "6": [
        {
            "id": 331,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "5",
                "4",
                "6",
                "7"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 332,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "6",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 333,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "10",
                "11",
                "9",
                "8"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 334,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "11",
                "13",
                "12",
                "10"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 335,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "13",
                "14",
                "12"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 336,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "16",
                "14",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 337,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "18",
                "16",
                "17",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 338,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 339,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "21",
                "22",
                "20"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 340,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "22",
                "24",
                "25",
                "23"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 341,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "42",
                "39",
                "41",
                "40"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 342,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "43",
                "44",
                "41",
                "42"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 343,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "44",
                "45",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 344,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "47",
                "48",
                "45",
                "46"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 345,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "48",
                "49",
                "50",
                "47"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 346,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "51",
                "49",
                "50"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 347,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "53",
                "54",
                "52",
                "51"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 348,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "55",
                "53",
                "56"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 349,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "55",
                "58",
                "56",
                "57"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 350,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "60",
                "59",
                "57"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 351,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "84",
                "86",
                "85"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 352,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "86",
                "88",
                "87"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 353,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "91",
                "88",
                "90",
                "89"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 354,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "90",
                "92",
                "91"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 355,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "95",
                "94",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 356,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "97",
                "95",
                "96",
                "94"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 357,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "99",
                "98",
                "97"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 358,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "100",
                "98",
                "101"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 359,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "100",
                "102",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 360,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Doğal Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "105",
                "102",
                "104",
                "103"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 361,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(4, 8) kaçtır?",
            "options": [
                "16",
                "2",
                "8",
                "4"
            ],
            "ans": "4",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 362,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(6, 12) kaçtır?",
            "options": [
                "3",
                "12",
                "24",
                "6"
            ],
            "ans": "6",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 363,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(8, 16) kaçtır?",
            "options": [
                "4",
                "16",
                "8",
                "32"
            ],
            "ans": "8",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 364,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(10, 20) kaçtır?",
            "options": [
                "40",
                "5",
                "20",
                "10"
            ],
            "ans": "10",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 365,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(12, 24) kaçtır?",
            "options": [
                "48",
                "12",
                "6",
                "24"
            ],
            "ans": "12",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 366,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(14, 28) kaçtır?",
            "options": [
                "56",
                "7",
                "28",
                "14"
            ],
            "ans": "14",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 367,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(16, 32) kaçtır?",
            "options": [
                "64",
                "8",
                "32",
                "16"
            ],
            "ans": "16",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 368,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(18, 36) kaçtır?",
            "options": [
                "72",
                "9",
                "36",
                "18"
            ],
            "ans": "18",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 369,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(20, 40) kaçtır?",
            "options": [
                "80",
                "10",
                "40",
                "20"
            ],
            "ans": "20",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 370,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(22, 44) kaçtır?",
            "options": [
                "88",
                "11",
                "44",
                "22"
            ],
            "ans": "22",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 371,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(44, 88) kaçtır?",
            "options": [
                "176",
                "22",
                "88",
                "44"
            ],
            "ans": "44",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 372,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(46, 92) kaçtır?",
            "options": [
                "92",
                "23",
                "184",
                "46"
            ],
            "ans": "46",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 373,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(48, 96) kaçtır?",
            "options": [
                "192",
                "24",
                "96",
                "48"
            ],
            "ans": "48",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 374,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(50, 100) kaçtır?",
            "options": [
                "200",
                "100",
                "50",
                "25"
            ],
            "ans": "50",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 375,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(52, 104) kaçtır?",
            "options": [
                "52",
                "208",
                "104",
                "26"
            ],
            "ans": "52",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 376,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(54, 108) kaçtır?",
            "options": [
                "54",
                "108",
                "27",
                "216"
            ],
            "ans": "54",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 377,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(56, 112) kaçtır?",
            "options": [
                "28",
                "112",
                "224",
                "56"
            ],
            "ans": "56",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 378,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(58, 116) kaçtır?",
            "options": [
                "58",
                "116",
                "29",
                "232"
            ],
            "ans": "58",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 379,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(60, 120) kaçtır?",
            "options": [
                "60",
                "120",
                "30",
                "240"
            ],
            "ans": "60",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 380,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(62, 124) kaçtır?",
            "options": [
                "31",
                "124",
                "248",
                "62"
            ],
            "ans": "62",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 381,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(94, 188) kaçtır?",
            "options": [
                "376",
                "47",
                "188",
                "94"
            ],
            "ans": "94",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 382,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(96, 192) kaçtır?",
            "options": [
                "384",
                "48",
                "192",
                "96"
            ],
            "ans": "96",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 383,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(98, 196) kaçtır?",
            "options": [
                "49",
                "392",
                "196",
                "98"
            ],
            "ans": "98",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 384,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(100, 200) kaçtır?",
            "options": [
                "50",
                "400",
                "200",
                "100"
            ],
            "ans": "100",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 385,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(102, 204) kaçtır?",
            "options": [
                "408",
                "51",
                "204",
                "102"
            ],
            "ans": "102",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 386,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(104, 208) kaçtır?",
            "options": [
                "416",
                "52",
                "208",
                "104"
            ],
            "ans": "104",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 387,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(106, 212) kaçtır?",
            "options": [
                "106",
                "212",
                "53",
                "424"
            ],
            "ans": "106",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 388,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(108, 216) kaçtır?",
            "options": [
                "108",
                "216",
                "432",
                "54"
            ],
            "ans": "108",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 389,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(110, 220) kaçtır?",
            "options": [
                "220",
                "440",
                "55",
                "110"
            ],
            "ans": "110",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 390,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(112, 224) kaçtır?",
            "options": [
                "56",
                "448",
                "112",
                "224"
            ],
            "ans": "112",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 391,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 2} kümesinin eleman sayısı kaçtır?",
            "options": [
                "1",
                "2",
                "3",
                "4"
            ],
            "ans": "2",
            "hint": "Kümenin içinde 1'den 2'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 392,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 3} kümesinin eleman sayısı kaçtır?",
            "options": [
                "4",
                "2",
                "3",
                "5"
            ],
            "ans": "3",
            "hint": "Kümenin içinde 1'den 3'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 393,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 4} kümesinin eleman sayısı kaçtır?",
            "options": [
                "4",
                "3",
                "5",
                "6"
            ],
            "ans": "4",
            "hint": "Kümenin içinde 1'den 4'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 394,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 5} kümesinin eleman sayısı kaçtır?",
            "options": [
                "4",
                "6",
                "5",
                "7"
            ],
            "ans": "5",
            "hint": "Kümenin içinde 1'den 5'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 395,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 6} kümesinin eleman sayısı kaçtır?",
            "options": [
                "5",
                "7",
                "8",
                "6"
            ],
            "ans": "6",
            "hint": "Kümenin içinde 1'den 6'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 396,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 7} kümesinin eleman sayısı kaçtır?",
            "options": [
                "7",
                "8",
                "9",
                "6"
            ],
            "ans": "7",
            "hint": "Kümenin içinde 1'den 7'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 397,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 8} kümesinin eleman sayısı kaçtır?",
            "options": [
                "8",
                "10",
                "9",
                "7"
            ],
            "ans": "8",
            "hint": "Kümenin içinde 1'den 8'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 398,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 9} kümesinin eleman sayısı kaçtır?",
            "options": [
                "11",
                "8",
                "10",
                "9"
            ],
            "ans": "9",
            "hint": "Kümenin içinde 1'den 9'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 399,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 10} kümesinin eleman sayısı kaçtır?",
            "options": [
                "12",
                "9",
                "11",
                "10"
            ],
            "ans": "10",
            "hint": "Kümenin içinde 1'den 10'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 400,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "easy",
            "q": "A = {1, 2, 3, ..., 11} kümesinin eleman sayısı kaçtır?",
            "options": [
                "13",
                "11",
                "12",
                "10"
            ],
            "ans": "11",
            "hint": "Kümenin içinde 1'den 11'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 401,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 22} kümesinin eleman sayısı kaçtır?",
            "options": [
                "24",
                "22",
                "23",
                "21"
            ],
            "ans": "22",
            "hint": "Kümenin içinde 1'den 22'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 402,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 23} kümesinin eleman sayısı kaçtır?",
            "options": [
                "22",
                "24",
                "25",
                "23"
            ],
            "ans": "23",
            "hint": "Kümenin içinde 1'den 23'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 403,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 24} kümesinin eleman sayısı kaçtır?",
            "options": [
                "26",
                "23",
                "25",
                "24"
            ],
            "ans": "24",
            "hint": "Kümenin içinde 1'den 24'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 404,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 25} kümesinin eleman sayısı kaçtır?",
            "options": [
                "24",
                "26",
                "27",
                "25"
            ],
            "ans": "25",
            "hint": "Kümenin içinde 1'den 25'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 405,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 26} kümesinin eleman sayısı kaçtır?",
            "options": [
                "28",
                "27",
                "25",
                "26"
            ],
            "ans": "26",
            "hint": "Kümenin içinde 1'den 26'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 406,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 27} kümesinin eleman sayısı kaçtır?",
            "options": [
                "29",
                "27",
                "28",
                "26"
            ],
            "ans": "27",
            "hint": "Kümenin içinde 1'den 27'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 407,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 28} kümesinin eleman sayısı kaçtır?",
            "options": [
                "29",
                "27",
                "28",
                "30"
            ],
            "ans": "28",
            "hint": "Kümenin içinde 1'den 28'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 408,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 29} kümesinin eleman sayısı kaçtır?",
            "options": [
                "31",
                "29",
                "30",
                "28"
            ],
            "ans": "29",
            "hint": "Kümenin içinde 1'den 29'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 409,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 30} kümesinin eleman sayısı kaçtır?",
            "options": [
                "32",
                "30",
                "31",
                "29"
            ],
            "ans": "30",
            "hint": "Kümenin içinde 1'den 30'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 410,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "medium",
            "q": "A = {1, 2, 3, ..., 31} kümesinin eleman sayısı kaçtır?",
            "options": [
                "31",
                "33",
                "32",
                "30"
            ],
            "ans": "31",
            "hint": "Kümenin içinde 1'den 31'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 411,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 47} kümesinin eleman sayısı kaçtır?",
            "options": [
                "47",
                "48",
                "46",
                "49"
            ],
            "ans": "47",
            "hint": "Kümenin içinde 1'den 47'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 412,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 48} kümesinin eleman sayısı kaçtır?",
            "options": [
                "48",
                "49",
                "50",
                "47"
            ],
            "ans": "48",
            "hint": "Kümenin içinde 1'den 48'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 413,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 49} kümesinin eleman sayısı kaçtır?",
            "options": [
                "49",
                "50",
                "48",
                "51"
            ],
            "ans": "49",
            "hint": "Kümenin içinde 1'den 49'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 414,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 50} kümesinin eleman sayısı kaçtır?",
            "options": [
                "52",
                "49",
                "51",
                "50"
            ],
            "ans": "50",
            "hint": "Kümenin içinde 1'den 50'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 415,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 51} kümesinin eleman sayısı kaçtır?",
            "options": [
                "53",
                "50",
                "52",
                "51"
            ],
            "ans": "51",
            "hint": "Kümenin içinde 1'den 51'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 416,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 52} kümesinin eleman sayısı kaçtır?",
            "options": [
                "54",
                "51",
                "53",
                "52"
            ],
            "ans": "52",
            "hint": "Kümenin içinde 1'den 52'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 417,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 53} kümesinin eleman sayısı kaçtır?",
            "options": [
                "53",
                "54",
                "55",
                "52"
            ],
            "ans": "53",
            "hint": "Kümenin içinde 1'den 53'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 418,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 54} kümesinin eleman sayısı kaçtır?",
            "options": [
                "54",
                "53",
                "55",
                "56"
            ],
            "ans": "54",
            "hint": "Kümenin içinde 1'den 54'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 419,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 55} kümesinin eleman sayısı kaçtır?",
            "options": [
                "55",
                "57",
                "56",
                "54"
            ],
            "ans": "55",
            "hint": "Kümenin içinde 1'den 55'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 420,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kümeler",
            "difficulty": "hard",
            "q": "A = {1, 2, 3, ..., 56} kümesinin eleman sayısı kaçtır?",
            "options": [
                "55",
                "56",
                "57",
                "58"
            ],
            "ans": "56",
            "hint": "Kümenin içinde 1'den 56'e kadar ardışık sayılar bulunmaktadır."
        },
        {
            "id": 421,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "6",
                "7",
                "5",
                "4"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 422,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "6",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 423,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "11",
                "10",
                "8",
                "9"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 424,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "12",
                "10",
                "13",
                "11"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 425,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "14",
                "12",
                "15"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 426,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "16",
                "14",
                "15"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 427,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "18",
                "16",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 428,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 429,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "22",
                "20",
                "23"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 430,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "24",
                "23",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 431,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "41",
                "40",
                "39",
                "42"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 432,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "42",
                "43",
                "41",
                "44"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 433,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "45",
                "44",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 434,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "45",
                "46",
                "47",
                "48"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 435,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "48",
                "47",
                "49"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 436,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "51",
                "50",
                "52",
                "49"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 437,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "53",
                "52",
                "51",
                "54"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 438,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "56",
                "53",
                "55"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 439,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "57",
                "56",
                "58",
                "55"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 440,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "60",
                "57",
                "59"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 441,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "85",
                "86",
                "84"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 442,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "86",
                "87",
                "88",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 443,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "90",
                "88",
                "91",
                "89"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 444,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "91",
                "93",
                "90"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 445,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "92",
                "94",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 446,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "96",
                "94",
                "97"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 447,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "99",
                "96",
                "97"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 448,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "100",
                "98",
                "101"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 449,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "100",
                "102",
                "103",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 450,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılar",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "105",
                "104",
                "102"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 451,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "4/6 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "3/2",
                "2/4",
                "3/3",
                "2/3"
            ],
            "ans": "2/3",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 452,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "6/8 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/4",
                "3/4",
                "4/3",
                "3/5"
            ],
            "ans": "3/4",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 453,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "8/10 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/5",
                "5/5",
                "4/6",
                "5/4"
            ],
            "ans": "4/5",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 454,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "10/12 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/6",
                "6/6",
                "5/7",
                "6/5"
            ],
            "ans": "5/6",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 455,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "12/14 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "6/7",
                "7/7",
                "7/6",
                "6/8"
            ],
            "ans": "6/7",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 456,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "14/16 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "8/8",
                "7/8",
                "7/9",
                "8/7"
            ],
            "ans": "7/8",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 457,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "16/18 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "8/9",
                "9/9",
                "9/8",
                "8/10"
            ],
            "ans": "8/9",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 458,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "18/20 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "10/9",
                "9/11",
                "10/10",
                "9/10"
            ],
            "ans": "9/10",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 459,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "20/22 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "10/11",
                "11/11",
                "11/10",
                "10/12"
            ],
            "ans": "10/11",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 460,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "easy",
            "q": "22/24 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/13",
                "12/12",
                "11/12",
                "12/11"
            ],
            "ans": "11/12",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 461,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "44/36 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "18/22",
                "22/19",
                "23/18",
                "22/18"
            ],
            "ans": "22/18",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 462,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "46/38 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "24/19",
                "23/19",
                "23/20",
                "19/23"
            ],
            "ans": "23/19",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 463,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "48/40 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "24/21",
                "20/24",
                "25/20",
                "24/20"
            ],
            "ans": "24/20",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 464,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "50/42 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "21/25",
                "25/21",
                "26/21",
                "25/22"
            ],
            "ans": "25/21",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 465,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "52/44 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/22",
                "22/26",
                "26/22",
                "26/23"
            ],
            "ans": "26/22",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 466,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "54/46 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/24",
                "23/27",
                "27/23",
                "28/23"
            ],
            "ans": "27/23",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 467,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "56/48 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "24/28",
                "28/24",
                "29/24",
                "28/25"
            ],
            "ans": "28/24",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 468,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "58/50 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "29/26",
                "30/25",
                "29/25",
                "25/29"
            ],
            "ans": "29/25",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 469,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "60/52 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "30/27",
                "26/30",
                "31/26",
                "30/26"
            ],
            "ans": "30/26",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 470,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "medium",
            "q": "62/54 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/31",
                "31/27",
                "32/27",
                "31/28"
            ],
            "ans": "31/27",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 471,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "94/76 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "48/38",
                "38/47",
                "47/38",
                "47/39"
            ],
            "ans": "47/38",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 472,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "96/78 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "49/39",
                "48/40",
                "48/39",
                "39/48"
            ],
            "ans": "48/39",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 473,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "98/80 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "49/41",
                "50/40",
                "49/40",
                "40/49"
            ],
            "ans": "49/40",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 474,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "100/82 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "41/50",
                "50/41",
                "51/41",
                "50/42"
            ],
            "ans": "50/41",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 475,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "102/84 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "42/51",
                "51/43",
                "51/42",
                "52/42"
            ],
            "ans": "51/42",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 476,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "104/86 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "43/52",
                "52/44",
                "53/43",
                "52/43"
            ],
            "ans": "52/43",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 477,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "106/88 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/44",
                "44/53",
                "53/45",
                "53/44"
            ],
            "ans": "53/44",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 478,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "108/90 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/45",
                "55/45",
                "54/46",
                "45/54"
            ],
            "ans": "54/45",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 479,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "110/92 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "55/46",
                "56/46",
                "46/55",
                "55/47"
            ],
            "ans": "55/46",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 480,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kesirlerle İşlemler",
            "difficulty": "hard",
            "q": "112/94 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "56/48",
                "57/47",
                "47/56",
                "56/47"
            ],
            "ans": "56/47",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 481,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "2/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.0",
                "1.2",
                "0.02",
                "0.2"
            ],
            "ans": "0.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 482,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "3/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "3.0",
                "1.3",
                "0.03",
                "0.3"
            ],
            "ans": "0.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 483,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "4/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.4",
                "0.04",
                "4.0",
                "1.4"
            ],
            "ans": "0.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 484,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "5/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.5",
                "1.5",
                "5.0",
                "0.05"
            ],
            "ans": "0.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 485,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "6/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "6.0",
                "0.6",
                "0.06",
                "1.6"
            ],
            "ans": "0.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 486,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "7/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.7",
                "7.0",
                "0.07",
                "1.7"
            ],
            "ans": "0.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 487,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "8/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.8",
                "8.0",
                "0.08",
                "1.8"
            ],
            "ans": "0.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 488,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "9/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.9",
                "0.09",
                "9.0",
                "1.9"
            ],
            "ans": "0.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 489,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "10/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.0",
                "10.0",
                "0.10",
                "1.0"
            ],
            "ans": "1.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 490,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "easy",
            "q": "11/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "1.1",
                "0.11",
                "11.0",
                "2.1"
            ],
            "ans": "1.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 491,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "22/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.2",
                "22.0",
                "0.22",
                "3.2"
            ],
            "ans": "2.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 492,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "23/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.3",
                "3.3",
                "23.0",
                "0.23"
            ],
            "ans": "2.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 493,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "24/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.4",
                "0.24",
                "3.4",
                "24.0"
            ],
            "ans": "2.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 494,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "25/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "25.0",
                "3.5",
                "0.25",
                "2.5"
            ],
            "ans": "2.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 495,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "26/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.6",
                "0.26",
                "3.6",
                "26.0"
            ],
            "ans": "2.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 496,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "27/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.7",
                "0.27",
                "27.0",
                "3.7"
            ],
            "ans": "2.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 497,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "28/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "2.8",
                "0.28",
                "3.8",
                "28.0"
            ],
            "ans": "2.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 498,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "29/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "29.0",
                "3.9",
                "0.29",
                "2.9"
            ],
            "ans": "2.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 499,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "30/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.30",
                "3.0",
                "4.0",
                "30.0"
            ],
            "ans": "3.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 500,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "medium",
            "q": "31/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "31.0",
                "4.1",
                "0.31",
                "3.1"
            ],
            "ans": "3.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 501,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "47/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "47.0",
                "0.47",
                "5.7",
                "4.7"
            ],
            "ans": "4.7",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 502,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "48/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.48",
                "5.8",
                "4.8",
                "48.0"
            ],
            "ans": "4.8",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 503,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "49/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "0.49",
                "49.0",
                "4.9",
                "5.9"
            ],
            "ans": "4.9",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 504,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "50/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "6.0",
                "5.0",
                "50.0",
                "0.50"
            ],
            "ans": "5.0",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 505,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "51/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.1",
                "0.51",
                "6.1",
                "51.0"
            ],
            "ans": "5.1",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 506,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "52/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.2",
                "0.52",
                "52.0",
                "6.2"
            ],
            "ans": "5.2",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 507,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "53/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.3",
                "0.53",
                "6.3",
                "53.0"
            ],
            "ans": "5.3",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 508,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "54/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "6.4",
                "0.54",
                "54.0",
                "5.4"
            ],
            "ans": "5.4",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 509,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "55/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "55.0",
                "0.55",
                "6.5",
                "5.5"
            ],
            "ans": "5.5",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 510,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Ondalık Gösterim",
            "difficulty": "hard",
            "q": "56/10 kesrinin ondalık gösterimi nedir?",
            "options": [
                "5.6",
                "6.6",
                "0.56",
                "56.0"
            ],
            "ans": "5.6",
            "hint": "Paydayı 10 olduğu için virgülden sonra bir basamak olmalıdır."
        },
        {
            "id": 511,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 2/3'dir. Bu sınıfta 4 kız varsa kaç erkek vardır?",
            "options": [
                "5",
                "9",
                "6",
                "8"
            ],
            "ans": "6",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 512,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 3/4'dir. Bu sınıfta 6 kız varsa kaç erkek vardır?",
            "options": [
                "8",
                "10",
                "12",
                "6"
            ],
            "ans": "8",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 513,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 4/5'dir. Bu sınıfta 8 kız varsa kaç erkek vardır?",
            "options": [
                "7",
                "10",
                "12",
                "15"
            ],
            "ans": "10",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 514,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 5/6'dir. Bu sınıfta 10 kız varsa kaç erkek vardır?",
            "options": [
                "14",
                "8",
                "18",
                "12"
            ],
            "ans": "12",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 515,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 6/7'dir. Bu sınıfta 12 kız varsa kaç erkek vardır?",
            "options": [
                "14",
                "21",
                "16",
                "9"
            ],
            "ans": "14",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 516,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 7/8'dir. Bu sınıfta 14 kız varsa kaç erkek vardır?",
            "options": [
                "18",
                "16",
                "24",
                "10"
            ],
            "ans": "16",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 517,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 8/9'dir. Bu sınıfta 16 kız varsa kaç erkek vardır?",
            "options": [
                "18",
                "27",
                "11",
                "20"
            ],
            "ans": "18",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 518,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 9/10'dir. Bu sınıfta 18 kız varsa kaç erkek vardır?",
            "options": [
                "20",
                "30",
                "22",
                "12"
            ],
            "ans": "20",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 519,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 10/11'dir. Bu sınıfta 20 kız varsa kaç erkek vardır?",
            "options": [
                "24",
                "22",
                "13",
                "33"
            ],
            "ans": "22",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 520,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 11/12'dir. Bu sınıfta 22 kız varsa kaç erkek vardır?",
            "options": [
                "24",
                "26",
                "36",
                "14"
            ],
            "ans": "24",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 521,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 22/18'dir. Bu sınıfta 44 kız varsa kaç erkek vardır?",
            "options": [
                "36",
                "38",
                "54",
                "20"
            ],
            "ans": "36",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 522,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 23/19'dir. Bu sınıfta 46 kız varsa kaç erkek vardır?",
            "options": [
                "40",
                "21",
                "38",
                "57"
            ],
            "ans": "38",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 523,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 24/20'dir. Bu sınıfta 48 kız varsa kaç erkek vardır?",
            "options": [
                "22",
                "60",
                "40",
                "42"
            ],
            "ans": "40",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 524,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 25/21'dir. Bu sınıfta 50 kız varsa kaç erkek vardır?",
            "options": [
                "23",
                "63",
                "44",
                "42"
            ],
            "ans": "42",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 525,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 26/22'dir. Bu sınıfta 52 kız varsa kaç erkek vardır?",
            "options": [
                "44",
                "66",
                "46",
                "24"
            ],
            "ans": "44",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 526,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 27/23'dir. Bu sınıfta 54 kız varsa kaç erkek vardır?",
            "options": [
                "46",
                "69",
                "25",
                "48"
            ],
            "ans": "46",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 527,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 28/24'dir. Bu sınıfta 56 kız varsa kaç erkek vardır?",
            "options": [
                "48",
                "72",
                "26",
                "50"
            ],
            "ans": "48",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 528,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 29/25'dir. Bu sınıfta 58 kız varsa kaç erkek vardır?",
            "options": [
                "50",
                "75",
                "27",
                "52"
            ],
            "ans": "50",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 529,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 30/26'dir. Bu sınıfta 60 kız varsa kaç erkek vardır?",
            "options": [
                "52",
                "54",
                "78",
                "28"
            ],
            "ans": "52",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 530,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 31/27'dir. Bu sınıfta 62 kız varsa kaç erkek vardır?",
            "options": [
                "54",
                "81",
                "56",
                "29"
            ],
            "ans": "54",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 531,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 47/38'dir. Bu sınıfta 94 kız varsa kaç erkek vardır?",
            "options": [
                "76",
                "114",
                "40",
                "78"
            ],
            "ans": "76",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 532,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 48/39'dir. Bu sınıfta 96 kız varsa kaç erkek vardır?",
            "options": [
                "80",
                "78",
                "117",
                "41"
            ],
            "ans": "78",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 533,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 49/40'dir. Bu sınıfta 98 kız varsa kaç erkek vardır?",
            "options": [
                "120",
                "82",
                "42",
                "80"
            ],
            "ans": "80",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 534,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 50/41'dir. Bu sınıfta 100 kız varsa kaç erkek vardır?",
            "options": [
                "82",
                "123",
                "43",
                "84"
            ],
            "ans": "82",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 535,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 51/42'dir. Bu sınıfta 102 kız varsa kaç erkek vardır?",
            "options": [
                "126",
                "84",
                "44",
                "86"
            ],
            "ans": "84",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 536,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 52/43'dir. Bu sınıfta 104 kız varsa kaç erkek vardır?",
            "options": [
                "86",
                "88",
                "129",
                "45"
            ],
            "ans": "86",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 537,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 53/44'dir. Bu sınıfta 106 kız varsa kaç erkek vardır?",
            "options": [
                "132",
                "90",
                "88",
                "46"
            ],
            "ans": "88",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 538,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 54/45'dir. Bu sınıfta 108 kız varsa kaç erkek vardır?",
            "options": [
                "90",
                "135",
                "47",
                "92"
            ],
            "ans": "90",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 539,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 55/46'dir. Bu sınıfta 110 kız varsa kaç erkek vardır?",
            "options": [
                "94",
                "92",
                "138",
                "48"
            ],
            "ans": "92",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 540,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 56/47'dir. Bu sınıfta 112 kız varsa kaç erkek vardır?",
            "options": [
                "49",
                "141",
                "94",
                "96"
            ],
            "ans": "94",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 541,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "2",
                "5",
                "4",
                "3"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 542,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "6",
                "3",
                "5",
                "4"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 543,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "4",
                "7",
                "6",
                "5"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 544,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "8",
                "5",
                "7",
                "6"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 545,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "9",
                "7",
                "8",
                "6"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 546,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "10",
                "7",
                "9",
                "8"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 547,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "9",
                "10",
                "11",
                "8"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 548,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "10",
                "11",
                "12",
                "9"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 549,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 550,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "11",
                "13",
                "14",
                "12"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 551,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "18",
                "20",
                "19",
                "17"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 552,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "21",
                "18",
                "20",
                "19"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 553,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "20",
                "21",
                "19",
                "22"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 554,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "20",
                "23",
                "22",
                "21"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 555,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "21",
                "24",
                "23",
                "22"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 556,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "24",
                "23",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 557,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "24",
                "25",
                "23",
                "26"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 558,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "27",
                "26",
                "25",
                "24"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 559,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "26",
                "27",
                "28",
                "25"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 560,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "29",
                "26",
                "27",
                "28"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 561,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "37",
                "39",
                "40",
                "38"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 562,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "38",
                "40",
                "41",
                "39"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 563,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "40",
                "39",
                "41",
                "42"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 564,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "41",
                "42",
                "43",
                "40"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 565,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "44",
                "42",
                "43",
                "41"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 566,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "42",
                "45",
                "44",
                "43"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 567,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "46",
                "43",
                "45",
                "44"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 568,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "47",
                "46",
                "44",
                "45"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 569,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "45",
                "47",
                "46",
                "48"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 570,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "49",
                "46",
                "48",
                "47"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 571,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 2 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "4",
                "6",
                "8",
                "12"
            ],
            "ans": "12",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 2)"
        },
        {
            "id": 572,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 3 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "12",
                "18",
                "9",
                "6"
            ],
            "ans": "18",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 3)"
        },
        {
            "id": 573,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 4 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "8",
                "12",
                "24",
                "16"
            ],
            "ans": "24",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 4)"
        },
        {
            "id": 574,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 5 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "15",
                "30",
                "10",
                "20"
            ],
            "ans": "30",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 5)"
        },
        {
            "id": 575,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 6 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "18",
                "12",
                "36",
                "24"
            ],
            "ans": "36",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 6)"
        },
        {
            "id": 576,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 7 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "14",
                "42",
                "21",
                "28"
            ],
            "ans": "42",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 7)"
        },
        {
            "id": 577,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 8 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "16",
                "24",
                "48",
                "32"
            ],
            "ans": "48",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 8)"
        },
        {
            "id": 578,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 9 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "18",
                "27",
                "54",
                "36"
            ],
            "ans": "54",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 9)"
        },
        {
            "id": 579,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 10 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "60",
                "30",
                "20",
                "40"
            ],
            "ans": "60",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 10)"
        },
        {
            "id": 580,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 11 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "44",
                "22",
                "33",
                "66"
            ],
            "ans": "66",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 11)"
        },
        {
            "id": 581,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 22 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "44",
                "88",
                "66",
                "132"
            ],
            "ans": "132",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 22)"
        },
        {
            "id": 582,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 23 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "69",
                "92",
                "138",
                "46"
            ],
            "ans": "138",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 23)"
        },
        {
            "id": 583,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 24 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "72",
                "96",
                "144",
                "48"
            ],
            "ans": "144",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 24)"
        },
        {
            "id": 584,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 25 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "150",
                "75",
                "50",
                "100"
            ],
            "ans": "150",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 25)"
        },
        {
            "id": 585,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 26 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "104",
                "78",
                "52",
                "156"
            ],
            "ans": "156",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 26)"
        },
        {
            "id": 586,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 27 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "54",
                "108",
                "81",
                "162"
            ],
            "ans": "162",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 27)"
        },
        {
            "id": 587,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 28 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "168",
                "84",
                "112",
                "56"
            ],
            "ans": "168",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 28)"
        },
        {
            "id": 588,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 29 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "174",
                "87",
                "116",
                "58"
            ],
            "ans": "174",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 29)"
        },
        {
            "id": 589,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 30 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "60",
                "120",
                "90",
                "180"
            ],
            "ans": "180",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 30)"
        },
        {
            "id": 590,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 31 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "124",
                "62",
                "93",
                "186"
            ],
            "ans": "186",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 31)"
        },
        {
            "id": 591,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 47 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "94",
                "141",
                "188",
                "282"
            ],
            "ans": "282",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 47)"
        },
        {
            "id": 592,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 48 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "96",
                "144",
                "288",
                "192"
            ],
            "ans": "288",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 48)"
        },
        {
            "id": 593,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 49 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "98",
                "196",
                "147",
                "294"
            ],
            "ans": "294",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 49)"
        },
        {
            "id": 594,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 50 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "300",
                "150",
                "100",
                "200"
            ],
            "ans": "300",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 50)"
        },
        {
            "id": 595,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 51 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "306",
                "153",
                "204",
                "102"
            ],
            "ans": "306",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 51)"
        },
        {
            "id": 596,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 52 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "208",
                "156",
                "312",
                "104"
            ],
            "ans": "312",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 52)"
        },
        {
            "id": 597,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 53 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "159",
                "318",
                "106",
                "212"
            ],
            "ans": "318",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 53)"
        },
        {
            "id": 598,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 54 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "324",
                "162",
                "108",
                "216"
            ],
            "ans": "324",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 54)"
        },
        {
            "id": 599,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 55 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "220",
                "110",
                "165",
                "330"
            ],
            "ans": "330",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 55)"
        },
        {
            "id": 600,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 56 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "224",
                "112",
                "336",
                "168"
            ],
            "ans": "336",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 56)"
        },
        {
            "id": 601,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 2 cm ve 3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "6",
                "8",
                "4",
                "10"
            ],
            "ans": "6",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (2 x 3)."
        },
        {
            "id": 602,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 3 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "16",
                "12",
                "14",
                "10"
            ],
            "ans": "12",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (3 x 4)."
        },
        {
            "id": 603,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 4 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "20",
                "24",
                "22",
                "18"
            ],
            "ans": "20",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (4 x 5)."
        },
        {
            "id": 604,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 5 cm ve 6 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "30",
                "32",
                "28",
                "34"
            ],
            "ans": "30",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (5 x 6)."
        },
        {
            "id": 605,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 6 cm ve 7 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "46",
                "42",
                "44",
                "40"
            ],
            "ans": "42",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (6 x 7)."
        },
        {
            "id": 606,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 7 cm ve 8 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "56",
                "58",
                "60",
                "54"
            ],
            "ans": "56",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (7 x 8)."
        },
        {
            "id": 607,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 8 cm ve 9 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "70",
                "74",
                "72",
                "76"
            ],
            "ans": "72",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (8 x 9)."
        },
        {
            "id": 608,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 9 cm ve 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "90",
                "92",
                "88",
                "94"
            ],
            "ans": "90",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (9 x 10)."
        },
        {
            "id": 609,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 10 cm ve 11 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "110",
                "112",
                "108",
                "114"
            ],
            "ans": "110",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (10 x 11)."
        },
        {
            "id": 610,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 11 cm ve 12 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "132",
                "134",
                "136",
                "130"
            ],
            "ans": "132",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (11 x 12)."
        },
        {
            "id": 611,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 22 cm ve 18 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "396",
                "398",
                "394",
                "400"
            ],
            "ans": "396",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (22 x 18)."
        },
        {
            "id": 612,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 23 cm ve 19 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "435",
                "439",
                "437",
                "441"
            ],
            "ans": "437",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (23 x 19)."
        },
        {
            "id": 613,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 24 cm ve 20 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "480",
                "482",
                "478",
                "484"
            ],
            "ans": "480",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (24 x 20)."
        },
        {
            "id": 614,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 25 cm ve 21 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "525",
                "527",
                "523",
                "529"
            ],
            "ans": "525",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (25 x 21)."
        },
        {
            "id": 615,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 26 cm ve 22 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "576",
                "572",
                "574",
                "570"
            ],
            "ans": "572",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (26 x 22)."
        },
        {
            "id": 616,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 27 cm ve 23 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "621",
                "623",
                "619",
                "625"
            ],
            "ans": "621",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (27 x 23)."
        },
        {
            "id": 617,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 28 cm ve 24 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "672",
                "674",
                "676",
                "670"
            ],
            "ans": "672",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (28 x 24)."
        },
        {
            "id": 618,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 29 cm ve 25 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "729",
                "727",
                "725",
                "723"
            ],
            "ans": "725",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (29 x 25)."
        },
        {
            "id": 619,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 30 cm ve 26 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "780",
                "782",
                "778",
                "784"
            ],
            "ans": "780",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (30 x 26)."
        },
        {
            "id": 620,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 31 cm ve 27 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "839",
                "835",
                "841",
                "837"
            ],
            "ans": "837",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (31 x 27)."
        },
        {
            "id": 621,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 47 cm ve 38 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1786",
                "1790",
                "1788",
                "1784"
            ],
            "ans": "1786",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (47 x 38)."
        },
        {
            "id": 622,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 48 cm ve 39 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1876",
                "1870",
                "1874",
                "1872"
            ],
            "ans": "1872",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (48 x 39)."
        },
        {
            "id": 623,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 49 cm ve 40 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1960",
                "1958",
                "1964",
                "1962"
            ],
            "ans": "1960",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (49 x 40)."
        },
        {
            "id": 624,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 50 cm ve 41 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2048",
                "2052",
                "2054",
                "2050"
            ],
            "ans": "2050",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (50 x 41)."
        },
        {
            "id": 625,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 51 cm ve 42 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2140",
                "2142",
                "2146",
                "2144"
            ],
            "ans": "2142",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (51 x 42)."
        },
        {
            "id": 626,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 52 cm ve 43 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2238",
                "2240",
                "2234",
                "2236"
            ],
            "ans": "2236",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (52 x 43)."
        },
        {
            "id": 627,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 53 cm ve 44 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2330",
                "2334",
                "2336",
                "2332"
            ],
            "ans": "2332",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (53 x 44)."
        },
        {
            "id": 628,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 54 cm ve 45 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2428",
                "2434",
                "2432",
                "2430"
            ],
            "ans": "2430",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (54 x 45)."
        },
        {
            "id": 629,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 55 cm ve 46 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2534",
                "2530",
                "2532",
                "2528"
            ],
            "ans": "2530",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (55 x 46)."
        },
        {
            "id": 630,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Alan Ölçme",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 56 cm ve 47 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2634",
                "2632",
                "2630",
                "2636"
            ],
            "ans": "2632",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (56 x 47)."
        },
        {
            "id": 631,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 2 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "6",
                "12",
                "4",
                "8"
            ],
            "ans": "12",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 2)"
        },
        {
            "id": 632,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 3 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "12",
                "6",
                "9",
                "18"
            ],
            "ans": "18",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 3)"
        },
        {
            "id": 633,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 4 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "24",
                "12",
                "8",
                "16"
            ],
            "ans": "24",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 4)"
        },
        {
            "id": 634,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 5 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "10",
                "20",
                "15",
                "30"
            ],
            "ans": "30",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 5)"
        },
        {
            "id": 635,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 6 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "24",
                "12",
                "18",
                "36"
            ],
            "ans": "36",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 6)"
        },
        {
            "id": 636,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 7 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "14",
                "42",
                "21",
                "28"
            ],
            "ans": "42",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 7)"
        },
        {
            "id": 637,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 8 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "48",
                "24",
                "16",
                "32"
            ],
            "ans": "48",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 8)"
        },
        {
            "id": 638,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 9 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "36",
                "27",
                "54",
                "18"
            ],
            "ans": "54",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 9)"
        },
        {
            "id": 639,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 10 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "20",
                "30",
                "60",
                "40"
            ],
            "ans": "60",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 10)"
        },
        {
            "id": 640,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "easy",
            "q": "Yarıçapı 11 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "66",
                "33",
                "22",
                "44"
            ],
            "ans": "66",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 11)"
        },
        {
            "id": 641,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 22 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "66",
                "132",
                "88",
                "44"
            ],
            "ans": "132",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 22)"
        },
        {
            "id": 642,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 23 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "92",
                "46",
                "69",
                "138"
            ],
            "ans": "138",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 23)"
        },
        {
            "id": 643,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 24 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "144",
                "72",
                "96",
                "48"
            ],
            "ans": "144",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 24)"
        },
        {
            "id": 644,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 25 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "75",
                "100",
                "50",
                "150"
            ],
            "ans": "150",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 25)"
        },
        {
            "id": 645,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 26 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "156",
                "78",
                "104",
                "52"
            ],
            "ans": "156",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 26)"
        },
        {
            "id": 646,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 27 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "108",
                "54",
                "81",
                "162"
            ],
            "ans": "162",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 27)"
        },
        {
            "id": 647,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 28 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "56",
                "112",
                "168",
                "84"
            ],
            "ans": "168",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 28)"
        },
        {
            "id": 648,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 29 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "116",
                "174",
                "87",
                "58"
            ],
            "ans": "174",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 29)"
        },
        {
            "id": 649,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 30 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "120",
                "180",
                "60",
                "90"
            ],
            "ans": "180",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 30)"
        },
        {
            "id": 650,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "medium",
            "q": "Yarıçapı 31 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "186",
                "124",
                "93",
                "62"
            ],
            "ans": "186",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 31)"
        },
        {
            "id": 651,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 47 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "141",
                "282",
                "188",
                "94"
            ],
            "ans": "282",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 47)"
        },
        {
            "id": 652,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 48 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "288",
                "144",
                "96",
                "192"
            ],
            "ans": "288",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 48)"
        },
        {
            "id": 653,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 49 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "294",
                "147",
                "98",
                "196"
            ],
            "ans": "294",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 49)"
        },
        {
            "id": 654,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 50 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "100",
                "300",
                "150",
                "200"
            ],
            "ans": "300",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 50)"
        },
        {
            "id": 655,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 51 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "204",
                "102",
                "153",
                "306"
            ],
            "ans": "306",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 51)"
        },
        {
            "id": 656,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 52 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "312",
                "156",
                "104",
                "208"
            ],
            "ans": "312",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 52)"
        },
        {
            "id": 657,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 53 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "318",
                "159",
                "106",
                "212"
            ],
            "ans": "318",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 53)"
        },
        {
            "id": 658,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 54 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "324",
                "216",
                "162",
                "108"
            ],
            "ans": "324",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 54)"
        },
        {
            "id": 659,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 55 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "330",
                "165",
                "110",
                "220"
            ],
            "ans": "330",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 55)"
        },
        {
            "id": 660,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember",
            "difficulty": "hard",
            "q": "Yarıçapı 56 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "336",
                "224",
                "168",
                "112"
            ],
            "ans": "336",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 56)"
        },
        {
            "id": 661,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 2 cm, 3 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "17",
                "6",
                "18",
                "12"
            ],
            "ans": "12",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 662,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 3 cm, 4 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "24",
                "36",
                "29",
                "12"
            ],
            "ans": "24",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 663,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 4 cm, 5 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "40",
                "60",
                "20",
                "45"
            ],
            "ans": "40",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 664,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 5 cm, 6 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "30",
                "65",
                "60",
                "90"
            ],
            "ans": "60",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 665,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 6 cm, 7 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "84",
                "42",
                "89",
                "126"
            ],
            "ans": "84",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 666,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 7 cm, 8 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "112",
                "168",
                "117",
                "56"
            ],
            "ans": "112",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 667,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 8 cm, 9 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "216",
                "144",
                "149",
                "72"
            ],
            "ans": "144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 668,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 9 cm, 10 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "185",
                "90",
                "270",
                "180"
            ],
            "ans": "180",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 669,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 10 cm, 11 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "110",
                "330",
                "225",
                "220"
            ],
            "ans": "220",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 670,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 11 cm, 12 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "264",
                "396",
                "132",
                "269"
            ],
            "ans": "264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 671,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 22 cm, 18 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "797",
                "1188",
                "792",
                "396"
            ],
            "ans": "792",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 672,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 23 cm, 19 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "879",
                "874",
                "437",
                "1311"
            ],
            "ans": "874",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 673,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 24 cm, 20 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1440",
                "965",
                "480",
                "960"
            ],
            "ans": "960",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 674,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 25 cm, 21 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1055",
                "525",
                "1575",
                "1050"
            ],
            "ans": "1050",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 675,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 26 cm, 22 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "572",
                "1716",
                "1144",
                "1149"
            ],
            "ans": "1144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 676,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 27 cm, 23 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "621",
                "1863",
                "1242",
                "1247"
            ],
            "ans": "1242",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 677,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 28 cm, 24 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1344",
                "2016",
                "672",
                "1349"
            ],
            "ans": "1344",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 678,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 29 cm, 25 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "725",
                "1455",
                "2175",
                "1450"
            ],
            "ans": "1450",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 679,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 30 cm, 26 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1560",
                "1565",
                "2340",
                "780"
            ],
            "ans": "1560",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 680,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 31 cm, 27 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "837",
                "1674",
                "1679",
                "2511"
            ],
            "ans": "1674",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 681,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 47 cm, 38 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5358",
                "3572",
                "1786",
                "3577"
            ],
            "ans": "3572",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 682,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 48 cm, 39 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5616",
                "3744",
                "3749",
                "1872"
            ],
            "ans": "3744",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 683,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 49 cm, 40 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3920",
                "5880",
                "3925",
                "1960"
            ],
            "ans": "3920",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 684,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 50 cm, 41 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4105",
                "2050",
                "6150",
                "4100"
            ],
            "ans": "4100",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 685,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 51 cm, 42 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4284",
                "6426",
                "2142",
                "4289"
            ],
            "ans": "4284",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 686,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 52 cm, 43 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4472",
                "6708",
                "2236",
                "4477"
            ],
            "ans": "4472",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 687,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 53 cm, 44 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "6996",
                "4664",
                "2332",
                "4669"
            ],
            "ans": "4664",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 688,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 54 cm, 45 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4860",
                "7290",
                "2430",
                "4865"
            ],
            "ans": "4860",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 689,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 55 cm, 46 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5060",
                "7590",
                "5065",
                "2530"
            ],
            "ans": "5060",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 690,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 56 cm, 47 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5269",
                "5264",
                "7896",
                "2632"
            ],
            "ans": "5264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 691,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 2 cm, 3 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "17",
                "12",
                "18",
                "6"
            ],
            "ans": "12",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 692,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 3 cm, 4 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "24",
                "36",
                "12",
                "29"
            ],
            "ans": "24",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 693,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 4 cm, 5 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "40",
                "60",
                "20",
                "45"
            ],
            "ans": "40",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 694,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 5 cm, 6 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "65",
                "30",
                "90",
                "60"
            ],
            "ans": "60",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 695,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 6 cm, 7 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "126",
                "84",
                "89",
                "42"
            ],
            "ans": "84",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 696,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 7 cm, 8 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "112",
                "117",
                "168",
                "56"
            ],
            "ans": "112",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 697,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 8 cm, 9 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "144",
                "216",
                "72",
                "149"
            ],
            "ans": "144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 698,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 9 cm, 10 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "180",
                "270",
                "90",
                "185"
            ],
            "ans": "180",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 699,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 10 cm, 11 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "220",
                "225",
                "330",
                "110"
            ],
            "ans": "220",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 700,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 11 cm, 12 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "264",
                "396",
                "132",
                "269"
            ],
            "ans": "264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 701,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 22 cm, 18 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "792",
                "1188",
                "396",
                "797"
            ],
            "ans": "792",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 702,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 23 cm, 19 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "874",
                "1311",
                "879",
                "437"
            ],
            "ans": "874",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 703,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 24 cm, 20 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "965",
                "480",
                "1440",
                "960"
            ],
            "ans": "960",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 704,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 25 cm, 21 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "525",
                "1575",
                "1050",
                "1055"
            ],
            "ans": "1050",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 705,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 26 cm, 22 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1149",
                "1144",
                "1716",
                "572"
            ],
            "ans": "1144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 706,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 27 cm, 23 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1242",
                "1247",
                "1863",
                "621"
            ],
            "ans": "1242",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 707,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 28 cm, 24 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1344",
                "2016",
                "1349",
                "672"
            ],
            "ans": "1344",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 708,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 29 cm, 25 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2175",
                "1450",
                "725",
                "1455"
            ],
            "ans": "1450",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 709,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 30 cm, 26 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1560",
                "2340",
                "1565",
                "780"
            ],
            "ans": "1560",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 710,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 31 cm, 27 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1674",
                "837",
                "2511",
                "1679"
            ],
            "ans": "1674",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 711,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 47 cm, 38 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3572",
                "5358",
                "1786",
                "3577"
            ],
            "ans": "3572",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 712,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 48 cm, 39 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1872",
                "5616",
                "3749",
                "3744"
            ],
            "ans": "3744",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 713,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 49 cm, 40 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3925",
                "3920",
                "5880",
                "1960"
            ],
            "ans": "3920",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 714,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 50 cm, 41 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4100",
                "2050",
                "4105",
                "6150"
            ],
            "ans": "4100",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 715,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 51 cm, 42 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4284",
                "6426",
                "2142",
                "4289"
            ],
            "ans": "4284",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 716,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 52 cm, 43 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4472",
                "6708",
                "4477",
                "2236"
            ],
            "ans": "4472",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 717,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 53 cm, 44 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4664",
                "6996",
                "2332",
                "4669"
            ],
            "ans": "4664",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 718,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 54 cm, 45 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4860",
                "2430",
                "7290",
                "4865"
            ],
            "ans": "4860",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 719,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 55 cm, 46 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2530",
                "5060",
                "5065",
                "7590"
            ],
            "ans": "5060",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 720,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Sıvı Ölçme",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 56 cm, 47 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5264",
                "7896",
                "2632",
                "5269"
            ],
            "ans": "5264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        }
    ],
    "7": [
        {
            "id": 721,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "6",
                "5",
                "4"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 722,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "8",
                "7",
                "6"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 723,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "10",
                "9",
                "11",
                "8"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 724,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "12",
                "11",
                "13",
                "10"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 725,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "15",
                "12",
                "14",
                "13"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 726,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "17",
                "15",
                "16",
                "14"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 727,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "18",
                "19",
                "17",
                "16"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 728,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 729,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "23",
                "22",
                "20"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 730,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "25",
                "23",
                "24",
                "22"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 731,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "40",
                "41",
                "39",
                "42"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 732,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "43",
                "41",
                "44",
                "42"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 733,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "45",
                "44",
                "46",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 734,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "48",
                "45",
                "47",
                "46"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 735,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "48",
                "49",
                "47",
                "50"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 736,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "52",
                "51",
                "49"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 737,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "54",
                "51",
                "53"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 738,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "55",
                "53",
                "56"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 739,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "55",
                "56",
                "57"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 740,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "59",
                "60",
                "57"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 741,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "85",
                "86",
                "84",
                "87"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 742,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "86",
                "88",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 743,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "90",
                "88",
                "91"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 744,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "91",
                "92",
                "90",
                "93"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 745,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "94",
                "95",
                "92"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 746,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "94",
                "95",
                "97"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 747,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "99",
                "98",
                "97"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 748,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "100",
                "98",
                "101"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 749,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "102",
                "100",
                "101",
                "103"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 750,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Tam Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "104",
                "102",
                "105"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 751,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "4/6 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "2/3",
                "3/3",
                "2/4",
                "3/2"
            ],
            "ans": "2/3",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 752,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "6/8 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/3",
                "3/5",
                "4/4",
                "3/4"
            ],
            "ans": "3/4",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 753,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "8/10 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/5",
                "5/4",
                "5/5",
                "4/6"
            ],
            "ans": "4/5",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 754,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "10/12 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/7",
                "6/5",
                "5/6",
                "6/6"
            ],
            "ans": "5/6",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 755,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "12/14 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "6/8",
                "7/7",
                "6/7",
                "7/6"
            ],
            "ans": "6/7",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 756,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "14/16 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "8/8",
                "8/7",
                "7/8",
                "7/9"
            ],
            "ans": "7/8",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 757,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "16/18 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "8/9",
                "9/9",
                "8/10",
                "9/8"
            ],
            "ans": "8/9",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 758,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "18/20 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/10",
                "10/10",
                "9/11",
                "10/9"
            ],
            "ans": "9/10",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 759,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "20/22 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/10",
                "10/12",
                "11/11",
                "10/11"
            ],
            "ans": "10/11",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 760,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "easy",
            "q": "22/24 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/13",
                "12/11",
                "12/12",
                "11/12"
            ],
            "ans": "11/12",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 761,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "44/36 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "22/19",
                "23/18",
                "18/22",
                "22/18"
            ],
            "ans": "22/18",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 762,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "46/38 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "23/20",
                "19/23",
                "24/19",
                "23/19"
            ],
            "ans": "23/19",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 763,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "48/40 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "25/20",
                "24/20",
                "20/24",
                "24/21"
            ],
            "ans": "24/20",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 764,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "50/42 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "21/25",
                "25/21",
                "25/22",
                "26/21"
            ],
            "ans": "25/21",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 765,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "52/44 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "26/22",
                "27/22",
                "26/23",
                "22/26"
            ],
            "ans": "26/22",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 766,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "54/46 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "28/23",
                "27/24",
                "23/27",
                "27/23"
            ],
            "ans": "27/23",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 767,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "56/48 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "28/25",
                "24/28",
                "28/24",
                "29/24"
            ],
            "ans": "28/24",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 768,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "58/50 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "30/25",
                "29/26",
                "25/29",
                "29/25"
            ],
            "ans": "29/25",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 769,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "60/52 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "26/30",
                "31/26",
                "30/26",
                "30/27"
            ],
            "ans": "30/26",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 770,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "medium",
            "q": "62/54 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "31/27",
                "27/31",
                "32/27",
                "31/28"
            ],
            "ans": "31/27",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 771,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "94/76 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/38",
                "48/38",
                "47/39",
                "38/47"
            ],
            "ans": "47/38",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 772,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "96/78 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "39/48",
                "48/40",
                "49/39",
                "48/39"
            ],
            "ans": "48/39",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 773,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "98/80 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "50/40",
                "49/40",
                "49/41",
                "40/49"
            ],
            "ans": "49/40",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 774,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "100/82 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "41/50",
                "50/41",
                "51/41",
                "50/42"
            ],
            "ans": "50/41",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 775,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "102/84 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "52/42",
                "51/42",
                "51/43",
                "42/51"
            ],
            "ans": "51/42",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 776,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "104/86 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "43/52",
                "52/43",
                "53/43",
                "52/44"
            ],
            "ans": "52/43",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 777,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "106/88 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "53/44",
                "53/45",
                "44/53",
                "54/44"
            ],
            "ans": "53/44",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 778,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "108/90 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/45",
                "45/54",
                "55/45",
                "54/46"
            ],
            "ans": "54/45",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 779,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "110/92 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "55/46",
                "46/55",
                "56/46",
                "55/47"
            ],
            "ans": "55/46",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 780,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılar",
            "difficulty": "hard",
            "q": "112/94 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/56",
                "56/47",
                "57/47",
                "56/48"
            ],
            "ans": "56/47",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 781,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "4/6 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "3/2",
                "2/3",
                "3/3",
                "2/4"
            ],
            "ans": "2/3",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 782,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "6/8 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "4/4",
                "4/3",
                "3/4",
                "3/5"
            ],
            "ans": "3/4",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 783,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "8/10 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "5/4",
                "4/6",
                "5/5",
                "4/5"
            ],
            "ans": "4/5",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 784,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "10/12 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "6/6",
                "6/5",
                "5/6",
                "5/7"
            ],
            "ans": "5/6",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 785,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "12/14 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "7/7",
                "6/7",
                "7/6",
                "6/8"
            ],
            "ans": "6/7",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 786,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "14/16 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "7/8",
                "8/8",
                "7/9",
                "8/7"
            ],
            "ans": "7/8",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 787,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "16/18 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/8",
                "8/10",
                "9/9",
                "8/9"
            ],
            "ans": "8/9",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 788,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "18/20 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "9/10",
                "10/10",
                "10/9",
                "9/11"
            ],
            "ans": "9/10",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 789,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "20/22 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/11",
                "10/11",
                "11/10",
                "10/12"
            ],
            "ans": "10/11",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 790,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "easy",
            "q": "22/24 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "11/12",
                "12/12",
                "11/13",
                "12/11"
            ],
            "ans": "11/12",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 791,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "44/36 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "18/22",
                "22/19",
                "23/18",
                "22/18"
            ],
            "ans": "22/18",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 792,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "46/38 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "23/19",
                "19/23",
                "24/19",
                "23/20"
            ],
            "ans": "23/19",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 793,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "48/40 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "20/24",
                "25/20",
                "24/20",
                "24/21"
            ],
            "ans": "24/20",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 794,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "50/42 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "25/21",
                "26/21",
                "21/25",
                "25/22"
            ],
            "ans": "25/21",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 795,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "52/44 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "26/22",
                "27/22",
                "26/23",
                "22/26"
            ],
            "ans": "26/22",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 796,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "54/46 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "23/27",
                "27/24",
                "28/23",
                "27/23"
            ],
            "ans": "27/23",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 797,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "56/48 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "28/24",
                "29/24",
                "28/25",
                "24/28"
            ],
            "ans": "28/24",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 798,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "58/50 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "29/26",
                "29/25",
                "25/29",
                "30/25"
            ],
            "ans": "29/25",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 799,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "60/52 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "30/26",
                "31/26",
                "26/30",
                "30/27"
            ],
            "ans": "30/26",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 800,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "medium",
            "q": "62/54 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "27/31",
                "31/27",
                "32/27",
                "31/28"
            ],
            "ans": "31/27",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 801,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "94/76 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "47/38",
                "48/38",
                "47/39",
                "38/47"
            ],
            "ans": "47/38",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 802,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "96/78 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "49/39",
                "48/39",
                "48/40",
                "39/48"
            ],
            "ans": "48/39",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 803,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "98/80 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "49/40",
                "50/40",
                "49/41",
                "40/49"
            ],
            "ans": "49/40",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 804,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "100/82 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "50/41",
                "51/41",
                "50/42",
                "41/50"
            ],
            "ans": "50/41",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 805,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "102/84 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "52/42",
                "51/42",
                "51/43",
                "42/51"
            ],
            "ans": "51/42",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 806,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "104/86 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "43/52",
                "53/43",
                "52/44",
                "52/43"
            ],
            "ans": "52/43",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 807,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "106/88 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "53/45",
                "54/44",
                "44/53",
                "53/44"
            ],
            "ans": "53/44",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 808,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "108/90 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "54/45",
                "45/54",
                "54/46",
                "55/45"
            ],
            "ans": "54/45",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 809,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "110/92 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "46/55",
                "55/47",
                "56/46",
                "55/46"
            ],
            "ans": "55/46",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 810,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Rasyonel Sayılarla İşlemler",
            "difficulty": "hard",
            "q": "112/94 kesrinin en sade hali aşağıdakilerden hangisidir?",
            "options": [
                "56/47",
                "47/56",
                "57/47",
                "56/48"
            ],
            "ans": "56/47",
            "hint": "Pay ve paydayı ortak bölenlerine (2) bölerek sadeleştirin."
        },
        {
            "id": 811,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 2/3'dir. Bu sınıfta 4 kız varsa kaç erkek vardır?",
            "options": [
                "8",
                "5",
                "9",
                "6"
            ],
            "ans": "6",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 812,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 3/4'dir. Bu sınıfta 6 kız varsa kaç erkek vardır?",
            "options": [
                "10",
                "6",
                "12",
                "8"
            ],
            "ans": "8",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 813,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 4/5'dir. Bu sınıfta 8 kız varsa kaç erkek vardır?",
            "options": [
                "10",
                "7",
                "12",
                "15"
            ],
            "ans": "10",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 814,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 5/6'dir. Bu sınıfta 10 kız varsa kaç erkek vardır?",
            "options": [
                "18",
                "8",
                "14",
                "12"
            ],
            "ans": "12",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 815,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 6/7'dir. Bu sınıfta 12 kız varsa kaç erkek vardır?",
            "options": [
                "14",
                "21",
                "16",
                "9"
            ],
            "ans": "14",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 816,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 7/8'dir. Bu sınıfta 14 kız varsa kaç erkek vardır?",
            "options": [
                "10",
                "18",
                "24",
                "16"
            ],
            "ans": "16",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 817,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 8/9'dir. Bu sınıfta 16 kız varsa kaç erkek vardır?",
            "options": [
                "18",
                "27",
                "11",
                "20"
            ],
            "ans": "18",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 818,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 9/10'dir. Bu sınıfta 18 kız varsa kaç erkek vardır?",
            "options": [
                "20",
                "30",
                "22",
                "12"
            ],
            "ans": "20",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 819,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 10/11'dir. Bu sınıfta 20 kız varsa kaç erkek vardır?",
            "options": [
                "33",
                "24",
                "22",
                "13"
            ],
            "ans": "22",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 820,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "easy",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 11/12'dir. Bu sınıfta 22 kız varsa kaç erkek vardır?",
            "options": [
                "26",
                "14",
                "36",
                "24"
            ],
            "ans": "24",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 821,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 22/18'dir. Bu sınıfta 44 kız varsa kaç erkek vardır?",
            "options": [
                "20",
                "38",
                "36",
                "54"
            ],
            "ans": "36",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 822,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 23/19'dir. Bu sınıfta 46 kız varsa kaç erkek vardır?",
            "options": [
                "38",
                "57",
                "21",
                "40"
            ],
            "ans": "38",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 823,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 24/20'dir. Bu sınıfta 48 kız varsa kaç erkek vardır?",
            "options": [
                "42",
                "40",
                "60",
                "22"
            ],
            "ans": "40",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 824,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 25/21'dir. Bu sınıfta 50 kız varsa kaç erkek vardır?",
            "options": [
                "44",
                "23",
                "63",
                "42"
            ],
            "ans": "42",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 825,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 26/22'dir. Bu sınıfta 52 kız varsa kaç erkek vardır?",
            "options": [
                "44",
                "46",
                "66",
                "24"
            ],
            "ans": "44",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 826,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 27/23'dir. Bu sınıfta 54 kız varsa kaç erkek vardır?",
            "options": [
                "46",
                "48",
                "69",
                "25"
            ],
            "ans": "46",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 827,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 28/24'dir. Bu sınıfta 56 kız varsa kaç erkek vardır?",
            "options": [
                "50",
                "72",
                "48",
                "26"
            ],
            "ans": "48",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 828,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 29/25'dir. Bu sınıfta 58 kız varsa kaç erkek vardır?",
            "options": [
                "52",
                "50",
                "75",
                "27"
            ],
            "ans": "50",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 829,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 30/26'dir. Bu sınıfta 60 kız varsa kaç erkek vardır?",
            "options": [
                "52",
                "78",
                "28",
                "54"
            ],
            "ans": "52",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 830,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "medium",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 31/27'dir. Bu sınıfta 62 kız varsa kaç erkek vardır?",
            "options": [
                "29",
                "54",
                "56",
                "81"
            ],
            "ans": "54",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 831,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 47/38'dir. Bu sınıfta 94 kız varsa kaç erkek vardır?",
            "options": [
                "40",
                "78",
                "114",
                "76"
            ],
            "ans": "76",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 832,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 48/39'dir. Bu sınıfta 96 kız varsa kaç erkek vardır?",
            "options": [
                "41",
                "78",
                "80",
                "117"
            ],
            "ans": "78",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 833,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 49/40'dir. Bu sınıfta 98 kız varsa kaç erkek vardır?",
            "options": [
                "82",
                "42",
                "120",
                "80"
            ],
            "ans": "80",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 834,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 50/41'dir. Bu sınıfta 100 kız varsa kaç erkek vardır?",
            "options": [
                "84",
                "43",
                "123",
                "82"
            ],
            "ans": "82",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 835,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 51/42'dir. Bu sınıfta 102 kız varsa kaç erkek vardır?",
            "options": [
                "84",
                "86",
                "126",
                "44"
            ],
            "ans": "84",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 836,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 52/43'dir. Bu sınıfta 104 kız varsa kaç erkek vardır?",
            "options": [
                "86",
                "129",
                "88",
                "45"
            ],
            "ans": "86",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 837,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 53/44'dir. Bu sınıfta 106 kız varsa kaç erkek vardır?",
            "options": [
                "132",
                "88",
                "46",
                "90"
            ],
            "ans": "88",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 838,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 54/45'dir. Bu sınıfta 108 kız varsa kaç erkek vardır?",
            "options": [
                "92",
                "47",
                "135",
                "90"
            ],
            "ans": "90",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 839,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 55/46'dir. Bu sınıfta 110 kız varsa kaç erkek vardır?",
            "options": [
                "92",
                "138",
                "48",
                "94"
            ],
            "ans": "92",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 840,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Oran ve Orantı",
            "difficulty": "hard",
            "q": "Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 56/47'dir. Bu sınıfta 112 kız varsa kaç erkek vardır?",
            "options": [
                "49",
                "141",
                "96",
                "94"
            ],
            "ans": "94",
            "hint": "Oranı 2 ile genişleterek erkeklerin sayısını bulabilirsiniz."
        },
        {
            "id": 841,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "20 sayısının %10'u kaçtır?",
            "options": [
                "2",
                "4",
                "10",
                "12"
            ],
            "ans": "2",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 842,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "30 sayısının %10'u kaçtır?",
            "options": [
                "15",
                "13",
                "6",
                "3"
            ],
            "ans": "3",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 843,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "40 sayısının %10'u kaçtır?",
            "options": [
                "20",
                "4",
                "8",
                "14"
            ],
            "ans": "4",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 844,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "50 sayısının %10'u kaçtır?",
            "options": [
                "5",
                "25",
                "10",
                "15"
            ],
            "ans": "5",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 845,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "60 sayısının %10'u kaçtır?",
            "options": [
                "30",
                "6",
                "12",
                "16"
            ],
            "ans": "6",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 846,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "70 sayısının %10'u kaçtır?",
            "options": [
                "14",
                "7",
                "35",
                "17"
            ],
            "ans": "7",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 847,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "80 sayısının %10'u kaçtır?",
            "options": [
                "8",
                "16",
                "18",
                "40"
            ],
            "ans": "8",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 848,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "90 sayısının %10'u kaçtır?",
            "options": [
                "9",
                "18",
                "19",
                "45"
            ],
            "ans": "9",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 849,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "100 sayısının %10'u kaçtır?",
            "options": [
                "20",
                "50",
                "10",
                "20"
            ],
            "ans": "10",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 850,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "easy",
            "q": "110 sayısının %10'u kaçtır?",
            "options": [
                "55",
                "21",
                "22",
                "11"
            ],
            "ans": "11",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 851,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "220 sayısının %10'u kaçtır?",
            "options": [
                "110",
                "32",
                "44",
                "22"
            ],
            "ans": "22",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 852,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "230 sayısının %10'u kaçtır?",
            "options": [
                "23",
                "115",
                "46",
                "33"
            ],
            "ans": "23",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 853,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "240 sayısının %10'u kaçtır?",
            "options": [
                "24",
                "34",
                "48",
                "120"
            ],
            "ans": "24",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 854,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "250 sayısının %10'u kaçtır?",
            "options": [
                "50",
                "25",
                "35",
                "125"
            ],
            "ans": "25",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 855,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "260 sayısının %10'u kaçtır?",
            "options": [
                "52",
                "36",
                "26",
                "130"
            ],
            "ans": "26",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 856,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "270 sayısının %10'u kaçtır?",
            "options": [
                "54",
                "27",
                "37",
                "135"
            ],
            "ans": "27",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 857,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "280 sayısının %10'u kaçtır?",
            "options": [
                "28",
                "56",
                "38",
                "140"
            ],
            "ans": "28",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 858,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "290 sayısının %10'u kaçtır?",
            "options": [
                "29",
                "58",
                "39",
                "145"
            ],
            "ans": "29",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 859,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "300 sayısının %10'u kaçtır?",
            "options": [
                "40",
                "150",
                "60",
                "30"
            ],
            "ans": "30",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 860,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "medium",
            "q": "310 sayısının %10'u kaçtır?",
            "options": [
                "31",
                "155",
                "62",
                "41"
            ],
            "ans": "31",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 861,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "470 sayısının %10'u kaçtır?",
            "options": [
                "47",
                "235",
                "94",
                "57"
            ],
            "ans": "47",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 862,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "480 sayısının %10'u kaçtır?",
            "options": [
                "58",
                "96",
                "48",
                "240"
            ],
            "ans": "48",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 863,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "490 sayısının %10'u kaçtır?",
            "options": [
                "49",
                "98",
                "59",
                "245"
            ],
            "ans": "49",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 864,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "500 sayısının %10'u kaçtır?",
            "options": [
                "100",
                "50",
                "250",
                "60"
            ],
            "ans": "50",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 865,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "510 sayısının %10'u kaçtır?",
            "options": [
                "255",
                "51",
                "102",
                "61"
            ],
            "ans": "51",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 866,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "520 sayısının %10'u kaçtır?",
            "options": [
                "62",
                "104",
                "52",
                "260"
            ],
            "ans": "52",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 867,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "530 sayısının %10'u kaçtır?",
            "options": [
                "63",
                "106",
                "265",
                "53"
            ],
            "ans": "53",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 868,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "540 sayısının %10'u kaçtır?",
            "options": [
                "54",
                "108",
                "270",
                "64"
            ],
            "ans": "54",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 869,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "550 sayısının %10'u kaçtır?",
            "options": [
                "65",
                "110",
                "55",
                "275"
            ],
            "ans": "55",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 870,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Yüzdeler",
            "difficulty": "hard",
            "q": "560 sayısının %10'u kaçtır?",
            "options": [
                "66",
                "280",
                "112",
                "56"
            ],
            "ans": "56",
            "hint": "Bir sayının %10'unu bulmak için 10'a bölebilirsiniz."
        },
        {
            "id": 871,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "3",
                "5",
                "4",
                "2"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 872,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "3",
                "5",
                "4",
                "6"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 873,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "6",
                "5",
                "7",
                "4"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 874,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "6",
                "7",
                "5",
                "8"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 875,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "9",
                "6",
                "7",
                "8"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 876,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "8",
                "10",
                "7",
                "9"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 877,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "10",
                "11",
                "9",
                "8"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 878,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "12",
                "11",
                "9",
                "10"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 879,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "11",
                "12",
                "10",
                "13"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 880,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "12",
                "14",
                "13",
                "11"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 881,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "17",
                "20",
                "18",
                "19"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 882,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "18",
                "21",
                "20",
                "19"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 883,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "22",
                "19",
                "21",
                "20"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 884,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "21",
                "22",
                "23",
                "20"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 885,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "22",
                "23",
                "24",
                "21"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 886,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "25",
                "23",
                "22",
                "24"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 887,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "26",
                "24",
                "25",
                "23"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 888,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "26",
                "25",
                "27",
                "24"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 889,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "27",
                "26",
                "25",
                "28"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 890,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "29",
                "26",
                "28",
                "27"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 891,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "37",
                "40",
                "39",
                "38"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 892,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "40",
                "39",
                "41",
                "38"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 893,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "42",
                "41",
                "40",
                "39"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 894,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "40",
                "42",
                "43",
                "41"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 895,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "44",
                "43",
                "41",
                "42"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 896,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "43",
                "44",
                "42",
                "45"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 897,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "45",
                "44",
                "43",
                "46"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 898,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "47",
                "44",
                "46",
                "45"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 899,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "48",
                "46",
                "47",
                "45"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 900,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "48",
                "47",
                "49",
                "46"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 901,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "3",
                "2",
                "4",
                "5"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 902,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "4",
                "5",
                "6",
                "3"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 903,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "4",
                "6",
                "5",
                "7"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 904,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "7",
                "5",
                "8",
                "6"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 905,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "7",
                "8",
                "9",
                "6"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 906,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "8",
                "9",
                "7",
                "10"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 907,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "9",
                "10",
                "11",
                "8"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 908,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "12",
                "9",
                "11",
                "10"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 909,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "12",
                "13",
                "11",
                "10"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 910,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "12",
                "13",
                "11",
                "14"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 911,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "20",
                "19",
                "18",
                "17"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 912,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 913,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "21",
                "22",
                "19",
                "20"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 914,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "20",
                "23",
                "21",
                "22"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 915,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "23",
                "22",
                "24",
                "21"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 916,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "24",
                "23",
                "25",
                "22"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 917,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "25",
                "24",
                "26",
                "23"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 918,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "25",
                "27",
                "26",
                "24"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 919,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "28",
                "25",
                "27",
                "26"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 920,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "27",
                "28",
                "29",
                "26"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 921,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "38",
                "40",
                "39",
                "37"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 922,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "40",
                "39",
                "41",
                "38"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 923,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "41",
                "39",
                "42",
                "40"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 924,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "43",
                "41",
                "42",
                "40"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 925,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "42",
                "43",
                "41",
                "44"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 926,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "44",
                "42",
                "45",
                "43"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 927,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "46",
                "43",
                "45",
                "44"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 928,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "47",
                "44",
                "46",
                "45"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 929,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "46",
                "48",
                "47",
                "45"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 930,
            "topic": "Cebir",
            "subTopic": "Eşitlik ve Denklem",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "47",
                "49",
                "48",
                "46"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 931,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 2 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "4",
                "12",
                "8",
                "6"
            ],
            "ans": "12",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 2)"
        },
        {
            "id": 932,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 3 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "9",
                "18",
                "6",
                "12"
            ],
            "ans": "18",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 3)"
        },
        {
            "id": 933,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 4 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "16",
                "24",
                "12",
                "8"
            ],
            "ans": "24",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 4)"
        },
        {
            "id": 934,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 5 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "20",
                "10",
                "15",
                "30"
            ],
            "ans": "30",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 5)"
        },
        {
            "id": 935,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 6 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "36",
                "24",
                "18",
                "12"
            ],
            "ans": "36",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 6)"
        },
        {
            "id": 936,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 7 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "21",
                "42",
                "14",
                "28"
            ],
            "ans": "42",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 7)"
        },
        {
            "id": 937,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 8 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "24",
                "32",
                "48",
                "16"
            ],
            "ans": "48",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 8)"
        },
        {
            "id": 938,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 9 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "36",
                "18",
                "54",
                "27"
            ],
            "ans": "54",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 9)"
        },
        {
            "id": 939,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 10 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "40",
                "60",
                "30",
                "20"
            ],
            "ans": "60",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 10)"
        },
        {
            "id": 940,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "easy",
            "q": "Yarıçapı 11 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "44",
                "66",
                "33",
                "22"
            ],
            "ans": "66",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 11)"
        },
        {
            "id": 941,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 22 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "44",
                "88",
                "132",
                "66"
            ],
            "ans": "132",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 22)"
        },
        {
            "id": 942,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 23 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "92",
                "46",
                "69",
                "138"
            ],
            "ans": "138",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 23)"
        },
        {
            "id": 943,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 24 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "144",
                "96",
                "72",
                "48"
            ],
            "ans": "144",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 24)"
        },
        {
            "id": 944,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 25 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "50",
                "75",
                "100",
                "150"
            ],
            "ans": "150",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 25)"
        },
        {
            "id": 945,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 26 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "52",
                "78",
                "156",
                "104"
            ],
            "ans": "156",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 26)"
        },
        {
            "id": 946,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 27 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "108",
                "162",
                "54",
                "81"
            ],
            "ans": "162",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 27)"
        },
        {
            "id": 947,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 28 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "56",
                "112",
                "168",
                "84"
            ],
            "ans": "168",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 28)"
        },
        {
            "id": 948,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 29 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "58",
                "116",
                "87",
                "174"
            ],
            "ans": "174",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 29)"
        },
        {
            "id": 949,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 30 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "120",
                "60",
                "90",
                "180"
            ],
            "ans": "180",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 30)"
        },
        {
            "id": 950,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "medium",
            "q": "Yarıçapı 31 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "93",
                "124",
                "62",
                "186"
            ],
            "ans": "186",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 31)"
        },
        {
            "id": 951,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 47 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "94",
                "282",
                "188",
                "141"
            ],
            "ans": "282",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 47)"
        },
        {
            "id": 952,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 48 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "288",
                "144",
                "192",
                "96"
            ],
            "ans": "288",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 48)"
        },
        {
            "id": 953,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 49 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "294",
                "147",
                "98",
                "196"
            ],
            "ans": "294",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 49)"
        },
        {
            "id": 954,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 50 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "300",
                "100",
                "200",
                "150"
            ],
            "ans": "300",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 50)"
        },
        {
            "id": 955,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 51 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "204",
                "306",
                "153",
                "102"
            ],
            "ans": "306",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 51)"
        },
        {
            "id": 956,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 52 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "312",
                "156",
                "104",
                "208"
            ],
            "ans": "312",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 52)"
        },
        {
            "id": 957,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 53 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "106",
                "159",
                "318",
                "212"
            ],
            "ans": "318",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 53)"
        },
        {
            "id": 958,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 54 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "324",
                "162",
                "108",
                "216"
            ],
            "ans": "324",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 54)"
        },
        {
            "id": 959,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 55 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "220",
                "165",
                "330",
                "110"
            ],
            "ans": "330",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 55)"
        },
        {
            "id": 960,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Doğrular ve Açılar",
            "difficulty": "hard",
            "q": "Yarıçapı 56 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "336",
                "168",
                "112",
                "224"
            ],
            "ans": "336",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 56)"
        },
        {
            "id": 961,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 2 cm ve 3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "6",
                "10",
                "8",
                "4"
            ],
            "ans": "6",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (2 x 3)."
        },
        {
            "id": 962,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 3 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "12",
                "14",
                "10",
                "16"
            ],
            "ans": "12",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (3 x 4)."
        },
        {
            "id": 963,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 4 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "22",
                "24",
                "20",
                "18"
            ],
            "ans": "20",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (4 x 5)."
        },
        {
            "id": 964,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 5 cm ve 6 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "28",
                "32",
                "30",
                "34"
            ],
            "ans": "30",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (5 x 6)."
        },
        {
            "id": 965,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 6 cm ve 7 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "44",
                "42",
                "46",
                "40"
            ],
            "ans": "42",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (6 x 7)."
        },
        {
            "id": 966,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 7 cm ve 8 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "56",
                "58",
                "54",
                "60"
            ],
            "ans": "56",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (7 x 8)."
        },
        {
            "id": 967,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 8 cm ve 9 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "72",
                "74",
                "70",
                "76"
            ],
            "ans": "72",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (8 x 9)."
        },
        {
            "id": 968,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 9 cm ve 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "94",
                "92",
                "90",
                "88"
            ],
            "ans": "90",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (9 x 10)."
        },
        {
            "id": 969,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 10 cm ve 11 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "108",
                "112",
                "110",
                "114"
            ],
            "ans": "110",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (10 x 11)."
        },
        {
            "id": 970,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 11 cm ve 12 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "136",
                "130",
                "134",
                "132"
            ],
            "ans": "132",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (11 x 12)."
        },
        {
            "id": 971,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 22 cm ve 18 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "396",
                "398",
                "394",
                "400"
            ],
            "ans": "396",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (22 x 18)."
        },
        {
            "id": 972,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 23 cm ve 19 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "441",
                "435",
                "439",
                "437"
            ],
            "ans": "437",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (23 x 19)."
        },
        {
            "id": 973,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 24 cm ve 20 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "482",
                "484",
                "480",
                "478"
            ],
            "ans": "480",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (24 x 20)."
        },
        {
            "id": 974,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 25 cm ve 21 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "525",
                "527",
                "523",
                "529"
            ],
            "ans": "525",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (25 x 21)."
        },
        {
            "id": 975,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 26 cm ve 22 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "576",
                "574",
                "570",
                "572"
            ],
            "ans": "572",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (26 x 22)."
        },
        {
            "id": 976,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 27 cm ve 23 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "625",
                "619",
                "623",
                "621"
            ],
            "ans": "621",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (27 x 23)."
        },
        {
            "id": 977,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 28 cm ve 24 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "670",
                "674",
                "676",
                "672"
            ],
            "ans": "672",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (28 x 24)."
        },
        {
            "id": 978,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 29 cm ve 25 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "725",
                "727",
                "723",
                "729"
            ],
            "ans": "725",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (29 x 25)."
        },
        {
            "id": 979,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 30 cm ve 26 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "782",
                "778",
                "784",
                "780"
            ],
            "ans": "780",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (30 x 26)."
        },
        {
            "id": 980,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 31 cm ve 27 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "841",
                "837",
                "839",
                "835"
            ],
            "ans": "837",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (31 x 27)."
        },
        {
            "id": 981,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 47 cm ve 38 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1790",
                "1784",
                "1788",
                "1786"
            ],
            "ans": "1786",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (47 x 38)."
        },
        {
            "id": 982,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 48 cm ve 39 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1872",
                "1874",
                "1876",
                "1870"
            ],
            "ans": "1872",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (48 x 39)."
        },
        {
            "id": 983,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 49 cm ve 40 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1960",
                "1962",
                "1964",
                "1958"
            ],
            "ans": "1960",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (49 x 40)."
        },
        {
            "id": 984,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 50 cm ve 41 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2052",
                "2050",
                "2054",
                "2048"
            ],
            "ans": "2050",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (50 x 41)."
        },
        {
            "id": 985,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 51 cm ve 42 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2144",
                "2146",
                "2140",
                "2142"
            ],
            "ans": "2142",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (51 x 42)."
        },
        {
            "id": 986,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 52 cm ve 43 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2234",
                "2238",
                "2240",
                "2236"
            ],
            "ans": "2236",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (52 x 43)."
        },
        {
            "id": 987,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 53 cm ve 44 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2330",
                "2336",
                "2332",
                "2334"
            ],
            "ans": "2332",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (53 x 44)."
        },
        {
            "id": 988,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 54 cm ve 45 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2428",
                "2430",
                "2434",
                "2432"
            ],
            "ans": "2430",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (54 x 45)."
        },
        {
            "id": 989,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 55 cm ve 46 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2530",
                "2532",
                "2528",
                "2534"
            ],
            "ans": "2530",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (55 x 46)."
        },
        {
            "id": 990,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çokgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 56 cm ve 47 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2636",
                "2634",
                "2630",
                "2632"
            ],
            "ans": "2632",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (56 x 47)."
        },
        {
            "id": 991,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 2 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "8",
                "4",
                "6",
                "12"
            ],
            "ans": "12",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 2)"
        },
        {
            "id": 992,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 3 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "18",
                "12",
                "9",
                "6"
            ],
            "ans": "18",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 3)"
        },
        {
            "id": 993,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 4 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "8",
                "24",
                "16",
                "12"
            ],
            "ans": "24",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 4)"
        },
        {
            "id": 994,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 5 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "20",
                "30",
                "15",
                "10"
            ],
            "ans": "30",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 5)"
        },
        {
            "id": 995,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 6 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "12",
                "24",
                "18",
                "36"
            ],
            "ans": "36",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 6)"
        },
        {
            "id": 996,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 7 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "42",
                "21",
                "14",
                "28"
            ],
            "ans": "42",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 7)"
        },
        {
            "id": 997,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 8 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "48",
                "32",
                "24",
                "16"
            ],
            "ans": "48",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 8)"
        },
        {
            "id": 998,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 9 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "18",
                "27",
                "54",
                "36"
            ],
            "ans": "54",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 9)"
        },
        {
            "id": 999,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 10 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "40",
                "60",
                "20",
                "30"
            ],
            "ans": "60",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 10)"
        },
        {
            "id": 1000,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "easy",
            "q": "Yarıçapı 11 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "22",
                "44",
                "33",
                "66"
            ],
            "ans": "66",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 11)"
        },
        {
            "id": 1001,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 22 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "88",
                "132",
                "66",
                "44"
            ],
            "ans": "132",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 22)"
        },
        {
            "id": 1002,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 23 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "92",
                "46",
                "69",
                "138"
            ],
            "ans": "138",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 23)"
        },
        {
            "id": 1003,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 24 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "48",
                "72",
                "96",
                "144"
            ],
            "ans": "144",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 24)"
        },
        {
            "id": 1004,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 25 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "150",
                "75",
                "50",
                "100"
            ],
            "ans": "150",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 25)"
        },
        {
            "id": 1005,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 26 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "104",
                "52",
                "78",
                "156"
            ],
            "ans": "156",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 26)"
        },
        {
            "id": 1006,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 27 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "54",
                "162",
                "108",
                "81"
            ],
            "ans": "162",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 27)"
        },
        {
            "id": 1007,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 28 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "112",
                "168",
                "84",
                "56"
            ],
            "ans": "168",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 28)"
        },
        {
            "id": 1008,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 29 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "174",
                "116",
                "87",
                "58"
            ],
            "ans": "174",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 29)"
        },
        {
            "id": 1009,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 30 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "60",
                "90",
                "180",
                "120"
            ],
            "ans": "180",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 30)"
        },
        {
            "id": 1010,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "medium",
            "q": "Yarıçapı 31 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "93",
                "186",
                "124",
                "62"
            ],
            "ans": "186",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 31)"
        },
        {
            "id": 1011,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 47 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "282",
                "141",
                "94",
                "188"
            ],
            "ans": "282",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 47)"
        },
        {
            "id": 1012,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 48 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "288",
                "192",
                "96",
                "144"
            ],
            "ans": "288",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 48)"
        },
        {
            "id": 1013,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 49 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "196",
                "98",
                "147",
                "294"
            ],
            "ans": "294",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 49)"
        },
        {
            "id": 1014,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 50 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "200",
                "300",
                "150",
                "100"
            ],
            "ans": "300",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 50)"
        },
        {
            "id": 1015,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 51 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "204",
                "153",
                "306",
                "102"
            ],
            "ans": "306",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 51)"
        },
        {
            "id": 1016,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 52 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "156",
                "312",
                "104",
                "208"
            ],
            "ans": "312",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 52)"
        },
        {
            "id": 1017,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 53 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "318",
                "159",
                "106",
                "212"
            ],
            "ans": "318",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 53)"
        },
        {
            "id": 1018,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 54 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "324",
                "162",
                "108",
                "216"
            ],
            "ans": "324",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 54)"
        },
        {
            "id": 1019,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 55 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "220",
                "110",
                "165",
                "330"
            ],
            "ans": "330",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 55)"
        },
        {
            "id": 1020,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Çember ve Daire",
            "difficulty": "hard",
            "q": "Yarıçapı 56 cm olan çemberin uzunluğu kaç cm'dir? (π=3 alınız)",
            "options": [
                "112",
                "168",
                "336",
                "224"
            ],
            "ans": "336",
            "hint": "Çemberin çevresi = 2 x π x r formülü ile hesaplanır. (2 x 3 x 56)"
        },
        {
            "id": 1021,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "6",
                "4",
                "7",
                "5"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1022,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "8",
                "6",
                "9"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1023,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "10",
                "11",
                "8"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1024,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "12",
                "11",
                "10",
                "13"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1025,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "12",
                "14",
                "13",
                "15"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1026,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "15",
                "14",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1027,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "17",
                "19",
                "18"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1028,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1029,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "23",
                "22",
                "20"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1030,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "25",
                "24",
                "22"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1031,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "41",
                "42",
                "40",
                "39"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1032,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "42",
                "43",
                "41",
                "44"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1033,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "44",
                "46",
                "45",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1034,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "45",
                "47",
                "46",
                "48"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1035,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "50",
                "48",
                "49",
                "47"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1036,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "49",
                "52",
                "50",
                "51"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1037,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "53",
                "51",
                "54"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1038,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "54",
                "55",
                "53",
                "56"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1039,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "56",
                "55",
                "57"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1040,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "60",
                "59",
                "57"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1041,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "85",
                "86",
                "84"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1042,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "88",
                "86",
                "89",
                "87"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1043,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "89",
                "90",
                "88",
                "91"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1044,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "92",
                "91",
                "90"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1045,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "93",
                "94",
                "92",
                "95"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1046,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "97",
                "96",
                "95",
                "94"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1047,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "96",
                "98",
                "97",
                "99"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1048,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "99",
                "101",
                "100",
                "98"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1049,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "100",
                "102",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1050,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Cisimlerin Farklı Yönlerden Görünümleri",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "104",
                "102",
                "103",
                "105"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        }
    ],
    "8": [
        {
            "id": 1051,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(4, 8) kaçtır?",
            "options": [
                "8",
                "4",
                "2",
                "16"
            ],
            "ans": "4",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1052,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(6, 12) kaçtır?",
            "options": [
                "6",
                "12",
                "3",
                "24"
            ],
            "ans": "6",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1053,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(8, 16) kaçtır?",
            "options": [
                "8",
                "16",
                "4",
                "32"
            ],
            "ans": "8",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1054,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(10, 20) kaçtır?",
            "options": [
                "40",
                "5",
                "10",
                "20"
            ],
            "ans": "10",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1055,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(12, 24) kaçtır?",
            "options": [
                "12",
                "24",
                "48",
                "6"
            ],
            "ans": "12",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1056,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(14, 28) kaçtır?",
            "options": [
                "56",
                "7",
                "28",
                "14"
            ],
            "ans": "14",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1057,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(16, 32) kaçtır?",
            "options": [
                "16",
                "32",
                "8",
                "64"
            ],
            "ans": "16",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1058,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(18, 36) kaçtır?",
            "options": [
                "18",
                "72",
                "36",
                "9"
            ],
            "ans": "18",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1059,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(20, 40) kaçtır?",
            "options": [
                "10",
                "80",
                "40",
                "20"
            ],
            "ans": "20",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1060,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "easy",
            "q": "EBOB(22, 44) kaçtır?",
            "options": [
                "22",
                "88",
                "44",
                "11"
            ],
            "ans": "22",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1061,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(44, 88) kaçtır?",
            "options": [
                "22",
                "88",
                "44",
                "176"
            ],
            "ans": "44",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1062,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(46, 92) kaçtır?",
            "options": [
                "23",
                "92",
                "184",
                "46"
            ],
            "ans": "46",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1063,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(48, 96) kaçtır?",
            "options": [
                "192",
                "24",
                "96",
                "48"
            ],
            "ans": "48",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1064,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(50, 100) kaçtır?",
            "options": [
                "100",
                "25",
                "50",
                "200"
            ],
            "ans": "50",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1065,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(52, 104) kaçtır?",
            "options": [
                "52",
                "104",
                "26",
                "208"
            ],
            "ans": "52",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1066,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(54, 108) kaçtır?",
            "options": [
                "54",
                "108",
                "27",
                "216"
            ],
            "ans": "54",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1067,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(56, 112) kaçtır?",
            "options": [
                "28",
                "224",
                "112",
                "56"
            ],
            "ans": "56",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1068,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(58, 116) kaçtır?",
            "options": [
                "58",
                "116",
                "232",
                "29"
            ],
            "ans": "58",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1069,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(60, 120) kaçtır?",
            "options": [
                "30",
                "240",
                "120",
                "60"
            ],
            "ans": "60",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1070,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "medium",
            "q": "EBOB(62, 124) kaçtır?",
            "options": [
                "248",
                "124",
                "62",
                "31"
            ],
            "ans": "62",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1071,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(94, 188) kaçtır?",
            "options": [
                "94",
                "188",
                "47",
                "376"
            ],
            "ans": "94",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1072,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(96, 192) kaçtır?",
            "options": [
                "96",
                "192",
                "48",
                "384"
            ],
            "ans": "96",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1073,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(98, 196) kaçtır?",
            "options": [
                "98",
                "196",
                "49",
                "392"
            ],
            "ans": "98",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1074,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(100, 200) kaçtır?",
            "options": [
                "50",
                "400",
                "200",
                "100"
            ],
            "ans": "100",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1075,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(102, 204) kaçtır?",
            "options": [
                "408",
                "51",
                "204",
                "102"
            ],
            "ans": "102",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1076,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(104, 208) kaçtır?",
            "options": [
                "416",
                "208",
                "104",
                "52"
            ],
            "ans": "104",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1077,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(106, 212) kaçtır?",
            "options": [
                "212",
                "53",
                "424",
                "106"
            ],
            "ans": "106",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1078,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(108, 216) kaçtır?",
            "options": [
                "432",
                "54",
                "216",
                "108"
            ],
            "ans": "108",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1079,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(110, 220) kaçtır?",
            "options": [
                "440",
                "55",
                "220",
                "110"
            ],
            "ans": "110",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1080,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Çarpanlar ve Katlar",
            "difficulty": "hard",
            "q": "EBOB(112, 224) kaçtır?",
            "options": [
                "56",
                "448",
                "224",
                "112"
            ],
            "ans": "112",
            "hint": "Biri diğerinin katı olan sayılarda EBOB küçük olan sayıya eşittir."
        },
        {
            "id": 1081,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "2² ifadesinin değeri kaçtır?",
            "options": [
                "3",
                "5",
                "4",
                "4"
            ],
            "ans": "4",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (2 x 2)."
        },
        {
            "id": 1082,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "3² ifadesinin değeri kaçtır?",
            "options": [
                "8",
                "10",
                "6",
                "9"
            ],
            "ans": "9",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (3 x 3)."
        },
        {
            "id": 1083,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "4² ifadesinin değeri kaçtır?",
            "options": [
                "8",
                "17",
                "15",
                "16"
            ],
            "ans": "16",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (4 x 4)."
        },
        {
            "id": 1084,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "5² ifadesinin değeri kaçtır?",
            "options": [
                "10",
                "25",
                "26",
                "24"
            ],
            "ans": "25",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (5 x 5)."
        },
        {
            "id": 1085,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "6² ifadesinin değeri kaçtır?",
            "options": [
                "37",
                "36",
                "35",
                "12"
            ],
            "ans": "36",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (6 x 6)."
        },
        {
            "id": 1086,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "7² ifadesinin değeri kaçtır?",
            "options": [
                "49",
                "50",
                "14",
                "48"
            ],
            "ans": "49",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (7 x 7)."
        },
        {
            "id": 1087,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "8² ifadesinin değeri kaçtır?",
            "options": [
                "65",
                "63",
                "64",
                "16"
            ],
            "ans": "64",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (8 x 8)."
        },
        {
            "id": 1088,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "9² ifadesinin değeri kaçtır?",
            "options": [
                "82",
                "80",
                "18",
                "81"
            ],
            "ans": "81",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (9 x 9)."
        },
        {
            "id": 1089,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "10² ifadesinin değeri kaçtır?",
            "options": [
                "20",
                "100",
                "99",
                "101"
            ],
            "ans": "100",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (10 x 10)."
        },
        {
            "id": 1090,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "easy",
            "q": "11² ifadesinin değeri kaçtır?",
            "options": [
                "122",
                "22",
                "120",
                "121"
            ],
            "ans": "121",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (11 x 11)."
        },
        {
            "id": 1091,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "22² ifadesinin değeri kaçtır?",
            "options": [
                "483",
                "485",
                "44",
                "484"
            ],
            "ans": "484",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (22 x 22)."
        },
        {
            "id": 1092,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "23² ifadesinin değeri kaçtır?",
            "options": [
                "530",
                "529",
                "528",
                "46"
            ],
            "ans": "529",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (23 x 23)."
        },
        {
            "id": 1093,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "24² ifadesinin değeri kaçtır?",
            "options": [
                "575",
                "577",
                "48",
                "576"
            ],
            "ans": "576",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (24 x 24)."
        },
        {
            "id": 1094,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "25² ifadesinin değeri kaçtır?",
            "options": [
                "626",
                "625",
                "624",
                "50"
            ],
            "ans": "625",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (25 x 25)."
        },
        {
            "id": 1095,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "26² ifadesinin değeri kaçtır?",
            "options": [
                "676",
                "675",
                "52",
                "677"
            ],
            "ans": "676",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (26 x 26)."
        },
        {
            "id": 1096,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "27² ifadesinin değeri kaçtır?",
            "options": [
                "729",
                "730",
                "728",
                "54"
            ],
            "ans": "729",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (27 x 27)."
        },
        {
            "id": 1097,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "28² ifadesinin değeri kaçtır?",
            "options": [
                "56",
                "784",
                "785",
                "783"
            ],
            "ans": "784",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (28 x 28)."
        },
        {
            "id": 1098,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "29² ifadesinin değeri kaçtır?",
            "options": [
                "840",
                "842",
                "58",
                "841"
            ],
            "ans": "841",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (29 x 29)."
        },
        {
            "id": 1099,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "30² ifadesinin değeri kaçtır?",
            "options": [
                "900",
                "60",
                "901",
                "899"
            ],
            "ans": "900",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (30 x 30)."
        },
        {
            "id": 1100,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "medium",
            "q": "31² ifadesinin değeri kaçtır?",
            "options": [
                "62",
                "962",
                "960",
                "961"
            ],
            "ans": "961",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (31 x 31)."
        },
        {
            "id": 1101,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "47² ifadesinin değeri kaçtır?",
            "options": [
                "2208",
                "94",
                "2210",
                "2209"
            ],
            "ans": "2209",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (47 x 47)."
        },
        {
            "id": 1102,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "48² ifadesinin değeri kaçtır?",
            "options": [
                "2304",
                "96",
                "2305",
                "2303"
            ],
            "ans": "2304",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (48 x 48)."
        },
        {
            "id": 1103,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "49² ifadesinin değeri kaçtır?",
            "options": [
                "2401",
                "98",
                "2402",
                "2400"
            ],
            "ans": "2401",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (49 x 49)."
        },
        {
            "id": 1104,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "50² ifadesinin değeri kaçtır?",
            "options": [
                "2501",
                "2499",
                "100",
                "2500"
            ],
            "ans": "2500",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (50 x 50)."
        },
        {
            "id": 1105,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "51² ifadesinin değeri kaçtır?",
            "options": [
                "2602",
                "2601",
                "2600",
                "102"
            ],
            "ans": "2601",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (51 x 51)."
        },
        {
            "id": 1106,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "52² ifadesinin değeri kaçtır?",
            "options": [
                "2705",
                "104",
                "2704",
                "2703"
            ],
            "ans": "2704",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (52 x 52)."
        },
        {
            "id": 1107,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "53² ifadesinin değeri kaçtır?",
            "options": [
                "2809",
                "106",
                "2810",
                "2808"
            ],
            "ans": "2809",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (53 x 53)."
        },
        {
            "id": 1108,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "54² ifadesinin değeri kaçtır?",
            "options": [
                "2915",
                "2917",
                "108",
                "2916"
            ],
            "ans": "2916",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (54 x 54)."
        },
        {
            "id": 1109,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "55² ifadesinin değeri kaçtır?",
            "options": [
                "110",
                "3024",
                "3025",
                "3026"
            ],
            "ans": "3025",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (55 x 55)."
        },
        {
            "id": 1110,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Üslü İfadeler",
            "difficulty": "hard",
            "q": "56² ifadesinin değeri kaçtır?",
            "options": [
                "3135",
                "3136",
                "112",
                "3137"
            ],
            "ans": "3136",
            "hint": "Bir sayının karesi, o sayının kendisiyle çarpımına eşittir (56 x 56)."
        },
        {
            "id": 1111,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√4 ifadesinin değeri kaçtır?",
            "options": [
                "3",
                "1",
                "4",
                "2"
            ],
            "ans": "2",
            "hint": "Hangi sayının karesinin 4 olduğunu düşünün."
        },
        {
            "id": 1112,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√9 ifadesinin değeri kaçtır?",
            "options": [
                "2",
                "4",
                "6",
                "3"
            ],
            "ans": "3",
            "hint": "Hangi sayının karesinin 9 olduğunu düşünün."
        },
        {
            "id": 1113,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√16 ifadesinin değeri kaçtır?",
            "options": [
                "8",
                "3",
                "5",
                "4"
            ],
            "ans": "4",
            "hint": "Hangi sayının karesinin 16 olduğunu düşünün."
        },
        {
            "id": 1114,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√25 ifadesinin değeri kaçtır?",
            "options": [
                "4",
                "6",
                "10",
                "5"
            ],
            "ans": "5",
            "hint": "Hangi sayının karesinin 25 olduğunu düşünün."
        },
        {
            "id": 1115,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√36 ifadesinin değeri kaçtır?",
            "options": [
                "12",
                "6",
                "7",
                "5"
            ],
            "ans": "6",
            "hint": "Hangi sayının karesinin 36 olduğunu düşünün."
        },
        {
            "id": 1116,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√49 ifadesinin değeri kaçtır?",
            "options": [
                "7",
                "8",
                "6",
                "14"
            ],
            "ans": "7",
            "hint": "Hangi sayının karesinin 49 olduğunu düşünün."
        },
        {
            "id": 1117,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√64 ifadesinin değeri kaçtır?",
            "options": [
                "8",
                "9",
                "16",
                "7"
            ],
            "ans": "8",
            "hint": "Hangi sayının karesinin 64 olduğunu düşünün."
        },
        {
            "id": 1118,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√81 ifadesinin değeri kaçtır?",
            "options": [
                "18",
                "8",
                "10",
                "9"
            ],
            "ans": "9",
            "hint": "Hangi sayının karesinin 81 olduğunu düşünün."
        },
        {
            "id": 1119,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√100 ifadesinin değeri kaçtır?",
            "options": [
                "11",
                "10",
                "9",
                "20"
            ],
            "ans": "10",
            "hint": "Hangi sayının karesinin 100 olduğunu düşünün."
        },
        {
            "id": 1120,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "easy",
            "q": "√121 ifadesinin değeri kaçtır?",
            "options": [
                "22",
                "11",
                "12",
                "10"
            ],
            "ans": "11",
            "hint": "Hangi sayının karesinin 121 olduğunu düşünün."
        },
        {
            "id": 1121,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√484 ifadesinin değeri kaçtır?",
            "options": [
                "44",
                "21",
                "23",
                "22"
            ],
            "ans": "22",
            "hint": "Hangi sayının karesinin 484 olduğunu düşünün."
        },
        {
            "id": 1122,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√529 ifadesinin değeri kaçtır?",
            "options": [
                "23",
                "24",
                "22",
                "46"
            ],
            "ans": "23",
            "hint": "Hangi sayının karesinin 529 olduğunu düşünün."
        },
        {
            "id": 1123,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√576 ifadesinin değeri kaçtır?",
            "options": [
                "24",
                "25",
                "23",
                "48"
            ],
            "ans": "24",
            "hint": "Hangi sayının karesinin 576 olduğunu düşünün."
        },
        {
            "id": 1124,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√625 ifadesinin değeri kaçtır?",
            "options": [
                "24",
                "26",
                "25",
                "50"
            ],
            "ans": "25",
            "hint": "Hangi sayının karesinin 625 olduğunu düşünün."
        },
        {
            "id": 1125,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√676 ifadesinin değeri kaçtır?",
            "options": [
                "25",
                "52",
                "27",
                "26"
            ],
            "ans": "26",
            "hint": "Hangi sayının karesinin 676 olduğunu düşünün."
        },
        {
            "id": 1126,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√729 ifadesinin değeri kaçtır?",
            "options": [
                "54",
                "27",
                "28",
                "26"
            ],
            "ans": "27",
            "hint": "Hangi sayının karesinin 729 olduğunu düşünün."
        },
        {
            "id": 1127,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√784 ifadesinin değeri kaçtır?",
            "options": [
                "27",
                "56",
                "29",
                "28"
            ],
            "ans": "28",
            "hint": "Hangi sayının karesinin 784 olduğunu düşünün."
        },
        {
            "id": 1128,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√841 ifadesinin değeri kaçtır?",
            "options": [
                "58",
                "28",
                "30",
                "29"
            ],
            "ans": "29",
            "hint": "Hangi sayının karesinin 841 olduğunu düşünün."
        },
        {
            "id": 1129,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√900 ifadesinin değeri kaçtır?",
            "options": [
                "31",
                "30",
                "60",
                "29"
            ],
            "ans": "30",
            "hint": "Hangi sayının karesinin 900 olduğunu düşünün."
        },
        {
            "id": 1130,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "medium",
            "q": "√961 ifadesinin değeri kaçtır?",
            "options": [
                "31",
                "32",
                "30",
                "62"
            ],
            "ans": "31",
            "hint": "Hangi sayının karesinin 961 olduğunu düşünün."
        },
        {
            "id": 1131,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2209 ifadesinin değeri kaçtır?",
            "options": [
                "94",
                "47",
                "48",
                "46"
            ],
            "ans": "47",
            "hint": "Hangi sayının karesinin 2209 olduğunu düşünün."
        },
        {
            "id": 1132,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2304 ifadesinin değeri kaçtır?",
            "options": [
                "48",
                "49",
                "47",
                "96"
            ],
            "ans": "48",
            "hint": "Hangi sayının karesinin 2304 olduğunu düşünün."
        },
        {
            "id": 1133,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2401 ifadesinin değeri kaçtır?",
            "options": [
                "50",
                "98",
                "49",
                "48"
            ],
            "ans": "49",
            "hint": "Hangi sayının karesinin 2401 olduğunu düşünün."
        },
        {
            "id": 1134,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2500 ifadesinin değeri kaçtır?",
            "options": [
                "100",
                "49",
                "51",
                "50"
            ],
            "ans": "50",
            "hint": "Hangi sayının karesinin 2500 olduğunu düşünün."
        },
        {
            "id": 1135,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2601 ifadesinin değeri kaçtır?",
            "options": [
                "51",
                "52",
                "50",
                "102"
            ],
            "ans": "51",
            "hint": "Hangi sayının karesinin 2601 olduğunu düşünün."
        },
        {
            "id": 1136,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2704 ifadesinin değeri kaçtır?",
            "options": [
                "104",
                "51",
                "53",
                "52"
            ],
            "ans": "52",
            "hint": "Hangi sayının karesinin 2704 olduğunu düşünün."
        },
        {
            "id": 1137,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2809 ifadesinin değeri kaçtır?",
            "options": [
                "54",
                "53",
                "106",
                "52"
            ],
            "ans": "53",
            "hint": "Hangi sayının karesinin 2809 olduğunu düşünün."
        },
        {
            "id": 1138,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√2916 ifadesinin değeri kaçtır?",
            "options": [
                "54",
                "108",
                "55",
                "53"
            ],
            "ans": "54",
            "hint": "Hangi sayının karesinin 2916 olduğunu düşünün."
        },
        {
            "id": 1139,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√3025 ifadesinin değeri kaçtır?",
            "options": [
                "110",
                "54",
                "55",
                "56"
            ],
            "ans": "55",
            "hint": "Hangi sayının karesinin 3025 olduğunu düşünün."
        },
        {
            "id": 1140,
            "topic": "Sayılar ve İşlemler",
            "subTopic": "Kareköklü İfadeler",
            "difficulty": "hard",
            "q": "√3136 ifadesinin değeri kaçtır?",
            "options": [
                "56",
                "57",
                "55",
                "112"
            ],
            "ans": "56",
            "hint": "Hangi sayının karesinin 3136 olduğunu düşünün."
        },
        {
            "id": 1141,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "3",
                "4",
                "2",
                "5"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1142,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "3",
                "5",
                "4",
                "6"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1143,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "5",
                "6",
                "4",
                "7"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1144,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "6",
                "8",
                "7",
                "5"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1145,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "7",
                "8",
                "6",
                "9"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1146,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "10",
                "9",
                "8",
                "7"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1147,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "9",
                "10",
                "8",
                "11"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1148,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "10",
                "12",
                "11",
                "9"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1149,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1150,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "12",
                "14",
                "13",
                "11"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1151,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "18",
                "20",
                "19",
                "17"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1152,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "21",
                "18",
                "20",
                "19"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1153,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "19",
                "21",
                "22",
                "20"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1154,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "20",
                "22",
                "21",
                "23"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1155,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "24",
                "21",
                "23",
                "22"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1156,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "24",
                "23",
                "25",
                "22"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1157,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "24",
                "25",
                "23",
                "26"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1158,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "27",
                "24",
                "26",
                "25"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1159,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "26",
                "25",
                "28",
                "27"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1160,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "27",
                "26",
                "28",
                "29"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1161,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "40",
                "37",
                "39",
                "38"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1162,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "41",
                "38",
                "40",
                "39"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1163,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "42",
                "39",
                "41",
                "40"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1164,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "43",
                "40",
                "42",
                "41"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1165,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "41",
                "44",
                "43",
                "42"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1166,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "45",
                "43",
                "44",
                "42"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1167,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "45",
                "43",
                "46",
                "44"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1168,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "44",
                "46",
                "45",
                "47"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1169,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "46",
                "47",
                "45",
                "48"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1170,
            "topic": "Cebir",
            "subTopic": "Cebirsel İfadeler ve Özdeşlikler",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "47",
                "49",
                "48",
                "46"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1171,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "3",
                "5",
                "4",
                "2"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1172,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "4",
                "5",
                "6",
                "3"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1173,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "4",
                "6",
                "7",
                "5"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1174,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "8",
                "6",
                "7",
                "5"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1175,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "6",
                "9",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1176,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "8",
                "7",
                "9",
                "10"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1177,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "8",
                "9",
                "10",
                "11"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1178,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "12",
                "9",
                "11",
                "10"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1179,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1180,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "14",
                "11",
                "13",
                "12"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1181,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "18",
                "19",
                "17",
                "20"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1182,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1183,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "22",
                "20",
                "21",
                "19"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1184,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "22",
                "21",
                "20",
                "23"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1185,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "21",
                "23",
                "24",
                "22"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1186,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "22",
                "24",
                "25",
                "23"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1187,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "26",
                "23",
                "25",
                "24"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1188,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "26",
                "25",
                "24",
                "27"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1189,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "26",
                "27",
                "25",
                "28"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1190,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "26",
                "28",
                "27",
                "29"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1191,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "38",
                "40",
                "39",
                "37"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1192,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "41",
                "38",
                "39",
                "40"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1193,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "40",
                "41",
                "39",
                "42"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1194,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "42",
                "43",
                "40",
                "41"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1195,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "43",
                "44",
                "42",
                "41"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1196,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "45",
                "43",
                "44",
                "42"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1197,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "46",
                "43",
                "45",
                "44"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1198,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "45",
                "44",
                "47",
                "46"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1199,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "45",
                "46",
                "47",
                "48"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1200,
            "topic": "Cebir",
            "subTopic": "Doğrusal Denklemler",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "49",
                "46",
                "48",
                "47"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1201,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 2 = 4 denkleminde x kaçtır?",
            "options": [
                "5",
                "2",
                "4",
                "3"
            ],
            "ans": "3",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1202,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 3 = 5 denkleminde x kaçtır?",
            "options": [
                "4",
                "5",
                "3",
                "6"
            ],
            "ans": "4",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1203,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 4 = 6 denkleminde x kaçtır?",
            "options": [
                "5",
                "6",
                "4",
                "7"
            ],
            "ans": "5",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1204,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 5 = 7 denkleminde x kaçtır?",
            "options": [
                "5",
                "8",
                "7",
                "6"
            ],
            "ans": "6",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1205,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 6 = 8 denkleminde x kaçtır?",
            "options": [
                "8",
                "7",
                "9",
                "6"
            ],
            "ans": "7",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1206,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 7 = 9 denkleminde x kaçtır?",
            "options": [
                "10",
                "8",
                "9",
                "7"
            ],
            "ans": "8",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1207,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 8 = 10 denkleminde x kaçtır?",
            "options": [
                "11",
                "8",
                "10",
                "9"
            ],
            "ans": "9",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1208,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 9 = 11 denkleminde x kaçtır?",
            "options": [
                "9",
                "11",
                "12",
                "10"
            ],
            "ans": "10",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1209,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 10 = 12 denkleminde x kaçtır?",
            "options": [
                "11",
                "12",
                "10",
                "13"
            ],
            "ans": "11",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1210,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "easy",
            "q": "2x - 11 = 13 denkleminde x kaçtır?",
            "options": [
                "14",
                "11",
                "13",
                "12"
            ],
            "ans": "12",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1211,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 22 = 14 denkleminde x kaçtır?",
            "options": [
                "20",
                "17",
                "19",
                "18"
            ],
            "ans": "18",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1212,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 23 = 15 denkleminde x kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1213,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 24 = 16 denkleminde x kaçtır?",
            "options": [
                "22",
                "21",
                "19",
                "20"
            ],
            "ans": "20",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1214,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 25 = 17 denkleminde x kaçtır?",
            "options": [
                "22",
                "21",
                "23",
                "20"
            ],
            "ans": "21",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1215,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 26 = 18 denkleminde x kaçtır?",
            "options": [
                "22",
                "23",
                "21",
                "24"
            ],
            "ans": "22",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1216,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 27 = 19 denkleminde x kaçtır?",
            "options": [
                "24",
                "23",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1217,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 28 = 20 denkleminde x kaçtır?",
            "options": [
                "24",
                "23",
                "25",
                "26"
            ],
            "ans": "24",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1218,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 29 = 21 denkleminde x kaçtır?",
            "options": [
                "27",
                "24",
                "26",
                "25"
            ],
            "ans": "25",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1219,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 30 = 22 denkleminde x kaçtır?",
            "options": [
                "28",
                "27",
                "26",
                "25"
            ],
            "ans": "26",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1220,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "medium",
            "q": "2x - 31 = 23 denkleminde x kaçtır?",
            "options": [
                "27",
                "28",
                "26",
                "29"
            ],
            "ans": "27",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1221,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 47 = 29 denkleminde x kaçtır?",
            "options": [
                "40",
                "37",
                "38",
                "39"
            ],
            "ans": "38",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1222,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 48 = 30 denkleminde x kaçtır?",
            "options": [
                "39",
                "40",
                "38",
                "41"
            ],
            "ans": "39",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1223,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 49 = 31 denkleminde x kaçtır?",
            "options": [
                "42",
                "39",
                "40",
                "41"
            ],
            "ans": "40",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1224,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 50 = 32 denkleminde x kaçtır?",
            "options": [
                "40",
                "41",
                "43",
                "42"
            ],
            "ans": "41",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1225,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 51 = 33 denkleminde x kaçtır?",
            "options": [
                "44",
                "41",
                "43",
                "42"
            ],
            "ans": "42",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1226,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 52 = 34 denkleminde x kaçtır?",
            "options": [
                "45",
                "42",
                "44",
                "43"
            ],
            "ans": "43",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1227,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 53 = 35 denkleminde x kaçtır?",
            "options": [
                "44",
                "45",
                "43",
                "46"
            ],
            "ans": "44",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1228,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 54 = 36 denkleminde x kaçtır?",
            "options": [
                "46",
                "45",
                "44",
                "47"
            ],
            "ans": "45",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1229,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 55 = 37 denkleminde x kaçtır?",
            "options": [
                "47",
                "48",
                "45",
                "46"
            ],
            "ans": "46",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1230,
            "topic": "Cebir",
            "subTopic": "Eşitsizlikler",
            "difficulty": "hard",
            "q": "2x - 56 = 38 denkleminde x kaçtır?",
            "options": [
                "49",
                "48",
                "47",
                "46"
            ],
            "ans": "47",
            "hint": "Bilinenleri bir tarafa, bilinmeyenleri diğer tarafa toplayarak x'i yalnız bırakın."
        },
        {
            "id": 1231,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 2 cm ve 3 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "4",
                "8",
                "6",
                "10"
            ],
            "ans": "6",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (2 x 3)."
        },
        {
            "id": 1232,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 3 cm ve 4 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "10",
                "16",
                "12",
                "14"
            ],
            "ans": "12",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (3 x 4)."
        },
        {
            "id": 1233,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 4 cm ve 5 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "18",
                "20",
                "22",
                "24"
            ],
            "ans": "20",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (4 x 5)."
        },
        {
            "id": 1234,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 5 cm ve 6 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "30",
                "28",
                "34",
                "32"
            ],
            "ans": "30",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (5 x 6)."
        },
        {
            "id": 1235,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 6 cm ve 7 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "46",
                "40",
                "44",
                "42"
            ],
            "ans": "42",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (6 x 7)."
        },
        {
            "id": 1236,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 7 cm ve 8 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "60",
                "56",
                "54",
                "58"
            ],
            "ans": "56",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (7 x 8)."
        },
        {
            "id": 1237,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 8 cm ve 9 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "70",
                "76",
                "72",
                "74"
            ],
            "ans": "72",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (8 x 9)."
        },
        {
            "id": 1238,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 9 cm ve 10 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "90",
                "92",
                "88",
                "94"
            ],
            "ans": "90",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (9 x 10)."
        },
        {
            "id": 1239,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 10 cm ve 11 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "114",
                "112",
                "110",
                "108"
            ],
            "ans": "110",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (10 x 11)."
        },
        {
            "id": 1240,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "easy",
            "q": "Kenar uzunlukları 11 cm ve 12 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "132",
                "130",
                "134",
                "136"
            ],
            "ans": "132",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (11 x 12)."
        },
        {
            "id": 1241,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 22 cm ve 18 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "400",
                "394",
                "398",
                "396"
            ],
            "ans": "396",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (22 x 18)."
        },
        {
            "id": 1242,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 23 cm ve 19 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "441",
                "435",
                "439",
                "437"
            ],
            "ans": "437",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (23 x 19)."
        },
        {
            "id": 1243,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 24 cm ve 20 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "478",
                "480",
                "484",
                "482"
            ],
            "ans": "480",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (24 x 20)."
        },
        {
            "id": 1244,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 25 cm ve 21 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "525",
                "523",
                "527",
                "529"
            ],
            "ans": "525",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (25 x 21)."
        },
        {
            "id": 1245,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 26 cm ve 22 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "574",
                "572",
                "576",
                "570"
            ],
            "ans": "572",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (26 x 22)."
        },
        {
            "id": 1246,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 27 cm ve 23 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "621",
                "625",
                "623",
                "619"
            ],
            "ans": "621",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (27 x 23)."
        },
        {
            "id": 1247,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 28 cm ve 24 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "672",
                "674",
                "676",
                "670"
            ],
            "ans": "672",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (28 x 24)."
        },
        {
            "id": 1248,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 29 cm ve 25 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "729",
                "723",
                "727",
                "725"
            ],
            "ans": "725",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (29 x 25)."
        },
        {
            "id": 1249,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 30 cm ve 26 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "784",
                "778",
                "782",
                "780"
            ],
            "ans": "780",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (30 x 26)."
        },
        {
            "id": 1250,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "medium",
            "q": "Kenar uzunlukları 31 cm ve 27 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "835",
                "839",
                "841",
                "837"
            ],
            "ans": "837",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (31 x 27)."
        },
        {
            "id": 1251,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 47 cm ve 38 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1784",
                "1788",
                "1786",
                "1790"
            ],
            "ans": "1786",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (47 x 38)."
        },
        {
            "id": 1252,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 48 cm ve 39 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1876",
                "1872",
                "1870",
                "1874"
            ],
            "ans": "1872",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (48 x 39)."
        },
        {
            "id": 1253,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 49 cm ve 40 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "1964",
                "1960",
                "1962",
                "1958"
            ],
            "ans": "1960",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (49 x 40)."
        },
        {
            "id": 1254,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 50 cm ve 41 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2048",
                "2052",
                "2050",
                "2054"
            ],
            "ans": "2050",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (50 x 41)."
        },
        {
            "id": 1255,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 51 cm ve 42 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2142",
                "2140",
                "2146",
                "2144"
            ],
            "ans": "2142",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (51 x 42)."
        },
        {
            "id": 1256,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 52 cm ve 43 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2236",
                "2238",
                "2240",
                "2234"
            ],
            "ans": "2236",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (52 x 43)."
        },
        {
            "id": 1257,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 53 cm ve 44 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2334",
                "2330",
                "2336",
                "2332"
            ],
            "ans": "2332",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (53 x 44)."
        },
        {
            "id": 1258,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 54 cm ve 45 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2428",
                "2430",
                "2432",
                "2434"
            ],
            "ans": "2430",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (54 x 45)."
        },
        {
            "id": 1259,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 55 cm ve 46 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2530",
                "2534",
                "2532",
                "2528"
            ],
            "ans": "2530",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (55 x 46)."
        },
        {
            "id": 1260,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Üçgenler",
            "difficulty": "hard",
            "q": "Kenar uzunlukları 56 cm ve 47 cm olan dikdörtgenin alanı kaç cm²'dir?",
            "options": [
                "2630",
                "2634",
                "2632",
                "2636"
            ],
            "ans": "2632",
            "hint": "Dikdörtgenin alanı, iki dik kenarının çarpımına eşittir (56 x 47)."
        },
        {
            "id": 1261,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "7",
                "5",
                "4",
                "6"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1262,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "6",
                "9",
                "7",
                "8"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1263,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "10",
                "8",
                "11"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1264,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "11",
                "12",
                "10",
                "13"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1265,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "14",
                "12",
                "15"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1266,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "14",
                "16",
                "15",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1267,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "18",
                "17",
                "19"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1268,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "20",
                "18",
                "21",
                "19"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1269,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "20",
                "23",
                "22"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1270,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "24",
                "22",
                "25"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1271,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "41",
                "40",
                "39",
                "42"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1272,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "43",
                "44",
                "42",
                "41"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1273,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "43",
                "45",
                "46",
                "44"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1274,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "46",
                "47",
                "45",
                "48"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1275,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "49",
                "48",
                "47",
                "50"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1276,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "49",
                "51",
                "52",
                "50"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1277,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "53",
                "51",
                "54"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1278,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "53",
                "55",
                "56",
                "54"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1279,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "56",
                "57",
                "55",
                "58"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1280,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "59",
                "60",
                "57",
                "58"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1281,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "85",
                "86",
                "84",
                "87"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1282,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "88",
                "86",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1283,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "88",
                "91",
                "90",
                "89"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1284,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "90",
                "92",
                "93",
                "91"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1285,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "94",
                "95",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1286,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "95",
                "96",
                "94",
                "97"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1287,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "97",
                "98",
                "96",
                "99"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1288,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "100",
                "101",
                "99"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1289,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "100",
                "102",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1290,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Dönüşüm Geometrisi",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "104",
                "102",
                "105"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1291,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "2 + 3 işleminin sonucu kaçtır?",
            "options": [
                "4",
                "7",
                "6",
                "5"
            ],
            "ans": "5",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1292,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "3 + 4 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "6",
                "8",
                "7"
            ],
            "ans": "7",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1293,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "4 + 5 işleminin sonucu kaçtır?",
            "options": [
                "9",
                "10",
                "8",
                "11"
            ],
            "ans": "9",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1294,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "5 + 6 işleminin sonucu kaçtır?",
            "options": [
                "13",
                "10",
                "12",
                "11"
            ],
            "ans": "11",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1295,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "6 + 7 işleminin sonucu kaçtır?",
            "options": [
                "14",
                "12",
                "13",
                "15"
            ],
            "ans": "13",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1296,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "7 + 8 işleminin sonucu kaçtır?",
            "options": [
                "14",
                "15",
                "16",
                "17"
            ],
            "ans": "15",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1297,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "8 + 9 işleminin sonucu kaçtır?",
            "options": [
                "16",
                "18",
                "19",
                "17"
            ],
            "ans": "17",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1298,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "9 + 10 işleminin sonucu kaçtır?",
            "options": [
                "19",
                "20",
                "18",
                "21"
            ],
            "ans": "19",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1299,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "10 + 11 işleminin sonucu kaçtır?",
            "options": [
                "21",
                "23",
                "22",
                "20"
            ],
            "ans": "21",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1300,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "easy",
            "q": "11 + 12 işleminin sonucu kaçtır?",
            "options": [
                "23",
                "24",
                "25",
                "22"
            ],
            "ans": "23",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1301,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "22 + 18 işleminin sonucu kaçtır?",
            "options": [
                "39",
                "42",
                "40",
                "41"
            ],
            "ans": "40",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1302,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "23 + 19 işleminin sonucu kaçtır?",
            "options": [
                "44",
                "43",
                "41",
                "42"
            ],
            "ans": "42",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1303,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "24 + 20 işleminin sonucu kaçtır?",
            "options": [
                "44",
                "46",
                "45",
                "43"
            ],
            "ans": "44",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1304,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "25 + 21 işleminin sonucu kaçtır?",
            "options": [
                "48",
                "45",
                "47",
                "46"
            ],
            "ans": "46",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1305,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "26 + 22 işleminin sonucu kaçtır?",
            "options": [
                "47",
                "48",
                "50",
                "49"
            ],
            "ans": "48",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1306,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "27 + 23 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "49",
                "51",
                "50"
            ],
            "ans": "50",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1307,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "28 + 24 işleminin sonucu kaçtır?",
            "options": [
                "52",
                "53",
                "51",
                "54"
            ],
            "ans": "52",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1308,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "29 + 25 işleminin sonucu kaçtır?",
            "options": [
                "56",
                "54",
                "55",
                "53"
            ],
            "ans": "54",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1309,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "30 + 26 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "55",
                "57",
                "56"
            ],
            "ans": "56",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1310,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "medium",
            "q": "31 + 27 işleminin sonucu kaçtır?",
            "options": [
                "58",
                "59",
                "57",
                "60"
            ],
            "ans": "58",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1311,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "47 + 38 işleminin sonucu kaçtır?",
            "options": [
                "85",
                "84",
                "87",
                "86"
            ],
            "ans": "85",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1312,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "48 + 39 işleminin sonucu kaçtır?",
            "options": [
                "87",
                "88",
                "86",
                "89"
            ],
            "ans": "87",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1313,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "49 + 40 işleminin sonucu kaçtır?",
            "options": [
                "91",
                "88",
                "90",
                "89"
            ],
            "ans": "89",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1314,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "50 + 41 işleminin sonucu kaçtır?",
            "options": [
                "90",
                "92",
                "91",
                "93"
            ],
            "ans": "91",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1315,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "51 + 42 işleminin sonucu kaçtır?",
            "options": [
                "92",
                "94",
                "95",
                "93"
            ],
            "ans": "93",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1316,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "52 + 43 işleminin sonucu kaçtır?",
            "options": [
                "94",
                "97",
                "96",
                "95"
            ],
            "ans": "95",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1317,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "53 + 44 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "99",
                "97",
                "96"
            ],
            "ans": "97",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1318,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "54 + 45 işleminin sonucu kaçtır?",
            "options": [
                "98",
                "99",
                "101",
                "100"
            ],
            "ans": "99",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1319,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "55 + 46 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "102",
                "100",
                "101"
            ],
            "ans": "101",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1320,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Eşlik ve Benzerlik",
            "difficulty": "hard",
            "q": "56 + 47 işleminin sonucu kaçtır?",
            "options": [
                "103",
                "104",
                "105",
                "102"
            ],
            "ans": "103",
            "hint": "Sayıları toplayın."
        },
        {
            "id": 1321,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 2 cm, 3 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "12",
                "18",
                "6",
                "17"
            ],
            "ans": "12",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1322,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 3 cm, 4 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "29",
                "12",
                "36",
                "24"
            ],
            "ans": "24",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1323,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 4 cm, 5 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "40",
                "45",
                "60",
                "20"
            ],
            "ans": "40",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1324,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 5 cm, 6 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "60",
                "65",
                "90",
                "30"
            ],
            "ans": "60",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1325,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 6 cm, 7 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "89",
                "84",
                "126",
                "42"
            ],
            "ans": "84",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1326,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 7 cm, 8 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "56",
                "117",
                "168",
                "112"
            ],
            "ans": "112",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1327,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 8 cm, 9 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "72",
                "216",
                "149",
                "144"
            ],
            "ans": "144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1328,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 9 cm, 10 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "185",
                "180",
                "90",
                "270"
            ],
            "ans": "180",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1329,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 10 cm, 11 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "330",
                "220",
                "110",
                "225"
            ],
            "ans": "220",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1330,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "easy",
            "q": "Ayrıt uzunlukları 11 cm, 12 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "264",
                "396",
                "132",
                "269"
            ],
            "ans": "264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1331,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 22 cm, 18 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "792",
                "1188",
                "396",
                "797"
            ],
            "ans": "792",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1332,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 23 cm, 19 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1311",
                "879",
                "874",
                "437"
            ],
            "ans": "874",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1333,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 24 cm, 20 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1440",
                "965",
                "960",
                "480"
            ],
            "ans": "960",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1334,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 25 cm, 21 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1055",
                "1575",
                "1050",
                "525"
            ],
            "ans": "1050",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1335,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 26 cm, 22 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1144",
                "1716",
                "572",
                "1149"
            ],
            "ans": "1144",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1336,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 27 cm, 23 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "621",
                "1247",
                "1863",
                "1242"
            ],
            "ans": "1242",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1337,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 28 cm, 24 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "672",
                "2016",
                "1349",
                "1344"
            ],
            "ans": "1344",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1338,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 29 cm, 25 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1455",
                "725",
                "2175",
                "1450"
            ],
            "ans": "1450",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1339,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 30 cm, 26 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1560",
                "2340",
                "780",
                "1565"
            ],
            "ans": "1560",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1340,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "medium",
            "q": "Ayrıt uzunlukları 31 cm, 27 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1679",
                "1674",
                "2511",
                "837"
            ],
            "ans": "1674",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1341,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 47 cm, 38 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3577",
                "1786",
                "5358",
                "3572"
            ],
            "ans": "3572",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1342,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 48 cm, 39 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "3744",
                "5616",
                "1872",
                "3749"
            ],
            "ans": "3744",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1343,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 49 cm, 40 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "1960",
                "3925",
                "5880",
                "3920"
            ],
            "ans": "3920",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1344,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 50 cm, 41 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4105",
                "4100",
                "2050",
                "6150"
            ],
            "ans": "4100",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1345,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 51 cm, 42 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2142",
                "4289",
                "6426",
                "4284"
            ],
            "ans": "4284",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1346,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 52 cm, 43 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4472",
                "6708",
                "4477",
                "2236"
            ],
            "ans": "4472",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1347,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 53 cm, 44 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4669",
                "2332",
                "6996",
                "4664"
            ],
            "ans": "4664",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1348,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 54 cm, 45 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "4865",
                "2430",
                "7290",
                "4860"
            ],
            "ans": "4860",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1349,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 55 cm, 46 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "5065",
                "2530",
                "7590",
                "5060"
            ],
            "ans": "5060",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        },
        {
            "id": 1350,
            "topic": "Geometri ve Ölçme",
            "subTopic": "Geometrik Cisimler",
            "difficulty": "hard",
            "q": "Ayrıt uzunlukları 56 cm, 47 cm ve 2 cm olan dikdörtgenler prizmasının hacmi kaç cm³'tür?",
            "options": [
                "2632",
                "7896",
                "5264",
                "5269"
            ],
            "ans": "5264",
            "hint": "Prizmanın hacmi, üç farklı ayrıtının çarpımına eşittir."
        }
    ]
};
