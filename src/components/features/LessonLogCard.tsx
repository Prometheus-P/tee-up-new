import Link from 'next/link';
import type { LessonLog } from '@/actions';

// ============================================
// Types
// ============================================

interface LessonLogCardProps {
  /** 레슨 일지 데이터 */
  lesson: LessonLog;
  /** 수강생 이름 (profiles 조인 시 사용) */
  studentName?: string;
  /** 클릭 시 상세 페이지로 이동 여부 */
  isLinked?: boolean;
  /** 상세 페이지 경로 (기본: /dashboard/lessons/[id]) */
  href?: string;
  /** 측정 데이터 표시 여부 */
  showMetrics?: boolean;
  /** 최대 표시할 측정 항목 수 */
  maxMetrics?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

// ============================================
// Helper Functions
// ============================================

/** 날짜 포맷팅 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** 레슨 타입 라벨 */
function getLessonTypeLabel(type: string | null): string {
  const types: Record<string, string> = {
    individual: '개인 레슨',
    group: '그룹 레슨',
    online: '온라인 레슨',
    on_course: '필드 레슨',
  };
  return type ? types[type] || type : '레슨';
}

/** 측정 항목 라벨 (영문 → 한글) */
function getMetricLabel(key: string): string {
  const labels: Record<string, string> = {
    drive_distance: '드라이버',
    putting_accuracy: '퍼팅',
    handicap: '핸디캡',
    swing_speed: '스윙스피드',
    accuracy: '정확도',
    consistency: '일관성',
  };
  return labels[key] || key;
}

// ============================================
// Card Content Component
// ============================================

function CardContent({
  lesson,
  studentName,
  showMetrics = true,
  maxMetrics = 3,
}: Pick<LessonLogCardProps, 'lesson' | 'studentName' | 'showMetrics' | 'maxMetrics'>) {
  const displayName = studentName || lesson.guest_name || (lesson.student_id ? '회원' : '비회원');
  const metricsEntries = Object.entries(lesson.metrics || {});
  const hasMetrics = metricsEntries.length > 0;

  return (
    <>
      <div className="flex items-start justify-between">
        {/* Left: Student info and content */}
        <div className="min-w-0 flex-1">
          {/* Header: Name and badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-tee-ink-strong">{displayName}</span>
            <span className="rounded bg-tee-stone px-2 py-0.5 text-xs text-tee-ink-light">
              {getLessonTypeLabel(lesson.lesson_type)}
            </span>
            {lesson.is_shared_with_student && (
              <span className="rounded bg-tee-accent-primary/10 px-2 py-0.5 text-xs text-tee-accent-primary">
                공유됨
              </span>
            )}
          </div>

          {/* Topic */}
          {lesson.topic && (
            <p className="mt-1 text-sm text-tee-ink-light">{lesson.topic}</p>
          )}

          {/* Notes (truncated) */}
          {lesson.notes && (
            <p className="mt-1 line-clamp-2 text-sm text-tee-ink-muted">
              {lesson.notes}
            </p>
          )}
        </div>

        {/* Right: Date and duration */}
        <div className="ml-4 flex-shrink-0 text-right">
          <p className="text-sm font-medium text-tee-ink-strong">
            {formatDate(lesson.lesson_date)}
          </p>
          <p className="text-xs text-tee-ink-muted">{lesson.duration_minutes}분</p>
        </div>
      </div>

      {/* Metrics preview */}
      {showMetrics && hasMetrics && (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-tee-stone pt-3">
          {metricsEntries.slice(0, maxMetrics).map(([key, value]) => (
            <span
              key={key}
              className="rounded bg-tee-background px-2 py-1 text-xs text-tee-ink-light"
            >
              {/* Cast unknown value to string to fix TS error */}
              {getMetricLabel(key)}: {String(value)}
            </span>
          ))}
          {metricsEntries.length > maxMetrics && (
            <span className="text-xs text-tee-ink-muted">
              +{metricsEntries.length - maxMetrics}개 더
            </span>
          )}
        </div>
      )}
    </>
  );
}

// ============================================
// Main Component
// ============================================

/**
 * 레슨 일지 미리보기 카드 컴포넌트
 *
 * 레슨 일지 목록에서 개별 일지를 카드 형태로 표시합니다.
 * 수강생 정보, 레슨 타입, 주제, 날짜, 측정 데이터 등을 보여줍니다.
 *
 * @example
 * ```tsx
 * // 기본 사용 (링크 포함)
 * <LessonLogCard lesson={lessonData} />
 *
 * // 수강생 이름 지정
 * <LessonLogCard lesson={lessonData} studentName="김철수" />
 *
 * // 링크 없이 표시
 * <LessonLogCard lesson={lessonData} isLinked={false} />
 *
 * // 측정 데이터 숨김
 * <LessonLogCard lesson={lessonData} showMetrics={false} />
 * ```
 */
export default function LessonLogCard({
  lesson,
  studentName,
  isLinked = true,
  href,
  showMetrics = true,
  maxMetrics = 3,
  className = '',
}: LessonLogCardProps) {
  const cardClassName = `block rounded-lg border border-tee-stone bg-tee-surface p-4 transition-colors ${
    isLinked ? 'hover:border-tee-accent-primary' : ''
  } ${className}`;

  const contentProps = { lesson, studentName, showMetrics, maxMetrics };

  if (isLinked) {
    return (
      <Link
        href={href || `/dashboard/lessons/${lesson.id}`}
        className={cardClassName}
      >
        <CardContent {...contentProps} />
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      <CardContent {...contentProps} />
    </div>
  );
}