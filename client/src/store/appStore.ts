import { SceneMode } from "@/components/SceneSwitch";
import { create } from "zustand";

interface AppStore {
  sceneMode: SceneMode;
  mode: string[];
  guideVisible: boolean;
}
export const initState: AppStore = {
  sceneMode: "day",
  mode: [],
  guideVisible: true,
};
export const appStore = create<AppStore>((set) => initState);

export function setStore(state, isWs = false) {
  appStore.setState(state);
}
