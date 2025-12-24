const fluencyComment = (Avg: number, level: string) => {
  let comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      comment = "Akıcı ve kendinden emin şekilde konuşur";

      break;

    case Avg > 2.49 && level === "A":
      comment = "Basit cümlelerle konuşur, küçük duraklamalar olabilir";

      break;

    case Avg > 1.49 && level === "A":
      comment = "Kısa ifadelerle konuşur, sık sık duraklar";

      break;

    case Avg > 3.49 && level === "B":
      comment = "Akıcı ve kendinden emin şekilde konuşur";

      break;
    case Avg > 2.49 && level === "B":
      comment = "Basit cümlelerle konuşur, küçük duraklamalar olabilir";

      break;

    case Avg > 1.49 && level === "B":
      comment = "Kısa ifadelerle konuşur, sık sık duraklar";

      break;

    case Avg < 1.49 && level === "B":
      comment = "Konuşma çok sınırlıdır ve uzun duraklamalar vardır";

      break;

    default:
      comment = "Konuşma çok sınırlıdır ve uzun duraklamalar vardır";
  }
  return comment;
};

export default fluencyComment;
