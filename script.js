const btn = document.querySelector(".container-btn");
const btnEl = btn.querySelector(".btn__modern-minimal");

const t1 = "Click Me";
const t2 = "Loading...";
const t3 = "Success! 😍";
const data = [];
const Sec = 2;
let rec;

btnEl.addEventListener("click", function () {
  const input = document.querySelector(".input");
  rec = +input?.value || 0;

  if (btnEl.innerHTML === t1 && rec !== 0) btnEl.textContent = t2;
  else if (rec === 0) btnEl.textContent = t1;
  else btnEl.textContent = t1;

  Calc(input);
});

const Calc = function (input) {
  if (rec !== 0)
    setTimeout(function () {
      for (let i = 2; i <= rec; i++) {
        let isPrime = true; // ตั้งค่าเริ่มต้นว่า i เป็นจำนวนเฉพาะ
        for (let j = 2; j <= Math.sqrt(i); j++) {
          // เช็คจาก 2 ถึง √i
          if (i % j === 0) {
            // ถ้า i หารด้วย j ลงตัว แสดงว่าไม่เป็นจำนวนเฉพาะ
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          data.push(i); // ถ้า i เป็นจำนวนเฉพาะ ให้เพิ่มลงใน data
        }
      }

      if (input) input.remove(); // <= ป้องกัน error ถ้า input เป็น null
      btnEl.textContent = t3;

      const ParaGp = `<ul class="List">
        ${data.map((item) => `<li class="List-item">${item}</li>`).join("")}
      </ul>
      `;

      const column = Math.min(
        Math.ceil(data.length / Math.floor(Math.sqrt(data.length))),
        20
      );

      document.documentElement.style.setProperty("--No-Of-Column", column);
      setTimeout(function () {
        input.remove();
        btnEl.remove();
        btn.insertAdjacentHTML("beforeend", ParaGp);
        Addreset();
      }, Sec * 1000);
    }, Sec * 500);
  else alert("Please Input Number");
};

const Addreset = function () {
  const back = '<button class="Back">Reset</button>';
  btn.insertAdjacentHTML("beforeend", back);

  const btnReset = document.querySelector(".Back");

  btnReset.addEventListener("click", () => {
    // ลบ ul
    const ui = document.querySelector(".List");
    if (ui) ui.remove();

    // ลบปุ่ม Reset
    btnReset.remove();

    // แสดงปุ่ม Click Me กลับมา
    btn.insertAdjacentElement("beforeend", btnEl);
    btnEl.textContent = t1;

    // เคลียร์ array
    data.length = 0;

    // เคลียร์ rec
    rec = null;

    // เรียก Input กลับ
    const addInput = '<input type="number" class="input no-spin" value="" />';
    btn.insertAdjacentHTML("afterbegin", addInput);
  });
};
