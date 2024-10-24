const FerryWheelGameHistory = require("./model/ferryWheelGameHistory.model");
const Wallet = require("./model/wallet.model");
const User = require("./model/user.model");
const GameAdminCoin = require("./model/gameAdminCoin.model");
const FerryWheelLastHistory = require("./model/ferryWheelLastHistory.model");
const config = require("./config");

exports.generateShuffledArray = () => {
  const lowCount = config.loweWinAmount;
  const highCount = 100 - lowCount;

  let result = [];
  for (let i = 0; i < lowCount; i++) {
    result.push("low");
  }
  for (let i = 0; i < highCount; i++) {
    result.push("high");
  }
  const iterations = 100;
  for (let k = 0; k < iterations; k++) {
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
  }
  return result;
};

exports.RandomResult = async () => {
  let highOrLow = highOrLowWinResult.shift();
  if (!highOrLow) {
    highOrLow = "high";
    highOrLowWinResult = this.generateShuffledArray();
    console.log("highOrLowWinResult", highOrLowWinResult);
  }

  const randomNumber = Math.floor(Math.random() * 8) + 1;
  console.log(" RandomResult function   : ======== ", randomNumber);
  console.log(" highOrLow  : ======== ", highOrLow);

  const selectedFrameResultRandom = await this.selectFrame(randomNumber);
  if (currentGame.UsersBits?.length !== 0) {
    const gameAdminCoin = await GameAdminCoin.findOne({});
    console.log("gameAdminCoin?.coin : ", gameAdminCoin?.coin);
    function generateRandomArray() {
      var numbers = [1, 2, 3, 4, 5, 6, 7, 8];
      for (var i = 7; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers;
    }
    let winCoinPercentArray = [];
    let forLoopBreak = false;
    let selectedFrameResultArray = [];

    if (highOrLow == "low") {
      const randomArray = generateRandomArray();
      for (let index = 0; index < 8; index++) {
        const numberElement = randomArray[index];
        const selectedFrameResultForLoop = await this.selectFrame(
          numberElement
        );
        selectedFrameResultArray.push(selectedFrameResultForLoop);
        winCoinPercentArray.push(selectedFrameResultForLoop.winCoinPercent);
      }
    } else {
      if (selectedFrameResultRandom?.winCoinPercent < gameAdminCoin?.coin) {
        return selectedFrameResultRandom;
      } else {
        const randomArray = generateRandomArray();
        for (let index = 0; index < 8; index++) {
          const numberElement = randomArray[index];
          const selectedFrameResultForLoop = await this.selectFrame(
            numberElement
          );
          selectedFrameResultArray.push(selectedFrameResultForLoop);
          winCoinPercentArray.push(selectedFrameResultForLoop.winCoinPercent);
          if (selectedFrameResultForLoop.winCoinPercent < gameAdminCoin?.coin) {
            console.log("break : ", index);
            forLoopBreak = true;
            break;
          }
        }
      }
    }

    console.log("winCoinPercentArray : ", winCoinPercentArray);
    if (forLoopBreak) {
      return selectedFrameResultArray.pop();
    } else {
      const lowerValueIndex = winCoinPercentArray.indexOf(
        Math.min(...winCoinPercentArray)
      );
      console.log("lowerValueIndex : ", lowerValueIndex);
      return selectedFrameResultArray[lowerValueIndex];
    }
  }
  return selectedFrameResultRandom;
};

exports.selectFrame = async (number) => {
  let winCoinPercent = 0;
  let winnerNumberTimes = 1;
  switch (number) {
    case 1:
      currentGame.frameBitCoin[0].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[0].bit * config?.frameWinnerTimes?.frame1;
      winnerNumberTimes = config?.frameWinnerTimes?.frame1;
      break;
    case 2:
      currentGame.frameBitCoin[1].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[1].bit * config?.frameWinnerTimes?.frame2;
      winnerNumberTimes = config?.frameWinnerTimes?.frame2;
      break;
    case 3:
      currentGame.frameBitCoin[2].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[2].bit * config?.frameWinnerTimes?.frame3;
      winnerNumberTimes = config?.frameWinnerTimes?.frame3;
      break;
    case 4:
      currentGame.frameBitCoin[3].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[3].bit * config?.frameWinnerTimes?.frame4;
      winnerNumberTimes = config?.frameWinnerTimes?.frame4;
      break;
    case 5:
      currentGame.frameBitCoin[4].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[4].bit * config?.frameWinnerTimes?.frame5;
      winnerNumberTimes = config?.frameWinnerTimes?.frame5;
      break;
    case 6:
      currentGame.frameBitCoin[5].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[5].bit * config?.frameWinnerTimes?.frame6;
      winnerNumberTimes = config?.frameWinnerTimes?.frame6;
      break;
    case 7:
      currentGame.frameBitCoin[6].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[6].bit * config?.frameWinnerTimes?.frame7;
      winnerNumberTimes = config?.frameWinnerTimes?.frame7;
      break;
    case 8:
      currentGame.frameBitCoin[7].winner = true;
      winCoinPercent +=
        currentGame.frameBitCoin[7].bit * config?.frameWinnerTimes?.frame8;
      winnerNumberTimes = config?.frameWinnerTimes?.frame8;
      break;
    default:
      break;
  }

  console.log(
    "selectFrame 111....................................",
    number,
    winCoinPercent
  );

  return { number, winCoinPercent, winnerNumberTimes };
};
{
  exports.gameAdminCoinUpdate = async (bitCoin) => {
    console.log("gameAdminCoinUpdate function call ==============", bitCoin);
    if (!isNaN(bitCoin)) {
      console.log(
        "Finally updategameAdminCoinUpdate function call ==============",
        bitCoin
      );
      let gameAdminCoin = await GameAdminCoin.findOne();
      if (!gameAdminCoin) {
        gameAdminCoin = new GameAdminCoin();
      }
      gameAdminCoin.coin += bitCoin;
      await gameAdminCoin.save();
      return gameAdminCoin.coin;
    }
  };

  exports.updateUser = async (obj) => {
    try {
      console.log("obj.User._id  : ", obj.User._id);

      const updateUserResult = await User.findByIdAndUpdate(
        { _id: obj.User._id },
        {
          $inc: { diamond: -parseInt(obj.Bit) },
        },
        { new: true }
      );
      // console.log('updateUserResultupdateUserResult : ', updateUserResult);
      return updateUserResult;
    } catch (err) {
      console.log(err);
    }
  };
  0;
  exports.addBet = (diamond, id) => {
    console.log(betG, "bet");
    if (betG.length) {
      const index = betG.findIndex((element) => {
        if (element.userId == id) return true;
        return false;
      });
      if (index != -1) {
        betG[index].amount += diamond;
      } else {
        betG.push({
          amount: diamond,
          userId: id,
        });
      }
    } else {
      betG.push({
        amount: diamond,
        userId: id,
      });
    }
  };
  exports.addUserBits = (diamond, frame, id) => {
    if (currentGame.UsersBits.length) {
      const index = currentGame.UsersBits.findIndex((element) => {
        if (element.userId == id && element.SelectedFrame == frame) return true;
        return false;
      });
      if (index != -1) {
        currentGame.UsersBits[index].Bit += diamond;
      } else {
        currentGame.UsersBits.push({
          Bit: diamond,
          SelectedFrame: frame,
          userId: id,
        });
      }
    } else {
      currentGame.UsersBits.push({
        Bit: diamond,
        SelectedFrame: frame,
        userId: id,
      });
    }
  };

  exports.addGameHistory = async (
    number,
    sum,
    winCoinPercent,
    winnerNumberTimes
  ) => {
    if (currentGame.UsersBits.length != 0) {
      console.log("data.winCoinPercent", winCoinPercent);

      updatedGameAdminCoin = await this.gameAdminCoinUpdate(-winCoinPercent);
      console.log("updatedGameAdminCoin", updatedGameAdminCoin);
      await new FerryWheelGameHistory({
        frameCoin: currentGame.frameBitCoin,
        totalAdd: sum, // total add coin in game
        winnerCoinMinus: -parseInt(winCoinPercent),
        updatedAdminCoin: parseInt(updatedGameAdminCoin),
        winnerNumber: number,
        winnerNumberTimes: winnerNumberTimes,
        userBits: currentGame.UsersBits,
        date: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      }).save();
    }
  };

  exports.createAdminCoin = async () => {
    let rouletteAdminCoin = await GameAdminCoin.findOne();
    if (!rouletteAdminCoin) {
      rouletteAdminCoin = await new GameAdminCoin().save();
    }
  };
}
exports.createHistoryWinnerNumber = async () => {
  let ferryWheelLastHistory = await FerryWheelLastHistory.findOne();
  if (!ferryWheelLastHistory) {
    ferryWheelLastHistory = await new FerryWheelLastHistory().save();
  }
};

exports.allUserHistory = async (currentGame, result) => {
  console.log("allUserHistory==================================", result);

  let sumByUserAndFrame = {};
  currentGame.UsersBits.forEach((bitData) => {
    const key = bitData.userId;
    if (!sumByUserAndFrame[key]) {
      sumByUserAndFrame[key] = {
        userId: key,
        BitData: [{ Bit: bitData.Bit, SelectedFrame: bitData.SelectedFrame }],
      };
    } else {
      const existingFrameIndex = sumByUserAndFrame[key].BitData.findIndex(
        (item) => item.SelectedFrame === bitData.SelectedFrame
      );
      if (existingFrameIndex === -1) {
        sumByUserAndFrame[key].BitData.push({
          Bit: bitData.Bit,
          SelectedFrame: bitData.SelectedFrame,
        });
      } else {
        sumByUserAndFrame[key].BitData[existingFrameIndex].Bit += bitData.Bit;
      }
    }
  });

  const resultArray = Object.values(sumByUserAndFrame);
  console.log("resultArray :", resultArray);

  //  resultArray : [ { userId: '12200', BitData: [ { Bit: 100, SelectedFrame: 2 } , { Bit: 500, SelectedFrame: 1 }] },
  //   { userId: '122', BitData: [ { Bit: 100, SelectedFrame: 2 }] }]
  for (let index1 = 0; index1 < resultArray.length; index1++) {
    console.log("loop =========== :", index1);
    const element = resultArray[index1]; // { userId: '12200', BitData: [ { Bit: 100, SelectedFrame: 2 } , { Bit: 500, SelectedFrame: 1 }] }
    let winCoinPercent = 0;
    let findBetIndex;
    const resultFrameIndex = resultArray[index1].BitData.findIndex((item) => {
      if (item?.SelectedFrame == result) return true;
      return false;
    });
    let resultBitData;
    if (resultFrameIndex !== -1) {
      resultBitData = resultArray[index1].BitData[resultFrameIndex];
      // const resultBitData = { Bit: 100, SelectedFrame: 2 }
      switch (
        result // 1 to 8
      ) {
        case 1:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame1;
          break;
        case 2:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame2;
          break;
        case 3:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame3;
          break;
        case 4:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame4;
          break;
        case 5:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame5;
          break;
        case 6:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame6;
          break;
        case 7:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame7;
          break;
        case 8:
          winCoinPercent +=
            resultBitData.Bit * config?.frameWinnerTimes?.frame8;
          break;
        default:
          break;
      }

      if (winCoinPercent > 0) {
        const user = await User.findById(element?.userId).select({
          name: "$name",
          image: "$image",
          avatarFrameImage: "$avatarFrameImage",
        });
        const user1 = await User.findOneAndUpdate(
          { _id: element?.userId },
          {
            $inc: { diamond: winCoinPercent },
          },
          { new: true }
        );
        winnerUserArrayG.push({ ...user._doc, userWinCoin: winCoinPercent });
      }
    }
    findBetIndex = betG.findIndex((data) => {
      if (data?.userId == element?.userId) return true;
      return false;
    });
    const income = winCoinPercent - parseInt(betG[findBetIndex]?.amount);
    let history;
    if (!isNaN(income)) {
      if (income <= 0) {
        history = {
          userId: element?.userId,
          isIncome: false,
          type: 16,
          diamond: Math.abs(income),
          date: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          // ferryWheelGame: {
          //   winNumber: result, // resultObj: { no: 22, color: 'black', oddAndEven: 'even' },
          //   winCoin: winCoinPercent,
          //   totalAddAmount: parseInt(betG[findBetIndex]?.amount),
          // },
        };
        await new Wallet(history).save();
      } else {
        history = {
          userId: element?.userId,
          isIncome: true,
          type: 16,
          diamond: Math.floor(income),
          date: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          // ferryWheelGame: {
          //   winNumber: result, // resultObj: { no: 22, color: 'black', oddAndEven: 'even' },
          //   winCoin: winCoinPercent,
          //   totalAddAmount: parseInt(betG[findBetIndex]?.amount),
          // },
        };
        await new Wallet(history).save();
      }
    }
    console.log(
      "MAIN HISTORY ++++++++++++++++++++++++++++++++++++++ income",
      income,
      "+++++++++++++"
    );
    betG.splice(findBetIndex, 1);
  }
};

exports.historyRecord = async (_id) => {
  let ferryWheelLastHistoryAggregation = await FerryWheelGameHistory.aggregate([
    {
      $match: {
        "userBits.userId": _id,
      },
    },
    {
      $unwind: "$userBits",
    },
    {
      $match: {
        "userBits.userId": _id,
      },
    },
    { $sort: { "userBits.createdAt": -1 } },
    { $limit: 100 },
    {
      $project: {
        selectedFrame: "$userBits.SelectedFrame",
        Bit: "$userBits.Bit",
        createdAt: "$userBits.createdAt",
        winnerNumber: "$winnerNumber",
        winnerNumberTimes: "$winnerNumberTimes",
        isWinner: {
          $eq: ["$userBits.SelectedFrame", "$winnerNumber"],
        },
      },
    },
  ]);

  return ferryWheelLastHistoryAggregation;
};

exports.todayProfit = async (_id) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the current day

  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to the next day
  console.log("today : ", today);
  console.log("tomorrow : ", tomorrow);

  let ferryWheelLastHistoryAggregation = await FerryWheelGameHistory.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
          $lt: tomorrow,
        },
      },
    },
    {
      $match: {
        "userBits.userId": _id,
      },
    },
    {
      $unwind: "$userBits",
    },
    {
      $match: {
        "userBits.userId": _id,
        $expr: { $eq: ["$userBits.SelectedFrame", "$winnerNumber"] },
      },
    },
    {
      $group: {
        _id: "$_id",
        winnerNumber: { $first: "$winnerNumber" },
        sumOfBits: { $sum: "$userBits.Bit" },
        winnerNumberTimes: { $first: "$winnerNumberTimes" },
      },
    },
    {
      $group: {
        _id: null,
        totalResult: {
          $sum: { $multiply: ["$sumOfBits", "$winnerNumberTimes"] },
        },
      },
    },
  ]);
  return ferryWheelLastHistoryAggregation[0]?.totalResult;
};
