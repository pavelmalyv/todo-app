import cl from './LoginSocials.module.scss';

interface LoginSocialsProps {
	children: React.ReactNode;
}

const LoginSocials = ({ children }: LoginSocialsProps) => {
	return (
		<div className={cl['login-socials']}>
			<div className={cl.label}>или</div>
			<ul className={cl.list}>{children}</ul>
		</div>
	);
};

const Google = () => {
	return (
		<li className={cl.item}>
			<button type="button" className={cl.button}>
				<img
					src="/img/icons/google.svg"
					className={cl['button-icon']}
					width={24}
					height={24}
					alt=""
				/>
				<span>Google</span>
			</button>
		</li>
	);
};

LoginSocials.Google = Google;

export default LoginSocials;
