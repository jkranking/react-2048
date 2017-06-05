function addRandomNumber(board){
  var openIndexes = []
  for(var i = 0; i <= 3; i++){
    for(var j = 0; j <= 3; j++){
      if(!board[i][j]){
        openIndexes.push([i,j])
      }
    }
  }
  
  if (openIndexes.length){
    var randomIndex = Math.floor((Math.random() * openIndexes.length-1)+1)
    var randomCell = openIndexes[randomIndex]
    board[randomCell[0]][randomCell[1]] = getRandomNumber()
  }
  return board
}

function getRandomNumber(){
  var numbers = [2, 4, 8]
  return numbers[Math.floor((Math.random() * 3))]
}

function moveLineRight(numArray) {
  var shiftedNumArray = removeZeroRight(numArray),
  		length = numArray.length-1,
  		last = shiftedNumArray[length]

  for(var i = length-1; i >= 0; i--){
    if (shiftedNumArray[i] === last) {
      shiftedNumArray[i+1] = shiftedNumArray[i] + last
      for(var j = i; j >= 0; j--){
        shiftedNumArray[j] = shiftedNumArray[j-1]
      }
      shiftedNumArray[0] = 0
    }
    last = shiftedNumArray[i]
  }
  return shiftedNumArray
}

function moveLineLeft(numArray) {
  		var shiftedNumArray = removeZeroLeft(numArray),
  		length = shiftedNumArray.length-1,
  		last = numArray[0]

  for(var i = 1; i <= length; i++){
    if (numArray[i] === last) {
      numArray[i-1] = numArray[i] + last
      for(var j = i; j <= length; j++){
        numArray[j] = numArray[j+1]
      }
      numArray[length] = 0
    }
    last = numArray[i]
  }
  return numArray
}

function removeZeroRight(numArray){
  for(var i = 1; i <= numArray.length-1; i++){
    if (numArray[i] === 0) {
      for(var j = i; j > 0; j--){
        numArray[j] = numArray[j-1]
      }
      numArray[0] = 0
    }
  }
  return numArray
}

function removeZeroLeft(numArray){
  for(var i = numArray.length-2; i >= 0; i--){
    if (numArray[i] === 0) {
      for(var j = i; j < numArray.length-1; j++){
        numArray[j] = numArray[j+1]
      }
      numArray[numArray.length-1] = 0
    }
  }
  return numArray
}

function getColumn(index, board){
  var column = []
  for(var j = 0; j <= board.length-1; j++){
    column.push(board[j][index])
  }
  return column
}

module.exports = {
  moveDown: function moveAllDown(board){
						  for(var i = 0; i <= board.length-1; i++){
						    var column = getColumn(i, board)
						    var shiftedDown = moveLineRight(column)
						    
						    
						    for(var j = 0; j <= board.length-1; j++){
						      board[j][i] = shiftedDown[j]
						    }
						  }
						  return addRandomNumber(board)
						},

	moveRight: 	function moveAllRight(board){
							  for(var i = 0; i <= board.length-1; i++){
							    board[i] = moveLineRight(board[i])
							  }
							  return addRandomNumber(board)
							},

	moveLeft: function moveAllLeft(board){
						  for(var i = 0; i <= board.length-1; i++){
						    board[i] = moveLineLeft(board[i])
						  }
						  return addRandomNumber(board)
						},

	areZeroCells: function areZeroCells(board){
								  for(var i = 0; i <= 3; i++){
								    for(var j = 0; j <= 3; j++){
								      if(!board[i][j]){
								        return true
								      }
								    }
								  }
								  return false
								},

	
	canMoveDown: function canMoveDown(board){
								  var verticalBoard = []
								  
								  for(var i = 0; i <= board.length-1; i++){
								    verticalBoard.push(getColumn(i, board))
								  }
								  return this.canMoveLeftRight(verticalBoard)
								},
	 	
	canMoveLeftRight: function canMoveLeftRight(board){
										  for(var i = 0; i <= board.length-1; i++){
										    var last = board[i][0]
										    for(var j = 1; j <= board.length-1; j++){
										      if (board[i][j] === last){
										        return true
										      }
										      last = board[i][j]
										    }
										  }
										  return false
										},

	startGame: 	function stargGame(){
								var board = [
													   	[0, 0, 0, 0],
													    [0, 0, 0, 0],
													    [0, 0, 0, 0],
													    [0, 0, 0, 0]
										  			]

								var newBoard = addRandomNumber(board)
								return addRandomNumber(newBoard)
							},

  findHighScore: function findHighScore(board){
    var highScore = 0
    for(var i = 0; i <= board.length-1; i++){
      var last = board[i][0]
      for(var j = 0; j <= board.length-1; j++){
        if (board[i][j] > highScore){
          highScore = board[i][j]
        }
      }
    }
    return highScore
  }
}
