import {Alert} from "react-native";
import * as ImagePicker from "react-native-image-picker";
export const UploadImageService=()=>{
   return new Promise(function (resolve, reject) {
            Alert.alert("Select Image", " ", [
                {
                    text: "Cancel",
                    onPress: () => reject("error"),
                    style: "cancel",
                },
                {
                    text: "Gallery",
                    onPress: () => {
                        ImagePicker.launchImageLibrary(
                            {
                                mediaType: "photo",
                                quality:1,
                                includeBase64: false,
                                maxHeight:700,
                                maxWidth:500,
                            },
                            (response) => {
                                if (response.didCancel) {
                                    alert("No Image Selected");
                                    // ToastAndroid.showWithGravity("No Image Selected", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                                    reject("error")
                                    return;
                                }
                                if (response.errorCode == "permission") {
                                    alert("Permission not satisfied!");
                                    // ToastAndroid.showWithGravity("Permission not satisfied!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                                    return;
                                }
                                if (response.errorCode == "others") {
                                    alert("Allowed Permissions and try again!");
                                    // ToastAndroid.showWithGravity("Allowed Permissions and try again!", ToastAndroid.SHORT, ToastAndroid.BOTTOM);        
                                    return;
                                }
                                else {
                                    if (response.assets !== undefined) {
                                        resolve(response.assets[0].uri)
                                    }
                                }
        
                            }
                        );
                    },
                },
                {
                    text: "open camera",
                    onPress: () => {
                        ImagePicker.launchCamera(
                            {
                                mediaType: "photo",
                                includeBase64: false,
                                quality:1,
                                maxHeight:700,
                                maxWidth:600,
                            },
                            (response) => {
                                if (response.didCancel) {
                                    alert("No Image Selected");
                                }
                                if (response.errorCode == "permission") {
                                    alert("Permission not satisfied!");
                                }
                                if (response.errorCode == "camera_unavailable") {
                                    Alert.alert("Permission not satisfied!");
                                    alert("Permission not satisfied!");
                                }
                                if (response.errorCode == "others") {
                                    alert("Allowed Permissions and try again!");
                                }
                                else {
                                    if (response.assets !== undefined) {
                                        resolve(response.assets[0].uri)
                                    }
                                }
                            }
                        );
                    },
                },
            ]);
        })
}