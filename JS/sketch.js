
function setup(){
	let a = new Matrix(2,2);
	a.randomize()
	a.printMatrix();

	function double(x){
		return x*2;
	}

	console.log("Verifying map is working");

	a.map(double);
	a.printMatrix();
}
