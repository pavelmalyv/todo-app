import classNames from 'classnames';
import cl from './Book.module.scss';
import imageWebp from '/src/img/book.webp';
import imageJpg from '/src/img/book.jpg';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';

import { Link } from 'react-router';
import { ABOUT_URL, POLICY_URL } from '@/consts/routes';

interface BookProps {
	children: React.ReactNode;
	'aria-labelledby': string;
}

const Book = ({ children, ['aria-labelledby']: ariaLabelledby }: BookProps) => {
	return (
		<section className={classNames(cl.book, 'section')} aria-labelledby={ariaLabelledby}>
			<div className="container">
				<div className={cl.wrapper}>
					<div className={cl.inner}>
						<div className={cl.image}>
							<picture>
								<source srcSet={imageWebp} type="image/webp" />
								<img
									className={cl['image-img']}
									src={imageJpg}
									width={1160}
									height={1444}
									alt="Пустой лист со списком задач висит на стене"
								/>
							</picture>
						</div>
						<div className={cl.body}>
							<div className={cl['body-inner']}>{children}</div>

							<div className={cl.footer}>
								<ul className={cl['nav']}>
									<li>
										<Link to={ABOUT_URL} className={cl['nav-link']}>
											О проекте
										</Link>
									</li>
									<li>
										<Link to={POLICY_URL} target="_blank" className={cl['nav-link']}>
											Политика конфиденциальности
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

interface MainProps {
	title: string;
	titleId?: string;
	children: React.ReactNode;
	isLoading?: boolean;
	backButton?: {
		to: string;
		isCenter?: boolean;
		text?: string;
	};
}

const Main = ({ title, titleId, children, backButton, isLoading = false }: MainProps) => {
	return (
		<VisuallyHiddenLoader isLoading={isLoading}>
			<div className={cl.main}>
				{isLoading ? (
					<div className={cl['spinner-wrapper']}>
						<div className={cl.spinner}></div>
					</div>
				) : (
					<>
						<h1 id={titleId} className={classNames('h1', cl.title)}>
							{title}
						</h1>

						{children}

						{backButton && (
							<div
								className={classNames(cl['link-wrapper'], {
									[cl['link-wrapper_center']]: backButton.isCenter,
								})}
							>
								<Link to={backButton?.to} className={'link'}>
									{backButton?.text ?? 'Назад'}
								</Link>
							</div>
						)}
					</>
				)}
			</div>
		</VisuallyHiddenLoader>
	);
};

Book.Main = Main;

export default Book;
