import cl from './FieldColor.module.scss';
import classNames from 'classnames';
import FieldError from '../fieldError/FieldError';

import { SketchPicker } from 'react-color';
import { forwardRef, useId } from 'react';

interface FieldColorProps {
	label: string;
	name?: string;
	value: string;
	errorMessage?: string;
	onChange: (color: string) => void;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const FieldColor = forwardRef<HTMLInputElement, FieldColorProps>(
	(
		{
			label,
			name,
			value,
			errorMessage,
			onChange,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const titleId = useId();
		const errorMessageId = useId();
		const pickerId = useId();

		return (
			<div>
				<div className={cl['head-wrapper']}>
					<div className={cl.head}>
						<label htmlFor={titleId} className={cl.label}>
							{label}
						</label>
						<input
							ref={ref}
							id={titleId}
							type="text"
							className={classNames('visually-hidden', cl.field)}
							name={name}
							value={value}
							readOnly={true}
							autoComplete="none"
							aria-describedby={errorMessageId}
							aria-invalid={ariaInvalid}
							aria-required={ariaRequired}
							aria-controls={pickerId}
						/>
						<div
							className={cl.selected}
							style={{ backgroundColor: `${value}` }}
							aria-hidden={true}
						></div>
					</div>

					<FieldError id={errorMessageId} message={errorMessage ? errorMessage : null} />
				</div>

				<div id={pickerId} aria-label="Выбор цвета">
					<SketchPicker
						color={value}
						disableAlpha={true}
						onChange={(color) => onChange(color.hex)}
						presetColors={[
							'#76DE37',
							'#417505',
							'#D0021B',
							'#F5A623',
							'#F8E71C',
							'#8B572A',
							'#BD10E0',
							'#9013FE',
							'#4A90E2',
							'#50E3C2',
							'#9B9B9B',
						]}
						styles={{
							default: {
								color: {
									display: 'none',
								},
								saturation: {
									paddingBottom: '40%',
								},
							},
						}}
					/>
				</div>
			</div>
		);
	},
);

export default FieldColor;
