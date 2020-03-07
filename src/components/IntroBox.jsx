import React from "react";

const IntroBox = () => {
  return (
    <div className="intro row justify-content-center m-2">
      <div className="col-8 col-sm-6 m-2">
        <hr />
        <dl className="row">
          <dt>这是啥</dt>
          <dd className="col-sm-10">
            搜成语的丫，帮你出口成章，妙语连珠，能说会道，巧舌如簧
          </dd>
        </dl>
        <dl className="row">
          <dt>咋用啊</dt>
          <dd className="col-sm-10">输入“十分美丽”或者“丑陋无比”，按回车</dd>
        </dl>
      </div>
    </div>
  );
};

export default IntroBox;
