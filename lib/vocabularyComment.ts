const vocabularyComment = (Avg: number, level: string) => {
  let comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      comment = "Kelimeleri doğru ve çeşitli şekilde kullanır";

      break;

    case Avg > 2.49 && level === "A":
      comment = "Konuya uygun kelimeler kullanır";

      break;

    case Avg > 1.49 && level === "A":
      comment = "Temel kelimeler kullanır, cevapları genişletmekte zorlanır";

      break;

    case Avg > 3.49 && level === "B":
      comment = "Kelimeleri doğru ve çeşitli şekilde kullanır";

      break;
    case Avg > 2.49 && level === "B":
      comment = "Konuya uygun kelimeler kullanır";

      break;

    case Avg > 1.49 && level === "B":
      comment = "Temel kelimeler kullanır, cevapları genişletmekte zorlanır";

      break;

    case Avg < 1.49 && level === "B":
      comment = "Çok sınırlı kelime bilgisi kullanır";

      break;

    default:
      comment = "Çok sınırlı kelime bilgisi kullanır";
  }
  return comment;
};

export default vocabularyComment;
