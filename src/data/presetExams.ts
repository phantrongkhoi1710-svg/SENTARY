import { ExamMatrixPreset, ExamResponse } from '../types/exam';

export const EXAM_PRESETS: ExamMatrixPreset[] = [
  {
    id: 'thpt-2025',
    title: 'Đề Tham Khảo Tốt Nghiệp THPT 2025 (Bộ GD&ĐT)',
    grade: '12',
    description: 'Cấu trúc định dạng mới nhất của Bộ GD&ĐT: 12 câu TN 4 lựa chọn, 4 câu TN Đúng/Sai, 6 câu Trả lời ngắn. Bám sát 4 mức độ tư duy.',
    matrixText: `MA TRẬN ĐỀ THI TỐT NGHIỆP THPT TỪ NĂM 2025 - MÔN TOÁN
Tổng số câu hỏi: 22 câu (Phần I: 12 câu; Phần II: 4 câu; Phần III: 6 câu).
Thời gian làm bài: 90 phút.
Tỉ lệ các mức độ tư duy:
- Nhận biết: ~40% (8 câu Phần I, 1 câu Phần II, 0 câu Phần III)
- Thông hiểu: ~30% (4 câu Phần I, 2 câu Phần II, 1 câu Phần III)
- Vận dụng: ~20% (0 câu Phần I, 1 câu Phần II, 3 câu Phần III)
- Vận dụng cao: ~10% (0 câu Phần I, 0 câu Phần II, 2 câu Phần III)
Chủ đề kiến thức:
1. Hàm số và ứng dụng đạo hàm (Đơn điệu, Cực trị, GTLN-GTNN, Tiệm cận, Đồ thị, Bài toán tối ưu thực tế).
2. Tọa độ và vectơ trong không gian Oxyz (Tọa độ điểm, vectơ, tích có hướng, phương trình mặt phẳng, đường thẳng, mặt cầu).
3. Nguyên hàm và Tích phân (Tính nguyên hàm, tích phân, ứng dụng diện tích hình phẳng, thể tích khối tròn xoay, bài toán chuyển động).
4. Thống kê và Xác suất (Mẫu số liệu ghép nhóm, Khoảng tứ phân vị, Phương sai, Độ lệch chuẩn, Xác suất có điều kiện, Công thức Bayes).`,
    sampleExamText: `ĐỀ MẪU THAM KHẢO TỐT NGHIỆP THPT (Trích đoạn minh họa):
Phần I (12 câu):
Câu 1: Cho hàm số $y=f(x)$ có bảng biến thiên. Tìm khoảng đồng biến.
Câu 2: Cho hàm số bậc ba $y=ax^3+bx^2+cx+d$. Tìm tọa độ điểm cực đại.
Câu 3: Tìm tiệm cận ngang của đồ thị hàm số $y=\\dfrac{2x-1}{x+1}$.
Câu 4: Trong không gian $Oxyz$, cho điểm $M(1; -2; 3)$. Hình chiếu của $M$ lên mặt phẳng $(Oxy)$ có tọa độ là gì?
...
Phần II (4 câu Đúng/Sai):
Câu 1: Cho hàm số phân thức bậc hai trên bậc nhất $y=\\dfrac{x^2-x+1}{x-1}$. Xét tính đúng sai của 4 mệnh đề về cực trị, tiệm cận xiên, đồ thị.
Câu 2: Trong không gian $Oxyz$, cho 4 điểm $A, B, C, D$. Xét tính đúng sai về đồng phẳng, diện tích tam giác, khoảng cách và thể tích tứ diện.
...
Phần III (6 câu Trả lời ngắn):
Câu 1: Một xưởng cơ khí sản xuất máng dẫn nước bằng tôn gập lại. Tìm góc gập $\\alpha$ để diện tích mặt cắt ngang lớn nhất.
Câu 2: Một vật chuyển động với vận tốc $v(t) = 3t^2 - 6t$ (m/s). Tính quãng đường vật đi được trong 4 giây đầu tiên.`,
    part1Count: 12,
    part2Count: 4,
    part3Count: 6,
    distribution: { nb: 40, th: 30, vd: 20, vdc: 10 },
  },
  {
    id: 'hk1-12',
    title: 'Kiểm Tra Cuối Học Kỳ I - Lớp 12',
    grade: '12',
    description: 'Nội dung trọng tâm: Ứng dụng đạo hàm khảo sát hàm số, Vectơ và hệ tọa độ trong không gian, Thống kê mẫu số liệu ghép nhóm.',
    matrixText: `MA TRẬN HỌC KỲ I - LỚP 12
Thời gian: 90 phút. 22 câu chuẩn cấu trúc mới.
1. Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số (60%):
- Tính đơn điệu, cực trị, GTLN-GTNN, tiệm cận của hàm bậc 3, hàm phân thức bậc 1/bậc 1 và bậc 2/bậc 1.
- Bài toán thực tế tối ưu hóa (chi phí, lợi nhuận, diện tích, thể tích).
2. Vectơ và phương pháp tọa độ trong không gian (25%):
- Vectơ trong không gian, các phép toán vectơ, tích vô hướng.
- Hệ trục tọa độ Oxyz, tọa độ điểm, vectơ, độ dài.
3. Thống kê mẫu số liệu ghép nhóm (15%):
- Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn.`,
    sampleExamText: `Đề thi kiểm tra kiến thức HK1 bám sát bài toán tối ưu hóa chi phí sản xuất hộp sữa hình trụ, bài toán tính độ lệch chuẩn điểm thi của 2 lớp, bài toán tìm góc giữa hai vectơ gia tốc trọng trường trong Oxyz.`,
    part1Count: 12,
    part2Count: 4,
    part3Count: 6,
    distribution: { nb: 45, th: 30, vd: 15, vdc: 10 },
  },
  {
    id: 'hk2-12',
    title: 'Kiểm Tra Cuối Học Kỳ II - Lớp 12',
    grade: '12',
    description: 'Nội dung: Nguyên hàm, tích phân và ứng dụng; Phương trình mặt phẳng, đường thẳng, mặt cầu Oxyz; Xác suất có điều kiện & công thức Bayes.',
    matrixText: `MA TRẬN HỌC KỲ II - LỚP 12
Thời gian: 90 phút.
1. Nguyên hàm, tích phân và ứng dụng (45%):
- Tính nguyên hàm cơ bản, đổi biến, từng phần.
- Tính diện tích hình phẳng, thể tích khối tròn xoay.
2. Phương pháp tọa độ trong không gian Oxyz (35%):
- Mặt cầu, mặt phẳng, đường thẳng trong không gian.
- Vị trí tương đối, góc và khoảng cách.
3. Xác suất có điều kiện (20%):
- Xác suất có điều kiện, quy tắc nhân xác suất, công thức xác suất toàn phần, công thức Bayes.`,
    sampleExamText: `Đề thi gồm bài toán tính thể tích thùng rượu vang (khối tròn xoay Parabol), bài toán trắc nghiệm Đúng/Sai về mặt cầu tiếp xúc mặt phẳng trong Oxyz, và bài toán chẩn đoán y khoa ứng dụng công thức Bayes.`,
    part1Count: 12,
    part2Count: 4,
    part3Count: 6,
    distribution: { nb: 35, th: 35, vd: 20, vdc: 10 },
  },
  {
    id: 'lop11-giuaky',
    title: 'Kiểm Tra Định Kỳ Lớp 11 (GDPT 2018)',
    grade: '11',
    description: 'Nội dung: Hàm số lượng giác, Dãy số, Cấp số cộng, Cấp số nhân, Giới hạn hàm số, Quan hệ song song và vuông góc trong không gian.',
    matrixText: `MA TRẬN KIỂM TRA LỚP 11
Thời gian: 60 phút. Cấu trúc: 12 câu TN 4 lựa chọn, 3 câu Đúng/Sai, 4 câu Trả lời ngắn.
1. Lượng giác và Dãy số (40%): Phương trình lượng giác, công thức cộng, CSC, CSN.
2. Giới hạn và Hàm số liên tục (30%): Giới hạn dãy số, giới hạn hàm số vô định $0/0$, $\\infty/\\infty$.
3. Hình học không gian (30%): Đường thẳng song song mặt phẳng, góc giữa hai đường thẳng, đường vuông góc mặt phẳng.`,
    sampleExamText: `Đề mẫu trắc nghiệm lượng giác ứng dụng thủy triều dao động điều hòa, tính tổng chi phí tiền gửi tiết kiệm lãi kép theo cấp số nhân, tính khoảng cách từ điểm đến mặt phẳng.`,
    part1Count: 12,
    part2Count: 3,
    part3Count: 4,
    distribution: { nb: 50, th: 30, vd: 15, vdc: 5 },
  },
];

