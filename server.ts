import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import mammoth from 'mammoth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System Prompt for Vietnam High School Math Specialist
const MATH_EXAM_SYSTEM_PROMPT = `Bạn là một Chuyên gia Giáo dục & Thiết kế Đề thi Môn Toán Cấp 3 hàng đầu tại Việt Nam, nắm vững chương trình Giáo dục Phổ thông (GDPT) 2018 mới và các cấu trúc đề thi chuẩn của Bộ Giáo dục & Đào tạo.

NHIỆM VỤ:
Phân tích MA TRẬN ĐỀ THI và ĐỀ MẪU TƯƠNG ỨNG do người dùng cung cấp, từ đó sáng tạo ra một BỘ ĐỀ THI MỚI hoàn toàn tương tự về mức độ tư duy, dạng bài, cấu trúc nhưng thay đổi ngữ cảnh, số liệu và câu chữ.

QUY TẮC BẮT BUỘC VỀ NỘI DUNG VÀ CÔNG THỨC:
1. Độ chính xác Logic Toán học: Đảm bảo đáp án đúng 100%, không bị lỗi logic, bẫy trắc nghiệm hợp lý và lời giải chi tiết, rõ ràng, sư phạm.
2. Định dạng Công thức Toán (LaTeX): 
   - Mọi công thức toán, biến số, phép tính phải bọc trong dấu $ cho công thức inline (Ví dụ: $y = f(x)$, $x \\in \\mathbb{R}$).
   - Sử dụng cặp dấu $$ cho công thức dòng riêng (block) nếu cần thiết.
   - Chỉ dùng các lệnh LaTeX tiêu chuẩn tương thích tốt với MathType: \\dfrac{}{}, \\sqrt{}, \\int_{}^{}, \\lim_{}, \\overrightarrow{}, \\log_{}{}, \\vec{}, \\alpha, \\beta, \\pi, \\in, \\subset.
3. Cấu trúc 3 Phần chuẩn Bộ GD&ĐT (Áp dụng từ kỳ thi tốt nghiệp THPT 2025):
   - Phần 1: Câu trắc nghiệm nhiều phương án lựa chọn (A, B, C, D). Mỗi câu hỏi chỉ chọn 1 phương án đúng duy nhất.
   - Phần 2: Câu trắc nghiệm Đúng/Sai. Mỗi câu gồm 4 ý a), b), c), d). Mỗi ý thí sinh chọn Đúng hoặc Sai. (Trong sub_items ghi rõ text của ý a, b, c, d và is_true: true/false).
   - Phần 3: Câu trắc nghiệm trả lời ngắn. Thí sinh điền kết quả (dạng số thực thập phân hoặc số nguyên).
4. Phân loại 4 mức độ tư duy:
   - Nhận biết
   - Thông hiểu
   - Vận dụng
   - Vận dụng cao

ĐỊNH DẠNG ĐẦU RA BẮT BUỘC:
Kết quả trả về PHẢI là một chuỗi JSON hợp lệ duy nhất (không kèm lời chào hay markdown chat bên ngoài) theo đúng cấu trúc Schema sau:
{
  "preview_text": "BẢN XEM TRƯỚC BỘ ĐỀ THI (Dành cho người dùng đọc nhanh):\\n\\n... (Trình bày lại toàn bộ Đề thi + Bảng đáp án + Lời giải chi tiết dạng Văn bản hiển thị đẹp mắt, rõ ràng từng phần 1, 2, 3 bằng Tiếng Việt để người dùng preview ngay trên giao diện) ...",
  "data": {
    "exam_title": "ĐỀ THI MÔN TOÁN CẤP 3 CHUẨN BỘ GD&ĐT",
    "total_questions": 22,
    "grade": "12",
    "matrix_summary": "Tóm tắt tỉ lệ ma trận các mức độ và chủ đề kiến thức...",
    "questions": [
      {
        "id": 1,
        "part": 1,
        "level": "Nhận biết",
        "topic": "Tính đơn điệu của hàm số",
        "question_text": "Cho hàm số $y = f(x)$ có bảng biến thiên như sau...",
        "options": {
          "A": "$(- \\infty; 1)$",
          "B": "$(1; 3)$",
          "C": "$(3; +\\infty)$",
          "D": "$(-\\infty; 3)$"
        },
        "correct_answer": "B",
        "explanation": "Dựa vào bảng biến thiên, trên khoảng $(1; 3)$ ta có $f'(x) > 0$ nên hàm số đồng biến. Chọn B."
      },
      {
        "id": 13,
        "part": 2,
        "level": "Thông hiểu",
        "topic": "Hàm số và đồ thị",
        "question_text": "Cho hàm số bậc ba $y = f(x) = ax^3 + bx^2 + cx + d$ có đồ thị $(C)$. Xét tính đúng sai của các khẳng định sau:",
        "options": {
          "A": "a) Đồ thị hàm số có hai điểm cực trị nằm về hai phía trục tung.",
          "B": "b) Giá trị cực đại của hàm số bằng $4$.",
          "C": "c) Phương trình $f(x) - 1 = 0$ có 3 nghiệm phân biệt.",
          "D": "d) Diện tích hình phẳng giới hạn bởi đồ thị và trục hoành bằng $\\\\dfrac{8}{3}$."
        },
        "sub_items": [
          { "label": "a", "text": "Đồ thị hàm số có hai điểm cực trị nằm về hai phía trục tung.", "is_true": true, "reason": "Vì $x_1 \\cdot x_2 < 0$ nên hai điểm cực trị nằm về hai phía trục tung." },
          { "label": "b", "text": "Giá trị cực đại của hàm số bằng $4$.", "is_true": false, "reason": "Giá trị cực đại $y_{CĐ} = 2 \\ne 4$." },
          { "label": "c", "text": "Phương trình $f(x) - 1 = 0$ có 3 nghiệm phân biệt.", "is_true": true, "reason": "Đường thẳng $y = 1$ cắt đồ thị tại 3 điểm phân biệt." },
          { "label": "d", "text": "Diện tích hình phẳng giới hạn bởi đồ thị và trục hoành bằng $\\\\dfrac{8}{3}$.", "is_true": false, "reason": "Tích phân diện tích tính được bằng $\\\\dfrac{9}{4}$." }
        ],
        "correct_answer": "a: Đúng, b: Sai, c: Đúng, d: Sai",
        "explanation": "Lời giải chi tiết từng ý a, b, c, d..."
      },
      {
        "id": 17,
        "part": 3,
        "level": "Vận dụng",
        "topic": "Ứng dụng đạo hàm / Hình học / Xác suất",
        "question_text": "Một công ty sản xuất thùng chứa hình trụ có thể tích $V = 54\\pi\\text{ dm}^3$. Chi phí làm đáy và nắp là $30.000$ đồng/dm$^2$, chi phí làm mặt xung quanh là $20.000$ đồng/dm$^2$. Bán kính đáy $r$ (dm) để chi phí sản xuất nhỏ nhất bằng bao nhiêu?",
        "options": {
          "A": "3",
          "B": "3",
          "C": "3",
          "D": "3"
        },
        "correct_answer": "3",
        "explanation": "Gọi bán kính đáy là $r$, chiều cao $h$. Thể tích $V = \\pi r^2 h = 54\\pi \\Rightarrow h = \\dfrac{54}{r^2}$. Hàm chi phí $C(r) = 2\\cdot \\pi r^2 \\cdot 3 + 2\\pi r h \\cdot 2 = 6\\pi r^2 + \\dfrac{216\\pi}{r}$. Đạo hàm $C'(r) = 12\\pi r - \\dfrac{216\\pi}{r^2} = 0 \\Leftrightarrow r^3 = 18 \\Rightarrow r = 3$ dm. Vậy bán kính tối ưu là 3."
      }
    ]
  }
}`;

