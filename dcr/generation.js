function generate(start,end,stepPow,roughness,roughnessMult) {
	var array = [];
	array [0] = start;
	array [Math.pow(2,stepPow)] = end;
	for(var iter=1; iter<stepPow+1; iter++) {
		for(var x=0; x<array.length; x+=(array.length-1)/Math.pow(2,iter)) {
	  	if(array[x]==undefined) {
	    	array[x] = (array[x+(array.length-1)/Math.pow(2,iter)]+array[x-(array.length-1)/Math.pow(2,iter)])/2;
	      array[x] += Math.random()*roughness-roughness/2;
	    }
	  }
	  roughness *= roughnessMult;
	}
	return array;
}