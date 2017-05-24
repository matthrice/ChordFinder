var chords = [[4, 3], [3, 4], [4, 3, 3], [4, 3, 4], [3, 4, 3], [3, 3], [5, 2]];
var chordNames = ["major", "minor", "dom7", "maj7", "min7", "dim", "sus"];


function invert(spacings) {
	var base = spacings[0];
	var invert_size = (spacings[spacings.length - 1] - spacings[0]) < 12 ? 12 : 24;
	var total = 0;
	for (var i = 0; i < spacings.length; i++) {
		total += spacings[i];
	}
	spacings.shift();
	spacings.push(invert_size - total);
	return spacings;
}

function findChord(notes) {
	var spacings = [];
	var equal = true;
	for (var i = 1; i < notes.length; i++) {
		spacings.push(notes[i] - notes[i - 1]);
	}
	for (var j = 0; j < notes.length; j++) {
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
		spacings = invert(spacings);
		alert(spacings);
	}
	return "Does not exist";
}

var exChord = [1, 4, 8];
var name = findChord(exChord);


