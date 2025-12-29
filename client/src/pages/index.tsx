import "./index.less";

import { useEffect, useState } from "react";

import SceneSwitch from "@/components/SceneSwitch";
import { appStore, setStore } from "@/store/appStore";
import { useUpdateEffect } from "ahooks";
import classNames from "classnames";
import { API_LoadDay, API_LoadNight } from "@/websocket/ueapi";

//根据mode 递归找到对应的childrenOptions
function getSwitchChildrenOptions(
  mode: string[] = [],
  switchOptions: any[] = [],
  count: number = 1,
  index: number = 1
) {
  const str = mode[0];
  const item = switchOptions.find((item) => item.value === str);
  if (item) {
    if (index === count) {
      return item.childrenOptions;
    }
    return getSwitchChildrenOptions(mode.slice(1), item.childrenOptions, count, index + 1);
  } else {
    return switchOptions;
  }
}

function getRenderFn(mode: string[] = [], switchOptions: any[] = []) {
  const str = mode[0];
  const item = switchOptions.find((item) => item.value === str);
  if (item) {
    return [item.render?.(), ...getRenderFn(mode.slice(1), item.childrenOptions)];
  } else {
    return [];
  }
}

const switchOptions = [
  {
    label: "进店游览",
    value: "enter",
  },
  {
    label: "高空俯瞰",
    value: "overlook",
  },
];

const options = {
  "0": [
    {
      label: "进店游览",
      value: "enter",
    },
    {
      label: "高空俯瞰",
      value: "overlook",
    },
  ],
  enter: [
    {
      label: "楼层选择",
      value: "selectFloor",
    },
    {
      label: "观看设备",
      value: "lookDevice",
    },
    {
      label: "模式切换",
      value: "modeSwitch",
    },
  ],
  overlook: [
    {
      label: "前视图",
      value: "front",
    },
    {
      label: "后视图",
      value: "back",
    },
    {
      label: "左视图",
      value: "left",
    },
    {
      label: "右视图",
      value: "right",
    },
  ],
  selectFloor: [
    {
      label: "一层",
      value: "floor1",
    },
    {
      label: "二层",
      value: "floor2",
    },
    {
      label: "三层",
      value: "floor3",
    },
  ],
  lookDevice: [
    {
      label: "一号桌",
      value: "table1",
    },
    {
      label: "二号桌",
      value: "table2",
    },
    {
      label: "三号桌",
      value: "table3",
    },
    {
      label: "四号桌",
      value: "table4",
    },
    {
      label: "五号桌",
      value: "table5",
    },
    {
      label: "六号桌",
      value: "table6",
    },
    {
      label: "七号桌",
      value: "table7",
    },
    {
      label: "八号桌",
      value: "table8",
    },
  ],
  modeSwitch: [
    {
      label: "自由漫游",
      value: "freeRoam",
    },
    {
      label: "店内漫游",
      value: "storeRoam",
    },
  ],
};
export default function HomePage() {
  const state = appStore((state) => state);
  useEffect(() => {
    if (state.sceneMode === "day") {
      API_LoadDay();
    } else {
      API_LoadNight();
    }
  }, [state.sceneMode]);
  return (
    <div className="home-page">
      {!state.mode[0] && <div className="title">华为旗舰店（万象天地店）外景</div>}
      <div className="tools">
        <SceneSwitch
          value={state.sceneMode}
          onChange={(mode) => {
            setStore({ sceneMode: mode });
          }}
        />
        {state.mode[0] && (
          <>
            <div className="icon-wrapper">
              <img src="./img/icon-delete.png" />
            </div>
            <div className="icon-wrapper" onClick={() => setStore({ mode: state.mode.slice(0, -1) })}>
              <img src="./img/icon-goback.png" />
            </div>
          </>
        )}
      </div>
      {/* //指引说明 */}
      {!state.mode[0] && (
        <>
          <div
            className="guide"
            style={{ display: state.guideVisible ? "block" : "none" }}
            onClick={() => setStore({ guideVisible: false })}
          >
            <img src={"./img/guide.png"} alt="guide" className="guide-img" />
          </div>

          <Switch mode="0" options={options["0"]} unSelect onChange={(mode) => setStore({ mode: [mode] })}></Switch>
        </>
      )}
      {state.mode.length === 1 && state.mode[0] === "enter" && (
        <>
          <div className="title">华为旗舰店（万象天地店）一层</div>
          <Switch
            mode="enter"
            options={options[state.mode[0]]}
            onChange={(mode) => setStore({ mode: [...state.mode, mode] })}
          ></Switch>
        </>
      )}
      {state.mode.length === 2 && state.mode[1] === "selectFloor" && <SelectFloor />}
      {state.mode.length === 2 && state.mode[1] === "lookDevice" && <LookDevice />}
      {state.mode.length === 2 && state.mode[1] === "modeSwitch" && <ModeSwitch />}
      {state.mode.length === 1 && state.mode[0] === "overlook" && (
        <>
          <div className="title">华为旗舰店（万象天地店）一层</div>
          <Switch
            mode="overlook"
            options={options[state.mode[0]]}
            defaultValue={0}
            onChange={(mode) => setStore({ mode: [...state.mode, mode] })}
          ></Switch>
          <img src="./img/fangxiangpan.png" className="fangxiangpan1" />
          <img src="./img/fangxiangpan.png" className="fangxiangpan2" />
        </>
      )}
    </div>
  );
}

