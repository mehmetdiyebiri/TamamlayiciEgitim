/**
 * Academic Year Management & Sene Atlatma Service
 * Handles Turkish Academic Year lifecycle, July 1st cutoff enforcement,
 * 3-step confirmation workflows, class advancement, graduation, and archiving.
 */

export interface AcademicYearConfig {
  activeYear: string; // e.g. "2025-2026"
  pastYears: string[]; // e.g. ["2023-2024", "2024-2025"]
  closedYears?: Record<string, {
    closedAt: string;
    closedBy: string;
    studentCount: number;
    classCount: number;
  }>;
  allowEarlyCloseBypass?: boolean; // For testing simulation
}

export interface AcademicArchive {
  id: string;
  year: string;
  closedAt: string;
  closedBy: string;
  classes: Record<string, string[]>;
  students: Array<{
    id?: string;
    name: string;
    classLevel: string;
    isGraduated?: boolean;
    [key: string]: any;
  }>;
  totalStudents: number;
  totalClasses: number;
}

/**
 * Calculates the current standard academic year based on current date.
 * If month >= 7 (August/September), e.g. Sept 2026 -> "2026-2027"
 * If month < 7 (Jan-June), e.g. May 2026 -> "2025-2026"
 */
export function calculateDefaultAcademicYear(now = new Date()): string {
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Jan, 6 = July, 8 = Sept
  if (month >= 6) { // July or later
    return `${year}-${year + 1}`;
  } else {
    return `${year - 1}-${year}`;
  }
}

/**
 * Checks whether 1 Temmuz (July 1st) has arrived for closing the academic year.
 * For example, for "2025-2026", the closing date is July 1, 2026.
 */
export function checkJulyFirstEligibility(academicYear: string, customDate?: Date): {
  canClose: boolean;
  closingEligibleDate: Date;
  daysRemaining: number;
  formattedTargetDate: string;
} {
  const parts = academicYear.split('-');
  const endYear = parseInt(parts[1] || parts[0], 10);
  
  // July 1st of the closing year (Month 6 in 0-indexed JS: July)
  const closingEligibleDate = new Date(endYear, 6, 1, 0, 0, 0, 0);
  const now = customDate || new Date();

  const timeDiff = closingEligibleDate.getTime() - now.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const canClose = now >= closingEligibleDate;

  const formattedTargetDate = `1 Temmuz ${endYear}`;

  return {
    canClose,
    closingEligibleDate,
    daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    formattedTargetDate
  };
}

/**
 * Calculates next academic year.
 * e.g. "2025-2026" -> "2026-2027"
 */
export function getNextAcademicYear(currentYear: string): string {
  const parts = currentYear.split('-');
  if (parts.length === 2) {
    const start = parseInt(parts[0], 10) + 1;
    const end = parseInt(parts[1], 10) + 1;
    return `${start}-${end}`;
  }
  const year = parseInt(currentYear, 10);
  return !isNaN(year) ? `${year + 1}-${year + 2}` : '2026-2027';
}

/**
 * Parses class name into numeric grade and suffix branch.
 * e.g. "5A" -> grade: 5, branch: "A", separator: ""
 * e.g. "12-A" -> grade: 12, branch: "A", separator: "-"
 * e.g. "7/B" -> grade: 7, branch: "B", separator: "/"
 * e.g. "1. Sınıf A" -> grade: 1, branch: "A", separator: ". Sınıf "
 */
export function parseClassName(className: string): { grade: number | null; branch: string; separator: string } {
  const trimmed = className.trim();
  const match = trimmed.match(/^(\d+)([\s\-\/\._]*(?:sınıf[\s\-]*)?)(.*)$/i);
  if (match) {
    const grade = parseInt(match[1], 10);
    const separator = match[2] || '';
    const branch = match[3] || '';
    return { grade, branch, separator };
  }
  return { grade: null, branch: trimmed, separator: '' };
}

