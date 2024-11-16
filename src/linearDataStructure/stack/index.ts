class Stack<T>{
	constructor(private arr: Array<T>){}
	push(...arg:T[]){
        return this.arr.push(...arg)
	}
	pop(){
		return this.arr.pop()
	}
}
	

const s = new Stack([1,2])
s.push(3,4,5)
console.log(s);


