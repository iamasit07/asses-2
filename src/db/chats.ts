import type { Message } from "../types/chatContext.types";

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

const data: Chat[] = [
  {
    id: "qf2lg-8m9p-z1x3",
    title: "Write a Shakespearean sonnet about a cat that...",
    messages: [
      {
        id: 1729866837001,
        text: "Write a Shakespearean sonnet about a cat that...",
        sender: "user",
      },
      {
        id: 1729866837002,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "b3k5r-t7c1-v9a8",
    title: "If cereal commercials were directed by Christo...",
    messages: [
      {
        id: 1729866837003,
        text: "If cereal commercials were directed by Christo...",
        sender: "user",
      },
      {
        id: 1729866837004,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "e6f2n-d4p7-j8k1",
    title: "Renewable Energy Trends",
    messages: [
      {
        id: 1729866837005,
        text: "Renewable Energy Trends",
        sender: "user",
      },
      {
        id: 1729866837006,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "h9m3z-w5r8-c2t6",
    title: "Describe a medieval jousting tournament wher...",
    messages: [
      {
        id: 1729866837007,
        text: "Describe a medieval jousting tournament wher...",
        sender: "user",
      },
      {
        id: 1729866837008,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "g5f1v-y9n2-l4q7",
    title: "What would a job interview be like if aliens wer...",
    messages: [
      {
        id: 1729866837009,
        text: "What would a job interview be like if aliens wer...",
        sender: "user",
      },
      {
        id: 1729866837010,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "s8d3j-x6k4-p2a9",
    title: "Generate a rap battle between a sentient toaste...",
    messages: [
      {
        id: 1729866837011,
        text: "Generate a rap battle between a sentient toaste...",
        sender: "user",
      },
      {
        id: 1729866837012,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "r7c1m-v3b9-o5t2",
    title: "What if oxygen was actually a hallucinogen, and...",
    messages: [
      {
        id: 1729866837013,
        text: "What if oxygen was actually a hallucinogen, and...",
        sender: "user",
      },
      {
        id: 1729866837014,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
  {
    id: "k4f8e-n6j2-u1z7",
    title: "Pitch a reality TV show where ghosts haunt inflatable furniture...",
    messages: [
      {
        id: 1729866837015,
        text: "Pitch a reality TV show where ghosts haunt inflatable furniture...",
        sender: "user",
      },
      {
        id: 1729866837016,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        sender: "llm",
      },
    ],
  },
];

export const ans1: Message = {
  id: 1,
  text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  sender: "llm",
};

export const ans2: Message = {
  id: 2,
  text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  sender: "llm",
};

export const addChat = (chat: Chat) => {
  data.unshift(chat);
};

export default data;
