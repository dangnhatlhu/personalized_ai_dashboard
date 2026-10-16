# Việc hôm nay — ứng dụng danh sách công việc

Ứng dụng web nhỏ giúp Nhật ghi lại công việc trong ngày, chọn mức độ ưu tiên, đánh dấu việc đã hoàn thành, tìm kiếm công việc và giữ dữ liệu sau khi tải lại trang.

## Mục lục

- [Tính năng](#tính-năng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cách chạy](#cách-chạy)
- [Nhật ký prompt và các bước thực hiện](#nhật-ký-prompt-và-các-bước-thực-hiện)
- [Giải thích JavaScript theo từng dòng](#giải-thích-javascript-theo-từng-dòng)
- [HTML và CSS phối hợp như thế nào](#html-và-css-phối-hợp-như-thế-nào)
- [Dữ liệu LocalStorage](#dữ-liệu-localstorage)
- [Lưu ý](#lưu-ý)

## Tính năng

- Lời chào cá nhân hóa và đồng hồ hiển thị giờ, phút, giây; ngày được cập nhật tự động.
- Thêm công việc bằng nút **Thêm** hoặc phím Enter. Nếu nội dung trống, ứng dụng báo **“Vui lòng nhập nội dung!”**.
- Đánh dấu hoàn thành bằng cách bấm vào nội dung công việc hoặc checkbox; nội dung được gạch ngang.
- Xóa công việc với hiệu ứng mờ dần.
- Chọn ưu tiên **Quan trọng**, **Bình thường** hoặc **Thấp**. Mức Quan trọng có viền đỏ, mức Thấp có viền xanh lá.
- Chuyển giữa giao diện sáng và tối; lựa chọn giao diện được ghi nhớ.
- Tìm công việc theo nội dung ngay khi gõ.
- Tự động lưu công việc, trạng thái hoàn thành và mức ưu tiên trong LocalStorage.
- Hiển thị tổng số công việc, kể cả khi danh sách đang được lọc bằng tìm kiếm.

## Cấu trúc dự án

```text
personalized_ai_dashboard/
├── index.html   # Cấu trúc và nội dung trang
├── styles.css   # Bố cục, màu sắc, hiệu ứng và responsive
├── script.js    # Tương tác, công việc, tìm kiếm, đồng hồ và lưu trữ
└── README.md    # Hướng dẫn, nhật ký prompt và tài liệu giải thích
```

## Cách chạy

Không cần cài thư viện hay chạy máy chủ:

1. Mở thư mục dự án trong VS Code hoặc File Explorer.
2. Mở `index.html` bằng trình duyệt.
3. Thêm công việc bằng ô nhập, chọn mức ưu tiên nếu muốn, rồi nhấn **Thêm** hoặc Enter.

Ứng dụng dùng `localStorage`, vì vậy dữ liệu được lưu trong trình duyệt và trên cùng nguồn trang. Nếu trình duyệt hoặc chế độ riêng tư chặn lưu trữ, dữ liệu có thể không được giữ lại.

## Nhật ký prompt và các bước thực hiện

Dưới đây là các yêu cầu người dùng theo thứ tự phát triển. Nội dung được sắp xếp cho dễ đọc; đoạn nằm trong dấu ngoặc kép giữ nguyên ý và câu chữ của prompt.

### Bước 1 — Tạo giao diện To-do List

> Bạn là một lập trình viên thiết kế ui, hãy xây dựng chương trình do to list theo yêu cầu về layout như sau:  
> Header: Hiển thị lời chào cá nhân hóa (ví dụ: "Chào Nhật, hôm nay bạn thế nào?") và thời gian thực (Giờ/Phút/Giây) cập nhật liên tục.  
> Input Section: Một ô nhập công việc và nút "Thêm".  
> Task List: Danh sách các công việc đã thêm.  
> Footer: Hiển thị tổng số công việc đang có, Sử dụng HTML5 và CSS.

**Kết quả:** Tạo trang HTML tiếng Việt, bố cục có header, lời chào, đồng hồ, vùng nhập, danh sách, bộ đếm và footer. CSS tạo giao diện responsive.

### Bước 2 — Thêm và xóa công việc

> Bạn là lập trình viên thiết kế Web, Hãy thực hiện theo yêu cầu: Lấy dữ liệu từ ô nhập và hiển thị xuống danh sách.  
> Hãy Dựa trên HTML2 ở bước 1, hãy viết mã JavaScript để thực hiện:  
> Khi người dùng nhấn nút 'Thêm' hoặc phím Enter, nội dung trong ô Input sẽ được thêm vào danh sách `<ul>`.  
> Mỗi mục công việc (`<li>`) phải có một nút 'Xóa' bên cạnh.  
> Nếu ô Input trống, hãy hiển thị thông báo alert 'Vui lòng nhập nội dung!'.

**Kết quả:** Form xử lý sự kiện `submit`, tạo các mục công việc, từ chối nội dung trống bằng alert, và tạo nút xóa cho từng mục. Trong HTML, nút Thêm là `type="submit"` nên cả click lẫn Enter đều gửi form.

### Bước 3 — Hoàn thành, hiệu ứng xóa và đồng hồ

> Tiếp tục bổ sung JavaScript:  
> Khi click vào văn bản của một công việc, hãy thêm/xóa class 'completed' để gạch ngang chữ (line-through).  
> Khi click vào nút 'Xóa', phần tử công việc đó phải biến mất với hiệu ứng mờ dần (fade out).  
> Cập nhật đồng hồ ở Header hiển thị Giờ:Phút:Giây theo thời gian thực mỗi giây một lần.

**Kết quả:** Nội dung công việc bật/tắt class `completed`; xóa áp dụng class hiệu ứng trước khi bỏ phần tử khỏi DOM. Đồng hồ dùng `setInterval` với chu kỳ một giây.

### Bước 4 — Lưu dữ liệu

> Hãy nâng cấp mã JavaScript để sử dụng **LocalStorage**.  
> Yêu cầu:  
> 1. Mọi thay đổi trong danh sách (thêm, xóa, đánh dấu hoàn thành) phải được lưu lại dưới dạng mảng JSON.  
> 2. Khi người dùng tải lại trang (F5), ứng dụng phải tự động lấy dữ liệu từ LocalStorage và hiển thị lại trạng thái cũ.

**Kết quả:** Mảng công việc được chuyển thành JSON khi lưu. Khi khởi động, ứng dụng đọc JSON, dựng lại danh sách và khôi phục trạng thái hoàn thành. Mức ưu tiên được bổ sung ở bước sau.

### Bước 5 — Tính năng mở rộng

> **1. Phân loại mức độ ưu tiên (Priority Tag)**  
> Thêm một thẻ `<select>` bên cạnh ô Input để chọn mức độ: **Quan trọng / Bình thường / Thấp**.  
> Công việc "Quan trọng" sẽ có viền đỏ, "Thấp" có viền xanh lá.
>
> **2. Chế độ Tối (Dark Mode)**  
> Thêm một nút Switch ở Header để chuyển đổi toàn bộ giao diện giữa Light Mode và Dark Mode.  
> Trạng thái Dark Mode cũng phải được lưu vào LocalStorage (nếu đang ở Dark Mode, F5 xong vẫn phải là Dark Mode).
>
> **3. Tìm kiếm và Lọc (Search & Filter)**  
> Thêm một ô Input "Tìm kiếm bài viết" ở Sidebar. Khi gõ đến đâu, danh sách bài viết chỉ hiển thị các từ khóa tương ứng (Real-time Search).

**Kết quả:** Mỗi công việc lưu thêm `priority`; theme được lưu riêng trong LocalStorage; ô tìm kiếm lọc danh sách ngay theo chuỗi được nhập. Ô tìm kiếm được đặt trong sidebar bên cạnh khu vực danh sách trên màn hình rộng và xếp theo bố cục responsive trên màn hình nhỏ.

### Bước 6 — Giải thích mã nguồn

> Hãy giải thích toàn bộ dòng code PROMPT.md

Không có tệp `PROMPT.md` trong thư mục dự án. Vì vậy, phần giải thích được viết cho mã JavaScript hiện tại trong `script.js`, cùng phần tổng quan để hiểu cách HTML và CSS kết nối với JavaScript.

### Bước 7 — Viết tài liệu dự án

> hãy tạo file README.md và đưa toàn bộ nhật ký câu Prompt các bước và giải thích toàn bộ dòng code sao cho chi tiết và dễ hiểu giúp mình

**Kết quả:** Tệp README này tổng hợp nhật ký prompt theo các bước và giải thích JavaScript theo số dòng để người mới có thể lần theo mã nguồn.

## Giải thích JavaScript theo từng dòng

Phần dưới đây bám theo số dòng trong `script.js`. Dòng trống chỉ dùng để chia đoạn, không thực hiện lệnh. Nếu mã nguồn được sửa, số dòng có thể thay đổi; khi đó hãy đối chiếu với phiên bản mới nhất của `script.js`.

### Dòng 1–14 — Lấy phần tử HTML và cấu hình

- **Dòng 1:** Tìm phần tử có `id="clock"`; biến `clock` dùng để cập nhật giờ.
- **Dòng 2:** Tìm `#today-label`; biến `todayLabel` hiển thị ngày hiện tại.
- **Dòng 3:** Tìm form `#task-form` để lắng nghe thao tác gửi form.
- **Dòng 4:** Tìm ô nhập nội dung công việc.
- **Dòng 5:** Tìm hộp chọn mức ưu tiên.
- **Dòng 6:** Tìm danh sách `<ul>` sẽ chứa các mục công việc.
- **Dòng 7:** Tìm mục giao diện trạng thái danh sách rỗng để có thể thêm lại khi cần.
- **Dòng 8:** Tìm vùng hiển thị tổng số việc.
- **Dòng 9:** Tìm ô tìm kiếm công việc.
- **Dòng 10:** Tìm nút chuyển theme sáng/tối.
- **Dòng 12:** Đặt tên khóa LocalStorage chứa danh sách công việc. Dùng hằng số giúp không phải gõ lại chuỗi khóa ở nhiều nơi.
- **Dòng 13:** Đặt khóa LocalStorage riêng cho chế độ giao diện.
- **Dòng 14:** Tạo `Set` gồm ba giá trị ưu tiên hợp lệ. `Set.has(...)` dùng để xác nhận giá trị có nằm trong tập hợp hay không.

### Dòng 16–39 — Đọc danh sách công việc đã lưu

- **Dòng 16:** Khai báo hàm `loadTasks`, nhiệm vụ là lấy danh sách công việc từ LocalStorage.
- **Dòng 17:** Bắt đầu khối `try`; các thao tác lưu trữ hoặc phân tích JSON có thể phát sinh lỗi.
- **Dòng 18:** Đọc chuỗi đang lưu theo `storageKey`. LocalStorage chỉ lưu chuỗi, không lưu trực tiếp mảng JavaScript.
- **Dòng 19:** Nếu chưa có dữ liệu (giá trị `null`), trả về mảng rỗng.
- **Dòng 21:** Dùng `JSON.parse` đổi chuỗi JSON thành mảng/đối tượng JavaScript.
- **Dòng 22:** Kiểm tra dữ liệu có phải mảng hay không. `some(...)` kiểm tra từng công việc và trả về `true` nếu gặp phần tử không hợp lệ.
- **Dòng 23:** `task?.text` dùng optional chaining để không gây lỗi nếu phần tử bị `null`; nội dung `text` phải là chuỗi.
- **Dòng 24:** Trạng thái `completed` phải là boolean (`true` hoặc `false`).
- **Dòng 25:** Nếu có `priority`, giá trị đó phải thuộc `validPriorities`. Việc cho phép `undefined` giúp dữ liệu cũ không có mức ưu tiên vẫn đọc được.
- **Dòng 26:** Đóng điều kiện kiểm tra mảng và phần tử.
- **Dòng 27:** Nếu dữ liệu sai định dạng, ném lỗi có thông báo để được xử lý trong `catch`.
- **Dòng 29:** Nếu hợp lệ, tạo mảng mới từ dữ liệu đã lưu bằng `map`.
- **Dòng 30:** Toán tử spread `...task` sao chép các thuộc tính cũ của công việc.
- **Dòng 31:** Giữ mức ưu tiên hiện có; nếu thiếu hoặc là `null`, dùng `"normal"`. `??` chỉ dùng giá trị mặc định khi vế trái là `null`/`undefined`.
- **Dòng 32:** Kết thúc đối tượng mới và callback của `map`.
- **Dòng 33:** Bắt lỗi đọc, parse hoặc kiểm tra dữ liệu.
- **Dòng 34:** Ghi lỗi ra console để người phát triển có thể chẩn đoán.
- **Dòng 35:** Trả về danh sách rỗng nếu không đọc được dữ liệu. Đây là xử lý lỗi rõ ràng thay vì làm trang dừng khởi động.
- **Dòng 36–37:** Đóng khối `catch` và hàm `loadTasks`.
- **Dòng 39:** Gọi `loadTasks()` ngay khi script chạy và gán kết quả cho `tasks`, mảng dữ liệu chính của ứng dụng.

### Dòng 40–75 — Trạng thái tìm kiếm và lưu trữ

- **Dòng 40:** Khởi tạo từ khóa tìm kiếm là chuỗi rỗng, tức ban đầu không lọc công việc.
- **Dòng 42:** Khai báo hàm `saveTasks`, chịu trách nhiệm ghi danh sách công việc.
- **Dòng 43:** Bắt đầu khối `try` để bắt lỗi từ LocalStorage.
- **Dòng 44:** Chuyển `tasks` thành JSON bằng `JSON.stringify` rồi lưu vào LocalStorage.
- **Dòng 45:** Bắt lỗi nếu không thể lưu.
- **Dòng 46:** Ghi thông tin lỗi vào console.
- **Dòng 47–48:** Đóng `catch` và hàm lưu.
- **Dòng 50:** Khai báo hàm đọc theme đã lưu.
- **Dòng 51:** Bắt đầu khối xử lý lỗi.
- **Dòng 52:** Đọc theme; nếu đúng bằng `"dark"` trả về `"dark"`, nếu không thì chọn `"light"`. Toán tử `? :` là biểu thức điều kiện ba ngôi.
- **Dòng 53:** Bắt lỗi khi đọc LocalStorage.
- **Dòng 54:** Ghi lỗi đọc theme ra console.
- **Dòng 55:** Nếu đọc thất bại thì dùng giao diện sáng làm mặc định.
- **Dòng 56–57:** Đóng `catch` và `loadTheme`.
- **Dòng 59:** Khai báo hàm `applyTheme` để áp dụng theme lên giao diện và nút.
- **Dòng 60:** Chuyển `theme` thành biến boolean `isDark`.
- **Dòng 61:** Gán `data-theme="dark"` hoặc `data-theme="light"` cho thẻ `<html>`. CSS dựa vào thuộc tính này để đổi màu.
- **Dòng 62:** Thay nội dung `theme-color` để màu thanh trình duyệt khớp theme hiện tại.
- **Dòng 63:** Cập nhật thuộc tính truy cập `aria-pressed` trên nút, thông báo trạng thái bật/tắt cho công nghệ hỗ trợ.
- **Dòng 64:** Cập nhật nhãn truy cập để nói thao tác kế tiếp: bật sáng hoặc bật tối.
- **Dòng 65:** Đổi biểu tượng nút giữa mặt trời và mặt trăng.
- **Dòng 66:** Đổi chữ hiển thị trên nút theo theme hiện tại.
- **Dòng 67:** Kết thúc `applyTheme`.
- **Dòng 69:** Khai báo hàm lưu theme.
- **Dòng 70:** Bắt đầu khối `try`.
- **Dòng 71:** Lưu chuỗi `"dark"` hoặc `"light"` vào khóa theme trong LocalStorage.
- **Dòng 72–73:** Bắt lỗi và ghi lỗi ra console nếu không thể lưu.
- **Dòng 74–75:** Đóng `catch` và hàm.

### Dòng 77–99 — Đồng hồ, ngày và bộ đếm

- **Dòng 77:** Khai báo hàm cập nhật đồng hồ và ngày.
- **Dòng 78:** Lấy thời điểm hiện tại từ trình duyệt.
- **Dòng 79:** Tạo bộ định dạng ngày giờ tiếng Việt bằng `Intl.DateTimeFormat`.
- **Dòng 80:** Yêu cầu giờ luôn có hai chữ số.
- **Dòng 81:** Yêu cầu phút luôn có hai chữ số.
- **Dòng 82:** Yêu cầu giây luôn có hai chữ số.
- **Dòng 83:** Dùng đồng hồ 24 giờ.
- **Dòng 84:** Định dạng `now` và đặt chuỗi kết quả vào đồng hồ.
- **Dòng 85:** Tạo bộ định dạng ngày khác cho nhãn ngày.
- **Dòng 86:** Hiển thị ngày với hai chữ số.
- **Dòng 87:** Hiển thị tháng với hai chữ số.
- **Dòng 88:** Hiển thị năm dạng số đầy đủ.
- **Dòng 89:** Định dạng ngày hiện tại và đưa vào `todayLabel`.
- **Dòng 90:** Kết thúc hàm `updateClock`.
- **Dòng 92:** Khai báo hàm cập nhật số lượng công việc.
- **Dòng 93:** Lấy tổng số mục từ độ dài mảng `tasks`.
- **Dòng 94:** Xóa nội dung cũ của bộ đếm và thêm phần chữ mở đầu. `replaceChildren` tránh nối chồng nội dung qua mỗi lần render.
- **Dòng 96:** Tạo thẻ `<strong>` để làm nổi bật con số.
- **Dòng 97:** Gán số tổng vào `textContent`; chuyển `total` thành chuỗi vì nội dung DOM là văn bản.
- **Dòng 98:** Thêm thẻ số và phần chữ “công việc” vào vùng đếm.
- **Dòng 99:** Kết thúc hàm.

### Dòng 101–149 — Tạo một mục việc, hoàn thành và xóa

- **Dòng 101:** Khai báo hàm dựng giao diện cho một đối tượng `task`.
- **Dòng 102:** Tạo phần tử `<li>` mới.
- **Dòng 103:** Gán class cơ bản và class theo ưu tiên, chẳng hạn `task-item priority-high`. CSS dùng class này để vẽ viền.
- **Dòng 104:** Nếu công việc đã hoàn thành, thêm class trạng thái `is-complete`.
- **Dòng 106:** Tạo phần tử `<input>` sẽ làm checkbox.
- **Dòng 107:** Gán class để CSS định dạng checkbox.
- **Dòng 108:** Đặt loại input là checkbox.
- **Dòng 109:** Khôi phục dấu chọn từ `task.completed`.
- **Dòng 110:** Gán nhãn truy cập mô tả công việc mà checkbox đánh dấu.
- **Dòng 111:** Lắng nghe sự kiện `change` khi trạng thái checkbox đổi.
- **Dòng 112:** Gọi `setTaskCompleted` với trạng thái checkbox mới để cập nhật giao diện và lưu dữ liệu.
- **Dòng 113:** Đóng callback và bộ lắng nghe.
- **Dòng 115:** Tạo `<span>` chứa nội dung công việc.
- **Dòng 116:** Gán class định dạng cho phần văn bản.
- **Dòng 117:** Đưa nội dung công việc vào bằng `textContent`. Cách này hiển thị văn bản như văn bản, không diễn giải nó thành HTML.
- **Dòng 118:** Thêm hoặc gỡ class `completed` dựa theo trạng thái đã lưu.
- **Dòng 119:** Lắng nghe cú nhấp vào nội dung công việc.
- **Dòng 120:** Đảo trạng thái hiện tại bằng `!task.completed`, rồi cập nhật qua hàm dùng chung.
- **Dòng 121:** Đóng bộ lắng nghe click.
- **Dòng 123:** Tạo nút xóa.
- **Dòng 124:** Gán class CSS cho nút.
- **Dòng 125:** Đặt `type="button"` để nút không gửi form thêm việc.
- **Dòng 126:** Thêm nhãn truy cập có tên công việc cụ thể.
- **Dòng 127:** Đặt chữ hiển thị trên nút là “Xóa”.
- **Dòng 128:** Lắng nghe sự kiện bấm nút xóa.
- **Dòng 129:** Vô hiệu hóa nút sau lần bấm đầu để tránh xử lý xóa lặp.
- **Dòng 130:** Tìm vị trí đối tượng công việc trong mảng.
- **Dòng 131:** Nếu tìm thấy (`!== -1`), xóa một phần tử khỏi mảng bằng `splice`.
- **Dòng 132:** Lưu mảng đã cập nhật ngay để việc xóa được giữ lại kể cả khi tải lại trong lúc hiệu ứng chạy.
- **Dòng 133:** Cập nhật số lượng công việc ngay.
- **Dòng 134:** Thêm class `is-removing`, CSS sẽ làm mờ và dịch mục việc.
- **Dòng 136:** Khai báo hàm hoàn tất xóa phần tử khỏi trang.
- **Dòng 137:** Hủy bộ hẹn giờ dự phòng nếu hiệu ứng transition kết thúc trước.
- **Dòng 138:** Gỡ mục việc khỏi DOM.
- **Dòng 139:** Nếu không còn `.task-item` đang hiển thị, dựng lại danh sách để hiện trạng thái rỗng hoặc trạng thái không có kết quả tương ứng.
- **Dòng 140:** Kết thúc `finishRemoval`.
- **Dòng 141:** Lắng nghe sự kiện CSS `transitionend`, phát ra khi hiệu ứng chuyển tiếp kết thúc.
- **Dòng 142:** Chỉ gọi kết thúc nếu transition là opacity của chính mục việc này, không phải phần tử con hay thuộc tính khác.
- **Dòng 143:** `{ once: true }` yêu cầu tự gỡ listener sau sự kiện đầu tiên.
- **Dòng 144:** Đặt bộ hẹn giờ 250 ms làm phương án dự phòng nếu transition không phát sự kiện.
- **Dòng 145:** Đóng xử lý sự kiện click nút xóa.
- **Dòng 147:** Đưa checkbox, nội dung và nút xóa vào bên trong `<li>`.
- **Dòng 148:** Trả phần tử `<li>` vừa tạo về cho hàm gọi.
- **Dòng 149:** Kết thúc `createTaskElement`.

### Dòng 151–157 — Đồng bộ trạng thái hoàn thành

- **Dòng 151:** Khai báo hàm dùng chung để đặt trạng thái hoàn thành. Nó nhận đối tượng dữ liệu và các phần tử giao diện liên quan.
- **Dòng 152:** Ghi trạng thái mới vào đối tượng công việc.
- **Dòng 153:** Đồng bộ dấu chọn của checkbox.
- **Dòng 154:** Bật/tắt class `completed` của chữ; CSS class này tạo gạch ngang.
- **Dòng 155:** Bật/tắt class trạng thái trên `<li>`.
- **Dòng 156:** Lưu thay đổi vào LocalStorage.
- **Dòng 157:** Kết thúc hàm.

### Dòng 159–177 — Lọc và dựng lại danh sách

- **Dòng 159:** Khai báo hàm render danh sách theo trạng thái dữ liệu và tìm kiếm hiện tại.
- **Dòng 160:** Xóa các phần tử cũ trong `<ul>` để dựng lại từ trạng thái mới nhất.
- **Dòng 161:** Chuyển từ khóa sang chữ thường theo quy tắc tiếng Việt để tìm kiếm không phân biệt hoa/thường.
- **Dòng 162:** Bắt đầu tạo danh sách `visibleTasks` từ `tasks` bằng `filter`.
- **Dòng 163:** Chỉ giữ công việc có nội dung chứa chuỗi tìm kiếm đã chuẩn hóa.
- **Dòng 164:** Kết thúc callback `filter`.
- **Dòng 166:** Kiểm tra đồng thời không có kết quả hiển thị và không có công việc nào trong dữ liệu.
- **Dòng 167:** Thêm mẫu giao diện danh sách rỗng vào `<ul>`.
- **Dòng 168:** Nếu có dữ liệu nhưng không tìm thấy công việc khớp, chuyển sang nhánh kết quả rỗng do tìm kiếm.
- **Dòng 169:** Tạo mục danh sách thông báo không có kết quả.
- **Dòng 170:** Gán class để CSS căn chỉnh thông báo.
- **Dòng 171:** Đặt nội dung “Không tìm thấy công việc phù hợp.”
- **Dòng 172:** Thêm thông báo vào danh sách.
- **Dòng 173:** Nếu có kết quả, chuyển sang nhánh hiển thị công việc.
- **Dòng 174:** Duyệt từng kết quả, tạo `<li>` bằng `createTaskElement` và thêm vào `<ul>`.
- **Dòng 175:** Kết thúc nhánh điều kiện.
- **Dòng 176:** Cập nhật tổng số công việc.
- **Dòng 177:** Kết thúc hàm render.

### Dòng 179–205 — Gắn sự kiện tìm kiếm, theme và thêm việc

- **Dòng 179:** Lắng nghe sự kiện `input` của ô tìm kiếm; sự kiện này chạy mỗi khi giá trị thay đổi.
- **Dòng 180:** Lấy nội dung tìm kiếm và dùng `trim()` để bỏ khoảng trắng thừa ở hai đầu.
- **Dòng 181:** Dựng lại danh sách theo từ khóa mới.
- **Dòng 182:** Đóng listener tìm kiếm.
- **Dòng 184:** Lắng nghe click nút chuyển giao diện.
- **Dòng 185:** Đọc theme hiện tại rồi chọn theme ngược lại.
- **Dòng 186:** Áp dụng theme mới lên HTML, nút và màu thanh trình duyệt.
- **Dòng 187:** Lưu theme mới để khôi phục khi tải lại.
- **Dòng 188:** Đóng listener theme.
- **Dòng 190:** Lắng nghe sự kiện `submit` của form thêm việc. Nút submit và phím Enter đều tạo sự kiện này.
- **Dòng 191:** Ngăn hành vi mặc định của form vốn sẽ tải lại trang.
- **Dòng 192:** Đọc nội dung input và loại bỏ khoảng trắng ở đầu/cuối.
- **Dòng 193:** Kiểm tra nội dung sau khi bỏ khoảng trắng có rỗng hay không.
- **Dòng 194:** Nếu rỗng, hiển thị hộp thoại cảnh báo theo yêu cầu.
- **Dòng 195:** Đưa focus về ô nhập để người dùng nhập lại.
- **Dòng 196:** `return` kết thúc submit hiện tại, không tạo công việc rỗng.
- **Dòng 197:** Đóng khối kiểm tra.
- **Dòng 199:** Thêm đối tượng mới vào mảng; mặc định chưa hoàn thành, mức ưu tiên lấy từ select.
- **Dòng 200:** Lưu mảng mới vào LocalStorage.
- **Dòng 201:** Cập nhật danh sách và bộ đếm trên giao diện.
- **Dòng 202:** Xóa nội dung ô nhập sau khi thêm thành công.
- **Dòng 203:** Đặt select về mức ưu tiên mặc định Bình thường cho công việc tiếp theo.
- **Dòng 204:** Đưa con trỏ về ô nhập để tiện nhập việc khác.
- **Dòng 205:** Đóng listener form.

### Dòng 207–210 — Khởi động ứng dụng

- **Dòng 207:** Đọc theme từ LocalStorage và áp dụng ngay.
- **Dòng 208:** Hiển thị đồng hồ/ngày ngay khi mở trang, không cần chờ đến tick đầu tiên.
- **Dòng 209:** Gọi `updateClock` lặp lại mỗi 1.000 ms (một giây).
- **Dòng 210:** Vẽ các công việc đã đọc từ LocalStorage lên giao diện.

## HTML và CSS phối hợp như thế nào

### HTML

`index.html` cung cấp cấu trúc mà JavaScript thao tác:

- `#clock`, `#today-label`: vùng đồng hồ và ngày.
- `#theme-toggle`: nút đổi giao diện.
- `#task-form`, `#task-input`, `#task-priority`: form thêm công việc.
- `#task-list`: danh sách các mục `<li>`.
- `#empty-state`: mẫu hiển thị khi danh sách rỗng.
- `#task-count`: bộ đếm công việc.
- `#task-search`: ô tìm kiếm trong sidebar.

Các nhãn `.visually-hidden` vẫn đọc được bằng công nghệ hỗ trợ nhưng được ẩn trực quan. Các thuộc tính `aria-label`, `aria-live` giúp nút và cập nhật danh sách dễ tiếp cận hơn.

### CSS

`styles.css` chịu trách nhiệm trình bày và không lưu dữ liệu:

- Các biến màu trong `:root` tạo bảng màu Light Mode.
- `:root[data-theme="dark"]` ghi đè biến màu cho Dark Mode. JavaScript chỉ cần đổi `data-theme`.
- `.dashboard`, `.tasks-card`, `.topbar` tạo bố cục chính; các media query ở cuối file thay đổi bố cục cho màn hình hẹp.
- `.task-item.priority-high` và `.task-item.priority-low` tạo viền màu theo mức ưu tiên.
- `.task-text.completed` gạch ngang văn bản đã hoàn thành.
- `.task-item.is-removing` tạo hiệu ứng mờ/dịch chuyển lúc xóa.
- `.search-empty` và `.empty-state` trình bày trạng thái danh sách không có mục hiển thị.
- `:focus-visible` tạo viền focus để người dùng bàn phím dễ nhận biết vị trí hiện tại.
- `prefers-reduced-motion` giảm thời lượng chuyển động cho người dùng chọn giảm hiệu ứng.

## Dữ liệu LocalStorage

Một mục công việc có dạng:

```json
{
  "text": "Hoàn thành báo cáo",
  "completed": false,
  "priority": "high"
}
```

Danh sách được lưu thành mảng JSON dưới khóa `personalized-ai-dashboard-tasks`. Theme lưu riêng dưới khóa `personalized-ai-dashboard-theme` với giá trị `"light"` hoặc `"dark"`.

Các thao tác thêm, xóa và hoàn thành đều gọi `saveTasks()`. Tìm kiếm chỉ thay đổi những mục đang được hiển thị, không sửa/xóa dữ liệu gốc. Vì vậy xóa từ khóa tìm kiếm sẽ hiện lại các công việc vốn bị lọc.

## Lưu ý

- Dữ liệu LocalStorage nằm trên trình duyệt và nguồn trang hiện tại; nó không tự đồng bộ giữa thiết bị hoặc trình duyệt khác.
- Xóa dữ liệu trang web trong cài đặt trình duyệt sẽ xóa công việc và theme đã lưu.
- Google Fonts được tải từ Google Fonts khi có kết nối mạng; nếu không có mạng, trình duyệt sẽ dùng font dự phòng sans-serif.
- Nếu trình duyệt chặn LocalStorage hoặc dữ liệu lưu bị hỏng, lỗi được ghi trong Console của DevTools và ứng dụng khởi tạo danh sách rỗng để vẫn có thể sử dụng.
