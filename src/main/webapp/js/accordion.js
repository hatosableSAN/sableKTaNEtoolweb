// 2. details, summary を使った書き方
// ※アニメーションが必要なければ、JSは不要
document.querySelectorAll("details").forEach((details) => {
 const summary = details.querySelector("summary");
 const content = details.querySelector("summary + *");

 const onClick = (event) => {
   if (details.open) {
     // 閉じるアニメーションのみ preventDefault が必要
     event.preventDefault();
     details.setAttribute("data-accordion-before-close", "");
     gsap.to(content, {
       height: 0,
       onComplete: () => {
         details.open = false;
         details.removeAttribute("data-accordion-before-close");
       },
     });
   } else {
     gsap.fromTo(content, { height: 0 }, { height: "auto" });
   }
 };

 summary.addEventListener("click", onClick, { passive: false });
});