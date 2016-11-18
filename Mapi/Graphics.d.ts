declare namespace Graphics {
    class Graphics {
        private _ctx;
        static FromCanvas(canvas: HTMLCanvasElement): Graphics;
        static FromCanvasId(id: string): Graphics;
        constructor(context: CanvasRenderingContext2D);
        private ConfigurePen(pen);
        private Begin();
        private End();
        DrawLineP(pen: Pen, from: Point, to: Point): void;
        DrawLine(pen: Pen, fromX: number, fromY: number, toX: number, toY: number): void;
        DrawRectangle(pen: Pen, x: number, y: number, width: number, height: number): void;
        DrawRectangleR(pen: Pen, rect: Rectangle): void;
        DrawElipseR(pen: Pen, rect: Rectangle): void;
        DrawElipse(pen: Pen, x: number, y: number, width: number, height: number): void;
        DrawArc(pen: Pen, x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number): void;
    }
}
interface INotifyPropertyChanged {
    PropertyChanged: (propertyName: String) => void;
    OnPropertyChanged(propertyName: String): void;
}
declare namespace Graphics {
    class Pen {
        private _size;
        private _color;
        Size: number;
        readonly Color: String;
        constructor(color: String);
    }
}
declare namespace Graphics {
    class Point implements INotifyPropertyChanged {
        static readonly Empty: Point;
        private _x;
        X: number;
        private _y;
        Y: number;
        constructor(x: number, y: number);
        PropertyChanged: (propertyName: String) => void;
        OnPropertyChanged(propertyName: String): void;
        PositionChanged: (x: number, y: number) => void;
        private _onPositionChangedEnabled;
        protected OnPositionChanged(x: number, y: number): void;
        Offset(x: number, y: number): void;
    }
}
declare namespace Graphics {
    class Rectangle implements INotifyPropertyChanged {
        private _x;
        private _y;
        private _width;
        private _height;
        Left: number;
        Top: number;
        Width: number;
        Height: number;
        Right: number;
        Bottom: number;
        Location: Point;
        Size: Size;
        Center: Point;
        PropertyChanged: (propertyName: String) => void;
        OnPropertyChanged(propertyName: String): void;
        private OnPropertiesChanges(propertyNames);
    }
}
declare namespace Graphics {
    class Size implements INotifyPropertyChanged {
        static readonly Empty: Size;
        private _width;
        Width: number;
        private _height;
        Height: number;
        constructor(width: number, height: number);
        PropertyChanged: (propertyName: String) => void;
        OnPropertyChanged(propertyName: String): void;
        SizeChanged: (width: number, height: number) => void;
        private _onSizeChangedEnabled;
        private OnSizeChanged(width, height);
        Inflate(width: number, height: number): void;
    }
}