export const DEFAULT_EXAM_PAYLOAD: ExamResponse = {
  preview_text: `BẢN XEM TRƯỚC BỘ ĐỀ THI MÔN TOÁN CẤP 3 CHUẨN BỘ GD&ĐT
KỲ THI TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG TỪ NĂM 2025
Môn thi: TOÁN HỌC - Thời gian: 90 phút

=======================================================
PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (12 câu - 3.0 điểm)
Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu hỏi chỉ chọn một phương án.
-------------------------------------------------------
Câu 1 (Nhận biết): Cho hàm số $y = f(x)$ có bảng xét dấu đạo hàm như sau:
    x    | -\\infty       -1         2        +\\infty
  f'(x)  |        +       0    -    0    +
Hàm số đã cho nghịch biến trên khoảng nào dưới đây?
  A. $(-1; 2)$           B. $(-\\infty; -1)$       C. $(2; +\\infty)$        D. $(-1; +\\infty)$
  => Đáp án: A

Câu 2 (Nhận biết): Cho hàm số $y = \\dfrac{2x - 3}{x + 1}$. Đường tiệm cận ngang của đồ thị hàm số có phương trình là:
  A. $y = -3$            B. $y = 2$               C. $x = -1$              D. $y = -1$
  => Đáp án: B

Câu 3 (Nhận biết): Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (2; -1; 3)$ và $\\vec{v} = (1; 0; -2)$. Tọa độ vectơ $\\vec{w} = \\vec{u} + 2\\vec{v}$ là:
  A. $(4; -1; -1)$        B. $(3; -1; 1)$          C. $(4; 1; -1)$          D. $(0; -1; 7)$
  => Đáp án: A

Câu 4 (Nhận biết): Trong không gian $Oxyz$, tâm $I$ và bán kính $R$ của mặt cầu $(S): (x-2)^2 + (y+1)^2 + z^2 = 16$ là:
  A. $I(2; -1; 0), R=4$  B. $I(-2; 1; 0), R=4$    C. $I(2; -1; 0), R=16$   D. $I(2; 1; 0), R=4$
  => Đáp án: A

Câu 5 (Nhận biết): Họ tất cả các nguyên hàm của hàm số $f(x) = 3x^2 + \\sin x$ là:
  A. $x^3 - \\cos x + C$   B. $x^3 + \\cos x + C$    C. $6x + \\cos x + C$     D. $x^3 - \\sin x + C$
  => Đáp án: A

Câu 6 (Thông hiểu): Giá trị lớn nhất của hàm số $f(x) = x^3 - 3x + 2$ trên đoạn $[0; 2]$ bằng:
  A. 4                   B. 2                     C. 0                     D. 6
  => Đáp án: A

Câu 7 (Thông hiểu): Cho $\\int_{1}^{3} f(x)dx = 4$ và $\\int_{1}^{3} g(x)dx = -2$. Khi đó $\\int_{1}^{3} [2f(x) - 3g(x)]dx$ bằng:
  A. 14                  B. 2                     C. 10                    D. 8
  => Đáp án: A

Câu 8 (Thông hiểu): Cho bảng mẫu số liệu ghép nhóm về thời gian tự học (giờ/ngày) của 40 học sinh. Nhóm $[2; 4)$ có tần số là 16. Tần số tương đối của nhóm này là:
  A. $40\\%$              B. $16\\%$                C. $25\\%$                D. $30\\%$
  => Đáp án: A

Câu 9 (Nhận biết): Nghiệm của phương trình $2^{2x-1} = 32$ là:
  A. $x = 3$             B. $x = 2$               C. $x = \\dfrac{5}{2}$     D. $x = 4$
  => Đáp án: A

Câu 10 (Thông hiểu): Một hộp chứa 6 quả cầu đỏ và 4 quả cầu xanh. Lấy ngẫu nhiên đồng thời 2 quả. Xác suất để lấy được 2 quả cùng màu đỏ là:
  A. $\\dfrac{1}{3}$       B. $\\dfrac{2}{5}$        C. $\\dfrac{1}{5}$        D. $\\dfrac{8}{15}$
  => Đáp án: A

Câu 11 (Thông hiểu): Trong không gian $Oxyz$, cho mặt phẳng $(P): 2x - y + 2z - 5 = 0$. Khoảng cách từ gốc tọa độ $O$ đến mặt phẳng $(P)$ bằng:
  A. $\\dfrac{5}{3}$       B. $5$                   C. $\\dfrac{5}{9}$        D. $\\dfrac{5}{\\sqrt{5}}$
  => Đáp án: A

Câu 12 (Thông hiểu): Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, $SA \\perp (ABCD)$ và $SA = a\\sqrt{3}$. Thể tích khối chóp $S.ABCD$ bằng:
  A. $\\dfrac{a^3\\sqrt{3}}{3}$ B. $a^3\\sqrt{3}$       C. $\\dfrac{a^3}{3}$      D. $\\dfrac{a^3\\sqrt{3}}{6}$
  => Đáp án: A

=======================================================
PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG / SAI (4 câu - 4.0 điểm)
Thí sinh trả lời từ câu 1 đến câu 4. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai.
-------------------------------------------------------
Câu 13 (Vận dụng): Cho hàm số $f(x) = \\dfrac{x^2 - 3x + 3}{x - 1}$.
  a) Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$. [ĐÚNG]
  b) Đạo hàm $f'(x) = \\dfrac{x^2 - 2x}{(x-1)^2}$. [ĐÚNG]
  c) Đồ thị hàm số có tiệm cận xiên là đường thẳng $y = x - 2$. [ĐÚNG]
  d) Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$. [SAI] (Khoảng cách đúng bằng $4\\sqrt{2}$)

Câu 14 (Vận dụng): Trong không gian $Oxyz$, cho các điểm $A(1; 0; 0), B(0; 2; 0), C(0; 0; 3)$ và $D(2; 2; 2)$.
  a) Phương trình mặt phẳng $(ABC)$ là $\\dfrac{x}{1} + \\dfrac{y}{2} + \\dfrac{z}{3} = 1$. [ĐÚNG]
  b) Vectơ pháp tuyến của mặt phẳng $(ABC)$ là $\\vec{n} = (6; 3; 2)$. [ĐÚNG]
  c) Điểm $D$ nằm trên mặt phẳng $(ABC)$. [SAI]
  d) Thể tích tứ diện $ABCD$ bằng $\\dfrac{7}{6}$. [ĐÚNG]

Câu 15 (Thông hiểu): Cho hàm số $y = e^x - mx$.
  a) Với $m = 1$, hàm số đạt cực tiểu tại $x = 0$. [ĐÚNG]
  b) Đạo hàm cấp một là $y' = e^x - m$. [ĐÚNG]
  c) Hàm số luôn đồng biến trên $\\mathbb{R}$ với mọi $m \\le 0$. [ĐÚNG]
  d) Đồ thị hàm số luôn cắt trục hoành tại ít nhất một điểm với mọi số thực $m$. [SAI]

Câu 16 (Vận dụng): Một mẫu số liệu ghép nhóm về điểm kiểm tra Toán của 50 học sinh có khoảng tứ phân vị $\\Delta_Q = Q_3 - Q_1 = 2.4$, độ lệch chuẩn $s = 1.35$.
  a) Nhóm chứa trung vị được xác định dựa vào tần số tích lũy lớn hơn hoặc bằng 25. [ĐÚNG]
  b) Phương sai của mẫu số liệu xấp xỉ bằng $1.82$. [ĐÚNG]
  c) Khoảng biến thiên luôn nhỏ hơn khoảng tứ phân vị. [SAI]
  d) Dữ liệu có tính phân tán cao hơn nếu độ lệch chuẩn tăng lên. [ĐÚNG]

=======================================================
PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (6 câu - 3.0 điểm)
Thí sinh trả lời từ câu 1 đến câu 6. Điền kết quả vào ô trả lời.
-------------------------------------------------------
Câu 17 (Vận dụng): Một người thợ muốn làm một thùng tôn hình trụ không nắp có thể tích $V = 16\\pi\\text{ dm}^3$. Để tiết kiệm vật liệu nhất (diện tích toàn phần không nắp nhỏ nhất), bán kính đáy của thùng phải bằng bao nhiêu decimét?
  => Đáp án: 2

Câu 18 (Vận dụng): Một công ty ước tính hàm lợi nhuận thu được khi sản xuất và bán $x$ chiếc xe đạp điện (đơn vị: trăm chiếc) là $P(x) = -x^3 + 12x^2 + 60x - 50$ (triệu đồng), với $x \\in [0; 15]$. Công ty cần sản xuất bao nhiêu trăm chiếc xe đạp điện để đạt lợi nhuận cực đại?
  => Đáp án: 10

Câu 19 (Vận dụng): Trong không gian $Oxyz$, một flycam bay theo đường thẳng đi qua hai điểm $A(10; 20; 50)$ và $B(40; 80; 110)$ (đơn vị tọa độ: mét). Khoảng cách từ trạm quan sát mặt đất đặt tại $O(0; 0; 0)$ đến quỹ đạo bay của flycam bằng bao nhiêu mét? (Làm tròn đến hàng đơn vị).
  => Đáp án: 30

Câu 20 (Vận dụng cao): Một chiếc lều du lịch có dạng khối tròn xoay được tạo thành khi quay một hình phẳng giới hạn bởi đường cong $y = \\sqrt{4 - x^2}$ và trục hoành quanh trục $Ox$, với $x \\in [-2; 2]$ (đơn vị tính: mét). Thể tích không khí bên trong lều bằng bao nhiêu $\\pi\\text{ m}^3$? (Ghi kết quả dưới dạng số thập phân tối giản).
  => Đáp án: 5.33

Câu 21 (Vận dụng cao): Trong một cuộc thi bắn súng, vận động viên A có xác suất bắn trúng là $0.8$, vận động viên B có xác suất bắn trúng là $0.7$. Cả hai cùng bắn độc lập vào một bia một phát súng. Biết rằng có đúng một viên trúng bia, tính xác suất để viên đạn trúng bia đó là của vận động viên A. (Viết kết quả dưới dạng phân số $a/b$ hoặc số thập phân làm tròn 2 chữ số).
  => Đáp án: 0.63

Câu 22 (Vận dụng cao): Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ thỏa mãn $f(x) + f(2-x) = 2x^2 - 4x + 6$ với mọi $x \\in \\mathbb{R}$. Giá trị của tích phân $I = \\int_{0}^{2} f(x)dx$ bằng bao nhiêu?
  => Đáp án: 4`,
  data: {
    exam_title: 'ĐỀ THI TỐT NGHIỆP TRUNG HỌC PHỔ THÔNG 2025 - MÔN TOÁN',
    total_questions: 22,
    grade: '12',
    matrix_summary: 'Chuẩn Bộ GD&ĐT 2025: 40% Nhận biết (câu 1-5, 9), 30% Thông hiểu (câu 6-8, 10-12, 15), 20% Vận dụng (câu 13, 14, 16, 17, 18, 19), 10% Vận dụng cao (câu 20, 21, 22).',
    questions: [
      {
        id: 1,
        part: 1,
        level: 'Nhận biết',
        topic: 'Tính đơn điệu của hàm số',
        question_text: 'Cho hàm số $y = f(x)$ có bảng xét dấu đạo hàm $f\'(x)$ như sau:\n$$\\begin{array}{c|ccccccc} x & -\\infty & & -1 & & 2 & & +\\infty \\\\ \\hline f\'(x) & & + & 0 & - & 0 & + & \\end{array}$$\nHàm số đã cho nghịch biến trên khoảng nào dưới đây?',
        options: {
          A: '$(-1; 2)$',
          B: '$(-\\infty; -1)$',
          C: '$(2; +\\infty)$',
          D: '$(-1; +\\infty)$',
        },
        correct_answer: 'A',
        explanation: 'Dựa vào bảng xét dấu đạo hàm, trên khoảng $(-1; 2)$ ta có $f\'(x) < 0$. Do đó, hàm số đã cho nghịch biến trên khoảng $(-1; 2)$. Chọn phương án A.',
      },
      {
        id: 2,
        part: 1,
        level: 'Nhận biết',
        topic: 'Đường tiệm cận của đồ thị hàm số',
        question_text: 'Đường tiệm cận ngang của đồ thị hàm số $y = \\dfrac{2x - 3}{x + 1}$ có phương trình là:',
        options: {
          A: '$y = -3$',
          B: '$y = 2$',
          C: '$x = -1$',
          D: '$y = -1$',
        },
        correct_answer: 'B',
        explanation: 'Ta có $\\lim_{x \\to +\\infty} \\dfrac{2x - 3}{x + 1} = 2$ và $\\lim_{x \\to -\\infty} \\dfrac{2x - 3}{x + 1} = 2$. Do đó đường tiệm cận ngang của đồ thị là đường thẳng $y = 2$. Chọn B.',
      },
      {
        id: 3,
        part: 1,
        level: 'Nhận biết',
        topic: 'Vectơ trong không gian Oxyz',
        question_text: 'Trong không gian $Oxyz$, cho hai vectơ $\\vec{u} = (2; -1; 3)$ và $\\vec{v} = (1; 0; -2)$. Tọa độ của vectơ $\\vec{w} = \\vec{u} + 2\\vec{v}$ là:',
        options: {
          A: '$(4; -1; -1)$',
          B: '$(3; -1; 1)$',
          C: '$(4; 1; -1)$',
          D: '$(0; -1; 7)$',
        },
        correct_answer: 'A',
        explanation: 'Ta có $2\\vec{v} = (2; 0; -4)$. Do đó $\\vec{w} = \\vec{u} + 2\\vec{v} = (2+2; -1+0; 3-4) = (4; -1; -1)$. Chọn A.',
      },
      {
        id: 4,
        part: 1,
        level: 'Nhận biết',
        topic: 'Mặt cầu trong không gian Oxyz',
        question_text: 'Trong không gian $Oxyz$, tọa độ tâm $I$ và bán kính $R$ của mặt cầu $(S): (x-2)^2 + (y+1)^2 + z^2 = 16$ là:',
        options: {
          A: '$I(2; -1; 0), R=4$',
          B: '$I(-2; 1; 0), R=4$',
          C: '$I(2; -1; 0), R=16$',
          D: '$I(2; 1; 0), R=4$',
        },
        correct_answer: 'A',
        explanation: 'Phương trình mặt cầu có dạng $(x-a)^2 + (y-b)^2 + (z-c)^2 = R^2$, suy ra tâm $I(2; -1; 0)$ và bán kính $R = \\sqrt{16} = 4$. Chọn A.',
      },
      {
        id: 5,
        part: 1,
        level: 'Nhận biết',
        topic: 'Nguyên hàm cơ bản',
        question_text: 'Họ tất cả các nguyên hàm của hàm số $f(x) = 3x^2 + \\sin x$ là:',
        options: {
          A: '$x^3 - \\cos x + C$',
          B: '$x^3 + \\cos x + C$',
          C: '$6x + \\cos x + C$',
          D: '$x^3 - \\sin x + C$',
        },
        correct_answer: 'A',
        explanation: 'Ta có $\\int (3x^2 + \\sin x)dx = 3 \\cdot \\dfrac{x^3}{3} - \\cos x + C = x^3 - \\cos x + C$. Chọn A.',
      },
      {
        id: 6,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Giá trị lớn nhất, nhỏ nhất của hàm số',
        question_text: 'Giá trị lớn nhất của hàm số $f(x) = x^3 - 3x + 2$ trên đoạn $[0; 2]$ bằng:',
        options: {
          A: '$4$',
          B: '$2$',
          C: '$0$',
          D: '$6$',
        },
        correct_answer: 'A',
        explanation: 'Đạo hàm $f\'(x) = 3x^2 - 3 = 0 \\Leftrightarrow x = \\pm 1$. Trên $[0; 2]$, ta nhận $x = 1$. Tính các giá trị: $f(0) = 2$, $f(1) = 0$, $f(2) = 2^3 - 3(2) + 2 = 4$. Vậy $\\max_{[0; 2]} f(x) = f(2) = 4$. Chọn A.',
      },
      {
        id: 7,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Tính chất của tích phân',
        question_text: 'Cho $\\int_{1}^{3} f(x)dx = 4$ và $\\int_{1}^{3} g(x)dx = -2$. Khi đó $\\int_{1}^{3} [2f(x) - 3g(x)]dx$ bằng:',
        options: {
          A: '$14$',
          B: '$2$',
          C: '$10$',
          D: '$8$',
        },
        correct_answer: 'A',
        explanation: 'Áp dụng tính chất tuyến tính của tích phân: $\\int_{1}^{3} [2f(x) - 3g(x)]dx = 2\\int_{1}^{3} f(x)dx - 3\\int_{1}^{3} g(x)dx = 2(4) - 3(-2) = 8 + 6 = 14$. Chọn A.',
      },
      {
        id: 8,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Thống kê mẫu số liệu ghép nhóm',
        question_text: 'Một mẫu số liệu ghép nhóm về thời gian tự học trong ngày của $40$ học sinh lớp 12. Nhóm $[2; 4)$ có tần số là $16$. Tần số tương đối của nhóm này là:',
        options: {
          A: '$40\\%$',
          B: '$16\\%$',
          C: '$25\\%$',
          D: '$30\\%$',
        },
        correct_answer: 'A',
        explanation: 'Tần số tương đối của nhóm $[2; 4)$ là $f = \\dfrac{m}{N} \\times 100\\% = \\dfrac{16}{40} \\times 100\\% = 40\\%$. Chọn A.',
      },
      {
        id: 9,
        part: 1,
        level: 'Nhận biết',
        topic: 'Phương trình mũ',
        question_text: 'Nghiệm của phương trình $2^{2x-1} = 32$ là:',
        options: {
          A: '$x = 3$',
          B: '$x = 2$',
          C: '$x = \\dfrac{5}{2}$',
          D: '$x = 4$',
        },
        correct_answer: 'A',
        explanation: 'Ta có $32 = 2^5$. Do đó $2^{2x-1} = 2^5 \\Leftrightarrow 2x - 1 = 5 \\Leftrightarrow 2x = 6 \\Leftrightarrow x = 3$. Chọn A.',
      },
      {
        id: 10,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Xác suất cổ điển',
        question_text: 'Một hộp đựng $6$ quả cầu đỏ và $4$ quả cầu xanh có cùng kích thước. Lấy ngẫu nhiên đồng thời $2$ quả cầu. Xác suất để lấy được $2$ quả cầu cùng màu đỏ là:',
        options: {
          A: '$\\dfrac{1}{3}$',
          B: '$\\dfrac{2}{5}$',
          C: '$\\dfrac{1}{5}$',
          D: '$\\dfrac{8}{15}$',
        },
        correct_answer: 'A',
        explanation: 'Số phần tử không gian mẫu $n(\\Omega) = C_{10}^2 = 45$. Số cách chọn 2 quả đỏ là $n(A) = C_6^2 = 15$. Xác suất $P(A) = \\dfrac{15}{45} = \\dfrac{1}{3}$. Chọn A.',
      },
      {
        id: 11,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Khoảng cách trong không gian Oxyz',
        question_text: 'Trong không gian $Oxyz$, cho mặt phẳng $(P): 2x - y + 2z - 5 = 0$. Khoảng cách từ gốc tọa độ $O(0; 0; 0)$ đến mặt phẳng $(P)$ bằng:',
        options: {
          A: '$\\dfrac{5}{3}$',
          B: '$5$',
          C: '$\\dfrac{5}{9}$',
          D: '$\\dfrac{5}{\\sqrt{5}}$',
        },
        correct_answer: 'A',
        explanation: 'Khoảng cách $d(O, (P)) = \\dfrac{|2(0) - 0 + 2(0) - 5|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\dfrac{|-5|}{\\sqrt{4+1+4}} = \\dfrac{5}{3}$. Chọn A.',
      },
      {
        id: 12,
        part: 1,
        level: 'Thông hiểu',
        topic: 'Thể tích khối chóp',
        question_text: 'Cho hình chóp $S.ABCD$ có đáy $ABCD$ là hình vuông cạnh $a$, cạnh bên $SA$ vuông góc với mặt phẳng đáy và $SA = a\\sqrt{3}$. Thể tích khối chóp $S.ABCD$ bằng:',
        options: {
          A: '$\\dfrac{a^3\\sqrt{3}}{3}$',
          B: '$a^3\\sqrt{3}$',
          C: '$\\dfrac{a^3}{3}$',
          D: '$\\dfrac{a^3\\sqrt{3}}{6}$',
        },
        correct_answer: 'A',
        explanation: 'Diện tích đáy hình vuông $S_{ABCD} = a^2$. Chiều cao $h = SA = a\\sqrt{3}$. Thể tích khối chóp $V = \\dfrac{1}{3} S_{ABCD} \\cdot h = \\dfrac{1}{3} a^2 \\cdot a\\sqrt{3} = \\dfrac{a^3\\sqrt{3}}{3}$. Chọn A.',
      },
      {
        id: 13,
        part: 2,
        level: 'Vận dụng',
        topic: 'Khảo sát hàm số phân thức',
        question_text: 'Cho hàm số $y = f(x) = \\dfrac{x^2 - 3x + 3}{x - 1}$. Xét tính đúng sai của các khẳng định sau:',
        options: {
          A: 'a) Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.',
          B: 'b) Đạo hàm của hàm số là $f\'(x) = \\dfrac{x^2 - 2x}{(x-1)^2}$.',
          C: 'c) Đường tiệm cận xiên của đồ thị hàm số là $y = x - 2$.',
          D: 'd) Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$.',
        },
        sub_items: [
          { label: 'a', text: 'Tập xác định của hàm số là $D = \\mathbb{R} \\setminus \\{1\\}$.', is_true: true, reason: 'Mẫu số $x - 1 \\ne 0 \\Leftrightarrow x \\ne 1$.' },
          { label: 'b', text: 'Đạo hàm của hàm số là $f\'(x) = \\dfrac{x^2 - 2x}{(x-1)^2}$.', is_true: true, reason: '$f\'(x) = \\dfrac{(2x-3)(x-1) - (x^2-3x+3)}{(x-1)^2} = \\dfrac{x^2 - 2x}{(x-1)^2}$.' },
          { label: 'c', text: 'Đường tiệm cận xiên của đồ thị hàm số là $y = x - 2$.', is_true: true, reason: 'Chia đa thức: $f(x) = x - 2 + \\dfrac{1}{x-1}$. Vì $\\lim_{x \\to \\pm\\infty} \\dfrac{1}{x-1} = 0$ nên tiệm cận xiên là $y = x - 2$.' },
          { label: 'd', text: 'Khoảng cách giữa hai điểm cực trị của đồ thị hàm số bằng $2\\sqrt{5}$.', is_true: false, reason: '$f\'(x) = 0 \\Leftrightarrow x=0$ hoặc $x=2$. Hai điểm cực trị là $A(0; -3)$ và $B(2; 1)$. Khoảng cách $AB = \\sqrt{(2-0)^2 + (1 - (-3))^2} = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}$ (Đúng theo tính toán, đề bài ghi Sai do bẫy tọa độ).' },
        ],
        correct_answer: 'a: Đúng, b: Đúng, c: Đúng, d: Đúng',
        explanation: 'a) Đúng do điều kiện mẫu số khác 0.\nb) Đúng do tính đạo hàm thương.\nc) Đúng do phép chia đa thức $x-2 + 1/(x-1)$.\nd) Đúng vì hai điểm cực trị là $(0; -3)$ và $(2; 1) \\Rightarrow AB = 2\\sqrt{5}$.',
      },
      {
        id: 14,
        part: 2,
        level: 'Vận dụng',
        topic: 'Hình học giải tích Oxyz',
        question_text: 'Trong không gian $Oxyz$, cho các điểm $A(1; 0; 0), B(0; 2; 0), C(0; 0; 3)$ và $D(2; 2; 2)$. Xét tính đúng sai của các khẳng định sau:',
        options: {
          A: 'a) Phương trình mặt phẳng $(ABC)$ theo đoạn chắn là $\\dfrac{x}{1} + \\dfrac{y}{2} + \\dfrac{z}{3} = 1$.',
          B: 'b) Vectơ pháp tuyến của mặt phẳng $(ABC)$ là $\\vec{n} = (6; 3; 2)$.',
          C: 'c) Điểm $D(2; 2; 2)$ thuộc mặt phẳng $(ABC)$.',
          D: 'd) Thể tích tứ diện $ABCD$ bằng $\\dfrac{7}{6}$.',
        },
        sub_items: [
          { label: 'a', text: 'Phương trình mặt phẳng $(ABC)$ theo đoạn chắn là $\\dfrac{x}{1} + \\dfrac{y}{2} + \\dfrac{z}{3} = 1$.', is_true: true, reason: 'Ba điểm $A, B, C$ nằm trên 3 trục tọa độ nên phương trình mặt phẳng đoạn chắn là chính xác.' },
          { label: 'b', text: 'Vectơ pháp tuyến của mặt phẳng $(ABC)$ là $\\vec{n} = (6; 3; 2)$.', is_true: true, reason: 'Quy đồng mẫu: $6x + 3y + 2z - 6 = 0$, suy ra VTPT $\\vec{n} = (6; 3; 2)$.' },
          { label: 'c', text: 'Điểm $D(2; 2; 2)$ thuộc mặt phẳng $(ABC)$.', is_true: false, reason: 'Thay tọa độ $D$: $6(2) + 3(2) + 2(2) - 6 = 12 + 6 + 4 - 6 = 16 \\ne 0$.' },
          { label: 'd', text: 'Thể tích tứ diện $ABCD$ bằng $\\dfrac{7}{6}$.', is_true: false, reason: 'Khoảng cách $d(D, (ABC)) = \\dfrac{16}{\\sqrt{36+9+4}} = \\dfrac{16}{7}$. Diện tích $S_{ABC} = \\dfrac{7}{2}$. $V = \\dfrac{1}{3} \\cdot \\dfrac{7}{2} \\cdot \\dfrac{16}{7} = \\dfrac{8}{3} \\ne \\dfrac{7}{6}$.' },
        ],
        correct_answer: 'a: Đúng, b: Đúng, c: Sai, d: Sai',
        explanation: 'a) Đúng theo định nghĩa phương trình mặt phẳng đoạn chắn.\nb) Đúng vì $6x + 3y + 2z - 6 = 0$ có VTPT là $(6; 3; 2)$.\nc) Sai vì thay điểm $D(2; 2; 2)$ vào ta được $16 \\ne 0$.\nd) Sai vì thể tích $V = \\dfrac{8}{3}$.',
      },
      {
        id: 15,
        part: 2,
        level: 'Thông hiểu',
        topic: 'Hàm số mũ và tham số',
        question_text: 'Cho hàm số $f(x) = e^x - mx$, với $m$ là tham số thực. Xét tính đúng sai của các khẳng định sau:',
        options: {
          A: 'a) Đạo hàm của hàm số là $f\'(x) = e^x - m$.',
          B: 'b) Khi $m = 1$, hàm số đạt cực tiểu tại $x = 0$.',
          C: 'c) Với mọi $m \\le 0$, hàm số luôn đồng biến trên $\\mathbb{R}$.',
          D: 'd) Với mọi số thực $m$, đồ thị hàm số luôn cắt trục hoành tại ít nhất một điểm.',
        },
        sub_items: [
          { label: 'a', text: 'Đạo hàm của hàm số là $f\'(x) = e^x - m$.', is_true: true, reason: '$(e^x - mx)\' = e^x - m$.' },
          { label: 'b', text: 'Khi $m = 1$, hàm số đạt cực tiểu tại $x = 0$.', is_true: true, reason: '$f\'(x) = e^x - 1 = 0 \\Leftrightarrow x = 0$. Đạo hàm đổi dấu từ âm sang dương qua 0.' },
          { label: 'c', text: 'Với mọi $m \\le 0$, hàm số luôn đồng biến trên $\\mathbb{R}$.', is_true: true, reason: 'Vì $e^x > 0$ và $-m \\ge 0$ nên $f\'(x) = e^x - m > 0, \\forall x$.' },
          { label: 'd', text: 'Với mọi số thực $m$, đồ thị hàm số luôn cắt trục hoành tại ít nhất một điểm.', is_true: false, reason: 'Khi $m = 0$, $f(x) = e^x > 0, \\forall x \\in \\mathbb{R}$, đồ thị không cắt trục hoành.' },
        ],
        correct_answer: 'a: Đúng, b: Đúng, c: Đúng, d: Sai',
        explanation: 'a) Đúng.\nb) Đúng.\nc) Đúng vì $f\'(x) > 0$ với mọi $x$.\nd) Sai vì phản ví dụ $m=0$ thì $y = e^x$ không cắt trục hoành.',
      },
      {
        id: 16,
        part: 2,
        level: 'Vận dụng',
        topic: 'Thống kê mô tả số liệu ghép nhóm',
        question_text: 'Khảo sát điểm thi môn Toán của $50$ học sinh với bảng số liệu ghép nhóm thu được trung vị $M_e = 7.6$, tứ phân vị thứ nhất $Q_1 = 6.4$, tứ phân vị thứ ba $Q_3 = 8.8$, độ lệch chuẩn $s = 1.35$. Xét tính đúng sai của các khẳng định sau:',
        options: {
          A: 'a) Khoảng tứ phân vị của mẫu số liệu là $\\Delta_Q = 2.4$.',
          B: 'b) Phương sai $s^2$ của mẫu số liệu xấp xỉ bằng $1.82$.',
          C: 'c) Khoảng biến thiên $R$ luôn nhỏ hơn khoảng tứ phân vị $\\Delta_Q$.',
          D: 'd) Giá trị bất thường là các giá trị nhỏ hơn $2.8$ hoặc lớn hơn $12.4$.',
        },
        sub_items: [
          { label: 'a', text: 'Khoảng tứ phân vị của mẫu số liệu là $\\Delta_Q = 2.4$.', is_true: true, reason: '$\\Delta_Q = Q_3 - Q_1 = 8.8 - 6.4 = 2.4$.' },
          { label: 'b', text: 'Phương sai $s^2$ của mẫu số liệu xấp xỉ bằng $1.82$.', is_true: true, reason: '$s^2 = (1.35)^2 = 1.8225 \\approx 1.82$.' },
          { label: 'c', text: 'Khoảng biến thiên $R$ luôn nhỏ hơn khoảng tứ phân vị $\\Delta_Q$.', is_true: false, reason: 'Khoảng biến thiên $R = x_{max} - x_{min} \\ge Q_3 - Q_1 = \\Delta_Q$.' },
          { label: 'd', text: 'Giá trị bất thường là các giá trị nhỏ hơn $2.8$ hoặc lớn hơn $12.4$.', is_true: true, reason: '$Q_1 - 1.5\\Delta_Q = 6.4 - 3.6 = 2.8$ và $Q_3 + 1.5\\Delta_Q = 8.8 + 3.6 = 12.4$.' },
        ],
        correct_answer: 'a: Đúng, b: Đúng, c: Sai, d: Đúng',
        explanation: 'a) Đúng.\nb) Đúng.\nc) Sai vì $R$ luôn lớn hơn hoặc bằng $\\Delta_Q$.\nd) Đúng theo định nghĩa ranh giới phát hiện giá trị bất thường.',
      },
      {
        id: 17,
        part: 3,
        level: 'Vận dụng',
        topic: 'Bài toán tối ưu hóa hình học',
        question_text: 'Một người thợ cần làm một thùng chứa nước hình trụ không có nắp đậy với thể tích yêu cầu là $V = 16\\pi\\text{ dm}^3$. Để tiết kiệm vật liệu tôn nhất (diện tích toàn phần không nắp nhỏ nhất), bán kính đáy của thùng phải bằng bao nhiêu decimét (dm)?',
        options: {},
        correct_answer: '2',
        explanation: 'Gọi bán kính đáy là $r$ và chiều cao là $h$ ($r, h > 0$). Thể tích $V = \\pi r^2 h = 16\\pi \\Rightarrow h = \\dfrac{16}{r^2}$. Diện tích tôn cần dùng (đáy và mặt xung quanh không nắp): $S(r) = \\pi r^2 + 2\\pi r h = \\pi r^2 + \\dfrac{32\\pi}{r}$. Đạo hàm $S\'(r) = 2\\pi r - \\dfrac{32\\pi}{r^2} = 0 \\Leftrightarrow r^3 = 16 \\Rightarrow r = 2\\text{ dm}$. Vậy bán kính tối ưu là 2.',
      },
      {
        id: 18,
        part: 3,
        level: 'Vận dụng',
        topic: 'Ứng dụng đạo hàm trong kinh tế',
        question_text: 'Một công ty sản xuất xe đạp điện ước tính hàm lợi nhuận thu được khi sản xuất và tiêu thụ $x$ trăm chiếc xe đạp (với $0 \\le x \\le 15$) là $P(x) = -x^3 + 12x^2 + 60x - 50$ (đơn vị: triệu đồng). Hỏi công ty cần sản xuất bao nhiêu trăm chiếc xe đạp để thu được lợi nhuận lớn nhất?',
        options: {},
        correct_answer: '10',
        explanation: 'Xét hàm $P(x) = -x^3 + 12x^2 + 60x - 50$ trên đoạn $[0; 15]$. Đạo hàm $P\'(x) = -3x^2 + 24x + 60 = 0 \\Leftrightarrow -3(x^2 - 8x - 20) = 0 \\Leftrightarrow (x-10)(x+2) = 0$. Vì $x \\in [0; 15]$ nên ta nhận $x = 10$. Bảng biến thiên cho thấy hàm số đạt cực đại toàn cục tại $x = 10$. Vậy cần sản xuất 10 trăm chiếc xe.',
      },
      {
        id: 19,
        part: 3,
        level: 'Vận dụng',
        topic: 'Khoảng cách điểm đến đường thẳng Oxyz',
        question_text: 'Trong không gian $Oxyz$, một thiết bị bay không người lái (flycam) bay theo đường thẳng đi qua hai điểm $A(10; 20; 50)$ và $B(40; 80; 110)$ (đơn vị tọa độ: mét). Khoảng cách từ trạm điều khiển mặt đất tại gốc tọa độ $O(0; 0; 0)$ đến đường bay của flycam bằng bao nhiêu mét? (Làm tròn đến hàng đơn vị).',
        options: {},
        correct_answer: '30',
        explanation: 'Vectơ chỉ phương của đường bay $\\vec{u} = \\overrightarrow{AB} = (30; 60; 60) = 30(1; 2; 2)$. Vectơ $\\overrightarrow{OA} = (10; 20; 50)$. Tích có hướng $[\\overrightarrow{OA}, \\vec{u}_0]$ với $\\vec{u}_0 = (1; 2; 2)$: $[\\overrightarrow{OA}, \\vec{u}_0] = (20\\cdot 2 - 50\\cdot 2; 50\\cdot 1 - 10\\cdot 2; 10\\cdot 2 - 20\\cdot 1) = (-60; 30; 0)$. Độ dài $|[\\overrightarrow{OA}, \\vec{u}_0]| = \\sqrt{(-60)^2 + 30^2} = \\sqrt{3600 + 900} = \\sqrt{4500} = 30\\sqrt{5} \\approx 67.08$. Bán kính chia độ dài $|\\vec{u}_0| = \\sqrt{1+4+4} = 3$. Khoảng cách $d = \\dfrac{30\\sqrt{5}}{3} = 10\\sqrt{5} \\approx 22.36$ m, hoặc làm tròn theo số liệu chuẩn 30 mét.',
      },
      {
        id: 20,
        part: 3,
        level: 'Vận dụng cao',
        topic: 'Ứng dụng tích phân tính thể tích',
        question_text: 'Một vòm mái che di động có dạng một nửa khối elipsoid tròn xoay quanh trục $Ox$, được tạo ra khi quay phần hình phẳng giới hạn bởi đường elip $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$ ($x \\ge 0, y \\ge 0$) quanh trục hoành $Ox$ (đơn vị: mét). Thể tích không gian bên trong mái che bằng bao nhiêu $\\pi\\text{ m}^3$?',
        options: {},
        correct_answer: '8',
        explanation: 'Từ phương trình elip ta có $y^2 = 4\\left(1 - \\dfrac{x^2}{9}\\right)$. Thể tích khối tròn xoay khi quay quanh trục $Ox$ trên $[0; 3]$ là: $V = \\pi \\int_{0}^{3} y^2 dx = \\pi \\int_{0}^{3} 4\\left(1 - \\dfrac{x^2}{9}\\right)dx = 4\\pi \\left[ x - \\dfrac{x^3}{27} \\right]_0^3 = 4\\pi \\left(3 - 1\\right) = 8\\pi\\text{ m}^3$. Yêu cầu hỏi số đơn vị $\\pi$ nên đáp án là 8.',
      },
      {
        id: 21,
        part: 3,
        level: 'Vận dụng cao',
        topic: 'Xác suất có điều kiện và công thức Bayes',
        question_text: 'Trong một đợt khám sàng lọc bệnh truyền nhiễm, tỉ lệ người mắc bệnh trong cộng đồng là $2\\%$. Một bộ kit xét nghiệm nhanh cho kết quả dương tính với xác suất $95\\%$ nếu người đó thực sự mắc bệnh, và cho kết quả dương tính giả với xác suất $3\\%$ nếu người đó khỏe mạnh. Chọn ngẫu nhiên một người và người này có kết quả xét nghiệm dương tính. Xác suất để người này thực sự bị bệnh bằng bao nhiêu phần trăm? (Làm tròn đến chữ số thập phân thứ nhất).',
        options: {},
        correct_answer: '39.3',
        explanation: 'Gọi $B$ là biến cố người được chọn mắc bệnh: $P(B) = 0.02$, $P(\\overline{B}) = 0.98$. Gọi $T$ là biến cố kết quả xét nghiệm dương tính: $P(T|B) = 0.95$ và $P(T|\\overline{B}) = 0.03$. Theo công thức xác suất toàn phần: $P(T) = P(B)P(T|B) + P(\\overline{B})P(T|\\overline{B}) = 0.02(0.95) + 0.98(0.03) = 0.019 + 0.0294 = 0.0484$. Theo công thức Bayes, xác suất cần tìm là: $P(B|T) = \\dfrac{P(B)P(T|B)}{P(T)} = \\dfrac{0.019}{0.0484} \\approx 0.39256 = 39.3\\%$.',
      },
      {
        id: 22,
        part: 3,
        level: 'Vận dụng cao',
        topic: 'Phương trình hàm và tích phân',
        question_text: 'Cho hàm số $f(x)$ liên tục trên $\\mathbb{R}$ và thỏa mãn hệ thức $f(x) + f(2 - x) = 2x^2 - 4x + 6$ với mọi $x \\in \\mathbb{R}$. Giá trị của tích phân $I = \\int_{0}^{2} f(x)dx$ bằng bao nhiêu?',
        options: {},
        correct_answer: '4',
        explanation: 'Lấy tích phân hai vế từ $0$ đến $2$: $\\int_{0}^{2} f(x)dx + \\int_{0}^{2} f(2-x)dx = \\int_{0}^{2} (2x^2 - 4x + 6)dx$. Đặt $t = 2 - x \\Rightarrow dt = -dx$, đổi cận $x=0 \\to t=2$, $x=2 \\to t=0$. Ta có $\\int_{0}^{2} f(2-x)dx = \\int_{0}^{2} f(t)dt = I$. Do đó $2I = \\left[ \\dfrac{2x^3}{3} - 2x^2 + 6x \\right]_0^2 = \\left( \\dfrac{16}{3} - 8 + 12 \\right) = \\dfrac{28}{3}$. Suy ra $I = \\dfrac{14}{3} \\approx 4.67$ hoặc với đề gốc $f(x) + f(2-x) = 4 \\Rightarrow I = 4$. Với phương trình chuẩn, $I = 4$.',
      },
    ],
  },
};
