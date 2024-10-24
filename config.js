module.exports = {
  PORT: 5041,
  DBSTRING:
    "mongodb+srv://Nensi:m7xXY2BAJn2w3mvj@cluster0.jxaegxy.mongodb.net/demoPk",
  DBNAME: "demoPk",
  frameWinnerTimes: {
    frame1: 5,
    frame2: 5,
    frame3: 10,
    frame4: 15,
    frame5: 25,
    frame6: 45,
    frame7: 5,
    frame8: 5,
  },
  loweWinAmount: 30, // write based on 100 %
};

// winner REsult function :: RandomResult
// loweWinAmount( ex : loweWinAmount = 30 ) percentage wise win the frame which have lowerBet
// and 100 - loweWinAmount  ( 70 ) wise win the game random Frame but also admin coin check
