import DrawchatEditor = drawchat.editor.DrawchatEditor;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatCanvas = drawchat.editor.DrawchatCanvas;
import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;
import DrawchatUpdater = drawchat.updater.DrawchatUpdater;
import DrawHistory = drawchat.core.DrawHistory;
import UpdateListener = drawchat.editor.UpdateListener;
import DrawchatRenderer = drawchat.renderer.DrawchatRenderer;
import {Layers} from "./Layers";
import {Changer} from "./Changer";
import {Updater} from "../updator/Updator";
import {Viewer} from "../viewer/Viewer";
import {EditorProperties} from "./EditorProperties";
import DrawchatViewer = drawchat.viewer.DrawchatViewer;
export class Editor implements DrawchatEditor{

	/**
	 * 設定値
	 */
	_properties:DrawchatEditorProperties;

	/**
	 * モードチェンジャー
	 */
	_mode:Changer;

	layers:Layers;

	private listeners:Set<UpdateListener>;

	private history:DrawHistory;

	private updater:DrawchatUpdater;

	private renderer:DrawchatRenderer;

	private viewer:DrawchatViewer;

	constructor(
		history:DrawHistory,
		renderer:DrawchatRenderer,
		properties?:DrawchatEditorProperties
	){
		this.listeners = new Set<UpdateListener>();
		this.history = history;
		this.updater = new Updater(history);
		this.renderer = renderer;
		this.viewer = new Viewer(history,renderer);
		this.layers = new Layers(this.updater,this.viewer);
		this._properties = properties ? properties : new EditorProperties();
		this._mode = new Changer(this.layers,this._properties);
	}

	get properties():DrawchatEditorProperties{
		return this._properties;
	}

	get canvas():DrawchatCanvas{
		return this._mode.canvas;
	}

	get mode():DrawchatModeChanger{
		return this._mode;
	}

	stop(): void {
		this.viewer.stop();
	}

	start(): void {
		this.viewer.start();
	}

	getWidth():number {
		return this.renderer.width;
	}

	getHeight():number {
		return this.renderer.height;
	}

	undo():Promise<any> {
		return this.updater.undo();
	}

	redo():Promise<any> {
		return this.updater.redo();
	}

	canUndo(): boolean {
		return this.updater.canUndo();
	}

	canRedo(): boolean {
		return this.updater.canRedo();
	}

	reRender(): void {
		this.viewer.refresh();
	}

	off(listener: drawchat.editor.UpdateListener): void {
		this.listeners.delete(listener);
	}

	on(listener: drawchat.editor.UpdateListener): void {
		this.listeners.add(listener);
	}

	private setupListener():void{
		this.history.awaitUpdate(()=>{
			let deleteList:UpdateListener[] = [];
			for(let listener of this.listeners.values()){
				try {
					listener();
				} catch (e) {
					deleteList.push(listener);
				}
			}
			for(let target of deleteList){
				this.listeners.delete(target);
			}
			this.setupListener();
		});
	}
}
