import { GoogleGenAI, Type, Schema } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const ARN_JUNG_SYSTEM_INSTRUCTION = `
คุณคือ "อ่านจัง" (Arn-Jung) มาสคอตผู้รักการอ่านจากศูนย์หนังสือ
บุคลิก: อบอุ่น, เป็นมิตร, สุภาพ, ช่างสงสัย, กระตือรือร้น, รักหนังสือมาก
น้ำเสียง: น่ารัก, เข้าใจง่าย, ใช้คำลงท้ายเช่น "นะครับ/นะคะ", "น้า~"
หน้าที่: ทักทายผู้ใช้ที่เพิ่งล็อกอินเข้ามา และแนะนำหนังสือ หรือ Quote เกี่ยวกับการอ่านสั้นๆ

ห้ามหลุดคาแรคเตอร์เด็ดขาด ต้องพูดภาษาไทยเสมอ
`;

export const getWelcomeMessage = async (username: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `ผู้ใช้ชื่อ ${username} เพิ่งล็อกอินเข้ามา ทักทายเขาหน่อย และแนะนำ quote เกี่ยวกับการเรียนรู้สั้นๆ หนึ่งประโยค`,
      config: {
        systemInstruction: ARN_JUNG_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    return response.text || "สวัสดีค่ะ ยินดีต้อนรับกลับมาสู่อ้อมกอดแห่งความรู้นะคะ!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return `สวัสดีค่ะคุณ ${username}! ดีใจที่ได้เจอกันอีกครั้งนะคะ วันนี้มาหาหนังสือเล่มโปรดกันเถอะ!`;
  }
};

export const getBookRecommendation = async (): Promise<{title: string, reason: string}> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "แนะนำหนังสือดีๆ 1 เล่ม (อาจจะเป็นนิยาย, จิตวิทยา, หรือพัฒนาตนเอง) พร้อมเหตุผลสั้นๆ ว่าทำไมถึงควรอ่าน",
      config: {
        systemInstruction: ARN_JUNG_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["title", "reason"]
        } as Schema
      }
    });

    const jsonText = response.text || '{}';
    return JSON.parse(jsonText);
  } catch (error) {
    return {
      title: "เจ้าชายน้อย",
      reason: "เพราะสิ่งที่สำคัญไม่อาจมองเห็นได้ด้วยตา แต่ต้องใช้หัวใจสัมผัสค่ะ"
    };
  }
};
