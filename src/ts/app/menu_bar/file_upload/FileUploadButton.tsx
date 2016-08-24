import * as React from 'react';
import * as styles from './FileUploadButtonStyle.scss';

export interface IMainState {
	newItem?: {
		description: string;
	};
	todoList?: string[];
}

export interface IMainProps {}
export class FileUploadButton extends React.Component<IMainProps, IMainState> {

	constructor(props:IMainProps) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<div className={styles.item}>
				<div className={styles.item__square}>
					<div className={styles.item__square_cell}>
						<span className="material-icons">file_upload</span>
					</div>
				</div>
			</div>
		);
	}
}

