declare namespace drawchat.updator {

	interface Updator{



		//commit():void;

		undo():boolean;

		redo():boolean;
	}

	interface ClipSession{

		commit():void;
	}

	interface StrokeSession{

		commit():void;
	}

	interface SequenceSession{
		commit():void;
	}




}