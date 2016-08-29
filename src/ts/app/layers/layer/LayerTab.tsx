import * as React from 'react';
import * as styles from './LayerTabStyle.scss';

export interface LayerTabProps {
	key:any;
	select():void;
	selected:boolean;
}
export class LayerTab extends React.Component<LayerTabProps, any> {

	constructor(props:LayerTabProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.item}>
				<div onClick={()=>{this.props.select()}}
					 className={this.props.selected ? styles.item__selected : styles.item__unselected}>
					{(() => {
						if (this.props.selected){
							return <span className="material-icons">radio_button_checked</span>;
						}
						return <span className="material-icons">radio_button_unchecked</span>;
					})()}
				</div>
			</div>
		);
	}
}
