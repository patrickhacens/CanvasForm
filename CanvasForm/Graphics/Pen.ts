namespace Graphics
{
    export class Pen
    {
        private _size : number = 1;
        private _color : String; 

        public get Size() : number { return this._size; }
        public get Color() : String { return this._color; }

        public set Size(value: number) { this._size = value; }

        constructor(color :String)
        {
            this._color = color;
        }
    }
}