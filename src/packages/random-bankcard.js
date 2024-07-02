function generateBankCardNumber() {
  // 银行卡号的前缀，可以根据需要自行修改
  const prefix = "622848";

  // 银行卡号的长度，通常是16或19位
  const length = Math.random() < 0.5 ? 16 : 19;

  // 银行卡号的随机部分
  let randomPart = "";
  for (let i = 0; i < length - prefix.length; i++) {
    randomPart += Math.floor(Math.random() * 10).toString();
  }

  // 计算银行卡号的校验位
  const checkCode = calculateBankCardCheckCode(prefix + randomPart);

  // 返回最终的银行卡号
  return prefix + randomPart + checkCode;
}

function calculateBankCardCheckCode(cardNumber) {
  const oddPositions = [];
  const evenPositions = [];

  // 将银行卡号从右到左拆分为奇数位和偶数位
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    if ((cardNumber.length - i) % 2 === 0) {
      evenPositions.push(parseInt(cardNumber.charAt(i)));
    } else {
      oddPositions.push(parseInt(cardNumber.charAt(i)));
    }
  }

  // 计算奇数位数字的和
  let oddSum = 0;
  for (let i = 0; i < oddPositions.length; i++) {
    oddSum += oddPositions[i];
  }

  // 将偶数位数字乘以2，并将结果的个位和十位数字相加
  let evenSum = 0;
  for (let i = 0; i < evenPositions.length; i++) {
    const doubledDigit = evenPositions[i] * 2;
    evenSum += doubledDigit % 10;
    if (doubledDigit >= 10) {
      evenSum += Math.floor(doubledDigit / 10);
    }
  }

  // 计算校验位
  const totalSum = oddSum + evenSum;
  const checkCode = (10 - (totalSum % 10)) % 10;

  return checkCode.toString();
}

export default generateBankCardNumber