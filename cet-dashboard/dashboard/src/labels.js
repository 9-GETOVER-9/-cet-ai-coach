export const SCORE_NAMES = {
  total: '总分',
  listening: '听力',
  reading: '阅读',
  writing_translation: '写作翻译',
};

export const WRITING_DIMENSIONS = {
  content: '内容',
  organization: '结构',
  language: '语言',
  mechanics: '规范',
};

export const TRANSLATION_DIMENSIONS = {
  accuracy: '准确性',
  expression: '表达',
  coherence: '连贯',
  mechanics: '规范',
};

export const READING_QUESTION_TYPES = {
  banked_cloze: '选词填空',
  matching: '长篇匹配',
  careful_reading: '仔细阅读',
};

export const LISTENING_SECTION_TYPES = {
  news: '短篇新闻',
  conversation: '长对话',
  passage: '听力篇章',
  lecture: '讲座/讲话',
};

export const ERROR_LABELS = {
  collocation: '搭配错误',
  weak_topic_sentence: '主题句弱',
  chinglish: '中式英语',
  missing_information: '信息遗漏',
  word_form: '词性判断',
  paragraph_matching: '段落定位',
  distractor: '干扰项',
  paraphrase: '同义替换',
  number: '数字时间',
};

export function labelCN(map, key) {
  return map[key] || key;
}
