
;(function(window){

  var DataGetAll = function(opts){

    if(!(this instanceof DataGetAll))return new DataGetAll(opts);
    this.opts = this.extend({
      type:'GET',
      dataType:'json',
      url: 'www.baidu.com',
      data:{},
      success:function(){console.log('这是一个空的函数')}
    },opts);

    this.init();
  };

  DataGetAll.prototype = {
    init:function(){
      this.myAjax();
    },
    extend:function(obj1,obj2){
      for(var k in obj2){
        obj1[k] = obj2[k]
      }
      return obj1
    },
    jsonType:function(){
      var xhr = new XMLHttpRequest();
      if(type.toUpperCase() == 'GET'){
        xhr.open('GET',url + '?' + dataStr);
        xhr.send(null)
      }else if(type.toUpperCase() == 'POST'){
        xhr.open('POST',url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(dataStr)
      }
      xhr.onreadystatechange = function(){
        if(xhr.status == 200 && xhr.readyState == 4){
          var json = xhr.responseText;
          json = JSON.parse(json);
          success(json)
        }
      }
    },
    jsonpType:function(){
      //需要有一个函数名，并且保证不会重名
      var date = new Date();
      var cbName = "myJsonp" + date.getTime() + Math.random().toString().slice(2);
      window[cbName] = function(data){
        success(data)
      };
      //新建一个script标签，里面的src链接就是接口地址（包含参数）
      var newScript = document.createElement("script");
      if(dataStr == ''){
        newScript.src = url + "&callback=" + cbName;
      }else{
        newScript.src = url + "?" + dataStr + "&callback=" + cbName;
      }
      document.body.appendChild(newScript);
    }
    myAjax:function(opts){
      var type = this.opts.type || 'GET',
          dataType = this.opts.dataType || 'json',
          url = this.opts.url,
          data = this.opts.data,
          success = this.opts.success;

      var dataStr = '';
      for(var key in data){
        dataStr += key + "=" + data[key]
      }
      dataStr = dataStr.slice(0,-1);

      if(dataType == 'json'){
        this.jsonType();
      }else if(dataType == 'jsonp'){
        this.jsonpType();
      }
    }
  };

  window.DataGetAll = DataGetAll;
})(window)
