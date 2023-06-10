export function checkURL(url){
    var tester = new Image();
    tester.onerror = ()=>{
        url = './src/staticFiles/standartAvatar.jpg'
    }
    tester.src = url;
    return url
}
