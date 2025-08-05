// Example component using shared custom types
import type { User, Lesson, BaseComponentProps, WithLoading } from '@repo/types/shared';

interface UserLessonCardProps extends BaseComponentProps, WithLoading {
  user: User;
  lesson: Lesson;
  onStartLesson: (lessonId: string) => void;
}

export function UserLessonCard({
  user,
  lesson,
  isLoading = false,
  onStartLesson,
  className = '',
  children
}: UserLessonCardProps) {
  return (
    <div className={`lesson-card ${className}`}>
      <div className="user-info">
        <img src={user.avatar} alt={user.name} />
        <span>{user.name}</span>
      </div>

      <div className="lesson-details">
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
        <div className="lesson-meta">
          <span>
            {lesson.language.flag} {lesson.language.name}
          </span>
          <span>{lesson.level}</span>
          <span>{lesson.duration} min</span>
        </div>
      </div>

      <button onClick={() => onStartLesson(lesson.id)} disabled={isLoading}>
        {isLoading ? 'Loading...' : lesson.completed ? 'Review' : 'Start Lesson'}
      </button>

      {children}
    </div>
  );
}
