document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#business-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      if (data[key]) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });

    try {
      const res = await fetch("/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("저장 성공");
      window.location.href = "/business"; // 저장 후 목록으로 이동
    } catch (err) {
      console.error(err);
      alert("에러 발생: " + err.message);
    }
  });
});
