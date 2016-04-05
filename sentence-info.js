


function NaiSentence( val ){
	var self = this;
	
	self.val = val;

	
	
	self.letters = [
		{letter: "ض", connectToNext: true, connectToPrev: true},
		{letter: "ص", connectToNext: true, connectToPrev: true},
		{letter: "ث", connectToNext: true, connectToPrev: true},
		{letter: "ق", connectToNext: true, connectToPrev: true},
		{letter: "ف", connectToNext: true, connectToPrev: true},
		{letter: "غ", connectToNext: true, connectToPrev: true},
		{letter: "ع", connectToNext: true, connectToPrev: true},
		{letter: "ه", connectToNext: true, connectToPrev: true},
		{letter: "خ", connectToNext: true, connectToPrev: true},
		{letter: "ح", connectToNext: true, connectToPrev: true},
		{letter: "ج", connectToNext: true, connectToPrev: true},
		{letter: "چ", connectToNext: true, connectToPrev: true},
		{letter: "ش", connectToNext: true, connectToPrev: true},
		{letter: "س", connectToNext: true, connectToPrev: true},
		{letter: "ی", connectToNext: true, connectToPrev: true},
		{letter: "ب", connectToNext: true, connectToPrev: true},
		{letter: "ل", connectToNext: true, connectToPrev: true},
		{letter: "ا", connectToNext: false, connectToPrev: true},
		{letter: "آ", connectToNext: false, connectToPrev: true},
		{letter: "ت", connectToNext: true, connectToPrev: true},
		{letter: "ن", connectToNext: true, connectToPrev: true},
		{letter: "م", connectToNext: true, connectToPrev: true},
		{letter: "ک", connectToNext: true, connectToPrev: true},
		{letter: "گ", connectToNext: true, connectToPrev: true},
		{letter: "ظ", connectToNext: true, connectToPrev: true},
		{letter: "ط", connectToNext: true, connectToPrev: true},
		{letter: "ز", connectToNext: false, connectToPrev: true},
		{letter: "ژ", connectToNext: false, connectToPrev: true},
		{letter: "ر", connectToNext: false, connectToPrev: true},
		{letter: "ذ", connectToNext: false, connectToPrev: true},
		{letter: "د", connectToNext: false, connectToPrev: true},
		{letter: "پ", connectToNext: true, connectToPrev: true},
		{letter: "و", connectToNext: false, connectToPrev: true},
		{letter: "‌،.:؛؟!‌- ", connectToNext: false, connectToPrev: false}
	];

	self.letterInfo = function(letter){
		for( var i in self.letters )
			if( self.letters.hasOwnProperty(i) )
				if( self.letters[i].letter.indexOf(letter) > -1 )
					return self.letters[i];
		return self.letterInfo(' ');
	}
	
	self.letterType = function(index){
		var thisChar = self.letterInfo( self.val[index] );
		var nextChar = self.letterInfo( index+1>=self.val.length?' ': self.val[index+1] );
		var prevChar = self.letterInfo( index<0?' ': self.val[index-1] );
		if( prevChar.connectToNext && thisChar.connectToPrev && thisChar.connectToNext && nextChar.connectToPrev )
			return 'both';
		if( (!prevChar.connectToNext || !thisChar.connectToPrev) && thisChar.connectToNext && nextChar.connectToPrev  )
			return 'next';
		if( (!thisChar.connectToNext || !nextChar.connectToPrev) && prevChar.connectToNext && thisChar.connectToPrev  )
			return 'prev';
		return 'none';
	}
	
	self.usedLetters = function(){
		var i,t;
		var ret = [];
		for( i = 0; i < self.val.length; i++ ){
			t = self.letterType(i);
			ret.push( ('prev both'.indexOf(t) != -1? 'ـ': '') + self.val[i] + ('next both'.indexOf(t) != -1? 'ـ': '') );
		}
		return ret;
	}

	self.missedLetters = function(letterTypes, bothOrNext/* no difference between both and next */, prevOrNone/* no difference between prev and none */){
		if( typeof letterTypes == 'undefined' ) letterTypes = false;
		if( typeof bothOrNext == 'undefined' ) bothOrNext = false;
		if( typeof prevOrNone == 'undefined' ) prevOrNone = false;
		var ret = [];
		var i,t,t2;
		
		var used = self.usedLetters();
		for( i = 0; i < self.letters.length; i++ ){
			t = self.letters[i];
			if( t.letter.indexOf(' ') != -1 ) continue;
			if( letterTypes && t.connectToNext && used.indexOf(t.letter+'ـ') == -1 ) ret.push( t.letter+'ـ' );
			if( letterTypes && !prevOrNone && t.connectToPrev && used.indexOf('ـ'+t.letter) == -1 ) ret.push( 'ـ'+t.letter );
			if( letterTypes && !bothOrNext && t.connectToNext && t.connectToPrev && used.indexOf('ـ'+t.letter+'ـ') == -1 ) ret.push( 'ـ'+t.letter+'ـ' );
			if( letterTypes && used.indexOf(t.letter) == -1 ) ret.push( t.letter );
			if( !letterTypes && used.indexOf(t.letter+'ـ') == -1 && used.indexOf('ـ'+t.letter) == -1 && used.indexOf('ـ'+t.letter+'ـ') == -1 && used.indexOf(t.letter) == -1 ) ret.push( t.letter );
		}
		return ret;
	}
	
	
	self.wordsLength = function(){
		var i;
		var ret = 0;
		var cpVal = self.val;
		cpVal.split('?').join(' ')
			 .split('!').join(' ')
		 	 .split('.').join(' ')
		  	 .split(':').join(' ')
			 .split('؛').join(' ')
			 .split(')').join(' ')
			 .split('(').join(' ')
			 .split('-').join(' ')
			 .split('،').join(' ')
			 .trim();
		var itsDublicate = false;
		for( i = 0; i < cpVal.length; i++ ){
			if( cpVal[i] == ' ' ){
				if( !itsDublicate )
					ret++;
				itsDublicate = true;
			}
			else{
				itsDublicate = false;
			}
		}
		if( cpVal.length > 0 ) ret++;
		return ret;
	}
	
	self.dotsLength = function(){
		var i,t;
		var ret = 0;
		for( i = 0; i < self.val.length; i++ ){
			t = self.letterType(i);
			if( '!؟.ضفغخجبنظزذ؛'.indexOf( self.val[i] ) != -1 )
				ret+=1;
			if( 'قت:'.indexOf( self.val[i] ) != -1 || (self.val[i] == 'ی' && 'next both'.indexOf(self.letterType(i)) != -1) )
				ret+=2;
			if( 'ثچشژپ'.indexOf( self.val[i] ) != -1 )
				ret+=3;
		}
		return ret;
	}
}







