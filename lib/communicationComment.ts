const communicationComment = (Avg: number, level: string) => {
  let Comment;

  switch (true) {
    case Avg > 3.49 && level === "A":
      Comment =
        "Yönlendirme, destek gerektirmez ve uygun şekilde konuşmayı sürdürebilir";

      break;

    case Avg > 2.49 && level === "A":
      Comment =
        "Çok az yönlendirme, destek gerektirir ve basit konuşmayı sürdürebilir ";

      break;

    case Avg > 1.49 && level === "A":
      Comment =
        "Biraz yönlendirme, destek gerektirir ve bazı zorluklara rağmen basit konuşmayı sürdürebilir";

      break;

    case Avg > 3.49 && level === "B":
      Comment =
        "Konuşmada bağımsızdır ve uygun bir şekilde katılmak için herhangi bir rehberlik veya destek gerektirmez";

      break;
    case Avg > 2.49 && level === "B":
      Comment =
        "Minimum yardım ve destek ihtiyacı vardır ve basit bir konuşmayı sürdürebilir. ";

      break;

    case Avg > 1.49 && level === "B":
      Comment =
        "Bir miktar yardım ve destek gerektirir ve ara sıra karşılaşılan zorluklara rağmen temel bir konuşmaya katılabilir";

      break;

    case Avg < 1.49 && level === "B":
      Comment =
        "Kapsamlı yardım ve destek ihtiyacı vardır ve cevap vermede zorlanmaktadır";

      break;

    default:
      Comment = "Çok fazla yönlendirme, destek gerektirir ve cevap veremez";
  }
  return Comment;
};

export default communicationComment;
