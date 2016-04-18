/*
	NaiSentence Library by Nainemom: nainemom@gmail.com
	http://nainemom.github.io/nai-sentence	
*/

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
		{letter: "ئ", connectToNext: true, connectToPrev: true},
		{letter: "ي", connectToNext: true, connectToPrev: true},
		{letter: "ب", connectToNext: true, connectToPrev: true},
		{letter: "ل", connectToNext: true, connectToPrev: true},
		{letter: "ا", connectToNext: false, connectToPrev: true},
		{letter: "أ", connectToNext: false, connectToPrev: true},
		{letter: "إ", connectToNext: false, connectToPrev: true},
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
		{letter: "ؤ", connectToNext: false, connectToPrev: true},
		{letter: "ء", connectToNext: false, connectToPrev: false},
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
	self.charactersLength = function(){
		return self.val.length;
	}
	self.lettersLength = function(){
		var i,t;
		var ret = 0;
		for( i = 0; i < self.val.length; i++ )
			if ( self.letterInfo(self.val[i]).letter.indexOf(' ') == -1 )
				ret++;
		return ret;
	}	
	self.wordsLength = function(){
		var i;
		var ret = 0;
		var cpVal = self.val;
		cpVal = cpVal.split('؟').join(' ')
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
			if( 'قت:ي'.indexOf( self.val[i] ) != -1 || (self.val[i] == 'ی' && 'next both'.indexOf(self.letterType(i)) != -1) )
				ret+=2;
			if( 'ثچشژپ'.indexOf( self.val[i] ) != -1 )
				ret+=3;
		}
		return ret;
	}
}




