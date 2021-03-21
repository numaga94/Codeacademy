import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectQuizzes } from './quizzesSlice';
import Card from '../cards/Card';
import ROUTES from '../../app/routes';

export default function Topic() {
  // const quizzes = {}; // replace this with a call to your selector to get all the quizzes in state
  const quizzes = useSelector(selectQuizzes);
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  if (!quiz) {
    return null;
  }

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
