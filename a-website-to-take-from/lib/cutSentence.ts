export const cutSentence = (sentence: string) => {
  return sentence?.length > 64 ? sentence?.slice(0, 64) + "..." : sentence;
};