function SelectFloor() {
  const state = appStore((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const titleMap = {
    0: "华为旗舰店（万象天地店）一层",
    1: "华为旗舰店（万象天地店）二层",
    2: "华为旗舰店（万象天地店）三层",
  };
  return (
    <>
      <div className="title">{titleMap[activeIndex]}</div>
      <Switch
        title="楼层选择"
        arrowIcon
        mode="selectFloor"
        options={options[state.mode[1]]}
        defaultValue={0}
        onChange={(mode, modeIndex) => setActiveIndex(modeIndex)}
      ></Switch>
    </>
  );
}

function ModeSwitch() {
  const state = appStore((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="title">华为旗舰店（万象天地店）一层</div>
      <Switch
        title="模式切换"
        arrowIcon
        mode="modeSwitch"
        options={options[state.mode[1]]}
        defaultValue={0}
        onChange={(mode, modeIndex) => setActiveIndex(modeIndex)}
      ></Switch>
      {activeIndex === 1 && <img src="./img/luxian.png" alt="" className="center" />}
    </>
  );
}

function LookDevice() {
  const state = appStore((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="title">华为旗舰店（万象天地店）一层</div>
      <Switch
        title="观看设备"
        arrowIcon
        mode="lookDevice"
        options={options[state.mode[1]]}
        defaultValue={0}
        onChange={(mode, modeIndex) => setActiveIndex(modeIndex)}
      ></Switch>
      <div className="look-device-list-wrapper">
        <div className="look-device-list">
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
          <div className="look-device-item">
            <div>
              <img src="./img/device-0.png" alt="" />
              <div className="label">Mate X6</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function Switch(props: any) {
  const { options, onChange, title, mode, unSelect, defaultValue, arrowIcon } = props;
  const [activeIndex, setActiveIndex] = useState(unSelect ? null : defaultValue);

  useUpdateEffect(() => {
    onChange?.(options[activeIndex].value, activeIndex);
  }, [activeIndex]);

  return (
    <div
      className={classNames("switch-wrapper", `switch-wrapper-${mode}`, {
        "switch-wrapper-title": !!title,
        "switch-wrapper-arrowIcon": !!arrowIcon,
      })}
    >
      {title && <div className="switch-item title-active">{title}</div>}
      {arrowIcon && (
        <div className="icon-wrapper arrow-icon">
          <img src="./img/icon-right.png" />
        </div>
      )}
      {options.map((item: any, index: number) => (
        <div
          className={classNames("switch-item", {
            active: unSelect ? false : activeIndex === index,
          })}
          key={index}
          onClick={() => setActiveIndex(index)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
