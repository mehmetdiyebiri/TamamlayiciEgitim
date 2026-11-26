import { DifficultyStage, MitStudyQuestion } from './mitQuestions/types';
import { GRADE_5_QUESTIONS } from './mitQuestions/grade5';
import { GRADE_6_QUESTIONS } from './mitQuestions/grade6';
import { GRADE_7A_QUESTIONS } from './mitQuestions/grade7a';
import { GRADE_7B_QUESTIONS } from './mitQuestions/grade7b';
import { GRADE_8A_QUESTIONS } from './mitQuestions/grade8a';
import { GRADE_8B_QUESTIONS } from './mitQuestions/grade8b';

export type { DifficultyStage, MitStudyQuestion };

export const MIT_STUDY_QUESTIONS: MitStudyQuestion[] = [
    ...GRADE_5_QUESTIONS,
    ...GRADE_6_QUESTIONS,
    ...GRADE_7A_QUESTIONS,
    ...GRADE_7B_QUESTIONS,
    ...GRADE_8A_QUESTIONS,
    ...GRADE_8B_QUESTIONS
];

/**
 * Returns verified, duplicate-free questions for a given grade, optional topic, and optional difficulty stage.
 */
export function getMitCurriculumStudyQuestions(
    grade: 5 | 6 | 7 | 8,
    topic?: string,
    difficulty?: DifficultyStage
): MitStudyQuestion[] {
    const seen = new Set<string>();
    const results: MitStudyQuestion[] = [];

    for (const item of MIT_STUDY_QUESTIONS) {
        if (item.grade !== grade) continue;
        if (topic && item.topic !== topic) continue;
        if (difficulty && item.difficulty !== difficulty) continue;
        if (seen.has(item.id) || seen.has(item.q)) continue;
        seen.add(item.id);
        seen.add(item.q);
        results.push(item);
    }

    return results;
}

/**
 * Builds a deterministic, duplicate-free 7-question exam simulation set (#1..#6)
 * drawn from distinct topics across the grade's 4th-stage ('sinav') bank.
 */
export function getExamSimulationSet(
    grade: 5 | 6 | 7 | 8,
    setNumber: number
): MitStudyQuestion[] {
    const sinavPool = getMitCurriculumStudyQuestions(grade, undefined, 'sinav');
    const byTopic = new Map<string, MitStudyQuestion[]>();

    for (const q of sinavPool) {
        const arr = byTopic.get(q.topic) || [];
        arr.push(q);
        byTopic.set(q.topic, arr);
    }

    const topicNames = Array.from(byTopic.keys());
    const chosen: MitStudyQuestion[] = [];
    const usedIds = new Set<string>();
    const offset = Math.max(0, setNumber - 1);

    // Pick 1 question per topic, rotating topic start and question index per setNumber
    for (let i = 0; i < topicNames.length && chosen.length < 7; i++) {
        const tName = topicNames[(i + offset * 2) % topicNames.length];
        const list = byTopic.get(tName) || [];
        if (list.length === 0) continue;
        const candidate = list[(offset + i) % list.length];
        if (!usedIds.has(candidate.id)) {
            usedIds.add(candidate.id);
            chosen.push(candidate);
        }
    }

    // If a grade has fewer than 7 topics (unlikely, min is 7), fill uniquely from remaining sinav questions
    for (const q of sinavPool) {
        if (chosen.length >= 7) break;
        if (!usedIds.has(q.id)) {
            usedIds.add(q.id);
            chosen.push(q);
        }
    }

    return chosen;
}
