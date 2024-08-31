const flencyComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment = "Duraksamadan cevaplar";

      break;

    case Avg > 2.49 && level === "A":
      Comment = "Bazen duraksayarak cevaplar";

      break;

    case Avg > 1.49 && level === "A":
      Comment = "Sık sık duraksayarak cevaplar";

      break;

    case Avg > 3.49 && level === "B":
      Comment = "Duraksamadan yanıt verir";

      break;
    case Avg > 2.49 && level === "B":
      Comment = "Ara sıra duraklamalarla yanıt verir";

      break;

    case Avg > 1.49 && level === "B":
      Comment = "Düzenli duraklamalarla yanıt verir";

      break;

    case Avg < 1.49 && level === "B":
      Comment = "Aralıklı duraklamalarla yanıt verir";

      break;

    default:
      Comment = "Sürekli duraksamalarla cevaplar";
  }
  return Comment;
};

export default flencyComment;
