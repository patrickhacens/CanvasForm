var Graphics;
(function (Graphics) {
    class GraphicsContext {
        constructor(context) {
            this._ctx = context;
        }
        static FromCanvas(canvas) {
            return new GraphicsContext(canvas.getContext("2d"));
        }
        static FromCanvasId(id) {
            return GraphicsContext.FromCanvas(document.getElementById(id));
        }
        ConfigurePen(pen) {
            this._ctx.strokeStyle = pen.Color;
            this._ctx.lineWidth = pen.Size;
        }
        Begin() {
            this._ctx.save();
        }
        End() {
            this._ctx.restore();
        }
        DrawLineP(pen, from, to) {
            this.DrawLine(pen, from.X, from.Y, to.X, to.Y);
        }
        DrawLine(pen, fromX, fromY, toX, toY) {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
            this._ctx.moveTo(fromX, fromY);
            this._ctx.lineTo(toX, toY);
            this._ctx.stroke();
            this.End();
        }
        DrawRectangle(pen, x, y, width, height) {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.rect(x, y, width, height);
            this._ctx.stroke();
            this.End();
        }
        DrawRectangleR(pen, rect) {
            this.DrawRectangle(pen, rect.Left, rect.Top, rect.Width, rect.Height);
        }
        DrawElipseR(pen, rect) {
            this.DrawElipse(pen, rect.Left, rect.Top, rect.Width, rect.Height);
        }
        DrawElipse(pen, x, y, width, height) {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
            this._ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2, false);
            this._ctx.stroke();
            this._ctx.closePath();
            this.End();
        }
        DrawArc(pen, x, y, width, height, startAngle, sweepAngle) {
            this.Begin();
            this.ConfigurePen(pen);
            this._ctx.beginPath();
            this._ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, Math.PI * 2 * (startAngle / 360), Math.PI * 2 * (sweepAngle / 360));
            this._ctx.stroke();
            this._ctx.closePath();
            this.End();
        }
    }
    Graphics.GraphicsContext = GraphicsContext;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    class Pen {
        constructor(color) {
            this._size = 1;
            this._color = color;
        }
        get Size() { return this._size; }
        get Color() { return this._color; }
        set Size(value) { this._size = value; }
    }
    Graphics.Pen = Pen;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    class Point {
        constructor(x, y) {
            this._onPositionChangedEnabled = true;
            this._x = x;
            this._y = y;
        }
        static get Empty() { return new Point(0, 0); }
        get X() { return this._x; }
        set X(value) { this._x = value; this.OnPropertyChanged("X"); }
        get Y() { return this._y; }
        set Y(value) { this._y = value; this.OnPropertyChanged("Y"); }
        OnPropertyChanged(propertyName) {
            if (this.PropertyChanged != null)
                this.PropertyChanged(propertyName);
            if (propertyName == "X" || propertyName == "Y")
                this.OnPositionChanged(this.X, this.Y);
        }
        OnPositionChanged(x, y) {
            if (this._onPositionChangedEnabled && this.PositionChanged != null)
                this.PositionChanged(x, y);
        }
        Offset(x, y) {
            this._onPositionChangedEnabled = false;
            this.X += x;
            this._onPositionChangedEnabled = true;
            this.Y += y;
        }
    }
    Graphics.Point = Point;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    class Rectangle {
        get Left() { return this._x; }
        get Top() { return this._y; }
        get Width() { return this._width; }
        get Height() { return this._height; }
        get Right() { return this.Left + this.Width; }
        get Bottom() { return this.Top + this.Height; }
        get Location() { return new Graphics.Point(this.Left, this.Top); }
        get Size() { return new Graphics.Size(this.Width, this.Height); }
        get Center() { return new Graphics.Point(this.Left + this.Width / 2, this.Top + this.Height / 2); }
        set Left(value) { this._x = value; this.OnPropertiesChanges(["Left", "Location", "Right", "Center"]); }
        set Top(value) { this._y = value; this.OnPropertiesChanges(["Top", "Location", "Bottom", "Center"]); }
        set Width(value) { this._width = value; this.OnPropertiesChanges(["Width", "Right", "Size", "Center"]); }
        set Height(value) { this._height = value; this.OnPropertiesChanges(["Height", "Size", "Bottom", "Center"]); }
        set Right(value) { this._width = value - this.Left; this.OnPropertiesChanges(["Right", "Size", "Width", "Center"]); }
        set Bottom(value) { this._height = value - this.Top; this.OnPropertiesChanges(["Bottom", "Size", "Height", "Center"]); }
        set Location(value) { this._x = value.X; this._y = value.Y; this.OnPropertiesChanges(["Location", "Left", "Right", "Top", "Bottom", "Center"]); }
        set Size(value) { this._width = value.Width; this._height = value.Height; this.OnPropertiesChanges(["Size", "Width", "Height", "Bottom", "Right", "Center"]); }
        set Center(value) { this._x = value.X - this.Width / 2; this._y = value.Y - this.Height / 2; this.OnPropertiesChanges(["Left", "Top", "Center", "Right", "Bottom", "Location"]); }
        OnPropertyChanged(propertyName) {
            if (this.PropertyChanged != null)
                this.PropertyChanged(propertyName);
        }
        OnPropertiesChanges(propertyNames) {
            propertyNames.forEach(propertyName => {
                this.OnPropertyChanged(propertyName);
            });
        }
    }
    Graphics.Rectangle = Rectangle;
})(Graphics || (Graphics = {}));
var Graphics;
(function (Graphics) {
    class Size {
        constructor(width, height) {
            this._onSizeChangedEnabled = true;
            this._width = width;
            this._height = height;
        }
        static get Empty() { return new Size(0, 0); }
        get Width() { return this._width; }
        set Width(value) { this._width = value; this.OnPropertyChanged("Width"); }
        get Height() { return this._height; }
        ;
        set Height(value) { this._height = value; this.OnPropertyChanged("Height"); }
        OnPropertyChanged(propertyName) {
            if (this.PropertyChanged != null)
                this.PropertyChanged(propertyName);
            if (propertyName == "Width" || propertyName == "Height")
                this.OnSizeChanged(this.Width, this.Height);
        }
        OnSizeChanged(width, height) {
            if (this._onSizeChangedEnabled && this.SizeChanged != null)
                this.SizeChanged(width, height);
        }
        Inflate(width, height) {
            this._onSizeChangedEnabled = false;
            this.Width += width;
            this._onSizeChangedEnabled = true;
            this.Height += height;
        }
    }
    Graphics.Size = Size;
})(Graphics || (Graphics = {}));