// API to generate complete exam based on matrix and sample exam
app.post('/api/generate-exam', async (req, res) => {
  try {
    const {
      matrix,
      sampleExam,
      grade = '12',
      examType = 'thpt_quoc_gia',
      questionCounts = { part1: 12, part2: 4, part3: 6 },
      variationStyle = 'identical_structure',
      customInstructions = '',
    } = req.body;

    const userPrompt = `Dưới đây là thông tin yêu cầu tạo đề thi Toán:

[LỚP]: Lớp ${grade}
[LOẠI ĐỀ]: ${examType}
[CẤU TRÚC SỐ CÂU]:
- Phần 1 (Trắc nghiệm 4 lựa chọn): ${questionCounts.part1} câu
- Phần 2 (Trắc nghiệm Đúng/Sai, mỗi câu 4 ý a,b,c,d): ${questionCounts.part2} câu
- Phần 3 (Trắc nghiệm Trả lời ngắn): ${questionCounts.part3} câu
Tổng cộng: ${questionCounts.part1 + questionCounts.part2 + questionCounts.part3} câu.

[PHONG CÁCH BIẾN ĐỔI]: ${variationStyle === 'practical_context' ? 'Tăng cường bài toán liên hệ thực tế, mô hình hóa toán học đời sống' : variationStyle === 'enhanced_differentiation' ? 'Tăng tính phân hóa, bài tập tư duy sâu sắc, bẫy trắc nghiệm tinh tế' : 'Giữ nguyên cấu trúc logic, biến đổi số liệu, đổi mới hàm số/hình học tương đương'}

[HƯỚNG DẪN BỔ SUNG CỦA GIÁO VIÊN]:
${customInstructions || 'Không có'}

[MA TRẬN ĐỀ THI ĐƯỢC CUNG CẤP]:
${matrix || 'Ma trận chuẩn Tốt nghiệp THPT 2025: 40% Nhận biết, 30% Thông hiểu, 20% Vận dụng, 10% Vận dụng cao. Kiến thức trọng tâm Toán lớp 12 (Hàm số, Oxyz, Tích phân, Thống kê, Xác suất có điều kiện).'}

[ĐỀ MẪU TƯƠNG ỨNG CẦN PHÂN TÍCH VÀ PHÁT TRIỂN ĐỀ TƯƠNG ĐƯƠNG]:
${sampleExam || 'Tạo đề tương đương theo đúng chuẩn đề thi tham khảo tốt nghiệp THPT năm 2025 môn Toán của Bộ GD&ĐT.'}

YÊU CẦU:
Hãy phân tích kỹ ma trận và đề mẫu trên, tạo ra bộ đề thi mới 100% hoàn chỉnh, bám sát các dạng toán và mức độ tư duy. Đảm bảo mọi công thức toán dùng định dạng $LaTeX$ chuẩn, đáp án chính xác 100% và lời giải chi tiết.
Chỉ trả về DUY NHẤT một chuỗi JSON hợp lệ theo Schema đã quy định, không kèm bất kỳ văn bản giải thích nào ở ngoài JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: MATH_EXAM_SYSTEM_PROMPT,
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '';
    
    // Parse JSON
    let parsedResult;
    try {
      parsedResult = JSON.parse(rawText);
    } catch {
      // Try cleaning markdown backticks if any
      const cleaned = rawText.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    // Safety fallback check on questions array
    if (!parsedResult.data || !Array.isArray(parsedResult.data.questions)) {
      throw new Error('Dữ liệu trả về từ mô hình không đúng định dạng mong đợi');
    }

    res.json({
      success: true,
      result: parsedResult,
    });
  } catch (error: any) {
    console.error('Error generating exam:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Có lỗi xảy ra khi tạo đề thi. Vui lòng thử lại.',
    });
  }
});

// API to verify or re-solve a specific question for absolute accuracy
app.post('/api/verify-question', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ success: false, error: 'Thiếu dữ liệu câu hỏi' });
    }

    const prompt = `Bạn là Chuyên gia Thẩm định Đề thi Toán Cấp 3.
Hãy kiểm tra tính đúng đắn logic toán học, tính toán lại từ đầu và thẩm định câu hỏi sau:

Phần: ${question.part} (${question.part === 1 ? 'Trắc nghiệm 4 lựa chọn' : question.part === 2 ? 'Đúng/Sai' : 'Trả lời ngắn'})
Mức độ: ${question.level}
Nội dung: ${question.question_text}
Các phương án: ${JSON.stringify(question.options || {})}
Ý đúng/sai (nếu có): ${JSON.stringify(question.sub_items || [])}
Đáp án hiện tại: ${question.correct_answer}
Lời giải hiện tại: ${question.explanation}

YÊU CẦU:
1. Giải độc lập và kiểm tra xem đáp án có chuẩn xác 100% không.
2. Nếu có lỗi sai, chỉ ra cụ thể và đưa ra đáp án + lời giải chuẩn xác.
3. Đảm bảo công thức toán viết dạng $LaTeX$.

Trả về JSON:
{
  "is_valid": true,
  "verified_correct_answer": "...",
  "verified_explanation": "...",
  "feedback_notes": "Nhận xét chi tiết của chuyên gia thẩm định..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ success: true, verification: parsed });
  } catch (error: any) {
    console.error('Error verifying question:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API to export formatted HTML file that opens directly in Microsoft Word (.doc) with MathType support
app.post('/api/export-word', (req, res) => {
  try {
    const { title, questions, includeAnswers = true, previewText = '' } = req.body;

    const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${title || 'Đề thi Môn Toán'}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; margin: 2cm; }
    h1 { font-size: 14pt; text-align: center; text-transform: uppercase; font-weight: bold; margin-bottom: 4px; }
    h2 { font-size: 13pt; text-align: center; font-weight: normal; margin-top: 0; margin-bottom: 20px; }
    .header-table { width: 100%; margin-bottom: 20px; border-bottom: 1px solid black; padding-bottom: 10px; }
    .header-table td { vertical-align: top; }
    .part-title { font-weight: bold; font-size: 12pt; margin-top: 18px; margin-bottom: 8px; text-decoration: underline; }
    .question { margin-bottom: 14px; text-align: justify; }
    .q-title { font-weight: bold; }
    .options-grid { width: 100%; margin: 6px 0; }
    .options-grid td { width: 25%; vertical-align: top; }
    .solution-box { background-color: #f7f7f7; border-left: 3px solid #003366; padding: 6px 12px; margin: 8px 0; font-size: 11pt; }
    .answer-key { font-weight: bold; color: #b30000; }
  </style>
</head>
<body>
  <table class="header-table">
    <tr>
      <td style="width: 50%; text-align: center;">
        <b>BỘ GIÁO DỤC VÀ ĐÀO TẠO</b><br/>
        <b>TRƯỜNG THPT CHUYÊN</b>
      </td>
      <td style="width: 50%; text-align: center;">
        <b>KỲ THI TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG 2025</b><br/>
        <b>Bài thi: TOÁN HỌC</b><br/>
        <i>Thời gian làm bài: 90 phút (không kể thời gian phát đề)</i>
      </td>
    </tr>
  </table>

  <h1>${title || 'ĐỀ THI MÔN TOÁN'}</h1>
  <h2>(Đề thi gồm ${questions?.length || 22} câu)</h2>

  <div class="content">
    ${questions && questions.length > 0 ? questions.map((q: any) => `
      <div class="question">
        <p><span class="q-title">Câu ${q.id} (${q.level}):</span> ${q.question_text}</p>
        ${q.part === 1 ? `
          <table class="options-grid">
            <tr>
              <td><b>A.</b> ${q.options?.A || ''}</td>
              <td><b>B.</b> ${q.options?.B || ''}</td>
              <td><b>C.</b> ${q.options?.C || ''}</td>
              <td><b>D.</b> ${q.options?.D || ''}</td>
            </tr>
          </table>
        ` : ''}
        ${q.part === 2 && q.sub_items ? `
          <div style="margin-left: 15px;">
            ${q.sub_items.map((sub: any) => `<p><b>${sub.label})</b> ${sub.text} <i>(${sub.is_true ? 'Đúng' : 'Sai'})</i></p>`).join('')}
          </div>
        ` : ''}
        ${q.part === 3 ? `<p style="font-style: italic; color: #555;">(Thí sinh điền kết quả vào phiếu trả lời)</p>` : ''}
        
        ${includeAnswers ? `
          <div class="solution-box">
            <p><span class="answer-key">Đáp án:</span> ${q.correct_answer}</p>
            <p><b>Lời giải chi tiết:</b> ${q.explanation}</p>
          </div>
        ` : ''}
      </div>
    `).join('') : `<pre>${previewText}</pre>`}
  </div>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'application/msword; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="De_Thi_Toan_GDPT_2018.doc"');
    res.send(htmlContent);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API to parse uploaded Word document (.docx / .doc)
app.post('/api/parse-word-file', async (req, res) => {
  try {
    const { fileBase64, fileName } = req.body;
    if (!fileBase64) {
      return res.status(400).json({ success: false, error: 'Thiếu dữ liệu tệp tin' });
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    
    // Extract raw text
    const textResult = await mammoth.extractRawText({ buffer });
    let text = textResult.value || '';

    // If text seems short or empty, also check convertToHtml for table contents
    if (text.length < 50) {
      const htmlResult = await mammoth.convertToHtml({ buffer });
      if (htmlResult.value) {
        // Strip basic tags or keep readable format
        const clean = htmlResult.value
          .replace(/<\/p>/gi, '\n')
          .replace(/<\/tr>/gi, '\n')
          .replace(/<\/td>/gi, ' | ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\n\s*\n/g, '\n')
          .trim();
        if (clean.length > text.length) {
          text = clean;
        }
      }
    }

    res.json({
      success: true,
      text: text.trim(),
      fileName: fileName || 'file.docx',
    });
  } catch (error: any) {
    console.error('Error parsing word file:', error);
    res.status(500).json({
      success: false,
      error: 'Không thể giải mã tệp Word. Vui lòng kiểm tra tệp có định dạng .docx hợp lệ hoặc sao chép nội dung trực tiếp.',
    });
  }
});

// Serve frontend with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: 3000,
        host: '0.0.0.0',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
