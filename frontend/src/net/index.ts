
import { ElMessage } from "element-plus";
import axios from "axios";

const authItemName = 'access_token'
const serverUrl = 'http://localhost:1204'
const port = '1204'
//默认失败处理
const defaultFailure = (message: string, code: number, url: string) => {
    console.warn(`请求地址: ${url}, 状态码: ${code}, 错误信息: ${message}`)
    ElMessage.warning(message)
}

//默认错误处理（暂弃用）
const defaultError = (err:any) => {
    console.error(err)
    ElMessage.warning('发生了一些错误，请联系管理员')
}
//一次封装axios

//get请求封装
function internalGet(url:string,header:object,success:any,failure=defaultFailure,error=defaultError) {
    axios.get(url,{headers:header}).then(({data}) => {
        if(data.code === 200) {
            success(data.data)
        }
        console.log(data)
    }).catch(data => console.error("internalGet error:",data))
}
//post请求封装
function internalPost(url:string,data:object,header:object,success:any,failure:any,error=defaultError) {
    axios.post(url,data,{headers:header}).then(({data}) => {
        if(data.code === 200) {
            success(data.data)
        }else{
            failure(data.message,data.code,url)
        }
    }).catch(data => console.error("internalPost error:",data))
}
//put请求封装
 function internalPut(url:string,data:object,header:object,success:any,failure:any,error=defaultError) {
    axios.put(url,data,{headers:header}).then(({data}) => {
        if(data.code === 200) {
            success(data.data)
        }else{
            failure(data.message,data.code,url)
        }
    }).catch(data => console.error("internalPut error:",data))
}

//del请求封装
function internalDel(url:string,data:object,header:object,success:any,failure:any,error=defaultError) {
    axios({
         method: 'delete',
         url: url,
         data:data,
         headers: header
    }).then(({data}) => {
        if(data.code === 200) {
            success(data.data)
        }else{
            failure(data.message,data.code,url)
        }
    }).catch(data => console.error("internalDel error:",data))
}


//二次封装axios

function get(url:string, success:any, failure = defaultFailure) {
    internalGet(url, accessHeader(), success, failure)
}

function post(url:string, data:object, success:any, failure = defaultFailure) {
    internalPost(url, data, accessHeader(), success, failure)
}
//获取用户信息
function getUserInfo(success:any, failure:any=defaultFailure) {
    internalGet(`http://localhost:${port}/api/user/userinfo/me`,
        accessHeader(),
        (response:any)=>{
            console.log("成功获取用户数据:",response)
            success(response)
        },
        failure)
}

//登录
function login(username:string,password:string,remember:boolean,success:any,failure=defaultFailure) {
    internalPost(`http://localhost:${port}/api/user/auth/login`, {
        name: username,
        password: password
    }, {
        'Content-Type': 'application/json',
    }, (response:any) => {
        storeAccessToken(response.token, remember, response.expire)
        ElMessage.success(`登录成功，欢迎 ${response.username} 来到我们的系统`)
        success(response)
    }, failure)
}


//注册
function register(username: string,
                  nickname: string,
                  password: string,
                  sex: number,
                  email: string,
                  phone: string,
                  signature: string,
                  success: any, failure = defaultFailure) {
    internalPost(`http://localhost:${port}/api/user/auth/register`, {
        username: username,
        nickName: nickname,
        password: password,
        sex:sex,
        email: email,
        phone: phone,
        signature: signature
    }, {
        'Content-Type': 'application/json'
    }, (response:any) => {
        success(response)
    }, failure)
}
//登出
function logout(success:any, failure = defaultFailure) {
    get(`${serverUrl}:${port}/api/user/logout`, () => {
        deleteAccessToken()
        success()
    }, failure)
}

//修改个人信息
function infoSubmit(
    nickname:string,
    sex:number,
    email:string,
    phone:string,
    signature:string,
    success:any,
    failure=defaultFailure
    ) {
    internalPost(`http://localhost:${port}/api/user/modify`, {
            nickName: nickname,
            sex: sex,
            email: email,
            phone: phone,
            signature: signature
    },accessHeader(), (response:any) => {
        success(response)
    }, failure)
}
//添加任务
function  addTask(title:string,
                  description:string,
                  deadline:string,
                  category:string,
                  tags:string[],
                  success:any,
                  failure=defaultFailure,) {
    internalPost(`http://localhost:${port}/api/task/create`,{
        title: title,
        description: description,
        dueDate: deadline,
        categoryName: category,
        tagNameList: tags
    }, accessHeader() ,
        (response:any)=>{
            success(response)
        },
        failure)
}



//修改任务
function  modifyTask(id:number,
                    title:string,
                    description:string,
                    deadline:string,
                    category:string,
                    tags:string[],
                     success:any,
                     failure=defaultFailure,){
    console.log("修改任务tags:",tags)
    internalPut(`http://localhost:${port}/api/task/modify`,{
        id: id,
        title: title,
        description: description,
        dueDate: deadline,
        categoryName: category,
        tagNameList: tags
    }, accessHeader(), (response:any) => {
        console.log("成功修改任务:",response)
        success(response)
    }, failure)
}
//删除任务
function  deleteTask(id:number, success:any, failure=defaultFailure) {
    internalDel(`http://localhost:${port}/api/task/delete`,{
        id: id,
    }, accessHeader(), (response:any) => {
        console.log("成功删除任务:",response)
        success(response)
    }, failure)
}
//点亮任务星标
function  starTask(Tid:number,success:any, failure=defaultFailure) {

}
//取消任务星标
function  unstarTask(Tid:number,success:any, failure=defaultFailure) {

}
//完成任务
function   completeTask(Tid:number,success:any, failure=defaultFailure) {

}
//撤销完成任务
function  uncompleteTask(Tid:number,success:any, failure=defaultFailure) {

}



//获取所有任务
function  fetchTasks(success:any, failure=defaultFailure) {
    internalGet(`http://localhost:${port}/api/task/queryAll`, accessHeader(), (response:any) => {
        console.log("成功获取用户任务:",response)
        success(response)
    },(response)=>{console.log("!!!",response,"获取任务失败")})
}

//重置密码
function changePassword(newPassword:string,success:any,failure=defaultFailure) {
    internalPost(`http://localhost:${port}/api/user/reset`, {
        password: newPassword,
    },accessHeader(), (response:any) => {
        console.log("@@@@",response,"修改密码成功")
     }, failure
    )}

//token存储
function storeAccessToken(token:object, remember:boolean, expire:number) {
    const authObj = { token: token, expire: expire }
    const str = JSON.stringify(authObj)
    if (remember)
        //本地存储
        localStorage.setItem(authItemName, str)
    else
        //会话存储
        sessionStorage.setItem(authItemName, str)
}
//token获取
function takeAccessToken() {
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
    if (!str) return null
    const authObj = JSON.parse(str)
    if (authObj.expire <= new Date()) {
        deleteAccessToken()
        ElMessage.warning('登录已过期，请重新登录')
        return null
    }
    return authObj.token
}
//token装载
function accessHeader() {
    const token = takeAccessToken()
    return token ? {'Authorization': `Bearer ${takeAccessToken()}`} : {}
}
//token删除
function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}
//有无token判断
function unauthorized() {
    return !takeAccessToken()
}

//导出
        export {
            login ,
            logout,
            register ,
            unauthorized,
            getUserInfo,
            infoSubmit ,
            changePassword,
            get,
            post,
            deleteAccessToken,
            addTask,
            modifyTask,
            fetchTasks,
            deleteTask
        }