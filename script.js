function create2Darray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++)
        arr[i] = [];
    return arr;
}

function swap(arr, ai, aj, bi, bj) {
    let temp = arr[bi][bj];
    arr[bi][bj] = arr[ai][aj];
    arr[ai][aj] = temp;
}

// arr = create2Darray(4);

// arr[0][0] = 4; //[[4,6,2,-2], [2,0,5,-2] , [-4,-3,-5,4],[8,18,-2,3]]
// arr[0][1] = 6;
// arr[0][2] = 2;
// arr[0][3] = -2;
// arr[1][0] = 2;
// arr[1][1] = 6;
// arr[1][2] = 5;
// arr[1][3] = 2;
// arr[2][0] = -4;
// arr[2][1] = -3;
// arr[2][2] = -5;
// arr[2][3] = 4;
// arr[3][0] = 8;
// arr[3][1] = 18;
// arr[3][2] = -2;
// arr[3][3] = 3;

// var vec = [8, 4, 1, 40];

function gauss_elimination(equationArray, vec) {

    // forward elimination
    for (var i = 0; i < equationArray.length - 1; i++) {

        for (var j = i + 1; j < equationArray.length; j++) {
            const factor = -1 * equationArray[j][i] / equationArray[i][i];
            for (var k = i; k < equationArray.length; k++)
                equationArray[j][k] += equationArray[i][k] * factor;
            vec[j] += vec[i] * factor;
        }
    }

    // find the solution --> backward substitution
    const n = equationArray.length - 1;
    var solution = [];
    solution[n] = vec[n] / equationArray[n][n];
    for (var i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (var j = i + 1; j <= n; j++)
            sum += equationArray[i][j] * solution[j];
        solution[i] = (vec[i] - sum) / equationArray[i][i];
    }

    // return the solution
    return solution;
}



function gauss_elimination_with_pivoting(equationArray, vec) {

    // forward elimination
    for (var i = 0; i < equationArray.length - 1; i++) {
        let mx = equationArray[i][i],
            indx = i;
        // getting max pivot 
        for (var row = i; row < equationArray.length; row++) {
            if (equationArray[row][i] > mx) {
                mx = equationArray[row][i];
                indx = row;
            }
        }

        // swapping 
        for (var col = i; col < equationArray.length; col++)
            swap(equationArray, i, col, indx, col);

        // swap in vec also
        let tmp = vec[i];
        vec[i] = vec[indx];
        vec[indx] = tmp;


        // forward elimination
        for (var j = i + 1; j < equationArray.length; j++) {
            const factor = -1 * equationArray[j][i] / equationArray[i][i];
            for (var k = i; k < equationArray.length; k++)
                equationArray[j][k] += equationArray[i][k] * factor;
            vec[j] += vec[i] * factor;
        }

    }

    // find the solution --> backward substitution
    const n = equationArray.length - 1;
    var solution = [];
    solution[n] = vec[n] / equationArray[n][n];
    for (var i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (var j = i + 1; j <= n; j++)
            sum += equationArray[i][j] * solution[j];
        solution[i] = (vec[i] - sum) / equationArray[i][i];
    }

    // return the solution
    return solution;
}

function gauss_gordan(equationArray, vec) {

    // forward elimination
    for (var i = 0; i < equationArray.length; i++) {
        for (var j = 0; j < equationArray.length; j++) {
            if (i == j)
                continue;
            const factor = -1 * equationArray[j][i] / equationArray[i][i];
            for (var k = i; k < equationArray.length; k++)
                equationArray[j][k] += equationArray[i][k] * factor;
            vec[j] += vec[i] * factor;
        }
    }

    // find the solution --> backward substitution
    const n = equationArray.length - 1;
    var solution = [];
    for (var i = n; i >= 0; i--)
        solution[i] = vec[i] / equationArray[i][i];

    return solution;

}

function Identity_matrix(rows) {
    var arr = Array(rows).fill(0).map(x => Array(rows).fill(0))
    for (var i = 0; i < rows; i++) {
        arr[i][i] = 1;
    }
    return arr;
}

