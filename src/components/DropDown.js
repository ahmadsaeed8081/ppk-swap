import React, { useState } from "react";
import { DownArrowIcon, UpArrowIcon } from "../assets/Icons";

const DropDown = ({ selected, setSelected, filteredTokensList ,onSend_expected_reciving,onRecieve_expected_reciving,send_token_amount,recieve_token_amount}) => {
  const [hide, setHide] = useState(false);
  // const tokensList = [
  //   { title: "USDT", icon: "./images/USDT.png" },
  //   { title: "MATIC", icon: "./images/MATIC.png" },
  //   { title: "PPKT", icon: "./images/PPKT.png" },
  // ];
  return (
    <div className="dropDown flex aic flex-col rel ">
      <div className="category flex aic">
        <div
          className="cbox cleanbtn flex aic rel pointer"
          onClick={(e) => {
            e.stopPropagation();
            setHide(!hide);
          }}
        >
          <div className="slt flex items-center w-full">
            <div className="unit-name flex items-center w-full">
              <span
                className="unit-eng flex items-center w-full"
                placeholder="Select token"
              >
                {selected?.title ? selected?.title : "Select token"}
              </span>
            </div>
          </div>
          {selected?.icon ? (
            <div className="lbl-icon flex items-center justify-center h-9 w-9">
              <img src={selected?.icon} className="icon-img" />
            </div>
          ) : (
            <div className="icon-arrow flex items-center justify-center">
              {hide ? <UpArrowIcon /> : <DownArrowIcon />}
            </div>
          )}
        </div>
      </div>
      <div className={`block flex aic abs ${hide ? "show" : ""}`}>
        <div className="manue flex aic col anim">
          {filteredTokensList.map((item, index) => (
            <div
              key={index}
              className="slt flex items-center gap-2"
              onClick={(e) => {
                setHide(!hide);
                setSelected(item);
                onSend_expected_reciving(0);
                onRecieve_expected_reciving(0);

                // alert("lioj");


              }}
            >
              <div className="unit-name flex items-center w-full">
                <span className="unit-eng flex items-center">{item.title}</span>
              </div>
              <div className="lbl-icon flex items-center justify-center h-9 w-9">
                <img src={item?.icon} className="icon-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
