// Piano global notes 
var num_notes = 12;

/*
 * Search through given dictionary by property for key
 * Returns empty string if not found
 * Only meant for use on arrays of same length
 */
function searchSet(spacings, chords) {
	for (var property in chords) {
		if (chords.hasOwnProperty(property)) {
			equal = true;
			for (var k = 0; k < spacings.length; k++) {
				if (spacings[k] != chords[property][k]) {
					equal = false;
					break;
				}
			}
			if (equal) {
				return property;
			}

		}
	}
	return "";
}

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
				i--; // reduce index to account for smaller array
			}
		}
		exists = false;
	}
	// notes sorted to account for out of order formations
	notes.sort(function(a,b) { return a - b; })
	return notes;
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
 */
function findSpacings(positions) {
	var spacings = [];
		for (var i = 1; i < positions.length; i++) {
		spacings.push(positions[i] - positions[i - 1]);
	}
	return spacings;
}


