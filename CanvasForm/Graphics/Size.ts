namespace Graphics
{
    export class Size implements INotifyPropertyChanged
    {
        static get Empty() : Size { return new Size(0, 0); }

        private _width: number;
        get Width() :number { return this._width;}
        set Width(value :number) { this._width = value; this.OnPropertyChanged("Width"); } 

        private _height: number;
        get Height() : number { return this._height; };
        set Height(value:number) { this._height = value; this.OnPropertyChanged("Height"); }

        constructor(width: number, height: number)
        {
            this._width = width;
            this._height = height;
        }

        public PropertyChanged: (propertyName: String) => void;
        public OnPropertyChanged(propertyName: String) : void
        {
            if(this.PropertyChanged != null) this.PropertyChanged(propertyName);
            if(propertyName == "Width" || propertyName == "Height") this.OnSizeChanged(this.Width, this.Height);
        }


        public SizeChanged: (width: number, height: number) => void;
        private _onSizeChangedEnabled : boolean = true;
        private OnSizeChanged(width: number, height: number)
        {
            if(this._onSizeChangedEnabled && this.SizeChanged != null) this.SizeChanged(width, height);
        }

        public Inflate(width: number, height: number)
        {
            this._onSizeChangedEnabled = false;
            this.Width += width;
            this._onSizeChangedEnabled = true;
            this.Height += height;
        }
    }
}