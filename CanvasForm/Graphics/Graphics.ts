namespace Graphics
{
    export class GraphicsContext
    {
        private _ctx : CanvasRenderingContext2D;


        public static FromCanvas(canvas: HTMLCanvasElement) : GraphicsContext
        {
            return new GraphicsContext(canvas.getContext("2d"));
        }

        public static FromCanvasId( id: string) : GraphicsContext
        {
            return GraphicsContext.FromCanvas(document.getElementById(id) as HTMLCanvasElement);
        }

        constructor(context : CanvasRenderingContext2D)
        {
            this._ctx = context;
        }

        private ConfigurePen(pen : Pen) :void
        {
            this._ctx.strokeStyle = pen.Color;
            this._ctx.lineWidth = pen.Size;
        }

        private Begin() : void
        {
            this._ctx.save();
        }

        private End() : void
        {
            this._ctx.restore();
        }

        public DrawLineP(pen : Pen, from : Point, to : Point) : void
        {
            this.DrawLine(pen, from.X, from.Y, to.X, to.Y);
        }

        public DrawLine(pen : Pen, fromX : number, fromY : number, toX: number, toY: number) : void
        {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
                this._ctx.moveTo(fromX, fromY);
                this._ctx.lineTo(toX, toY);
            this._ctx.stroke();
            this.End();
        }

        public DrawRectangle(pen : Pen, x : number, y:number, width: number, height:number) : void
        {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.rect(x, y, width, height);
            this._ctx.stroke();
            this.End();
        }

        public DrawRectangleR(pen : Pen, rect : Rectangle) : void
        {
            this.DrawRectangle(pen, rect.Left, rect.Top, rect.Width, rect.Height);
        }

        public DrawElipseR(pen : Pen, rect : Rectangle) : void
        {
            this.DrawElipse(pen, rect.Left, rect.Top, rect.Width, rect.Height);
        }

        public DrawElipse(pen : Pen, x: number, y:number, width: number, height: number)
        {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
            this._ctx.ellipse(x + width / 2, y + height /2, width /2, height /2, 0, 0, Math.PI * 2, false);
            this._ctx.stroke();
            this._ctx.closePath();
            this.End();
        }

        public DrawArc(pen : Pen, x: number, y:number, width: number, height: number, startAngle: number, sweepAngle: number)
        {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
            this._ctx.ellipse(x + width /2, y + height/2, width /2, height /2, 0, Math.PI * 2 * (startAngle / 360), Math.PI * 2 * (sweepAngle / 360));
            this._ctx.stroke();
            this._ctx.closePath();
            this.End();
        }
    }
}