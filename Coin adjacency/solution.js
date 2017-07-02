function solution(A) {
    var n = A.length;
    var result = 0;
    var i;
    for (i = 0; i < n - 1; i++) {
        if (A[i] == A[i + 1])
            result = result + 1;
    }
    var r = 0;
    for (i = 0; i < n; i++) {
        var count = 0;
        if (i > 0) {
            if (A[i - 1] != A[i])
                count = count + 1;
            else
                count = count - 1;
        }
        if (i <= n - 1) { 			
            if ((i < n-1 && A[i + 1] != A[i]) || (i == 0 && A[i] !=  A[i+1]))
                count = count + 1;
            else
                count = count - 1;
        }
        r = Math.max(r, count);
    }
    return result + r;
}