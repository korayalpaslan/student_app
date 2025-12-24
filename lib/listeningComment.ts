const listeningComment = (Avg: number, level: string) => {
  let comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      comment = "Yönergeleri kolayca anlar ve uygun şekilde yanıt verir";

      break;

    case Avg > 2.49 && level === "A":
      comment = "Yönergeleri ve soruları genel olarak iyi anlar";

      break;

    case Avg > 1.49 && level === "A":
      comment = "Basit yönergeleri destekle anlar";

      break;

    case Avg > 3.49 && level === "B":
      comment = "Yönergeleri kolayca anlar ve uygun şekilde yanıt verir";

      break;
    case Avg > 2.49 && level === "B":
      comment = "Yönergeleri ve soruları genel olarak iyi anlar";

      break;

    case Avg > 1.49 && level === "B":
      comment = "Basit yönergeleri destekle anlar";

      break;

    case Avg < 1.49 && level === "B":
      comment = "Yönergeleri anlamakta zorlanır";

      break;

    default:
      comment = "Yönergeleri anlamakta zorlanır";
  }
  return comment;
};

export default listeningComment;
