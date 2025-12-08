const vocabularyComment = (Avg: number, level: string) => {
  let comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      comment =
        "Bilinen konulardaki görüşlerini ifade etmek için bir dizi uygun kelime kullanır";

      break;

    case Avg > 2.49 && level === "A":
      comment =
        "Bilinen konulardaki görüşlerini ifade etmek için uygun kelimeler kullanır";

      break;

    case Avg > 1.49 && level === "A":
      comment =
        "Bilinen konulardaki görüşlerini ifade etmek için sınırlı sayıda uygun kelime ve ifade kullanabilir";

      break;

    case Avg > 3.49 && level === "B":
      comment =
        "Tanıdık konulardaki görüşlerini ifade etmek için çeşitli uygun kelime dağarcığı kullanır";

      break;
    case Avg > 2.49 && level === "B":
      comment =
        "Tanıdık konulardaki görüşleri iletmek için uygun kelime dağarcığını kullanıreniş bir dilbilgisi yapıları yelpazesini etkili bir şekilde kullanabilir";

      break;

    case Avg > 1.49 && level === "B":
      comment =
        "Tanıdık konular hakkında görüşlerini ifade etmek için uygun kelime ve ifadelerin seçimini yapıp kullanabilir";

      break;

    case Avg < 1.49 && level === "B":
      comment =
        "Tanıdık konuları tartışmak için temel kelime dağarcığını bağımsız olarak kullanabilir";

      break;

    default:
      comment =
        "Bilinen konularda sadece basit kelimeleri tek başına kullanabilir";
  }
  return comment;
};

export default vocabularyComment;
