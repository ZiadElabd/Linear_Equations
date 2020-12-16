
function create2Darray(rows){
    var arr = [] ; 
    for (var i=0;i<rows;i++)
        arr[i]=[];
    return arr ; 
}

arr = create2Darray(4);

arr[0][0]=4;
arr[0][1]=6; 
arr[0][2]=2;
arr[0][3]=-2;
arr[1][0]=2;
arr[1][1]=0;
arr[1][2]=5;
arr[1][3]=-2;   
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
    
}