function downlittle_LU(equationArray, vec) {
    var L = Identity_matrix(equationArray.length);

    for (var i = 0; i < equationArray.length - 1; i++) {

        for (var j = i + 1; j < equationArray.length; j++) {
            const factor = -1 * equationArray[j][i] / equationArray[i][i];
            for (var k = i; k < equationArray.length; k++)
                equationArray[j][k] += equationArray[i][k] * factor;
            L[j][i] = -1 * factor;
        }
    }
    console.log(L);
    console.log(equationArray);
    console.log(vec);
    var y = forward_substitution(L, vec);
    console.log(y);

    return backward_substitution(equationArray, y);

}

function cholesky_LU(equationArray, vec) {
    var n = equationArray.length;
    var L = Array(n).fill(0).map(x => Array(n).fill(0));

    for (var i = 0; i < n; i++) {
        for (var j = 0; j <= i; j++) {
            let sum = 0;
            if (i == j) {
                for (var k = 0; k < j; k++)
                    sum += Math.pow(L[j][k], 2);
                L[j][j] = Math.sqrt(equationArray[j][j] - sum);
            } else {
                for (var k = 0; k < j; k++)
                    sum += (L[i][k] * L[j][k])
                L[i][j] = (equationArray[i][j] - sum) / L[j][j];
            }
        }
    }
    console.log(L);
    var y = forward_substitution(L, vec);
    console.log(backward_substitution(transpose(L), y));
}

function forward_substitution(equationArray, vec) {
    const n = equationArray.length;
    var solution = [];
    solution[0] = vec[0] / equationArray[0][0];
    for (var i = 0; i < n; i++) {
        let sum = 0;
        for (var j = 0; j < i; j++)
            sum += equationArray[i][j] * solution[j];
        solution[i] = (vec[i] - sum) / equationArray[i][i];
    }
    return solution;
}

function backward_substitution(equationArray, vec) {
    const n = equationArray.length - 1;
    var solution = [];
    solution[n] = vec[n] / equationArray[n][n];
    for (var i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (var j = i + 1; j <= n; j++)
            sum += equationArray[i][j] * solution[j];
        solution[i] = (vec[i] - sum) / equationArray[i][i];
    }
    return solution;
}

function transpose(matrix) {
    const n = matrix.length;
    var solution = create2Darray(n);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            solution[i][j] = matrix[j][i];
        }
    }
    return solution;
}


arr = create2Darray(3);

arr[0][0] = 6;
arr[0][1] = 15;
arr[0][2] = 55;
arr[1][0] = 15;
arr[1][1] = 55;
arr[1][2] = 255;
arr[2][0] = 55;
arr[2][1] = 225;
arr[2][2] = 979;

var vec = [100, 100, 200];
//cholesky_LU(arr,vec);

//downlittle_LU(arr,vec);
//console.log(gauss_elimination_with_pivoting(arr,vec));


function gauss_seidel(equation_factors, equations_value, max_degree, number_of_iters) {

    var initial_x = [],
        results = [];
    for (var i = 0; i < max_degree; i++) initial_x[i] = 1;
    while (number_of_iters > 0) {
        for (var first_iterator = 0; first_iterator < max_degree; first_iterator++) {
            results[first_iterator] = (equations_value[first_iterator] / equation_factors[first_iterator][first_iterator]);
            // console.log( results[first_iterator])
            for (var second_iterator = 0; second_iterator < max_degree; second_iterator++) {
                if (second_iterator == first_iterator) // not for diagonals
                    continue;
                // the real deal happens below
                results[first_iterator] = results[first_iterator] - ((equation_factors[first_iterator][second_iterator] / equation_factors[first_iterator][first_iterator]) * initial_x[second_iterator]);
                //console.log( results[first_iterator])

            }
            initial_x[first_iterator] = results[first_iterator];
            console.log(initial_x);
        }
        number_of_iters--;
    }


}


