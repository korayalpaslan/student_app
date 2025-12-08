const contributionComment = (Avg: number) => {
  let Comment;

  switch (true) {
    case Avg > 3.49:
      Comment =
        "Derslere çok iyi düzeyde ve aktif bir şekilde katkıda bulunmaktadır.";
      break;

    case Avg > 2.49:
      Comment = "Derslere iyi düzeyde katkıda bulunmaktadır.";
      break;

    case Avg > 1.49:
      Comment =
        "Derslere katkıda bulunmak için teşvik edilmeye ihtiyaç duymaktadır.";
      break;

    default:
      Comment =
        "Derslere katkıda bulunma konusunda çok sınırlı bir performans göstermektedir.";
  }

  return Comment;
};

export default contributionComment;
