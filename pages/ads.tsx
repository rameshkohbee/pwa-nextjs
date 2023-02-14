import React from "react";
import { Adsense } from "@ctrl/react-adsense";
import { Text } from "@components/text";

const ads = () => {
  return (
    <div className="page-margin">
        <Text t="Ads page" style="header text-center"/>
      {/* // ads with no set-up */}
      <Adsense client="ca-pub-8906625360918210" slot="6086439738" />
      {/* // ads with custom format */}
      <Adsense
        client="ca-pub-8906625360918210"
        slot="6086439738"
        style={{ width: 500, height: 300 }}
        format=""
      />
      {/* // responsive and native ads */}
      <Adsense
        client="ca-pub-8906625360918210"
        slot="6086439738"
        style={{ display: "block" }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
};

export default ads;
