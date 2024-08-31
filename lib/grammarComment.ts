const grammarComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment = "Çoğu dilbilgisi yapısını iyi derecede kullanabiliyor";

      break;

    case Avg > 2.49 && level === "A":
      Comment = "Çeşitli dilbilgisi kurallarını yeterince uygulayabiliyor";

      break;

    case Avg > 1.49 && level === "A":
      Comment =
        "Bazı temel dilbilgisi yapılarını kısıtlı bir şekilde kullanabiliyor";

      break;

    case Avg > 3.49 && level === "B":
      Comment = "Çoğu dilbilgisi yapısını ustaca kullanabilir";

      break;
    case Avg > 2.49 && level === "B":
      Comment =
        "Geniş bir dilbilgisi yapıları yelpazesini etkili bir şekilde kullanabilir";

      break;

    case Avg > 1.49 && level === "B":
      Comment =
        "Sınırlı bir şekilde temel dilbilgisi yapılarının küçük bir kısmını kullanma yeteneğine sahiptir";

      break;

    case Avg < 1.49 && level === "B":
      Comment = "Temel dilbilgisi yapılarını kullanmakta zorlanır";

      break;

    default:
      Comment = "Temel dilbilgisi kurallarını uygulamada zorlanıyor.";
  }
  return Comment;
};

export default grammarComment;
