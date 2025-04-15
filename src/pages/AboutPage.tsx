import Book from '@/components/book/Book';
import { BASE_URL } from '@/consts/routes';

import { useTitle } from '@/hooks/ui/useTitle';
import { useId } from 'react';
import { Link } from 'react-router';

const AboutPage = () => {
	useTitle('О проекте');
	const titleId = useId();

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main title="О проекте" titleId={titleId} backButton={{ to: BASE_URL }}>
				<div className="text">
					<p>
						Данный проект разработан в образовательных целях и не предназначен для реальных задач.
						Сохраненные данные могут быть удалены в любое время.
					</p>
					<br />

					<p>
						Дизайн этого сайта взят из сообщества Figma в соответствии с лицензией{' '}
						<Link to="https://creativecommons.org/licenses/by/4.0/" target="_blank">
							CC BY 4.0
						</Link>
						. Были внесены изменения.
					</p>
					<p>
						Оригинальная работа:{' '}
						<Link to="https://www.figma.com/community/file/1296097022795212613" target="_blank">
							ToDo List
						</Link>
					</p>
					<p>Автор: Ciobanu Cristian</p>
				</div>
			</Book.Main>
		</Book>
	);
};

export default AboutPage;
