class LoadingView {
    private w: Worker;

    private _canvasEl: HTMLCanvasElement;
    get CanvasElement() : HTMLCanvasElement { return this._canvasEl; }
    set CanvasElement(value : HTMLCanvasElement) { this._canvasEl = value; this._canvas = this._canvasEl.getContext("2d"); }

    private _canvas: CanvasRenderingContext2D;
    get Canvas() : CanvasRenderingContext2D { return this._canvas; }

    private _spacing: number;
    get Spacing() : number { return this._spacing; }
    set Spacing(value :number) { this._spacing = value; }

    private _radius: number;
    get Radius() : number {return this._radius; }
    set Radius(value : number) {this._radius = value;}

    get Width(): number { return this.CanvasElement.width; }
    set Width(value: number) { this.CanvasElement.width = value; }

    get Height(): number { return this.CanvasElement.height; }
    set Height(value: number) { this.CanvasElement.height = value; }

    private _innerColor : string | CanvasGradient | CanvasPattern;
    get InnerColor() : string | CanvasGradient | CanvasPattern { return this._innerColor; }
    set InnerColor(value : string | CanvasGradient | CanvasPattern) { this._innerColor = value; }

    private _outerColor : string | CanvasGradient | CanvasPattern;
    get OuterColor() : string | CanvasGradient | CanvasPattern { return this._outerColor; }
    set OuterColor(value : string | CanvasGradient | CanvasPattern) { this._outerColor = value; } 

    private _running: boolean;
    get IsRunning() :boolean { return this._running;}

    constructor(Canvas: HTMLCanvasElement) 
    {
        this.CanvasElement = Canvas;
        this.Radius = 20;
        this.Spacing = 5;
    }

    public Start(): void 
    {
        if (!this.IsRunning) 
        {
            this._running = true;
            this.w = new Worker("percentWorker.js");
            this.w.onmessage = this.CallbackStep;
        }
    }


    public Stop(): void 
    {
        if (this.IsRunning) 
        {
            this._running = false;
            this.w.terminate();
        }
    }


    public CallbackStep(data: MessageEvent): void 
    {
        var percent: number = data.data as number;
        this.DrawStep(percent);
    }

    public Step(percent: number): void 
    {
        if(this.IsRunning) console.log("loadingView is already running, please stop it before applying a specific percent");
        else this.DrawStep(percent);
    }

    private DrawStep(percent: number): void 
    {
        var horizontalPadding: number = this.Width - this.Radius * 6 - this.Spacing * 2;
        var verticalPadding: number = this.Height - this.Radius * 2;
        var leftPadding: number = horizontalPadding / 2;
        var topPadding: number = verticalPadding / 2;

        var leftCenter: Point = new Point(leftPadding + this.Radius, topPadding + this.Radius);
        var middleCenter: Point = new Point(leftPadding + this.Radius * 3 + this.Spacing, topPadding + this.Radius);
        var rightCenter: Point = new Point(leftPadding + this.Radius * 5 + this.Spacing * 2, topPadding + this.Radius);

        this.Canvas.clearRect(0, 0, this.Width, this.Height);

        this.DrawCircle(this.Canvas, leftCenter, Math.min(1, percent));
        this.DrawCircle(this.Canvas, middleCenter, Math.max(0, Math.min(1, percent - 0.2)));
        this.DrawCircle(this.Canvas, rightCenter, Math.max(0, Math.min(1, percent - 0.4)));
    }

    private DrawCircle(canvas: CanvasRenderingContext2D, center: Point, percent: number): void 
    {
        var contournPercent: number = (percent * 1) / 0.6;
        contournPercent = Math.max(0, Math.min(1, contournPercent));

        var fillPercent: number = ((percent - 0.6) * 1) / 0.4;
        fillPercent = Math.max(0, Math.min(1, fillPercent));
        
        canvas.beginPath();
        canvas.fillStyle = this.OuterColor;
        canvas.arc(center.X, center.Y, this.Radius, -Math.PI / 2, Math.PI * 2 * contournPercent - Math.PI /2);
        canvas.stroke();

        if (fillPercent > 0) 
        {
            canvas.beginPath();
            canvas.arc(center.X, center.Y, this.Radius, 0, Math.PI * 2);
            canvas.fill();
            canvas.beginPath();
            canvas.fillStyle = this.InnerColor;
            canvas.arc(center.X, center.Y, this.Radius * (1.0 - fillPercent), 0, Math.PI * 2);
            console.log(this.Radius * (1 - fillPercent));
            canvas.fill();
        }
    }
}