var el : HTMLCanvasElement; 
var loadingView : LoadingView;
var percent : number = 0; 
function loaded() 
{
    if(loadingView == null)
    {
        el = document.getElementById("myCanvas") as HTMLCanvasElement;
        loadingView = new LoadingView(el);
        loadingView.OuterColor = "#384428";
        loadingView.InnerColor = "FFF"
    }
    
    loadingView.Step(percent);
    percent += 0.01;
    if(percent > 2)
    {
        percent = 0;
    }
}

