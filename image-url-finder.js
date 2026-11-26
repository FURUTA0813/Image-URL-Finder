(() => {
  document.addEventListener("click", (e) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY);

    for (const el of elements) {
      const urls = [];

      // img画像
      if (el instanceof HTMLImageElement) {
        urls.push(el.currentSrc || el.src);
      }

      // video動画・ポスター画像
      if (el instanceof HTMLVideoElement) {
        if (el.poster) urls.push(el.poster);
        if (el.currentSrc || el.src) {
          urls.push(el.currentSrc || el.src);
        }
      }

      // CSS背景画像
      const bg = getComputedStyle(el).backgroundImage;

      if (bg && bg !== "none") {
        for (const match of bg.matchAll(
          /url\((?:"([^"]*)"|'([^']*)'|([^)]*))\)/g
        )) {
          urls.push((match[1] || match[2] || match[3] || "").trim());
        }
      }

      // URLが見つかった場合
      const uniqueUrls = [...new Set(urls.filter(Boolean))];

      if (uniqueUrls.length) {
        // リンク先へのページ移動を防止
        e.preventDefault();

        console.log("画像・動画URL:", uniqueUrls);
        return;
      }
    }

    console.log("画像URLが見つかりません");
  }, true);

  console.log("準備完了：画像や動画をクリックしてください");
})();
