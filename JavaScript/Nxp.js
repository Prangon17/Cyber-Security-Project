function encrypt() {
    var plaintext = document.getElementById("plaintext").value;
    var rails = parseInt(document.getElementById("rails").value);
    var key = document.getElementById("key").value;
    var algorithm = document.getElementById("algorithm").value;
    var key = document.getElementById("key").value.trim().split(" ").map(Number);
    plaintext = plaintext.replace(/\s/g, "").toUpperCase();
    var ciphertext = "";
    var railArray = [];
    
    if (algorithm == "railfence"){
    for (var i = 0; i < rails; i++) {
      railArray.push([]);
    }

    var rail = 0;
    var direction = 1;
  
    for (var i = 0; i < plaintext.length; i++) {
      railArray[rail].push(plaintext.charAt(i));
      rail += direction;
      if (rail == rails - 1 || rail == 0) {
        direction *= -1;
      }
    }
  
    for (var i = 0; i < railArray.length; i++) {
      for (var j = 0; j < railArray[i].length; j++) {
        ciphertext += railArray[i][j];
      }
    }
    } else if(algorithm == "rowcipher"){
      var columns = key.length;

      // Pad the plaintext if necessary
      var padding = columns - (plaintext.length % columns);
      if (padding < columns) {
        plaintext += "Z".repeat(padding);
      }
    
      // Create the matrix of characters
      var matrix = [];
      for (var i = 0; i < plaintext.length; i += columns) {
        var row = plaintext.substr(i, columns).split("");
        matrix.push(row);
      }
    
      // Transpose the matrix according to the key
      var transposedMatrix = [];
      for (var i = 0; i < columns; i++) {
        var col = key.indexOf(i + 1);
        for (var j = 0; j < matrix.length; j++) {
          if (transposedMatrix[j] === undefined) {
            transposedMatrix[j] = [];
          }
          transposedMatrix[j][col] = matrix[j][i];
        }
      }
    
      // Convert the transposed matrix to a string
      var ciphertext = "";
      for (var i = 0; i < transposedMatrix.length; i++) {
        ciphertext += transposedMatrix[i].join("");
      }
    }
    document.getElementById("ciphertext").value = ciphertext;
}

  function decrypt() {
    var ciphertext = document.getElementById("ciphertext").value;
    var rails = parseInt(document.getElementById("rails").value);
    var key = document.getElementById("key").value;
    var algorithm = document.getElementById("algorithm").value;
    var decryptedtext = "";
    var railArray = [];
    var key = document.getElementById("key").value.trim().split(" ").map(Number);
    
    var index = 0;
    if (algorithm == "railfence"){
  
    for (var i = 0; i < rails; i++) {
      railArray.push([]);
    }
  
    var rail = 0;
    var direction = 1;
  
    for (var i = 0; i < ciphertext.length; i++) {
      railArray[rail].push("");
      rail += direction;
      if (rail == rails - 1 || rail == 0) {
        direction *= -1;
      }
    }
  

  
    for (var i = 0; i < railArray.length; i++) {
      for (var j = 0; j < railArray[i].length; j++) {
        railArray[i][j] = ciphertext.charAt(index);
        index++;
      }
    }
  
    rail = 0;
    direction = 1;
  
    for (var i = 0; i < ciphertext.length; i++) {
      decryptedtext += railArray[rail][0];
      railArray[rail].splice(0, 1);
      rail += direction;
      if(rail == rails - 1 || rail == 0) {
        direction *= -1;
      }
      }
    }
    else if(algorithm == "rowcipher"){
  // Calculate number of rows needed for the ciphertext
  var columns = key.length;

	// Create the matrix of characters
	var matrix = [];
	for (var i = 0; i < ciphertext.length; i += columns) {
		var row = ciphertext.substr(i, columns).split("");
		matrix.push(row);
	}

	// Transpose the matrix back to its original form using the key
	var originalMatrix = [];
	for (var i = 0; i < columns; i++) {
		var col = key.indexOf(i + 1);
		for (var j = 0; j < matrix.length; j++) {
			if (originalMatrix[j] === undefined) {
				originalMatrix[j] = [];
			}
			originalMatrix[j][i] = matrix[j][col];
		}
	}

	// Convert the original matrix to a string
	
	for (var i = 0; i < originalMatrix.length; i++) {
		decryptedtext += originalMatrix[i].join("");
	}
}
  document.getElementById("decryptedtext").value = decryptedtext;
}
