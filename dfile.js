import axios from "axios";
import store from "./store"

export default class Dfile {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    // sha256(data + token + time)
    // auth(permussions = {"folders" : [{path:"/root", "rules": "rw"}], "disksize":128, "appname", "appid")
    // save_token_in_local_storage()
    // load_token_from_local_storage()
    // setBaseUrl(){}
    infoDir(dirPath) {
        return axios({
            method: 'post',
            url: this.baseUrl + 'info/dir',
            data: {"path": dirPath},
            config: {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json'
                }
            }
        })
        .then(
            response => {
                return response.data
            }
        )
        .catch();
    }
    infoDownloading(downloading_id) {
        let fileData = {};
        fileData['downloading_id'] = downloading_id;
        return axios({
            method: 'post',
            url: this.baseUrl + 'info/downloading',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
            .then(function(response){
                let percent = Math.round(response.data.percent);
                store.dispatch("updateUpDownloadPercentageAction", percent);
                return percent;
            })
            .catch(function(){
                console.log('downloading info failure');
            });
    }
    infoUploading(uploading_id) {
        let fileData = {};
        fileData['uploading_id'] = uploading_id;
        return axios({
            method: 'post',
            url: this.baseUrl + 'info/downloading',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
        .then(function(response){
            return response.data;
        })
        .catch();
    }
    infoFile(filePath) {
        return axios({
            method: 'post',
            url: this.baseUrl + 'info/file',
            data: {"path": filePath},
            // config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(
                function(response){
                    return response;
                }
            )
            .catch(function(error){
                return error.response;
            });
    }
    fileUpload(uploadFiles, uploadDir ) {
        /* Before upload get directory files and search for same titled files
        * if exist rename by adding current date and time */
        this.infoDir(uploadDir).then(res=>{
            let dirFiles = res;
            let fileData = new FormData();
            let filePaths = {};
            for( let i = 0; i < uploadFiles.length; i++ ){
                let file = uploadFiles[i];
                let date = new Date().toISOString().replace( /[.:-]/g, "");
                let editFile = file.name.split('/').pop();
                let editFileArray = [editFile.substr(0,editFile.lastIndexOf('.')),editFile.substr(editFile.lastIndexOf('.')+1,editFile.length)]
                let editFileName = editFileArray[0];
                let editFileExt = editFileArray[1];
                let newFileName = editFileName+'_'+date+'.'+editFileExt;
                let hasSameFile = false;
                if(dirFiles != null){
                    for( let z = 0; z < dirFiles.length; z++) {
                        if(dirFiles[z].name == file.name) {
                            hasSameFile = true;
                        }
                    }
                }
                if (hasSameFile == true) {
                    fileData.append('files', file, uploadDir+newFileName);
                    filePaths[uploadDir+newFileName] = uploadDir+newFileName;
                } else {
                    fileData.append('files', file);
                    filePaths[file.name] = uploadDir+file.name;
                }
            }
            fileData.append('paths', JSON.stringify(filePaths) );
            let config = {
                headers: { 'Content-Type': 'multipart/form-data'},
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    store.dispatch("updateUpDownloadPercentageAction", percentCompleted);
                }
            }
            return axios.post(this.baseUrl + 'file/upload',fileData, config)
                .then(
                    function(){
                        setTimeout(
                            function (){
                                store.dispatch("getList");
                                store.commit("disableProgressBar");
                                store.commit("enableNotifications", uploadFiles.length+' file(s) uploaded');
                            },
                            2000
                        );
                    }
                )
                .catch(function(){
                    store.commit("disableProgressBar");
                    store.commit("enableNotifications", 'file upload failure');
                });
        });
    }
    fileInitDownload(itemPath) {
        let fileData = {};
        fileData['path'] = itemPath;
        return axios({
            method: 'post',
            url: this.baseUrl + 'file/init_download',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
        .then(function(response){
            return response;
        })
        .catch();
    }
    fileDownload(downloadingId, fileName) {
        return axios({
            method: 'GET',
            url: this.baseUrl + 'file/download/'+downloadingId+'/'+fileName+'/',
            responseType: 'blob',
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
        .then(response =>{
            let blob=new Blob([response.data]);
            let link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download =fileName;
            link.click();
            link.remove();
        })
        .catch();
    }
    fileRemove(pathToItem) {
        return axios({
            method: 'post',
            url: this.baseUrl + 'file/remove',
            data: {"path": pathToItem},
            config: {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json'
                }
            }
        })
        .then(
            function(){
                store.dispatch("getList");
            }
        )
        .catch();
    }
    fileMove(itemOldPath, itemNewPath, itemName, itemNewName) {
        let fileData = {};
        fileData['src'] = itemOldPath + itemName;
        fileData['dst'] = itemNewPath + itemNewName;
        return axios({
            method: 'post',
            url: this.baseUrl + 'file/move',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
        .then()
        .catch();
    }
    fileMoveInit(itemOldPath, itemNewPath, itemName, itemType){
        /* Before move get directory files and search for same titled files
        * if exist rename by adding current date and time */
        this.infoFile(itemNewPath + itemName)
        .then(res=>{
            if(res.status == 200) {
                console.log('exists');
                let date = new Date().toISOString().replace( /[.:-]/g, "");
                let editFile = itemName.split('/').pop();
                let editFileArray = [editFile.substr(0,editFile.lastIndexOf('.')),editFile.substr(editFile.lastIndexOf('.')+1,editFile.length)]
                let editFileName = editFileArray[0];
                let editFileExt = editFileArray[1];
                let newFileName = '';
                if(itemType == 'file') {
                    newFileName = editFileName+'_'+date+'.'+editFileExt;
                } else {
                    newFileName = itemName+'_'+date;
                }
                this.fileMove(itemOldPath, itemNewPath, itemName, newFileName).then(function (){
                    store.dispatch("getList");
                    store.commit("enableNotifications", newFileName+' file moved from '+itemOldPath+' to '+itemNewPath);
                });
            } else {
                this.fileMove(itemOldPath, itemNewPath, itemName, itemName).then(function (){
                    store.dispatch("getList");
                    store.commit("enableNotifications", itemName+' file moved from '+itemOldPath+' to '+itemNewPath);
                });
            }
        });
    }
    fileRename(itemPath, itemOldName, itemNewName ){
        let fileData = {};
        fileData['src'] = itemPath + itemOldName;
        fileData['dst'] = itemPath + itemNewName;
        return axios({
            method: 'post',
            url: this.baseUrl + 'file/move',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
        .then()
        .catch();
    }
    fileCopy(itemOldPath, itemNewPath, itemName, itemType){
        let date = new Date().toISOString().replace( /[.:-]/g, "");
        let editFile = itemName.split('/').pop();
        let editFileArray = [editFile.substr(0,editFile.lastIndexOf('.')),editFile.substr(editFile.lastIndexOf('.')+1,editFile.length)]
        let editFileName = editFileArray[0];
        let editFileExt = editFileArray[1];
        let newFileName = '';
        if(itemType == 'file') {
            newFileName = editFileName+'_'+date+'.'+editFileExt;
        } else {
            newFileName = itemName+'_'+date;
        }
        let fileData = {};
        fileData['src'] = itemOldPath + itemName;
        fileData['dst'] = itemNewPath + newFileName;
        return axios({
            method: 'post',
            url: this.baseUrl + 'file/copy',
            data: fileData,
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Content-Type': 'application/json'
                }
            }
        })
            .then(function (){
                store.dispatch("getList");
            })
            .catch();
    }
    dirMake(pathToItem, newFolderName){
        return axios({
            method: 'post',
            url: this.baseUrl + 'dir/make',
            data: {"path": pathToItem + newFolderName},
            config: {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json'
                }
            }
        })
            .then()
            .catch();
    }
    dirMakeInit(pathToItem, folderName){
        /* Before create dir get directory files and search for same titled folders
        * if exist rename by adding current date and time */
        let newFolderName = '';
        this.infoFile(pathToItem + folderName)
            .then(res=>{
             if(res.status == 200 || folderName == 'trash') {
                 let date = new Date().toISOString().replace( /[.:-]/g, "");
                 newFolderName = folderName+'_'+date;
                 this.dirMake(pathToItem, newFolderName).then(function (){
                     store.dispatch("getList");
                 });
             } else {
                 newFolderName = folderName;
                 this.dirMake(pathToItem, newFolderName).then(function (){
                     store.dispatch("getList");
                 });
             }
        });
    }
}