namespace Graphics
{
    export class Rectangle implements INotifyPropertyChanged 
    {
        private _x : number;
        private _y : number;
        private _width : number;
        private _height : number;

        public get Left() : number { return this._x; }
        public get Top() : number {return this._y; }
        public get Width() : number { return this._width; }
        public get Height() : number { return this._height; }
        public get Right() : number { return this.Left + this.Width; }
        public get Bottom() : number { return this.Top + this.Height; }
        public get Location() : Point { return new Point(this.Left, this.Top); }
        public get Size() : Size { return new Size(this.Width, this.Height); }
        public get Center() : Point { return new Point(this.Left + this.Width / 2, this.Top + this.Height / 2)}

        public set Left(value: number) { this._x = value; this.OnPropertiesChanges(["Left", "Location", "Right", "Center"]); }
        public set Top(value: number) { this._y = value; this.OnPropertiesChanges(["Top", "Location", "Bottom", "Center"]); }
        public set Width(value: number) { this._width = value; this.OnPropertiesChanges(["Width", "Right", "Size", "Center"]); }
        public set Height(value: number) { this._height = value; this.OnPropertiesChanges(["Height", "Size" , "Bottom","Center"]); }
        public set Right(value: number) { this._width = value - this.Left; this.OnPropertiesChanges(["Right", "Size", "Width", "Center"]); }
        public set Bottom(value: number) { this._height = value - this.Top; this.OnPropertiesChanges(["Bottom", "Size", "Height", "Center"]); }
        public set Location(value: Point) { this._x = value.X; this._y = value.Y; this.OnPropertiesChanges(["Location", "Left", "Right", "Top", "Bottom", "Center"]); }
        public set Size(value: Size) { this._width = value.Width; this._height = value.Height; this.OnPropertiesChanges(["Size", "Width", "Height", "Bottom", "Right", "Center"]);}
        public set Center(value : Point) { this._x = value.X - this.Width / 2; this._y = value.Y - this.Height / 2; this.OnPropertiesChanges(["Left", "Top", "Center", "Right", "Bottom", "Location"]) }

        public PropertyChanged: (propertyName: String) => void;
        public OnPropertyChanged(propertyName: String) : void
        {
            if(this.PropertyChanged != null) this.PropertyChanged(propertyName);
        }

        private OnPropertiesChanges(propertyNames: [String])
        {
            propertyNames.forEach(propertyName => {
                this.OnPropertyChanged(propertyName);
            });
        }
    }
}