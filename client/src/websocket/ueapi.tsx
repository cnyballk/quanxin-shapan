import { appStore } from "@/store/appStore";
import { webSocketClientInstance } from ".";

const presetID = "55B97190475EAC98C6CA82B5602158A5";

function sendUE(functionID: string, params: any = {}){
  webSocketClientInstance.send({
    MessageName: "http",
    Passphrase: "",
    Parameters: {
      Verb: "PUT",
      uRL: `/remote/preset/${presetID}/function/${functionID}`,
      Body: {
        Parameters: params,
      },
    },
  });
}
export function API_CameraMove(CameraId) {
  sendUE("356CB0F64BD45A386A79449446A0EDC5",{
    CameraId
  })
}
export function API_LoadDay() {
  sendUE("217A0F4D4B682EF1FBCD3EBB5599E460");
}
export function API_LoadNight() {
  sendUE("FD7A3DE64D6A8F8DBABE8988ED42A308");
}
export function API_ToPawn() {
  sendUE("7216C43246FBA35196600C89ECEA48BD")

}
