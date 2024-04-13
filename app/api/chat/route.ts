import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const HOSPITAL_DATA = [
  {
    hospital_name: "서울대학교병원",
    address: "서울특별시 종로구 대학로 101",
    major: "내과",
  },
  {
    hospital_name: "연세대학교의과대학",
    address: "서울특별시 서대문구 연세로 50-1",
    major: "이비인후과",
  },
  {
    hospital_name: "고려대학교의과대학",
    address: "서울특별시 성북구 고려대로 1",
    major: "소아과",
  },
  {
    hospital_name: "성균관대학교의과대학",
    address: "서울특별시 종로구 성균관로 25-2",
    major: "심장내과",
  },
  {
    hospital_name: "한양대학교의과대학",
    address: "서울특별시 성동구 왕십리로 222",
    major: "피부과",
  },
  {
    hospital_name: "서강대학교병원",
    address: "서울특별시 마포로 35",
    major: "신경과",
  },
  {
    hospital_name: "중앙대학교병원",
    address: "서울특별시 동작구 흑석로 88",
    major: "종양학",
  },
  {
    hospital_name: "경희대학교의과대학",
    address: "서울특별시 동대문구 경희대로 26",
    major: "정형외과",
  },
  {
    hospital_name: "한국외국어대학교의과대학",
    address: "서울특별시 서대문구 서암정로 25",
    major: "비뇨기과",
  },
  {
    hospital_name: "서울시립대학교의과대학",
    address: "서울특별시 동대문구 서울시립대로 163",
    major: "산부인과",
  },
  {
    hospital_name: "서울여자대학교의과대학",
    address: "서울특별시 노원구 화랑로 621",
    major: "안과",
  },
  {
    hospital_name: "성신여자대학교의과대학",
    address: "서울특별시 동대문구 동소문로 320",
    major: "정신건강의학과",
  },
  {
    hospital_name: "숙명여자대학교의과대학",
    address: "서울특별시 서초구 반포로 53",
    major: "방사선종양학과",
  },
  {
    hospital_name: "이화여자대학교의과대학",
    address: "서울특별시 서대문구 이화여대로 52",
    major: "흉부외과",
  },
  {
    hospital_name: "한국성서대학교의과대학",
    address: "서울특별시 동작구 사당로 34",
    major: "혈액종양학과",
  },
  {
    hospital_name: "서울신학대학교의과대학",
    address: "서울특별시 서초구 서초대로 74",
    major: "감염내과",
  },
  {
    hospital_name: "한국방송통신대학교의과대학",
    address: "서울특별시 동작구 흑석로 156",
    major: "피부과",
  },
  {
    hospital_name: "한국체육대학교의과대학",
    address: "서울특별시 종로구 성균관로 25-2",
    major: "신경과",
  },
];
export const POST = async (request: Request) => {
  const { symptom } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "증상에 기반한 병원을 추천하는 역할을 합니다. 사용자의 [증상]에 맞는 병원을 추천하세요. 병원은 [병원 리스트]에서 추천하세요. [병원 리스트]는 JSON 형식이며, 각 병원 객체는 hospital_name와 address, major가 있습니다. 사용자의 [증상]에 부합하는 major를 찾아 병원을 추천하세요.",
      },
      {
        role: "user",
        content: `[증상] ${symptom} [병원 리스트] ${HOSPITAL_DATA}`,
      },
    ],
    max_tokens: 100,
    temperature: 0.5,
  });

  const result = {
    recommendation: response.choices[0].message.content,
  };

  return new Response(JSON.stringify(result), { status: 200 });
};
