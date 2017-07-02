/*
	@Kristi Jorgji 1 July 2017
	
	Equation for a staright line can be given in the following form:
	*1 y = mx + c
	
	Finding the gradient m we can use the definition of a straight line
	*2 y2 - y1 = m(x2 - x1) =>
	*3 m = (y2 - y1) / (x2 - x1)
	
	Furthermore we know that if the gradients equal, the lines are parallel and they never intercept.
	By adapting equation *2 to *1, it is really easy to find coordinate x of the interception point.
	From that we solve for y by using the equation of any segment (they intercept, so they both have the point
	doesn't matter which equation we use)
	
	Finally after finding the interception point, we need to be sure that this is within segments range.
*/

var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

var Segment = function(startPoint, endPoint) {
    if (endPoint.x < startPoint.x) {
            this.startPoint = endPoint;
            this.endPoint = startPoint;
        }
        else {
            this.startPoint = startPoint;
            this.endPoint = endPoint;
        }
  
	var m = (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
    this.equation = {
		m: m,
		c: -m * this.startPoint.x + this.startPoint.y
	}
}

Segment.prototype = {
        getAllPoints: function(xScale) {
                xScale = xScale || 1;
                var points = [];
                                
                for (var i = this.startPoint.x; i <= this.endPoint.x; i += xScale) {
                        points.push(new Point(i, this.solveY(i)));
                    }   
                return points;
            },
        solveY: function(x) {
                return this.equation.m * (x - this.startPoint.x) + this.startPoint.y; 
            },
        hasPoint: function(point) {
			var a = (point.y - this.startPoint.y).toPrecision(6);
			var b = (this.equation.m * (point.x - this.startPoint.x)).toPrecision(6);
                return (a ==  b) 
                        && point.x <= this.endPoint.x && point.x >= this.startPoint.x;
            }
    } 

function solution(K, L, M, N, P, Q, R, S) {
    var firstSegment = new Segment(
            new Point(K, L),
            new Point(M, N)
        );
        
    var secondSegment = new Segment(
        new Point(P,Q),
        new Point(R, S)
    );
    
    if (firstSegment.equation.m == secondSegment.equation.m) { 
			console.log('Segments do not intersect, they are parallel');
            return false;
        }

	var interceptionX = (secondSegment.equation.c - firstSegment.equation.c) / (firstSegment.equation.m - secondSegment.equation.m);	
	var interceptionY = firstSegment.solveY(interceptionX);
	var interceptionPoint = new Point(interceptionX, interceptionY);
	
	if (firstSegment.hasPoint(interceptionPoint) && secondSegment.hasPoint(interceptionPoint)) {
		console.log('Segments intersect at point ', interceptionPoint);
		return true;
	}
	
	console.log('Segments do not intersect');
	return false;
}

function bruteForceSolution(K, L, M, N, P, Q, R, S) {	
    var firstSegment = new Segment(
            new Point(K, L),
            new Point(M, N)
        );
        
    var secondSegment = new Segment(
        new Point(P,Q),
        new Point(R, S)
    );
	var firstSegmentPoints = firstSegment.getAllPoints(0.01);
    for (var i = 0; i < firstSegmentPoints.length; i++) {
            if (secondSegment.hasPoint(firstSegmentPoints[i])) {
                    console.log('BF Segments intersect');
					return true;
                }
        }
		
	console.log('BF Segments do not intersect');
    return false;
}

solution(0, 1, 4, 3, 1, 3, 2, 1);
bruteForceSolution(0, 1, 4, 3, 1, 3, 2, 1);
solution(0, 1, 4, 3, 3, 2, 5, 1);
bruteForceSolution(0, 1, 4, 3, 3, 2, 5, 1);