function Sentence( sentence ){
	var self = this;
	var allLetters = [
		{type: 'middle', letter: "ض"},
		{type: 'single', letter: "ض"},
		{type: 'middle', letter: "ص"},
		{type: 'single', letter: "ص"},
		{type: 'middle', letter: "ث"},
		{type: 'single', letter: "ث"},
		{type: 'middle', letter: "ق"},
		{type: 'single', letter: "ق"},
		{type: 'middle', letter: "ف"},
		{type: 'single', letter: "ف"},
		{type: 'middle', letter: "غ"},
		{type: 'single', letter: "غ"},
		{type: 'middle', letter: "ع"},
		{type: 'single', letter: "ع"},
		{type: 'middle', letter: "ه"},
		{type: 'single', letter: "ه"},
		{type: 'start', letter: "ه"},
		{type: 'end', letter: "ه"},
		{type: 'middle', letter: "خ"},
		{type: 'single', letter: "خ"},
		{type: 'middle', letter: "ح"},
		{type: 'single', letter: "ح"},
		{type: 'middle', letter: "ج"},
		{type: 'single', letter: "ج"},
		{type: 'middle', letter: "چ"},
		{type: 'single', letter: "چ"},
		{type: 'middle', letter: "ش"},
		{type: 'single', letter: "ش"},
		{type: 'middle', letter: "س"},
		{type: 'single', letter: "س"},
		{type: 'middle', letter: "ی"},
		{type: 'single', letter: "ی"},
		{type: 'middle', letter: "ب"},
		{type: 'single', letter: "ب"},
		{type: 'middle', letter: "ل"},
		{type: 'single', letter: "ل"},
		{type: 'single', letter: "ا"},
		{type: 'single', letter: "آ"},
		{type: 'middle', letter: "ت"},
		{type: 'single', letter: "ت"},
		{type: 'middle', letter: "ن"},
		{type: 'single', letter: "ن"},
		{type: 'middle', letter: "م"},
		{type: 'single', letter: "م"},
		{type: 'middle', letter: "ک"},
		{type: 'single', letter: "ک"},
		{type: 'middle', letter: "گ"},
		{type: 'single', letter: "گ"},
		{type: 'single', letter: "ظ"},
		{type: 'single', letter: "ط"},
		{type: 'single', letter: "ژ"},
		{type: 'single', letter: "ز"},
		{type: 'single', letter: "ر"},
		{type: 'single', letter: "ذ"},
		{type: 'single', letter: "د"},
		{type: 'middle', letter: "پ"},
		{type: 'single', letter: "پ"},
		{type: 'single', letter: "و"}
	];
	self.letterTypeAvailable = function ( letter, type ){
		for( var i = 0; i < allLetters.length; i++ )
			if( allLetters[i].letter == letter && allLetters[i].type == type )
				return true;
		return false;
	}

	self._sentence = sentence;
	self.val = function(newVal){
		if( typeof newVal != 'undefined' )
			self._sentence = newVal;
		else
			return self._sentence;
	}
	
	self.letterType = function (letterIndex){
		var ret;
		// single start end space middle
		if( self._sentence.length == 0 )
			ret = '';
		else if( letterIndex == self._sentence.length - 1 )
			ret =  'single';
		else if( ' !._)(‌،'.indexOf(self._sentence[letterIndex]) != -1 )
			ret =  'space';
		else if( letterIndex == 0 ){
			if( self._sentence[letterIndex+1] == ' ' )
				ret =  'single';
			else{
				if( self._sentence[letterIndex] == 'ه' )
					ret =  'start';
				else
					ret = 'middle';
			}
				
		}
		else if( letterIndex == self._sentence.length - 1 ){
			if( self._sentence[letterIndex-1] == ' ' )
				ret =  'single';
			else{
				if( self._sentence[letterIndex] == 'ه' )
					ret =  'end';
				else
					ret = 'single'
			}	
		}
		else{
			if( self._sentence[letterIndex+1] == ' ' && self._sentence[letterIndex-1] == ' ' )
				ret =  'single';
			else if ( self._sentence[letterIndex+1] == ' ' )
				if( self._sentence[letterIndex] == 'ه' )
					ret =  'end';
				else
					ret = 'single'
			else if( self._sentence[letterIndex-1] == ' ' )
				if( self._sentence[letterIndex] == 'ه' )
					ret =  'start';
				else
					ret = 'middle'
			else
				ret =  'middle'
		}
		if( self.letterTypeAvailable( self._sentence[letterIndex], ret ) )
			return ret;
		return 'single';
	}


	self.missedLetters = function(toView){
		if( typeof toView == 'undefined' ) toView = false;
		var ret = [];
		var i,j,k;
		var allLetters_ = self._cloneObj(allLetters);
		//for(i = 0; i < allLetters_.length; i++)
		//	allLetters_[i] = {letter:allLetters_[i], used: false}
		
		
		for( i = 0; i < self._sentence.length; i++ )
			for(j = 0; j < allLetters_.length; j++)
				if( self._sentence[i] == allLetters_[j].letter && self.letterType(i) ==  allLetters_[j].type ){
					allLetters_[j].used = true;
					break;
				}
		
		for(j = 0; j < allLetters_.length; j++)
			if( typeof allLetters_[j].used == 'undefined' )
				ret.push( allLetters_[j] );
		if( !toView )
			return ret;
		else{
			var ret2 = [];
			for( i = 0; i < ret.length; i++ )
				ret2.push( (ret[i].type == 'middle' || ret[i].type == 'end'? 'ـ': '') + ret[i].letter +  (ret[i].type == 'middle' || ret[i].type == 'start'? 'ـ': ''));
			return ret2.join(' ');
		}
	}

	self.len = function(){
		return self._sentence.length;
	}
	self._cloneObj = function(obj) {
		var copy;
		if (null == obj || "object" != typeof obj) return obj;
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = self._cloneObj(obj[i]);
			}
			return copy;
		}
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = self._cloneObj(obj[attr]);
			}
			return copy;
		}
		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
}