function gauss_seidelError(equation_factors, equations_value, max_degree, stopCondition) {

    var initial_x = [],
        results = [],
        newIteration = true;
    for (var i = 0; i < max_degree; i++) initial_x[i] = 1;
    var last = initial_x.slice(0);
    while (newIteration) {
        for (var first_iterator = 0; first_iterator < max_degree; first_iterator++) {
            results[first_iterator] = (equations_value[first_iterator] / equation_factors[first_iterator][first_iterator]);
            // console.log( results[first_iterator])
            for (var second_iterator = 0; second_iterator < max_degree; second_iterator++) {
                if (second_iterator == first_iterator) // not for diagonals
                    continue;
                // the real deal happens below
                results[first_iterator] = results[first_iterator] - ((equation_factors[first_iterator][second_iterator] / equation_factors[first_iterator][first_iterator]) * initial_x[second_iterator]);
                //console.log( results[first_iterator])

            }
            initial_x[first_iterator] = results[first_iterator];
            // console.log(initial_x);
        }
        // calculating the relative error and decide to make new iteration or not
        console.log(initial_x);
        console.log(last);
        for (var i = 0; i < max_degree; i++) {
            var relativeError = (Math.abs((initial_x[i] - last[i]) / initial_x[i])) * 100;
            if (relativeError > stopCondition) {
                newIteration = true;
                break;
            } else {
                newIteration = false;
            }
        }

        last = initial_x.slice(0);


    }


}

function Jacobi_IterationNum(equationArray, equations_value, max_degree, number_of_iters) {
    var initial_x = [];
    var newGuess_x = [];
    var temp = 0;
    for (var i = 0; i < max_degree; i++) initial_x[i] = 1;
    //loop for number of iterations
    while (number_of_iters > 0) {
        //loop for accessing all equations
        for (var i = 0; i < max_degree; i++) {
            //loop for accessing each equation
            for (var j = 0; j < max_degree; j++) {
                if (i != j) {
                    temp += initial_x[j] * equationArray[i][j];
                }
            }
            //get the new X's from the iteration
            newGuess_x[i] = (equations_value[i] - temp) / equationArray[i][i];

            temp = 0;
        }
        //set the initial to the new valuse from the iteration
        initial_x = newGuess_x.slice(0);
        number_of_iters--;
        console.log(newGuess_x);
    }
}

function Jacobi_IterationError(equationArray, equations_value, max_degree, stopCondition) {
    var initial_x = [];
    var newGuess_x = [];
    var temp = 0;
    var newIteration = true;
    for (var i = 0; i < max_degree; i++) initial_x[i] = 1;
    //loop for number of iterations
    while (newIteration) {
        //loop for accessing all equations
        for (var i = 0; i < max_degree; i++) {
            //loop for accessing each equation
            for (var j = 0; j < max_degree; j++) {
                if (i != j) {
                    temp += initial_x[j] * equationArray[i][j];
                }
            }
            //get the new X's from the iteration
            newGuess_x[i] = (equations_value[i] - temp) / equationArray[i][i];
            temp = 0;
        }
        // calculating the relative error and decide to make new iteration or not
        for (var i = 0; i < max_degree; i++) {
            var relativeError = (Math.abs((newGuess_x[i] - initial_x[i]) / newGuess_x[i])) * 100;
            if (relativeError > stopCondition) {
                newIteration = true;
                break;
            } else {
                newIteration = false;
            }
        }
        initial_x = newGuess_x.slice(0);
        console.log(newGuess_x);
    }
}

function handleSolveClicked() {
    var size = parseInt(document.getElementById("size").value);
    var temp = size + 1;
    var martrixString = document.getElementById("inputEquation").value.split('\n');
    var methodType = document.getElementById("methods").value;
    var stopType = document.getElementById("extraMenu").value;
    var stopValue = document.getElementById("inputCondition").value;
    console.log(martrixString[0], martrixString[1])
        //console.log(getEquationArray(martrixString, size));

}

function getEquationArray(martrixString, size) {
    var equationMatrix = create2Darray(size);
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < martrixString[0].length - 1; i++) {
            equationMatrix[i][j] = martrixString[i].next;
        }
    }
    return equationMatrix;
}