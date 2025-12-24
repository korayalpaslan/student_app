const pronunciationComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment = "Konuşması açık, net ve kolay anlaşılırdır";

      break;

    case Avg > 2.49 && level === "A":
      Comment = "Telaffuzu genellikle nettir";

      break;

    case Avg > 1.49 && level === "A":
      Comment = "Bazı kelimeler net değildir ancak genel anlam anlaşılır";

      break;

    case Avg > 3.49 && level === "B":
      Comment = "Konuşması açık, net ve kolay anlaşılırdır";

      break;
    case Avg > 2.49 && level === "B":
      Comment = "Telaffuzu genellikle nettir";

      break;

    case Avg > 1.49 && level === "B":
      Comment = "Bazı kelimeler net değildir ancak genel anlam anlaşılır";

      break;

    case Avg < 1.49 && level === "B":
      Comment = "Konuşması çoğu zaman anlaşılmamaktadır";

      break;

    default:
      Comment = "Konuşması çoğu zaman anlaşılmamaktadır";
  }
  return Comment;
};

export default pronunciationComment;
