scoreLetter = function(num){
  if(num === null){
    return 'Empty'
  }else if(num>85) {
    return 'A'
  } else if (num>70){
    return 'B'
  } else if (num>55){
    return 'C'
  } else if (num <=55){
    return 'E'
  }
}

module.exports = scoreLetter
