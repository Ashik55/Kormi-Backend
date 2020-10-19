

//Generate Random Stringggg
function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function matrixPrint(m, dec) {
  
      console.log('print XD')
    
  }


  module.exports = {
    makeid,
    matrixPrint
  };