export interface ClassAdvancementPlan {
  oldClassName: string;
  newClassName: string;
  isGraduating: boolean;
  studentCount: number;
  students: string[];
}

/**
 * Simulates or plans what will happen during "Sene Atlatma" for the given classes.
 */
export function planClassAdvancement(
  classes: Record<string, string[]>,
  schoolType?: string,
  academicYear = '2025-2026'
): {
  plans: ClassAdvancementPlan[];
  graduatingClasses: ClassAdvancementPlan[];
  advancingClasses: ClassAdvancementPlan[];
  newIncomingClasses: string[];
  maxGradeInSchool: number;
  endYear: number;
} {
  const parts = academicYear.split('-');
  const endYear = parseInt(parts[1] || parts[0], 10) || new Date().getFullYear();

  // Find max grade present in the school
  let maxGrade = 0;
  const parsedList: Array<{ className: string; grade: number | null; branch: string; separator: string; students: string[] }> = [];

  Object.entries(classes).forEach(([className, students]) => {
    // Skip already graduated classes (e.g. contains "Mezun")
    if (className.toLowerCase().includes('mezun')) return;
    const parsed = parseClassName(className);
    if (parsed.grade !== null && parsed.grade > maxGrade) {
      maxGrade = parsed.grade;
    }
    parsedList.push({ className, ...parsed, students: students || [] });
  });

  // Determine standard graduation grade based on school type or maxGrade
  let graduationGrade = maxGrade;
  const lowerType = (schoolType || '').toLowerCase();
  if (lowerType.includes('lise') || lowerType.includes('anadolu') || lowerType.includes('fen') || maxGrade === 12) {
    graduationGrade = 12;
  } else if (lowerType.includes('orta') || lowerType.includes('iho') || maxGrade === 8) {
    graduationGrade = 8;
  } else if (lowerType.includes('ilkokul') || maxGrade === 4) {
    graduationGrade = 4;
  } else if (maxGrade === 0) {
    graduationGrade = 8;
  }

  const plans: ClassAdvancementPlan[] = [];
  const baseBranches = new Set<string>();

  parsedList.forEach(({ className, grade, branch, separator, students }) => {
    if (grade === null) {
      // Non-standard class name (e.g. Özel Eğitim, Anasınıfı)
      plans.push({
        oldClassName: className,
        newClassName: className,
        isGraduating: false,
        studentCount: students.length,
        students
      });
      return;
    }

    if (grade >= graduationGrade) {
      // Graduating class!
      // Format requested by user: "2022 12-A mezunları" -> `${endYear} ${className} Mezunları`
      const newClassName = `${endYear} ${className} Mezunları`;
      plans.push({
        oldClassName: className,
        newClassName,
        isGraduating: true,
        studentCount: students.length,
        students
      });
    } else {
      // Advancing class (e.g. 5A -> 6A, 11-B -> 12-B)
      const nextGrade = grade + 1;
      const newClassName = `${nextGrade}${separator}${branch}`;
      plans.push({
        oldClassName: className,
        newClassName,
        isGraduating: false,
        studentCount: students.length,
        students
      });
    }

    if (branch) {
      baseBranches.add(branch);
    }
  });

  // Determine new incoming base grade (e.g. 5 for middle school, 9 for high school, 1 for primary)
  let baseGrade = 5;
  if (graduationGrade === 12) baseGrade = 9;
  else if (graduationGrade === 8) baseGrade = 5;
  else if (graduationGrade === 4) baseGrade = 1;

  const newIncomingClasses: string[] = [];
  const branchesList = baseBranches.size > 0 ? Array.from(baseBranches) : ['A', 'B'];
  branchesList.forEach(b => {
    newIncomingClasses.push(`${baseGrade}${b}`);
  });

  const graduatingClasses = plans.filter(p => p.isGraduating);
  const advancingClasses = plans.filter(p => !p.isGraduating);

  return {
    plans,
    graduatingClasses,
    advancingClasses,
    newIncomingClasses,
    maxGradeInSchool: maxGrade,
    endYear
  };
}
