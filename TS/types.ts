class Point 
{
    private _x: number = 0;
    get X(): number{ return this._x; }
    set X(value : number){ this._x = value; this.OnPositionChanged(this.X, this.Y); }

    private _y: number;
    get Y() : number { return this._y; }
    set Y(value: number) { this._y = value; this.OnPositionChanged(this.X, this.Y); }

    constructor(x:number, y:number)
    {
        this.X = x;
        this.Y = y;
    }

    static get Empty() : Point { return new Point(0, 0); } 

    public PositionChanged: (x: number, y: number) => void;

    private _onPositionChangedEnabled : boolean = true;
    private OnPositionChanged(x: number, y: number)
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

class Size 
{
    private _width: number;
    get Width() :number { return this._width;}
    set Width(value :number) { this._width = value; this.OnSizeChanged(this.Width, this.Height); } 

    private _height: number;
    get Height() : number { return this._height; };
    set Height(value:number) { this._height = value; this.OnSizeChanged(this.Width,this.Height);}

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

class Rectangle 
{
    private _location : Point;
    get Location() : Point { return this._location; }
    set Location(value:Point) 
    {
        this._location.PositionChanged = null;
        this._location = value; 
        this._location.PositionChanged = this.PositionChanged;
        this.OnLocationChange(value);
    }
    private _size: Size;
    get Size() : Size { return this._size;}
    set Size(value : Size) 
    { 
        this._size.SizeChanged = null;
        this._size = value; 
        this._size.SizeChanged = this.SizeChanged;
        this.OnSizeChange(value);
    }

    public SizeChanged: (width: number, height: number) => void;
    public PositionChanged: (x: number, y: number) => void;

    private OnSizeChange(size: Size)
    {
        if(this.SizeChanged != null) this.SizeChanged(size.Width, size.Height);
    }

    private OnLocationChange(location: Point)
    {
        if(this.PositionChanged != null) this.PositionChanged(location.X, location.Y);
    }

    public Inflate(width: number, height: number)
    {
        this.Size.Inflate(width, height);
    }

    public Offset(x:number, y:number)
    {
        this.Location.Offset(x,y);
    }

    public Contains(p: Point) : boolean
    {
        return  p.X >= this.Location.X && 
                p.X <= this.Location.X + this.Size.Width &&
                p.Y >= this.Location.Y &&
                p.Y <= this.Location.Y + this.Size.Height;
    }

    public IntersectsWith(rec: Rectangle) : boolean
    {
        return this.Contains(this.GetLeftTop()) || this.Contains(this.GetRightTop())
            || this.Contains(this.GetLeftBottom()) || this.Contains(this.GetRightBottom());
    }

    public GetLeftTop() : Point
    {
        return this.Location;
    }

    public GetRightTop() : Point
    {
        return new Point(this.Location.X + this.Size.Width, this.Location.Y);
        
    }

    public GetLeftBottom() : Point
    {
        return new Point( this.Location.X, this.Location.Y + this.Size.Height);
    }

    public GetRightBottom() : Point
    {
        return new Point(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height);
    }
}