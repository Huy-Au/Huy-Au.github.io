/** Matrix Library to be used for toy neural network
 * HEAVILY inspired by "The Coding Train" - Neural Networks
 *
*/


class Matrix{
	constructor(rows, cols)
	{
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for (var i = 0; i < rows; i++){
			this.data[i] = []
			for (var j = 0; j < cols; j++){
				this.data[i][j] = 0;
			}
		}
	}

	ones(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.cols; j++){
				this.data[i][j] = 1;
			}
		}
	}

	randomize(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.cols; j++){
				this.data[i][j] = Math.floor(Math.random()*10);
			}
		}
	}

	// Shouldn't return a new matrix as it should be transpoed itself.
	// However much easier to implement if a new matrix was generated.
	// BAD
	transpose(){
		var result = new Matrix(this.cols, this.rows);
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.cols; j++){
				result.data[j][i] = this.data[i][j];
			}
		}

		return result;
	}

	// Scalar arithmetics - These functions directly change
	// elements inside the matrix
	addMatrix(n){
		if (n instanceof Matrix){
			if (this.rows === n.rows && this.cols === n.cols){
				for (var i = 0; i < this.rows; i++){
					for (var j = 0; j < this.cols; j++){
						this.data[i][j] = this.data[i][j] + n.data[i][j];
				}
			}
			} else {
				console.log("Matrix must be the same size.");
				return;	
			}
			
		} else {
			for (var i = 0; i < this.rows; i++){
				for (var j = 0; j < this.cols; j++){
					this.data[i][j] = this.data[i][j] + n;
				}
			}
		}
	}

	multiplyMatrix(b){
		if (b instanceof Matrix){
			console.log("Please use multipleMatrix(a,b)");
		} else {
			for (var i = 0; i < this.rows; i++){
				for (var j = 0; j < this.cols; j++){
					this.data[i][j] = this.data[i][j] * b;
				}
			}
		}

	}

	// Matrix operations - These functions will generate a new
	// matrix. Static should be used as a new matrix will be generated
	// and it shouldnt be called as a member function

	static multipleMatrix(a, b){
		// Check if possible else console print
		if (a.cols !== b.rows){
			console.log("Cols of Matrix A must be equal to Rows of Matrix B");
			return;
		} else{
			var result = new Matrix(a.rows, b.cols);
			for (var i = 0; i < a.rows; i++){
				for (var j = 0; j < b.cols; j++){
					var total = 0;
					for (var k = 0; k < a.cols; k++){
						var element = a.data[i][k] * b.data[k][j];
						total += element;
					}
					console.log(total);
					result.data[i][j] = total;
				}
			}
			return result;
		}
	}

	static onesVector(n){
		var vector = new Matrix(n,1);
		vector.ones();
		return vector;
	}

	// Ideally only vectors are to be used.
	// This is to add bias unit to input and hidden layer
	static appendMatrix(a, b){
		if (a.rows !== b.rows){
			console.log("Rows of Matrix A must be equal to Rows of Matrix B");
			return;
		}
		var vector = new Matrix(a.rows, (b.cols+a.cols));
		for (var i = 0; i < a.rows; i++){
			for (var j = 0; j < a.cols; j++){
				vector.data[i][j] = a.data[i][j];
			}
		}
		for (var i = 0; i < a.rows; i++){
			for (var j = a.cols; j < vector.cols; j++){
				vector.data[i][j] = b.data[i][j-a.cols];
			}
		}
		return vector;
	}

	// Apply function to each element in Matrix, similar to map function
	// in python
	map(func){
		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				var ele = this.data[i][j];
				this.data[i][j] = func(ele);
			}
		}
	}



	printMatrix(){
		console.table(this.data);
	}


}