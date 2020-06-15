// library: https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu
import React from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";

// renders individual item
const MenuItem = ({ text, selected }) => {
  return (
    <div className={`menu-item ${selected ? "active" : ""}`}>
      {`${text} ml`}
    </div>
  );
};

// renders a list of items to select
const Menu = (list, selected) =>
  list.map((el) => {
    return <MenuItem text={el} key={el} selected={selected} />;
  });

export const Scroll = ({ list, selected, handleSelect }) => {
  return (
    <div>
      <ScrollMenu
        data={Menu(list, selected)}
        selected={selected}
        onSelect={handleSelect}
        scrollToSelected={true}
        inertiaScrolling={true}
      />
    </div>
  );
};
