namespace Graphics
{
    export class Point implements INotifyPropertyChanged
    {
        static get Empty() : Point { return new Point(0, 0); } 

        private _x: number;
        get X(): number{ return this._x; }
        set X(value : number){ this._x = value; this.OnPropertyChanged("X"); }

        private _y: number;
        get Y() : number { return this._y; }
        set Y(value: number) { this._y = value; this.OnPropertyChanged("Y"); }

        constructor(x:number, y:number)
        {
            this._x = x;
            this._y = y;
        }

        public PropertyChanged: (propertyName : String) => void;
        public OnPropertyChanged(propertyName : String)
        {
            if(this.PropertyChanged != null) this.PropertyChanged(propertyName);
            if(propertyName == "X" || propertyName == "Y") this.OnPositionChanged(this.X, this.Y);
        }

        public PositionChanged: (x: number, y: number) => void;
        private _onPositionChangedEnabled : boolean = true;
        protected OnPositionChanged(x: number, y: number)
        {
            if(this._onPositionChangedEnabled && this.PositionChanged != null) this.PositionChanged(x, y);
        }

        public Offset(x: number, y:number)
        {
            this._onPositionChangedEnabled = false;
            this.X += x;
            this._onPositionChangedEnabled = true;
            this.Y += y;
        }
    }
}