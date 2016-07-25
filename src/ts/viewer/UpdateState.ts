interface UpdateStateMap{
	[key:string]:UpdateState;
}
enum UpdateState{
	NON,
	UPDATE,
	UPDATE_ALL,
	DELETE,
	ADD
}
