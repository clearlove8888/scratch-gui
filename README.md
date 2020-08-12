# 1.按照项目需求，需要对scratch做一些定制处理，这是一个本地版本
sb3文件其实就是一个json对象或者说json文件 里面保存了vm的状态信息

# 2.下载和展示步骤
### 上传一个project
    * 1.project-saver-hoc.jsx -> storeProject->this.props.onUpdateProjectData->save-project-to-server.js
######
    projectId 项目的id
    vmState 项目的状态信息 const savedVMState = this.props.vm.toJSON();//获取整个项目json格式的信息
    //this.props.vm  json后的数据=this.props.vm.json()
    params 参数

```javascript
获取二进制的项目信息
this.props.saveProjectSb3().then(
        // content 是一个Blob 对象可以获取项目二进制的流
        content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            downloadBlob(this.props.projectFilename, content);
        });
```

###下载一个项目
    project-fetcher-hoc.jsx->
```javascript
//会去this.projectHost 下拉取项目
 load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
```
    fetchProject(可以接受json项目和二进制返回值，会统一转为二进制加载到store中)
    ->this.props.onFetchedProjectData(projectAsset.data, loadingState)
    调用reducer中的方法onFetchedProjectData，将data加载到项目中
```javascript
return Object.assign({}, state, {
                loadingState: LoadingState.LOADING_VM_WITH_ID,
                //projectData 项目的二进制数据
                projectData: action.projectData
            });
```

#3.获取项目的封面
```javascript
this.props.vm.renderer.draw();
const img = new Image();
img.src = this.props.vm.renderer.canvas.toDataURL('image/png', 0.7);
const blob = this.dataURLtoBlob(img.src);
```
#主js文件打包的时候排除，从oss中引入。只能在webpack中手动排除，在html手动引入

#设置 NODE_ENV === 'production'  windows set NODE_ENV = 'production'
#阿里云gizp压缩问题
