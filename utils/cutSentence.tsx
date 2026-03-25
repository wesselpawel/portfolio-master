export const cutSentence = (sentence: string) => {
  if (sentence.length <= 120) {
    return sentence;
  } else {
    return (
      sentence.substring(0, 120).trim().split(" ").slice(0, -1).join(" ") +
      "..."
    );
  }
};
