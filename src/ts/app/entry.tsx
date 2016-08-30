import DrawchatEditor = drawchat.editor.DrawchatEditor;
import Color = drawchat.editor.Color;
import DrawchatLayers = drawchat.editor.DrawchatLayers;
import DrawchatEditorProperties = drawchat.editor.DrawchatEditorProperties;
import DrawchatModeChanger = drawchat.editor.DrawchatModeChanger;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Renderer from "../renderer/MultiCanvas2DRenderer";
import {History} from "../core/History";
import {Editor} from "../editor/Editor";
import {EditorRoot} from "./EditorRoot";

const history = new History();
const renderer = Renderer.createInstance('editorCanvas',600,400);
const editor = new Editor(history,renderer);

ReactDOM.render(
	<EditorRoot editor={editor}/>,
	document.getElementById("root")
);
