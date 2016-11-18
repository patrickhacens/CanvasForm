interface INotifyPropertyChanged
{
    PropertyChanged: (propertyName : String) => void;
    OnPropertyChanged(propertyName:String) : void;
}