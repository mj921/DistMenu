var ajax = function(option){
    if(window.XMLHttpRequest){
        var xmlHttp = new XMLHttpRequest();
    }else{
        var xmlHttp =  new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(option.url){
        option.type = option.type.toLowerCase();
        if(option.type === "post"){
            xmlHttp.open("post",option.url,option.async === false ? false : true);
            if(option.isFormData){
                var dataStr = new FormData();
                for(maitem in option.data){
                    var s = option.data[maitem];
                    dataStr.append(maitem,s);
                }
                if(option.fileParameter && option.fileParameter.length > 0){
                    for(var i = 0,len = option.fileParameter.length;i < len;i++){
                        dataStr.append(option.fileParameter[i],option.file[i],option.filename[i]);
                    }
                }
                xmlHttp.send(dataStr);
            }else{
                xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                var dataStr = "";
                // var objToStr = function(o){
                //     var ss = "{";
                //     for(key in o){
                //         if(Object.prototype.toString.call(o[key]) === '[object Array]'){
                //             ss += "\"" + key + "\":" + arrToStr(o[key]) + ",";
                //         }else if(typeof o[key] === "object"){
                //             ss += "\"" + key + "\":" + objToStr(o[key]) + ",";
                //         }else if(typeof o[key] === "string"){
                //             ss += "\"" + key + "\":\"" + o[key] + "\",";
                //         }else{
                //             ss += "\"" + key + "\":" + o[key] + ",";
                //         }
                //     }
                //     if(ss.charAt(ss.length - 1) === ","){
                //         ss = ss.substr(0,ss.length - 1);
                //     }
                //     ss += "}";
                //     return ss;
                // }
                // var arrToStr = function(arr){
                //     var ss = "[";
                //     for(var i = 0,len = arr.length;i < len;i++){
                //         if(Object.prototype.toString.call(arr[i]) === '[object Array]'){
                //             ss += arrToStr(arr[i]) + ",";
                //         }else if(typeof arr[i] === "object"){
                //             ss += objToStr(arr[i]) + ",";
                //         }else if(typeof arr[i] === "string"){
                //             ss += "\"" + arr[i] + "\",";
                //         }else{
                //             ss += arr[i] + ",";
                //         }
                //     }
                //     if(ss.charAt(ss.length - 1) === ","){
                //         ss = ss.substr(0,ss.length - 1);
                //     }
                //     ss += "]";
                //     return ss;
                // }
                for(maitem in option.data){
                    var s = option.data[maitem];
                    /*if(Object.prototype.toString.call(s) === '[object Array]'){
                        s = JSON.stringify(s);
                    }else */if(typeof s === "object"){
                        s = JSON.stringify(s);
                    }else{
                        s += "";
                    }
                    s = s.replace(/\%/g,"%25");
                    s = s.replace(/\//g,"%2F");
                    s = s.replace(/\?/g,"%3F");
                    s = s.replace(/\+/g,"%2B");
                    s = s.replace(/\&/g,"%26");
                    s = s.replace(/\=/g,"%3D");
                    s = s.replace(/\#/g,"%23");
                    dataStr += maitem + "=" + s + "&";
                }
                if(dataStr.charAt(dataStr.length - 1) === "&"){
                    dataStr = dataStr.substr(0,dataStr.length - 1);
                }
                xmlHttp.send(dataStr);
            }
        }else if(option.type == "get"){
            xmlHttp.open("get",option.url,option.async === false ? false : true);
            xmlHttp.send();
        }
        xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if(option.success){
                    switch(option.dataType){
                        case "json":
                            var result = xmlHttp.responseText[0] == "{" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "}" || (xmlHttp.responseText[0] == "[" && xmlHttp.responseText[xmlHttp.responseText.length - 1] == "]") ? JSON.parse(xmlHttp.responseText) : xmlHttp.responseText;
                            break;
                        case "text":
                            var result = xmlHttp.responseText;
                            break;
                        default:
                            var result = xmlHttp.responseText;
                            break;
                    }
                    option.success(result);
                };
            }else if(xmlHttp.readyState == 4 && xmlHttp.status == 400){
                if(option.error){
                    option.error({errorMsg:"请输入url",result:xmlHttp.responseText});
                }
            }else if(xmlHttp.readyState == 4){
                if(option.error){
                    option.error();
                }
            }
        }
    }else{
        if(option.error){
            option.error({errorMsg:"请输入url"});
        }
    }
}