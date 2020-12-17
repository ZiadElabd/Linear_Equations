
function create2Darray(rows){
    var arr = [] ; 
    for (var i=0;i<rows;i++)
        arr[i]=[];
    return arr ; 
}

function swap(arr,ai,aj,bi,bj){
    let temp = arr[bi][bj] ; 
    arr[bi][bj] = arr[ai][aj] ; 
    arr[ai][aj] = temp ; 
}

arr = create2Darray(4);

arr[0][0]=4; //[[4,6,2,-2], [2,0,5,-2] , [-4,-3,-5,4],[8,18,-2,3]]
arr[0][1]=6; 
arr[0][2]=2;
arr[0][3]=-2;
arr[1][0]=2;
arr[1][1]=6;
arr[1][2]=5;
arr[1][3]=2;   
arr[2][0]=-4;
arr[2][1]=-3;
arr[2][2]=-5;
arr[2][3]=4;
arr[3][0]=8;
arr[3][1]=18;
arr[3][2]=-2;
arr[3][3]=3;

var vec = [8,4,1,40] ;
function gauss_elimination(equationArray,vec){

    // forward elimination
    for (var i=0;i<equationArray.length-1;i++){
        
        for (var j=i+1;j<equationArray.length;j++){
            const factor = -1 * equationArray[j][i] / equationArray[i][i] ; 
            for (var k=i;k<equationArray.length;k++)
                equationArray[j][k] += equationArray[i][k] * factor ; 
            vec[j] += vec[i] * factor ; 
        } 
    } 

    // find the solution --> backward substitution
    const n = equationArray.length-1 ;
    var solution = [] ;
    solution[n] = vec[n] / equationArray[n][n] ; 
    for (var i=n-1;i>=0;i--){
        let sum = 0 ; 
        for (var j=i+1;j<=n;j++)
            sum += equationArray[i][j] * solution[j] ; 
        solution[i] = (vec[i] - sum ) / equationArray[i][i] ;
    } 

    // return the solution
    return solution ; 
}



function gauss_elimination_with_pivoting(equationArray,vec){

        // forward elimination
        for (var i=0;i<equationArray.length-1;i++){
            let mx = equationArray[i][i] , indx = i ; 
            // getting max pivot 
            for (var row=i;row<equationArray.length;row++){
                if (equationArray[row][i] > mx){
                    mx = equationArray[row][i] ; 
                    indx = row ;
                }
            }

            // swapping 
            for (var col=i;col<equationArray.length;col++)
                swap(equationArray,i,col,indx,col) ;
            
            // swap in vec also
            let tmp = vec[i] ; 
            vec[i] = vec[indx] ; 
            vec[indx] = tmp ; 


            // forward elimination
            for (var j=i+1;j<equationArray.length;j++){
                const factor = -1 * equationArray[j][i] / equationArray[i][i] ; 
                for (var k=i;k<equationArray.length;k++)
                    equationArray[j][k] += equationArray[i][k] * factor ; 
                vec[j] += vec[i] * factor ; 
            } 
            
        } 

    // find the solution --> backward substitution
    const n = equationArray.length-1 ;
    var solution = [] ;
    solution[n] = vec[n] / equationArray[n][n] ; 
    for (var i=n-1;i>=0;i--){
        let sum = 0 ; 
        for (var j=i+1;j<=n;j++)
            sum += equationArray[i][j] * solution[j] ; 
        solution[i] = (vec[i] - sum ) / equationArray[i][i] ;
    } 

    // return the solution
    return solution ;
}

function gauss_gordan(equationArray,vec){

     // forward elimination
     for (var i=0;i<equationArray.length;i++){
        for (var j=0;j<equationArray.length;j++){
            if(i==j)
                continue ;
            const factor = -1 * equationArray[j][i] / equationArray[i][i] ; 
            for (var k=i;k<equationArray.length;k++)
                equationArray[j][k] += equationArray[i][k] * factor ; 
            vec[j] += vec[i] * factor ; 
        } 
    } 
    
        // find the solution --> backward substitution
        const n = equationArray.length-1 ;
        var solution = [] ;
        for (var i=n;i>=0;i--)
            solution[i] = vec[i] / equationArray[i][i];
        
        return solution ; 

}

//console.log(gauss_elimination_with_pivoting(arr,vec));


function gauss_seidel (equation_factors, equations_value, max_degree, number_of_iters){

    var initial_x=[],
        results=[];
    for(var i=0 ;i<max_degree ;i++) initial_x[i]=1; 
    while(number_of_iters > 0){
        for (var first_iterator = 0; first_iterator < max_degree; first_iterator++)
        {
            results[first_iterator] = (equations_value[first_iterator] / equation_factors[first_iterator][first_iterator]);
           // console.log( results[first_iterator])
            for (var second_iterator = 0; second_iterator < max_degree; second_iterator++)
            {
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

//gauss_seidel(arr,vec,4,1);


