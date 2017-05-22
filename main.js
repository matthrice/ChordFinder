var chords = [[4, 3], [3, 4], [4, 3, 3], [4, 3, 4], [3, 4, 3]];
var chordNames = ["major", "minor", "dom7", "maj7", "min7"];


function findChord(notes) {
	var spacings = [];
	var equal = true;
	for (var i = 1; i < notes.length; i++) {
		spacings.push(notes[i] - notes[i - 1]);
	}
	for (var i = 0; i < chords.length; i++) {
		equal = true;
		if (spacings.length == chords[i].length) {
			for (var k = 0; k < spacings.length; k++) {
				if (spacings[k] != chords[i][k]) {
					equal = false;
					break;
				}
			}
			if (equal) {
				return chordNames[i];
			}
		}
	}
	return "Does not exist";
}

var exChord = [1, 4, 8];
var name = findChord(exChord);


