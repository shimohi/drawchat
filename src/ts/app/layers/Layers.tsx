import * as React from 'react';
import * as styles from './LayersStyle.scss';
import {LayerRemoveButton} from "./remove/LayerRemoveButton";
import {LayerTab} from "./layer/LayerTab";
import {LayerAddButton} from "./add/LayerAddButton";

export interface LayerProps{
	selected:number;
	count:number;
	canAdd:boolean;
	canRemove:boolean;
	add():void;
	select(index:number):void;
	remove(index:number):void;
}
export class Layers extends React.Component<LayerProps, any> {
	constructor(props:LayerProps) {
		super(props);
	}
	render() {
		return(
			<div className={styles.container}>
				<LayerRemoveButton
					action={()=>{
						this.props.remove(this.props.selected)
					}} disabled={
						!this.props.canRemove
					}/>
				{Array.apply(0, Array(this.props.count)).map((el:any,i:number)=>{
					return <LayerTab key={i} selected={i === this.props.selected} select={()=>{
						this.props.select(i);
					}}/>
				})}
				<LayerAddButton
					action={()=>{
						this.props.add()
					}}
					disabled={
						!this.props.canAdd
					}/>
			</div>
		);
	}
}
