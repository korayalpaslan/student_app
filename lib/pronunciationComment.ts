const pronunciationComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment = "Telaffuz anlaşılır";

      break;

    case Avg > 2.49 && level === "A":
      Comment = "Fonolojik özelliklerin kontrolü ile çoğunlukla anlaşılırdır";

      break;

    case Avg > 1.49 && level === "A":
      Comment =
        "Fonolojik özelliklerin sınırlı kontrolü ile çoğunlukla anlaşılır";

      break;

    case Avg > 3.49 && level === "B":
      Comment = "Telaffuzu açık ve anlaşılabilir";

      break;
    case Avg > 2.49 && level === "B":
      Comment = "Genellikle açık ve telaffuz kontrolü iyidir";

      break;

    case Avg > 1.49 && level === "B":
      Comment = "Genellikle açık, ama bazı telaffuz zorlukları yaşamaktadır";

      break;

    case Avg < 1.49 && level === "B":
      Comment = "Sıklıkla telaffuzunun anlaşılması zordur";

      break;

    default:
      Comment = "Çoğu zaman anlaşılır değil";
  }
  return Comment;
};

export default pronunciationComment;
