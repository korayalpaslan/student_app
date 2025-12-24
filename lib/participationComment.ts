const participationComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment = "Çok aktiftir ve konuşmaya istekle katılır";

      break;

    case Avg > 2.49 && level === "A":
      Comment = "Çoğu zaman derse aktif şekilde katılır";

      break;

    case Avg > 1.49 && level === "A":
      Comment = "Sorulduğunda zaman zaman katılım gösterir";

      break;

    case Avg > 3.49 && level === "B":
      Comment = "Çok aktiftir ve konuşmaya istekle katılır";

      break;
    case Avg > 2.49 && level === "B":
      Comment = "Çoğu zaman derse aktif şekilde katılır";

      break;

    case Avg > 1.49 && level === "B":
      Comment = "Sorulduğunda zaman zaman katılım gösterir";

      break;

    case Avg < 1.49 && level === "B":
      Comment = "Derse neredeyse hiç katılmaz, konuşmaktan kaçınır";

      break;

    default:
      Comment = "Derse neredeyse hiç katılmaz, konuşmaktan kaçınır";
  }
  return Comment;
};

export default participationComment;
