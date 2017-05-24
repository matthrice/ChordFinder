var chords = [[4, 3], [3, 4], [4, 3, 3], [4, 3, 4], [3, 4, 3], [3, 3], [5, 2]];
var shapes = ["major", "minor", "7", "maj7", "min7", "dim", "sus"];
var num_notes = 12;

/* 
 * Removes octave to avoid redundancy and simplify identification
 * Allows the user to use the whole keyboard but lets the program
 * only deal with 12 keys instead of 24
 */
function removeOctaves(notes) {
	var new_note = 0;
	var exists = false;
	for (var i = 0; i < notes.length; i++) {
		if (notes[i] > 11) {
			new_note = notes[i] - 12;
			for (var k = 0; k < notes.length; k++) {
				if (new_note == notes[k]) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				notes[i] = new_note;
			}
			else {
				notes.splice(i, 1);
			}
		}
		exists = false;
	}
	// notes sorted to account for out of order formations
	return notes.sort();
}
/*
 * Inverts the chord based on its current inversion
 * Cmaj I -> Cmaj II etc.
 */
function invert(spacings) {
	var base = spacings[0];
	var total = 0;
	for (var i = 0; i < spacings.length; i++) {
		total += spacings[i];
	}
	spacings.shift();
	spacings.push(num_notes - total);
	return spacings;
}

/*
 * Finds chord by first reducing notes to an array of spacings between notes
 * Linear searches the spacings for an existing formation
 * If not found, inverts chord and tries again
 * Returns both number of inversions (to find root) and the formation 
 */
function findChord(notes) {
	notes = removeOctaves(notes);
	var spacings = [];
	var equal = true;
	var fullChord = {num_inversions: 0, shape: "Does not exist"}
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
					fullChord.shape = shapes[i];
					return fullChord;
				}
			}
		}
		spacings = invert(spacings);
		fullChord.num_inversions++;
	}
	fullChord.num_inversions = -1;
	return fullChord;
}



