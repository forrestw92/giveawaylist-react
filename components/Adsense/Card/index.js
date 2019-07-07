import React, { useEffect } from "react";

function AdCard() {
  useEffect(() => {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", maxHeight: "479px" }}
      data-ad-client="ca-pub-5069776204482930"
      data-ad-slot="2637887079"
      data-ad-format="fluid"
    />
  );
}
export default AdCard;
