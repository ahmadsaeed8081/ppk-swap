import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {
  return (
    <div className={`dashboard-page flex flex-col`}>
      {/* <Sidebar /> */}
      <div className="pages-block flex flex-col relative h-full">
        <Header />
        <section>{children}</section>
        <Footer />
      </div>
    </div>
  );
};
export default Wrapper;
