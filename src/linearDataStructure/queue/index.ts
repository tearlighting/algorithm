class Queue<T>{
	constructor(private arr:T[]){}
	push(...arg:T[]){
		return this.arr.push(...arg)
	}
	pop(){
		return this.arr.shift()
	}
}